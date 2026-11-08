import type { Post } from "./types";

/**
 * The InACTS starter month: six drafts across the five pillars.
 *
 * Built to the proposed cadence, one LinkedIn piece a week and one Instagram
 * post a fortnight, which is what two busy academics can hold. Everything
 * here is a draft for April and Shakara to edit or throw out, and every
 * factual claim comes from something already published by NSCAD, McGill or
 * Dalhousie, so nothing waits on a meeting to be checked.
 *
 * Where a piece would show a person, `permission_status` is "requested"
 * rather than "not_needed". Working with newcomer young people, consent is
 * research ethics before it is a content rule, and the scheduler already
 * refuses to publish a reshare without it.
 *
 * Same arrangement as the Lab for Us launch run: THIS FILE IS THE SOURCE OF
 * TRUTH and `supabase/seed_inacts_posts.sql` is generated from it by
 * `npm run seed:sql`.
 */
export type StarterPost = {
  title: string;
  channel: "Instagram" | "LinkedIn";
  pillar: string;
  format: string;
  cta: string;
  owner: string;
  status: "Idea";
  post_date: string;
  caption: string;
  alt_text: string;
  is_reshare: boolean;
  permission_status: "not_needed" | "requested" | "granted" | "declined";
};

export const INACTS_STARTER: StarterPost[] = [
  {
    "title": "What InACTS is, in one paragraph",
    "channel": "LinkedIn",
    "pillar": "In the open",
    "format": "Plain language explainer",
    "cta": "Follow the page",
    "owner": "April",
    "status": "Idea",
    "post_date": "2026-11-02",
    "caption": "InACTS is the Institute for Art, Community and Transdisciplinary Studies, a street level space at 1871 Granville in Halifax, and part of NSCAD University. We exist to connect the university directly with communities that institutions have usually kept outside: newcomers, racialized communities and young people. What happens here is research talks, skills sharing, method building and screenings, and everything that happens here has to involve people from beyond the university. If that sounds like a room you have been looking for, say hello.",
    "alt_text": "The InACTS name in plain capitals on a white background, with the full institute name beneath it.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Who is a library actually for?",
    "channel": "Instagram",
    "pillar": "In public",
    "format": "Carousel, five cards",
    "cta": "Read the research",
    "owner": "April",
    "status": "Idea",
    "post_date": "2026-11-04",
    "caption": "A library is one of the last places you can be without buying anything. It holds books, and it also holds people waiting out the cold, teenagers with nowhere else, and families new to a country learning how it works. Our Canada Research Chair asks what happens when young newcomers get to shape those spaces themselves rather than be served by them. Five cards on what we are asking, and why we are asking it in a library.",
    "alt_text": "Five plain white cards with black text, each carrying one question about who public libraries are designed for.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Asset based, in practice",
    "channel": "LinkedIn",
    "pillar": "In practice",
    "format": "Method note",
    "cta": "Comment with your own",
    "owner": "April",
    "status": "Idea",
    "post_date": "2026-11-09",
    "caption": "Asset based is easy to write in a grant and hard to do in a room. In practice it changes the first question. Not what does this group lack, which puts us in charge of filling it, but what is already here, which puts them in charge of using it. The second question is slower and it gets better work. It also makes the research harder to write up, because what you learn is not the thing you planned to measure. We would rather have that problem.",
    "alt_text": "Black text on white reading, what is already here, above a thin rule.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Halifax Fashion Heart, and the people who made it",
    "channel": "LinkedIn",
    "pillar": "In company",
    "format": "Partner credit",
    "cta": "Meet the partners",
    "owner": "Shakara",
    "status": "Idea",
    "post_date": "2026-11-16",
    "caption": "Halifax Fashion Heart is an intergenerational fashion incubator for newcomers who arrive here already carrying fashion and textile skill, and it put work on the runway at Halifax Fashion Week. It exists because of the people who built it with us: Soli Productions, TD Link Up and Youth Art Connection. Naming partners is not a courtesy. A project like this is held up by relationships that long predate the funding, and the record should say so.",
    "alt_text": "A garment made in the Halifax Fashion Heart programme, photographed on a plain background.",
    "is_reshare": false,
    "permission_status": "requested"
  },
  {
    "title": "For Us by Us: what the picture books taught us",
    "channel": "Instagram",
    "pillar": "In evidence",
    "format": "Carousel, four cards",
    "cta": "Read the project page",
    "owner": "April",
    "status": "Idea",
    "post_date": "2026-11-18",
    "caption": "For Us by Us is a project where children and young people with refugee experience, aged seven to eighteen, make and publish their own picture books. Not books about them. Books by them, in the words and pictures they choose. What came out of it is the thing we keep returning to: given the materials and the time, young people tell a more complicated story about their own lives than anyone tells on their behalf. Four cards on what we learned.",
    "alt_text": "Four plain cards showing spreads from picture books made by young people, with faces not shown.",
    "is_reshare": false,
    "permission_status": "requested"
  },
  {
    "title": "Working with us",
    "channel": "LinkedIn",
    "pillar": "In the open",
    "format": "Invitation",
    "cta": "Get in touch",
    "owner": "Shakara",
    "status": "Idea",
    "post_date": "2026-11-23",
    "caption": "If you run a community organisation and you are wondering whether there is something here for you, this is what working with InACTS looks like. You get a street level space, people who build methods with you rather than on you, and a university connection that does not require you to speak university. We ask for three things in return: that the work is useful to your community first, that the people in it are credited as makers, and that we are honest with each other about time. If that sounds workable, get in touch.",
    "alt_text": "Black text on white reading, working with us, above the InACTS address at 1871 Granville Street.",
    "is_reshare": false,
    "permission_status": "not_needed"
  }
];

/** Preview-mode rows, with stable ids so React keys do not move. */
export function inactsStarterAsPosts(): Post[] {
  const now = new Date().toISOString();
  return INACTS_STARTER.map((p, i) => ({
    id: `inacts-starter-${i + 1}`,
    hub: "inacts",
    title: p.title,
    channel: p.channel,
    pillar: p.pillar,
    format: p.format,
    template: null,
    cta: p.cta,
    owner: p.owner,
    status: p.status,
    post_date: p.post_date,
    canva_link: null,
    caption: p.caption,
    scheduled_at: null,
    publish_status: "draft",
    platform_post_id: null,
    published_at: null,
    published_url: null,
    publish_error: null,
    notes: null,
    link_url: null,
    tracked_url: null,
    alt_text: p.alt_text,
    is_reshare: p.is_reshare,
    permission_status: p.permission_status,
    permission_source: null,
    permission_note: null,
    permission_recorded_at: null,
    created_at: now,
    updated_at: now,
  })) as Post[];
}
