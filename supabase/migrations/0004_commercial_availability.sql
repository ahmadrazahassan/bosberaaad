alter table public.software
  alter column price_vat_inclusive drop not null,
  alter column price_vat_inclusive drop default;

alter table public.software
  add column if not exists demo_available boolean not null default false,
  add column if not exists demo_url text,
  add column if not exists trial_note text;
