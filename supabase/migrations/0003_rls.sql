-- ============================================================================
-- Bosberaaad: row level security
--
-- Shape of the policy set:
--   anonymous  reads published content only
--   authenticated (the single admin) has full access to content tables
--   service role alone writes clicks, subscribers and contact messages
-- ============================================================================

alter table categories             enable row level security;
alter table software               enable row level security;
alter table reviews                enable row level security;
alter table review_helpful_votes   enable row level security;
alter table articles               enable row level security;
alter table software_alternatives  enable row level security;
alter table comparisons            enable row level security;
alter table software_price_history enable row level security;
alter table affiliate_clicks       enable row level security;
alter table pages                  enable row level security;
alter table site_settings          enable row level security;
alter table newsletter_subscribers enable row level security;
alter table contact_messages       enable row level security;
alter table audit_log              enable row level security;
alter table redirects              enable row level security;
alter table media_library          enable row level security;

-- --------------------------------------------------------------- public reads
drop policy if exists "categories are public" on categories;
create policy "categories are public" on categories
  for select using (true);

drop policy if exists "published software is public" on software;
create policy "published software is public" on software
  for select using (status = 'published');

drop policy if exists "published reviews are public" on reviews;
create policy "published reviews are public" on reviews
  for select using (status = 'published');

drop policy if exists "published articles are public" on articles;
create policy "published articles are public" on articles
  for select using (status = 'published');

drop policy if exists "alternatives are public" on software_alternatives;
create policy "alternatives are public" on software_alternatives
  for select using (true);

drop policy if exists "published comparisons are public" on comparisons;
create policy "published comparisons are public" on comparisons
  for select using (status = 'published');

drop policy if exists "price history is public" on software_price_history;
create policy "price history is public" on software_price_history
  for select using (true);

drop policy if exists "published pages are public" on pages;
create policy "published pages are public" on pages
  for select using (status = 'published');

drop policy if exists "settings are public" on site_settings;
create policy "settings are public" on site_settings
  for select using (true);

drop policy if exists "redirects are public" on redirects;
create policy "redirects are public" on redirects
  for select using (true);

drop policy if exists "media is public" on media_library;
create policy "media is public" on media_library
  for select using (true);

-- ------------------------------------------------------- authenticated writes
-- The single administrator. If this ever becomes a team, replace `true` with a
-- role check against a profiles table rather than loosening these further.
do $$
declare
  t text;
begin
  foreach t in array array[
    'categories','software','reviews','articles','software_alternatives',
    'comparisons','pages','site_settings','redirects','media_library',
    'software_price_history'
  ] loop
    execute format('drop policy if exists "admin full access" on %I', t);
    execute format(
      'create policy "admin full access" on %I for all to authenticated using (true) with check (true)',
      t
    );
  end loop;
end;
$$;

-- ----------------------------------------------- service role only, admin read
-- These three tables hold personal information collected from visitors. Only
-- the service role writes them, and only the admin may read them.

drop policy if exists "admin reads clicks" on affiliate_clicks;
create policy "admin reads clicks" on affiliate_clicks
  for select to authenticated using (true);

drop policy if exists "admin reads subscribers" on newsletter_subscribers;
create policy "admin reads subscribers" on newsletter_subscribers
  for select to authenticated using (true);

drop policy if exists "admin updates subscribers" on newsletter_subscribers;
create policy "admin updates subscribers" on newsletter_subscribers
  for update to authenticated using (true) with check (true);

drop policy if exists "admin reads messages" on contact_messages;
create policy "admin reads messages" on contact_messages
  for select to authenticated using (true);

drop policy if exists "admin updates messages" on contact_messages;
create policy "admin updates messages" on contact_messages
  for update to authenticated using (true) with check (true);

drop policy if exists "admin reads audit log" on audit_log;
create policy "admin reads audit log" on audit_log
  for select to authenticated using (true);

-- Helpful votes are written by a security definer function, so no direct
-- policy is granted to anonymous visitors.
drop policy if exists "admin reads helpful votes" on review_helpful_votes;
create policy "admin reads helpful votes" on review_helpful_votes
  for select to authenticated using (true);

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public)
values
  ('logos', 'logos', true),
  ('screenshots', 'screenshots', true),
  ('avatars', 'avatars', true),
  ('articles', 'articles', true)
on conflict (id) do nothing;

do $$
declare
  b text;
begin
  foreach b in array array['logos','screenshots','avatars','articles'] loop
    execute format('drop policy if exists "%s public read" on storage.objects', b);
    execute format(
      'create policy "%s public read" on storage.objects for select using (bucket_id = %L)',
      b, b
    );

    execute format('drop policy if exists "%s admin write" on storage.objects', b);
    execute format(
      'create policy "%s admin write" on storage.objects for all to authenticated using (bucket_id = %L) with check (bucket_id = %L)',
      b, b, b
    );
  end loop;
end;
$$;
