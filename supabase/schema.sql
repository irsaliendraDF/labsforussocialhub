-- ============================================================
-- Lab for Us Content Hub schema
-- Run this once in the Supabase SQL editor, then run seed.sql.
-- ============================================================

-- ---------- Tables ----------

create table if not exists pillars (
  name        text primary key,
  color       text not null,
  description text,
  sort_order  int
);

create table if not exists templates (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  pillar      text not null,
  description text,
  canva_url   text,
  sort_order  int default 0
);

create table if not exists posts (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  channel        text not null check (channel in ('Instagram','LinkedIn')),
  pillar         text not null,
  format         text,
  template       text,
  cta            text,
  owner          text,
  status         text not null default 'Idea'
                 check (status in ('Idea','Drafting','Ready','Scheduled','Posted')),
  post_date      date not null,
  canva_link     text,
  caption        text,
  -- scheduling / execution
  scheduled_at     timestamptz,
  publish_status   text default 'draft'
                   check (publish_status in ('draft','scheduled','publishing','published','failed')),
  platform_post_id text,
  published_at     timestamptz,
  published_url    text,
  publish_error    text,
  notes            text,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

create table if not exists social_accounts (
  id                  uuid primary key default gen_random_uuid(),
  platform            text not null check (platform in ('Instagram','LinkedIn')),
  display_name        text,
  external_account_id text,
  access_token        text,   -- service-role only; never selected client-side
  refresh_token       text,
  token_expires_at    timestamptz,
  connected_by        text,
  created_at          timestamptz default now()
);

create table if not exists post_metrics (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid references posts(id) on delete cascade,
  captured_at timestamptz default now(),
  impressions int,
  reach       int,
  likes       int,
  comments    int,
  saves       int,
  shares      int,
  clicks      int,
  raw         jsonb
);

-- ---------- Indexes ----------
-- The calendar filters by date; the scheduler polls the due queue; analytics
-- reads the newest capture per post.

create index if not exists posts_post_date_idx      on posts (post_date);
create index if not exists posts_publish_queue_idx  on posts (publish_status, scheduled_at);
create index if not exists metrics_post_recent_idx  on post_metrics (post_id, captured_at desc);

-- ---------- updated_at trigger ----------

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- ---------- Realtime ----------
-- This is what makes the board a shared, live source of truth.

alter table posts replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'posts'
  ) then
    alter publication supabase_realtime add table posts;
  end if;
end
$$;

-- ---------- Row Level Security ----------
--
-- This hub has NO login: it's an internal tool the team opens from a bookmark,
-- so the browser talks to Postgres with the anon key. Policies therefore grant
-- the board to `anon` as well as `authenticated`.
--
-- The consequence, stated plainly: anyone who has the URL and the anon key can
-- read and edit the content calendar. That is an accepted trade for this tool.
-- Keep the deployment itself private (Vercel Deployment Protection) if the URL
-- shouldn't be open to the world.
--
-- What is NOT exposed this way: social_accounts (OAuth tokens) has no policies
-- at all, and post_metrics is read-only. Neither can be written from a browser.

alter table posts           enable row level security;
alter table templates       enable row level security;
alter table pillars         enable row level security;
alter table social_accounts enable row level security;
alter table post_metrics    enable row level security;

-- posts: the shared board, fully editable by anyone using the hub.
drop policy if exists "team reads posts"   on posts;
drop policy if exists "team writes posts"  on posts;
drop policy if exists "team updates posts" on posts;
drop policy if exists "team deletes posts" on posts;

create policy "team reads posts"   on posts for select to anon, authenticated using (true);
create policy "team writes posts"  on posts for insert to anon, authenticated with check (true);
create policy "team updates posts" on posts for update to anon, authenticated using (true) with check (true);
create policy "team deletes posts" on posts for delete to anon, authenticated using (true);

-- templates + pillars: read-only from the app, edited by an admin in Supabase.
drop policy if exists "team reads templates" on templates;
drop policy if exists "team reads pillars"   on pillars;

create policy "team reads templates" on templates for select to anon, authenticated using (true);
create policy "team reads pillars"   on pillars   for select to anon, authenticated using (true);

-- post_metrics: readable by the app, written only by the metrics job
-- (service role bypasses RLS, so no write policy is granted here).
drop policy if exists "team reads metrics" on post_metrics;
create policy "team reads metrics" on post_metrics for select to anon, authenticated using (true);

-- social_accounts: NO policies at all. The table holds access tokens, so it is
-- unreachable from the browser under any role. Only the service-role key,
-- used server-side in the connect callback and the publish/metrics jobs, can
-- touch it, and the Scheduler page projects away the token columns.
