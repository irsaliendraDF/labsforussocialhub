# Spec: the service blueprint inside the Social Hub

**Status:** approved by Irene, 15 September 2026. Stage 1 of 5.

## Why

Lab for Us runs one journey across three places: the Social Hub that brings people in, the Digital Library that holds the booking, and the space itself where things change hands. The service blueprint maps that journey. Today it is a standalone page on Netlify. This build brings it into the Social Hub so the team works from one app.

## Where it goes

- This repo, on the branch `service-blueprint`.
- Every push to the branch builds a Vercel preview link.
- `main` deploys the live hub at `labsforussocialhub.vercel.app`. **Nothing merges to `main` until Irene approves.**

## One source

All blueprint content lives in one typed data file, `src/lib/blueprint.ts`:

| Export | Holds |
| --- | --- |
| `MOMENTS` | The six moments in order: Reach, Sign up, Book, Arrive, Borrow and make, Return and share |
| `LAYERS` | The six layers, Physical space, User action, Digital actions, In person actions, Backstage digital actions, Support processes, and the three lines between them |
| `STEPS` | One entry per cell: moment, layer, title, detail, where it happens, owner, status, and whether a decision is still open |
| `DECISIONS` | The five decisions, what was decided, and what is still open |
| `ACCESS_TIERS` | Who gets the space, in priority order, and the mandate |
| `OUTSTANDING` | Open work, grouped, with owner and status |
| `PEOPLE` | Each person's name, role, priorities, and the steps they own |
| `BEST_PRACTICE` | For each moment, the target state in each layer and what it is waiting on |

`where` is one of `in_person`, `digital_library`, `social_hub`, `visitor` or `none`. `status` is one of `built`, `in_build`, `to_write`, `to_scope` or `written`.

This follows the convention in `src/lib/content.ts`: content that describes Lab for Us lives in code, and the database holds what the team does week to week. **Nothing is added to Supabase in this build.**

**Every page reads from this one file.** A change is made once.

## What gets added

A new sidebar group, **The space**, after Engagement, in `src/components/Sidebar.tsx`.

| Route | Page |
| --- | --- |
| `/blueprint` | Service blueprint: the diagram with zoom and pan, the decisions, who gets the space, and the outstanding list |
| `/best-practices` | The six moments as compact columns, each opening a full view |
| `/best-practices/[moment]` | One moment in full, with tabs to the others and previous and next |
| `/roles` | Everyone with a role overview |
| `/roles/[id]` | One person's overview |

Pages go under `src/app/(app)/`. The diagram is a client component in `src/components/` because zoom and pan need the browser.

## Look

- The hub's own tokens and fonts from `src/app/globals.css`: Baloo 2 for display, Inter for body, the cream ground. The standalone page's fonts do not come across.
- The diagram keeps its colour coding: green for in person, blue for the Digital Library, teal for the Social Hub, gold for the visitor's own step, and an orange star wherever a decision is still open.
- Icons match the sidebar: simple stroked glyphs.

## Role overviews

Built from `PEOPLE` and the steps each person owns. Each shows the role, the priorities, the owned steps grouped by moment, and what that person is waiting on.

The first three are **Anissa, Kirsty and Diane**.

- **Diane's role is not yet recorded.** Her overview shows the slot empty until it is filled.
- **Kirsty owns no step on the blueprint.** Workshops and engagement are not one of the six moments, so her priorities are written into `PEOPLE` directly until workshops get a journey of their own.

## Build for the people in the space

From the review with April and Shakara, 14 September 2026. This is the brief for every page:

- Simple enough that nobody goes back to paper, and specific enough that nobody reinvents it
- Visual, scoped to one person's job, and visibly connected to the larger process
- No duplicated work: everything builds on something else
- Give people what they need to finish their own job, not the whole picture at once

## Not in this build

Shakara's and April's own social hubs. File management. The FAQ. A weekly email. Editing the blueprint in the browser: for now a change is an edit to `src/lib/blueprint.ts`.

## Stages

Each stage is approved on its preview link before the next one starts.

1. This spec, on the branch. No visible change.
2. `src/lib/blueprint.ts` and the Service blueprint page.
3. Best practices.
4. Roles.
5. Merge to `main`. Then point April and Shakara at the hub and retire the Netlify page.

## Before writing code

This repo runs Next.js 16.3.1, and `AGENTS.md` warns that its APIs differ from older versions. **Read the relevant guides in `node_modules/next/dist/docs/01-app/` first**, especially routing, dynamic routes and client components.

## Checks at every stage

- `npm run build` passes locally
- No existing page changes
- No text in the diagram runs outside its box
- No em dashes in any page copy
- Irene reviews the preview link before the next stage starts

## Source content

The current blueprint, live at `https://labsforusserviceblueprint.netlify.app/`.
