-- ArtificialMinded Owner Test leads, with the consent record from the GDPR baseline
-- (rik-docs 02_projects/_audits/2026-05-27-email-gdpr-compliance/templates/consent-log-schema.sql).
-- Not applied anywhere yet. Rik picks the Supabase project and runs it.

create table if not exists am_leads (
  id                    uuid primary key default gen_random_uuid(),
  email                 text not null,
  -- consent record (Art. 7)
  consent_text          text not null,
  consent_version       text not null,
  consent_ip            text,
  consent_user_agent    text,
  consent_source_url    text,
  consented_at          timestamptz not null,
  marketing_consent     boolean not null default false,
  -- lifecycle
  created_at            timestamptz not null default now(),
  unsubscribed_at       timestamptz,
  unsubscribe_token     text unique default encode(gen_random_bytes(24), 'hex'),
  deletion_requested_at timestamptz,
  -- test payload
  source                text not null default 'owner-test',
  role_tag              text,
  team_size             text,
  result                text,
  answers               jsonb
);

create index if not exists am_leads_email_lower on am_leads (lower(email));

create table if not exists am_deletion_requests (
  token        text primary key,
  email        text not null,
  expires_at   timestamptz not null,
  completed_at timestamptz,
  created_at   timestamptz not null default now()
);

-- Only the server (service role) touches these tables.
alter table am_leads enable row level security;
alter table am_deletion_requests enable row level security;
