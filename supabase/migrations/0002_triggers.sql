-- ============================================================================
-- Bosberaaad: triggers
--
-- Four triggers carry real logic. The first one matters most: aggregate
-- ratings are NEVER written by application code. They are recomputed here from
-- published reviews only, so the number on a product page cannot drift from
-- the reviews behind it.
-- ============================================================================

-- ----------------------------------------------------- update_software_ratings
create or replace function update_software_ratings()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_id uuid;
begin
  target_id := coalesce(new.software_id, old.software_id);

  update software s
  set
    overall_rating          = coalesce(agg.overall, 0),
    ease_of_use_rating      = coalesce(agg.ease, 0),
    value_for_money_rating  = coalesce(agg.value, 0),
    customer_service_rating = coalesce(agg.service, 0),
    functionality_rating    = coalesce(agg.functionality, 0),
    review_count            = coalesce(agg.total, 0)
  from (
    select
      round(avg(overall_rating)::numeric, 1)    as overall,
      round(avg(ease_of_use)::numeric, 1)       as ease,
      round(avg(value_for_money)::numeric, 1)   as value,
      round(avg(customer_service)::numeric, 1)  as service,
      round(avg(functionality)::numeric, 1)     as functionality,
      count(*)                                  as total
    from reviews
    where software_id = target_id
      and status = 'published'
  ) agg
  where s.id = target_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists reviews_update_ratings on reviews;
create trigger reviews_update_ratings
  after insert or update or delete on reviews
  for each row execute function update_software_ratings();

-- ------------------------------------------------------- update_category_counts
create or replace function update_category_counts()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  affected uuid[];
begin
  affected := array_remove(array[new.category_id, old.category_id], null);

  update categories c
  set software_count = (
    select count(*) from software s
    where s.category_id = c.id and s.status = 'published'
  )
  where c.id = any(affected);

  return coalesce(new, old);
end;
$$;

drop trigger if exists software_update_category_counts on software;
create trigger software_update_category_counts
  after insert or delete or update of category_id, status on software
  for each row execute function update_category_counts();

-- ------------------------------------------------------------- set_updated_at
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists software_set_updated_at on software;
create trigger software_set_updated_at
  before update on software
  for each row execute function set_updated_at();

drop trigger if exists articles_set_updated_at on articles;
create trigger articles_set_updated_at
  before update on articles
  for each row execute function set_updated_at();

drop trigger if exists pages_set_updated_at on pages;
create trigger pages_set_updated_at
  before update on pages
  for each row execute function set_updated_at();

-- --------------------------------------------------------- record_price_change
-- Captures every change to a list price, which powers the price history line
-- on the product page.
create or replace function record_price_change()
returns trigger
language plpgsql
as $$
begin
  if new.starting_price is distinct from old.starting_price
     or new.price_currency is distinct from old.price_currency then
    insert into software_price_history (software_id, starting_price, price_currency, note)
    values (new.id, new.starting_price, new.price_currency, 'List price updated');
  end if;
  return new;
end;
$$;

drop trigger if exists software_record_price_change on software;
create trigger software_record_price_change
  after update of starting_price, price_currency on software
  for each row execute function record_price_change();

-- -------------------------------------------------------------- write_audit_log
create or replace function write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into audit_log (table_name, row_id, action, actor, old_data, new_data)
  values (
    tg_table_name,
    case when tg_op = 'DELETE' then old.id else new.id end,
    tg_op,
    auth.uid(),
    case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) else null end
  );
  return coalesce(new, old);
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array['software','articles','reviews','pages','site_settings'] loop
    execute format('drop trigger if exists %I_audit on %I', t, t);
    execute format(
      'create trigger %I_audit after insert or update or delete on %I for each row execute function write_audit_log()',
      t, t
    );
  end loop;
end;
$$;

-- ------------------------------------------------------------ mark_review_helpful
-- Rate limited by hashed IP. The increment happens inside the database rather
-- than read then write, so concurrent votes cannot lose each other.
create or replace function mark_review_helpful(p_review_id uuid, p_ip_hash text)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count int;
begin
  insert into review_helpful_votes (review_id, ip_hash)
  values (p_review_id, p_ip_hash)
  on conflict (review_id, ip_hash) do nothing;

  if not found then
    -- Already voted. Return the current count without changing it.
    select helpful_count into new_count from reviews where id = p_review_id;
    return coalesce(new_count, 0);
  end if;

  update reviews
  set helpful_count = helpful_count + 1
  where id = p_review_id
  returning helpful_count into new_count;

  return coalesce(new_count, 0);
end;
$$;

grant execute on function mark_review_helpful(uuid, text) to anon, authenticated, service_role;
