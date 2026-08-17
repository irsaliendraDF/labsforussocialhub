# Lab for Us — Content Hub

The internal tool the Lab for Us team signs into to **plan, execute, and
measure** social content: plan posts, jump to the right Canva template, schedule
and publish to Instagram and LinkedIn, and see how each post performed — with
everyone looking at the same live board.

Built from the approved `Lab_for_Us_Content_Hub.html` prototype. The branding is
carried over unchanged; this is a re-layout into an app shell, not a restyle.

## The loop

1. Open the app (bookmarked on the Lab for Us laptops).
2. **Plan a post**: pick a channel, a pillar, and a template, set a date.
3. Open that exact template in Canva, make a copy, edit, paste the link back.
4. Move the post through Idea → Drafting → Ready → Scheduled → Posted.
5. Schedule or publish it from the **Scheduler**.
6. See how it did in **Analytics**.

Everyone sees the board update live.

## Structure

**Strategy** — Overview, Pillars, Brand kit (tap-to-copy swatches, the element
gallery, and the kit download).
**Content** — Templates (all 18, each deep-linking to its real Canva design),
Calendar (calendar / list / kanban, drag to reschedule, drag between stages),
Scheduler (connect accounts, queue, retry).
**Engagement** — Analytics (per-post performance, rolled up by pillar, format,
and channel).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Supabase (Postgres, Realtime)
· Vercel + Vercel Cron.

No CSS framework — `src/app/globals.css` carries the prototype's tokens and
component styles verbatim.

## Setup

See **[SETUP.md](SETUP.md)**. The app runs without Supabase: the strategy pages
are fully working and the Calendar runs in preview mode until you connect it.

```bash
npm install
npm run dev     # http://localhost:3100
```

## Design system

Do not restyle. Tokens live in `:root` in `src/app/globals.css`.

```
Orange     #f46129     Blue        #3d3bf5
Gold       #edb919     Green       #2a6a12
Periwinkle #9191ea     Teal        #5ce1e6
Raspberry  #db385a
Ink (text) #221f19     Muted text  #6a6155
Cream (bg) #faf6ea     Card        #fffdf7
Border     #ece4d2     Amber label #b07d2a
```

Baloo 2 (700–800) for headings, Inter (400–600) for body and UI. Pillar colours
carry through every surface: calendar chips, kanban cards, template bands, and
the analytics rollups.

## Security notes

- **There is no login.** The team opens a bookmark and starts working, so the
  browser talks to Postgres with the anon key and the RLS policies grant the
  board to `anon`. Anyone with the URL can read and edit the calendar. To keep
  the URL itself private without adding per-person logins, switch on Vercel
  Deployment Protection — see SETUP.md.
- `social_accounts` holds OAuth tokens and has **no RLS policies at all** — it is
  unreachable from the browser under any role. Only server-side code holding the
  service-role key touches it, and the Scheduler page projects the token columns
  away before rendering.
- The connect flows use a random, single-use, httpOnly-cookie-backed OAuth
  `state` for CSRF protection, since there's no session to derive it from.
- Publishing and metrics run server-side only.
- Cron endpoints authenticate with `CRON_SECRET` and refuse every request if it
  isn't set.
- Direct posting additionally sits behind `INSTAGRAM_PUBLISHING_ENABLED` /
  `LINKEDIN_PUBLISHING_ENABLED`, so an unapproved app falls back to the manual
  path instead of failing quietly.
