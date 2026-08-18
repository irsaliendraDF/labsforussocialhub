# Lab for Us Content Hub setup

The app runs right now without any of this. Strategy, Content Pillars, and
Brand kit are fully working, and the Calendar runs in preview mode showing the
planned launch run, so you can see and click the whole thing before a database
exists. Changes in preview mode stay in your browser tab and are lost on
reload. Everything below is what turns it into the shared, live tool.

Do these in order.

---

## 1. Supabase project

Create the project on the **Lab for Us account**, not a DigitalFlow one. The
team's logins and their Instagram/LinkedIn tokens should live with the client.

1. Create a new project. `ca-central-1` keeps the data in Canada.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Run `supabase/seed.sql`. That loads the 5 pillars and the 18 templates with
   their real Canva links.
4. Run `supabase/seed_posts.sql`. That loads a six-week launch run built to the
   agreed cadence: Instagram two to three a week, LinkedIn one a week, every
   post against a pillar with a caption, alt text, a call to action, and an
   owner. Skip this step if the team would rather start from a blank calendar.

All three files are safe to re-run. `seed_posts.sql` only fires against an
empty `posts` table, so it can never duplicate or overwrite real work.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the Supabase values from
**Project settings → API**:

```bash
cp .env.example .env.local
```

| Variable | Where it comes from |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project settings → API → anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Project settings → API → service_role. **Server-only, never commit it** |
| `CRON_SECRET` | Any long random string you invent |

Set the same four in Vercel under **Settings → Environment Variables**.

`CRON_SECRET` matters: without it the `/api/cron/*` endpoints reject every
request, which means nothing publishes. That is deliberate: a missing secret
should never mean "anyone can trigger a publish".

## 3. No login, and what that means

There's no sign-in. Anyone who opens the URL lands straight on the board, which
is the point: the team bookmarks it and starts working.

The honest trade-off: **anyone with the URL can read and edit the content
calendar.** Nothing sensitive is exposed (the Instagram and LinkedIn tokens
live in `social_accounts`, which has no RLS policies at all and is unreachable
from a browser under any key), but the plan itself is open to whoever has the
link.

If you'd rather the URL not be open to the world, turn on **Vercel Deployment
Protection** (Project → Settings → Deployment Protection → Password Protection
or Vercel Authentication). That gates the whole site at the edge with one shared
password, so the team still has no per-person login, but a stranger with the URL
can't get in. It's a one-switch change and needs nothing in the code.

## 4. Instagram and LinkedIn (the long pole)

The code is done. What takes time is platform approval, so start these early.
They run in parallel with everything else and the app is useful without them.

**Instagram**

- An Instagram **Business or Creator** account (@labforus) linked to a Facebook Page.
- A Meta app with `instagram_content_publish` and `instagram_manage_insights`.
- Meta **App Review** for those permissions.
- Set `META_APP_ID` and `META_APP_SECRET`.
- Add `https://<your-url>/api/connect/instagram/callback` as a valid OAuth redirect URI.

**LinkedIn**

- The Lab for Us LinkedIn **Page**.
- A LinkedIn app approved into the **Community Management API**.
- Set `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`.
- Add `https://<your-url>/api/connect/linkedin/callback` as a redirect URL.

Then hit **Connect** on the Scheduler page for each.

### Turning direct posting on

Connecting an account is not enough on its own: publishing stays behind a flag
so an un-approved app can't fail silently in front of the team:

```
INSTAGRAM_PUBLISHING_ENABLED=true
LINKEDIN_PUBLISHING_ENABLED=true
```

Flip each one the day that platform approves the app. Until then the Scheduler
uses the manual fallback: posts still schedule, still appear in the queue when
they're due with caption and design ready, and someone posts them by hand (or
via Canva's Content Planner) and hits **Mark posted**. Nothing ever claims to
have published when it hasn't.

## 5. Deploy

```bash
npx vercel --prod
```

`vercel.json` already registers the two cron jobs:

- `/api/cron/publish`: daily at 13:09 UTC (about 10:09am in Halifax), drains
  the scheduled queue.
- `/api/cron/metrics`: daily at 07:23 UTC, snapshots performance for published
  posts.

Both are scheduled off the hour on purpose; Vercel's cron runners are busiest at
`:00` and `:30`.

### Why daily, and what it means for scheduling

**Vercel's Hobby plan only permits daily crons**, and allows two of them, which is exactly what this uses. So the publish queue is swept once a day rather than
continuously.

The practical consequence: **a post scheduled for 2pm does not go out at 2pm.**
It goes out on the next sweep after that time. Schedule something for this
afternoon and it leaves tomorrow morning. The Scheduler says this on screen:
each queued post shows both "Set for" and "Goes out", so nobody has to hold it
in their head.

If Lab for Us later wants posts to leave at the minute they were planned for,
that's a Vercel Pro upgrade, then change the `publish` cron in `vercel.json` to
something like `7,17,27,37,47,57 * * * *` and update
`PUBLISH_RUN_UTC_HOUR`/`MINUTE` in `src/lib/schedule.ts`. No other code changes.

---

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3100.

## Where things live

| Path | What it is |
| --- | --- |
| `src/app/(app)/` | The seven pages behind the left-nav shell |
| `src/lib/content.ts` | Pillars, formats, templates + Canva IDs, holidays |
| `src/lib/providers/` | The publish seam: Instagram, LinkedIn, manual fallback |
| `src/lib/publish.ts` | The publish runner used by both the UI and the cron job |
| `src/lib/metrics.ts` | The daily metrics job |
| `src/lib/launchRun.ts` | The launch run. **Source of truth**, run `npm run seed:sql` after editing |
| `src/lib/utm.ts` | Link tagging, and where each call to action points |
| `src/lib/schedule.ts` | When the daily publish sweep runs |
| `supabase/` | `schema.sql`, `seed.sql`, and `seed_posts.sql` |
| `public/brand/` | Logo, mascot, 9 squiggles, 6 dividers |

## Changing a Canva link later

Update the row in the `templates` table. No deploy needed. If a row's
`canva_url` is blank the app falls back to the design ID baked into
`src/lib/content.ts`.

## Editing the awareness-day list

`HOLIDAYS` in `src/lib/content.ts`. `off` renders tan (holiday or day off),
`aw` renders teal (worth posting for).

## Link tracking

Every post can carry a destination link, and the hub tags it automatically:
`utm_source` is the channel, `utm_medium` is always `social`,
`utm_campaign` is the pillar, and `utm_content` identifies the post. The
finished link is stored on the post rather than rebuilt on the fly, so a link
that has already gone out never changes underneath you.

Where each call to action points is set in `CTA_DESTINATIONS` in
`src/lib/utm.ts`. **Update those URLs once the real pages exist**, they are
currently sensible guesses against labforus.ca. Every tagged link is listed
together under Analytics, so checking a campaign is one place to look.

## Reshare permission

A post marked as resharing someone else's work cannot be scheduled or published
until permission is recorded as granted. The block is enforced in the scheduling
action and again in the publish runner, so it holds whether the post is
scheduled by hand or picked up by cron. This is deliberate: the "Made here"
pillar reposts work by community members, often young people, and consent
should be recorded rather than remembered.

## Alt text

Every post has an alt text field, passed to Instagram when the media container
is created. LinkedIn posts are text-only in this build, so alt text has nowhere
to travel there yet; adding image posts to LinkedIn is where that would change.
Access is one of the five pillars, so an image without a description is treated
as an unfinished post, not a nitpick.

## Editing the launch run

The 19 launch posts are defined once, in `src/lib/launchRun.ts`. The app reads
them for preview mode, and `supabase/seed_posts.sql` is generated from them:

```bash
npm run seed:sql
```

Edit the TypeScript, regenerate, commit both. The SQL is marked as generated so
nobody hand-edits it and watches the two drift apart.
