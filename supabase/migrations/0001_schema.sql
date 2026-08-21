-- ============================================================================
-- Bosberaaad: schema
-- Idempotent and safe to re run.
-- ============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

-- ----------------------------------------------------------------- categories
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  icon text not null default 'Boxes',
  description text not null default '',
  intro text,
  software_count int not null default 0,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------- software
create table if not exists software (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  tagline text,
  description_short text not null,
  description_full text not null,          -- HTML
  logo_url text,
  screenshots jsonb not null default '[]',
  category_id uuid references categories(id) on delete set null,

  starting_price numeric,
  price_currency text not null default 'ZAR',
  billing_period text not null default 'month',
  price_vat_inclusive boolean,
  price_checked_at date,
  pricing_note text,
  free_trial boolean not null default false,
  free_version boolean not null default false,
  demo_available boolean not null default false,
  demo_url text,
  trial_note text,
  pricing_plans jsonb not null default '[]',

  features jsonb not null default '[]',
  top_features jsonb not null default '[]',
  integrations jsonb not null default '[]',
  brand_color text,

  -- The South African yardstick, stored so it can be compared and filtered.
  compliance jsonb not null default '[]',
  bank_feeds jsonb not null default '[]',
  best_for_size jsonb not null default '[]',
  best_for_role jsonb not null default '[]',

  affiliate_url text,
  vendor_website text,
  vendor_name text,
  founded_year int,
  support_types jsonb not null default '[]',
  countries_available jsonb not null default '[]',
  languages jsonb not null default '[]',

  -- Written only by update_software_ratings(). Never by application code.
  overall_rating numeric(3,1) not null default 0,
  ease_of_use_rating numeric(3,1) not null default 0,
  value_for_money_rating numeric(3,1) not null default 0,
  customer_service_rating numeric(3,1) not null default 0,
  functionality_rating numeric(3,1) not null default 0,
  review_count int not null default 0,

  meta_title text,
  meta_description text,
  og_image_url text,

  status text not null default 'draft' check (status in ('published','draft')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  search_vector tsvector generated always as (
    to_tsvector('english',
      coalesce(name,'') || ' ' || coalesce(tagline,'') || ' ' ||
      coalesce(description_short,'') || ' ' || coalesce(vendor_name,''))
  ) stored
);

create index if not exists software_search_idx on software using gin (search_vector);
create index if not exists software_category_published_idx on software (category_id) where status = 'published';
create index if not exists software_status_idx on software (status);
create index if not exists software_rating_idx on software (overall_rating desc, review_count desc);

-- -------------------------------------------------------------------- reviews
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  software_id uuid not null references software(id) on delete cascade,

  reviewer_name text not null,
  reviewer_job_title text not null default '',
  reviewer_company text,
  reviewer_industry text not null default '',
  reviewer_company_size text not null default '',
  reviewer_country text not null default 'South Africa',
  reviewer_city text,
  reviewer_avatar_url text,
  verified_linkedin boolean not null default false,
  verified_badge boolean not null default false,
  used_for_duration text not null default '',

  overall_rating int not null check (overall_rating between 1 and 5),
  ease_of_use int not null check (ease_of_use between 1 and 5),
  value_for_money int not null check (value_for_money between 1 and 5),
  customer_service int not null check (customer_service between 1 and 5),
  functionality int not null check (functionality between 1 and 5),

  review_title text not null,
  summary text not null,
  pros text not null default '',
  cons text not null default '',

  vendor_response text,
  vendor_response_date timestamptz,

  review_date timestamptz not null default now(),
  helpful_count int not null default 0,
  -- POPIA: hashed at the application boundary, the raw address never arrives.
  submitted_ip_hash text,
  status text not null default 'hidden' check (status in ('published','hidden')),
  created_at timestamptz not null default now()
);

create index if not exists reviews_software_published_idx
  on reviews (software_id, review_date desc) where status = 'published';
create index if not exists reviews_status_idx on reviews (status);

-- One helpful vote per review per visitor, enforced rather than trusted.
create table if not exists review_helpful_votes (
  review_id uuid not null references reviews(id) on delete cascade,
  ip_hash text not null,
  voted_at timestamptz not null default now(),
  primary key (review_id, ip_hash)
);

-- ------------------------------------------------------------------- articles
create table if not exists articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null,
  featured_image_url text,
  category_tag text not null default 'Guide',
  related_software_id uuid references software(id) on delete set null,
  author_name text not null default '',
  author_bio text not null default '',
  author_avatar_url text,
  author_title text not null default '',
  meta_title text,
  meta_description text,
  og_image_url text,
  read_time_minutes int not null default 5,
  status text not null default 'draft' check (status in ('published','draft')),
  featured boolean not null default false,
  published_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  search_vector tsvector generated always as (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'') || ' ' || coalesce(category_tag,''))
  ) stored
);

create index if not exists articles_search_idx on articles using gin (search_vector);
create index if not exists articles_published_idx on articles (published_date desc) where status = 'published';

-- ------------------------------------------------------ software_alternatives
create table if not exists software_alternatives (
  id uuid primary key default uuid_generate_v4(),
  software_id uuid not null references software(id) on delete cascade,
  alternative_id uuid not null references software(id) on delete cascade,
  display_order int not null default 0,
  reason text,
  unique (software_id, alternative_id),
  check (software_id <> alternative_id)
);

create index if not exists software_alternatives_idx on software_alternatives (software_id, display_order);

-- ---------------------------------------------------------------- comparisons
create table if not exists comparisons (
  id uuid primary key default uuid_generate_v4(),
  software_a_id uuid not null references software(id) on delete cascade,
  software_b_id uuid not null references software(id) on delete cascade,
  custom_verdict text,
  meta_title text,
  meta_description text,
  status text not null default 'draft' check (status in ('published','draft')),
  created_at timestamptz not null default now(),
  unique (software_a_id, software_b_id),
  check (software_a_id <> software_b_id)
);

-- --------------------------------------------------- software_price_history
-- Nobody else in this market tracks this, and buyers find it genuinely useful.
create table if not exists software_price_history (
  id uuid primary key default uuid_generate_v4(),
  software_id uuid not null references software(id) on delete cascade,
  starting_price numeric,
  price_currency text not null default 'ZAR',
  changed_at timestamptz not null default now(),
  note text
);

create index if not exists price_history_idx on software_price_history (software_id, changed_at desc);

-- ----------------------------------------------------------- affiliate_clicks
create table if not exists affiliate_clicks (
  id uuid primary key default uuid_generate_v4(),
  software_id uuid references software(id) on delete set null,
  software_name text not null,
  affiliate_url text not null,
  clicked_at timestamptz not null default now(),
  ip_hash text,
  user_agent text,
  referrer text,
  country_code text
);

create index if not exists affiliate_clicks_idx on affiliate_clicks (software_id, clicked_at desc);
create index if not exists affiliate_clicks_time_idx on affiliate_clicks (clicked_at desc);

-- ---------------------------------------------------------------------- pages
create table if not exists pages (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  content text not null,
  meta_title text,
  meta_description text,
  status text not null default 'published' check (status in ('published','draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------- site_settings
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------- newsletter_subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  status text not null default 'pending' check (status in ('pending','confirmed','unsubscribed')),
  interests text[] not null default '{}',
  confirm_token text,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  consent_ip_hash text,
  consent_source text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_status_idx on newsletter_subscribers (status);

-- ------------------------------------------------------------ contact_messages
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  ip_hash text,
  user_agent text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_handled_idx on contact_messages (handled, created_at desc);

-- ------------------------------------------------------------------ audit_log
create table if not exists audit_log (
  id uuid primary key default uuid_generate_v4(),
  table_name text not null,
  row_id uuid,
  action text not null,
  actor uuid,
  changed_at timestamptz not null default now(),
  old_data jsonb,
  new_data jsonb
);

create index if not exists audit_log_idx on audit_log (table_name, changed_at desc);

-- ------------------------------------------------------------------ redirects
create table if not exists redirects (
  id uuid primary key default uuid_generate_v4(),
  from_path text not null unique,
  to_path text not null,
  status_code int not null default 301 check (status_code in (301, 302)),
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------- media_library
create table if not exists media_library (
  id uuid primary key default uuid_generate_v4(),
  bucket text not null,
  path text not null,
  public_url text not null,
  alt_text text,
  uploaded_by uuid,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);
