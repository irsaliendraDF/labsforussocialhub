# Lab for Us — Content Hub setup

The app runs right now without any of this: Strategy, Pillars, Brand kit, and
Templates are fully working, and the Calendar runs in preview mode (changes stay
in your browser tab). Everything below is what turns it into the shared, live
tool the whole team signs into.

Do these in order.

---

## 1. Supabase project

Create the project on the **Lab for Us account**, not a DigitalFlow one — the
team's logins and their Instagram/LinkedIn tokens should live with the client.

1. Create a new project. `ca-central-1` keeps the data in Canada.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Run `supabase/seed.sql`. That loads the 5 pillars and the 18 templates with
   their real Canva links. It deliberately does **not** create any posts — the
   calendar starts empty so the team plans their own.

Both files are safe to re-run.

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
request, which means nothing publishes. That is deliberate — a missing secret
should never mean "anyone can trigger a publish".

## 3. No login — and what that means

There's no sign-in. Anyone who opens the URL lands straight on the board, which
is the point: the team bookmarks it and starts working.

The honest trade-off: **anyone with the URL can read and edit the content
calendar.** Nothing sensitive is exposed — the Instagram and LinkedIn tokens
live in `social_accounts`, which has no RLS policies at all and is unreachable
from a browser under any key — but the plan itself is open to whoever has the
link.

If you'd rather the URL not be open to the world, turn on **Vercel Deployment
Protection** (Project → Settings → Deployment Protection → Password Protection
or Vercel Authentication). That gates the whole site at the edge with one shared
password, so the team still has no per-person login, but a stranger with the URL
can't get in. It's a one-switch change and needs nothing in the code.

## 4. Instagram and LinkedIn (the long pole)

The code is done. What takes time is platform approval, so start these early —
they run in parallel with everything else and the app is useful without them.

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

Connecting an account is not enough on its own — publishing stays behind a flag
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

- `/api/cron/publish` — every 10 minutes, drains the scheduled queue.
- `/api/cron/metrics` — daily, snapshots performance for published posts.

Both are scheduled off the hour on purpose; Vercel's cron runners are busiest at
`:00` and `:30`.

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
| `supabase/` | `schema.sql` and `seed.sql` |
| `public/brand/` | Logo, mascot, 9 squiggles, 6 dividers |

## Changing a Canva link later

Update the row in the `templates` table — no deploy needed. If a row's
`canva_url` is blank the app falls back to the design ID baked into
`src/lib/content.ts`.

## Editing the awareness-day list

`HOLIDAYS` in `src/lib/content.ts`. `off` renders tan (holiday or day off),
`aw` renders teal (worth posting for).
