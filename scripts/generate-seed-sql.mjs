/**
 * Generates supabase/seed_posts.sql from src/lib/launchRun.ts.
 *
 * The launch run is defined once, in TypeScript, because the app needs it at
 * runtime for preview mode. Keeping a hand-written copy of the same 19 posts
 * in SQL would drift the first time someone edited one and forgot the other,
 * so the SQL is generated instead.
 *
 *   npm run seed:sql
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src/lib/launchRun.ts");
const OUT = path.join(ROOT, "supabase/seed_posts.sql");
const INACTS_SRC = path.join(ROOT, "src/lib/inactsStarter.ts");
const INACTS_OUT = path.join(ROOT, "supabase/seed_inacts_posts.sql");

/** Pulls one exported array literal out of a TypeScript file as JSON. */
function readArray(file, decl) {
  const ts = fs.readFileSync(file, "utf8");
  const start = ts.indexOf(decl);
  if (start === -1) throw new Error(`${decl} not found in ${file}`);
  // Skip past the type annotation to the actual array literal.
  const jsonStart = ts.indexOf("[", ts.indexOf("= [", start));
  const jsonEnd = ts.indexOf("\n];", jsonStart);
  if (jsonEnd === -1) throw new Error(`could not find the end of ${decl}`);
  return JSON.parse(ts.slice(jsonStart, jsonEnd + 2));
}

const posts = readArray(SRC, "export const LAUNCH_RUN: LaunchPost[] = ");

/** Postgres escaping: a single quote is doubled. */
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

const rowsFor = (list, hub) =>
  list
    .map(
      (p) => `  (${q(hub)}, ${q(p.title)},
   ${q(p.channel)}, ${q(p.pillar)}, ${q(p.format)}, ${p.template ? q(p.template) : "NULL"},
   ${q(p.cta)}, ${q(p.owner)}, ${q(p.status)}, DATE ${q(p.post_date)},
   ${q(p.caption)},
   ${q(p.alt_text)},
   ${p.is_reshare}, ${q(p.permission_status)})`,
    )
    .join(",\n\n");

const rows = rowsFor(posts, "labforus");

const ig = posts.filter((p) => p.channel === "Instagram").length;
const li = posts.filter((p) => p.channel === "LinkedIn").length;

const sql = `-- ============================================================
-- Lab for Us launch run
--
-- GENERATED FILE. Do not edit by hand.
-- Source: src/lib/launchRun.ts   Regenerate: npm run seed:sql
--
-- ${posts.length} posts over six weeks: ${ig} Instagram, ${li} LinkedIn.
-- Every post ladders up to a pillar and carries a caption, alt text, a call
-- to action, and an owner.
--
-- Dates are real, not relative, so the awareness-day posts land on the actual
-- day and nothing falls on Labour Day (Sep 7). The rhythm is Tuesday,
-- Thursday, Friday. If the launch slips, drag the posts on the calendar.
-- Nothing here is load-bearing except the pillar mix and the cadence.
--
-- SAFETY: this only runs against an empty posts table, so it can never
-- duplicate or trample work the team has already done.
-- Run it after schema.sql and seed.sql.
-- ============================================================

insert into posts
  (hub, title, channel, pillar, format, template, cta, owner, status, post_date,
   caption, alt_text, is_reshare, permission_status)
select * from (values
${rows}
) as seed(hub, title, channel, pillar, format, template, cta, owner, status, post_date,
          caption, alt_text, is_reshare, permission_status)
where not exists (select 1 from posts where hub = 'labforus');
`;

fs.writeFileSync(OUT, sql, "utf8");
console.log(
  `Wrote ${path.relative(ROOT, OUT)}: ${posts.length} posts (${ig} Instagram, ${li} LinkedIn)`,
);

// ---------- InACTS starter month ----------

const starter = readArray(
  INACTS_SRC,
  "export const INACTS_STARTER: StarterPost[] = ",
);
const sIg = starter.filter((p) => p.channel === "Instagram").length;
const sLi = starter.filter((p) => p.channel === "LinkedIn").length;

const inactsSql = `-- ============================================================
-- InACTS starter month
--
-- GENERATED FILE. Do not edit by hand.
-- Source: src/lib/inactsStarter.ts   Regenerate: npm run seed:sql
--
-- ${starter.length} drafts across the five InACTS pillars: ${sIg} Instagram, ${sLi} LinkedIn.
-- One LinkedIn piece a week and one Instagram post a fortnight, which is the
-- cadence two busy academics can hold.
--
-- Every factual claim comes from something NSCAD, McGill or Dalhousie has
-- already published. Anything that would show a person carries
-- permission_status 'requested', because consent here is research ethics
-- before it is a content rule.
--
-- SAFETY: only runs while the InACTS side is empty, so it can never
-- duplicate or trample work already done. Run after hub.sql and
-- seed_inacts.sql.
-- ============================================================

insert into posts
  (hub, title, channel, pillar, format, template, cta, owner, status, post_date,
   caption, alt_text, is_reshare, permission_status)
select * from (values
${rowsFor(starter, "inacts")}
) as seed(hub, title, channel, pillar, format, template, cta, owner, status, post_date,
          caption, alt_text, is_reshare, permission_status)
where not exists (select 1 from posts where hub = 'inacts');
`;

fs.writeFileSync(INACTS_OUT, inactsSql, "utf8");
console.log(
  `Wrote ${path.relative(ROOT, INACTS_OUT)}: ${starter.length} posts (${sIg} Instagram, ${sLi} LinkedIn)`,
);
