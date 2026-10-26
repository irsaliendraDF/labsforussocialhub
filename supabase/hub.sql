-- ============================================================
-- Two hubs: Lab for Us and InACTS.
--
-- Run this once on an existing database, after schema.sql. Safe to re-run.
--
-- Everything that exists today was made by Lab for Us, so every column
-- defaults to 'labforus' and every existing row keeps belonging to it. A post
-- can only go out through an account of its own hub: that rule lives in
-- src/lib/publish.ts, and this file is what makes it expressible.
-- ============================================================

alter table posts
  add column if not exists hub text not null default 'labforus';
alter table social_accounts
  add column if not exists hub text not null default 'labforus';
alter table engagement_log
  add column if not exists hub text not null default 'labforus';

-- Constraints are added separately so re-running is harmless.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'posts_hub_check') then
    alter table posts add constraint posts_hub_check
      check (hub in ('labforus','inacts'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'social_accounts_hub_check') then
    alter table social_accounts add constraint social_accounts_hub_check
      check (hub in ('labforus','inacts'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'engagement_log_hub_check') then
    alter table engagement_log add constraint engagement_log_hub_check
      check (hub in ('labforus','inacts'));
  end if;
end $$;

-- The calendar reads one hub at a time, and the publish queue drains one hub
-- at a time, so both indexes lead with it.
create index if not exists posts_hub_date_idx
  on posts (hub, post_date);
create index if not exists posts_hub_queue_idx
  on posts (hub, publish_status, scheduled_at);
create index if not exists social_accounts_hub_platform_idx
  on social_accounts (hub, platform, created_at desc);

-- A sanity check for after the run: every row should report labforus.
-- select hub, count(*) from posts group by hub;
