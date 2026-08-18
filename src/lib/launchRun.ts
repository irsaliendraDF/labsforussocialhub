import type { Post } from "./types";

/**
 * The launch run: six weeks of content built to the agreed strategy.
 *
 * Instagram two to three a week, LinkedIn one a week, every post against a
 * pillar and carrying a caption, alt text, a call to action, and an owner.
 * Dates are real so the awareness-day posts land on their actual day and
 * nothing falls on Labour Day.
 *
 * THIS FILE IS THE SOURCE OF TRUTH. `supabase/seed_posts.sql` is generated
 * from it by `npm run seed:sql`, so the two can never drift. Edit here, then
 * regenerate.
 *
 * It is used in two places:
 *   1. generated into the SQL seed, which loads it into a real database
 *   2. shown on the calendar in preview mode, so the plan is visible before
 *      Supabase is connected
 */
export type LaunchPost = {
  title: string;
  channel: "Instagram" | "LinkedIn";
  pillar: string;
  format: string;
  template: string;
  cta: string;
  owner: string;
  status: "Idea";
  post_date: string;
  caption: string;
  alt_text: string;
  is_reshare: boolean;
  permission_status: "not_needed" | "requested" | "granted" | "declined";
};

export const LAUNCH_RUN: LaunchPost[] = [
  {
    "title": "Introducing Lab for Us",
    "channel": "LinkedIn",
    "pillar": "For Us",
    "format": "Launch announcement",
    "template": "Launch announcement",
    "cta": "Visit the site",
    "owner": "Irene",
    "status": "Idea",
    "post_date": "2026-08-19",
    "caption": "Something new is opening in the neighbourhood. Lab for Us is a space for art, community, creativity, and collaboration, built for the people usually left outside those rooms. Cameras, audio kit, editing software, studio time: all of it bookable, none of it gatekept. More soon. #MadeAtLabForUs #labforus",
    "alt_text": "The Lab for Us logo, a stacked colourful wordmark, on a cream background.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "We are open: meet the Digital Library",
    "channel": "Instagram",
    "pillar": "For Us",
    "format": "Launch announcement",
    "template": "Launch announcement",
    "cta": "Sign up",
    "owner": "Ivy",
    "status": "Idea",
    "post_date": "2026-08-21",
    "caption": "We are open. The Digital Library is the catalogue of everything you can borrow or book here: cameras, audio kit, editing software, studio and workshop time. Sign up, see what is free, reserve it. That is the whole thing. #MadeAtLabForUs #labforus",
    "alt_text": "The Lab for Us logo above the words Digital Library, with brand squiggles in orange and blue.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "A walk through the space",
    "channel": "Instagram",
    "pillar": "The space and its tools",
    "format": "Day in the life",
    "template": "Behind the scenes",
    "cta": "Book the space",
    "owner": "Zack and Adrian",
    "status": "Idea",
    "post_date": "2026-08-25",
    "caption": "Come in and have a look around. Here is the studio, the edit bay, the kit shelf, and the big table where most of the good ideas actually happen. Doors are open. #MadeAtLabForUs #labforus",
    "alt_text": "A wide view of the Lab for Us studio with equipment shelves and a large shared work table.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "How to book the space in a few taps",
    "channel": "Instagram",
    "pillar": "Access and how it works",
    "format": "Tip or how-to",
    "template": "Tip / how-to",
    "cta": "Book the space",
    "owner": "Ivy",
    "status": "Idea",
    "post_date": "2026-08-27",
    "caption": "Booking takes about a minute. Open the Digital Library, pick what you need, choose your time, done. No membership, no deposit, no phone call. If you get stuck, message us and a human will answer. #MadeAtLabForUs #labforus",
    "alt_text": "A phone screen showing the Lab for Us booking flow, with a finger tapping a time slot.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "What the Digital Library actually holds",
    "channel": "LinkedIn",
    "pillar": "The space and its tools",
    "format": "Tip or how-to",
    "template": "Carousel: how-to",
    "cta": "Explore the library",
    "owner": "Irene",
    "status": "Idea",
    "post_date": "2026-08-28",
    "caption": "People keep asking what is in the Digital Library, so here it is in plain terms: cameras and lenses, audio recorders and mics, lighting, editing software, and bookable studio and workshop time. Everything is listed with what it does and who it suits, because equipment lists written for experts keep beginners out.",
    "alt_text": "A carousel cover reading What is in the Digital Library, with icons for camera, microphone, and laptop.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "The questions we get asked most",
    "channel": "Instagram",
    "pillar": "Access and how it works",
    "format": "Tip or how-to",
    "template": "Carousel: common questions",
    "cta": "Explore the library",
    "owner": "Ivy",
    "status": "Idea",
    "post_date": "2026-09-01",
    "caption": "Do I need experience? No. Does it cost anything? No. Can I come on my own? Yes. Can I just look around first? Also yes. Swipe for the rest, and if your question is not here, ask us. #MadeAtLabForUs #labforus",
    "alt_text": "A carousel cover reading Questions we get asked most, in bold rounded type on cream.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Maker spotlight",
    "channel": "Instagram",
    "pillar": "People and community",
    "format": "Maker spotlight",
    "template": "Maker spotlight",
    "cta": "Explore the library",
    "owner": "Zack and Adrian",
    "status": "Idea",
    "post_date": "2026-09-03",
    "caption": "Meet someone who has been making things here since week one. Swap the name, the photo, and the quote before this goes out. Ask them what they made and what they would tell someone nervous about walking in. #MadeAtLabForUs #labforus",
    "alt_text": "A portrait of a Lab for Us member in the studio, with their name and a short quote alongside.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Who is behind the space",
    "channel": "LinkedIn",
    "pillar": "People and community",
    "format": "Maker spotlight",
    "template": "Maker spotlight",
    "cta": "Visit the site",
    "owner": "Irene",
    "status": "Idea",
    "post_date": "2026-09-04",
    "caption": "The facilitators are the reason this works. They are the ones who show someone how to hold a camera without making them feel small, and who remember your name the second time you come in. Worth naming them properly here.",
    "alt_text": "A facilitator helping a member set up a camera on a tripod in the Lab for Us studio.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Thursday group night",
    "channel": "Instagram",
    "pillar": "People and community",
    "format": "Story takeover",
    "template": "Hashtag lockup",
    "cta": "Follow",
    "owner": "Zack and Adrian",
    "status": "Idea",
    "post_date": "2026-09-10",
    "caption": "Group night. Bring whatever you are working on or bring nothing at all and just see what everyone else is up to. Same time every week. #MadeAtLabForUs #labforus",
    "alt_text": "A sticker-style hashtag lockup reading Made At Lab For Us over a photo of a busy studio evening.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Made here: work from the community",
    "channel": "Instagram",
    "pillar": "Made here",
    "format": "Community reshare",
    "template": "Community reshare frame",
    "cta": "Book the space",
    "owner": "Ivy",
    "status": "Idea",
    "post_date": "2026-09-15",
    "caption": "Made here. Ask permission before this goes out and credit the maker in the first line of the caption. #MadeAtLabForUs #labforus",
    "alt_text": "A branded frame around a piece of member work, with the maker credited underneath.",
    "is_reshare": true,
    "permission_status": "requested"
  },
  {
    "title": "International Literacy Day",
    "channel": "Instagram",
    "pillar": "For Us",
    "format": "Mission or quote",
    "template": "Mission / quote",
    "cta": "Explore the library",
    "owner": "Ivy",
    "status": "Idea",
    "post_date": "2026-09-08",
    "caption": "Literacy is not only reading and writing. It is being able to tell your own story in whatever form fits you, and having the tools to do it. That is most of why this space exists. #MadeAtLabForUs #labforus",
    "alt_text": "Type-led design reading Everyone deserves the tools to tell their own story, with brand squiggles.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Why a community model",
    "channel": "LinkedIn",
    "pillar": "For Us",
    "format": "Mission or quote",
    "template": "LinkedIn post",
    "cta": "Visit the site",
    "owner": "Irene",
    "status": "Idea",
    "post_date": "2026-09-11",
    "caption": "A shared equipment library works for a reason that is easy to miss: the barrier to creative work is almost never talent, it is access. One camera used by forty people does more good than forty people each deciding they cannot afford one. That is the whole model.",
    "alt_text": "Type-led design reading Access, not talent, is the barrier, in bold rounded type.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Our first workshop",
    "channel": "Instagram",
    "pillar": "People and community",
    "format": "Tip or how-to",
    "template": "Workshop or class",
    "cta": "Sign up",
    "owner": "Zack and Adrian",
    "status": "Idea",
    "post_date": "2026-09-17",
    "caption": "First workshop is on the calendar. No experience needed, everything provided, and you will leave having actually made something. Spaces are limited so grab one. #MadeAtLabForUs #labforus",
    "alt_text": "A workshop announcement card with the date, time, and title in bold rounded type.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Call for submissions",
    "channel": "Instagram",
    "pillar": "People and community",
    "format": "Community reshare",
    "template": "Call for submissions",
    "cta": "Explore the library",
    "owner": "Ivy",
    "status": "Idea",
    "post_date": "2026-09-22",
    "caption": "Made something here? We want to show it. Tag us or use #MadeAtLabForUs and we will ask before we share anything. #labforus",
    "alt_text": "A call for submissions card inviting members to share work made at the space.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "What lowering the barrier actually looks like",
    "channel": "LinkedIn",
    "pillar": "Access and how it works",
    "format": "Tip or how-to",
    "template": "LinkedIn post",
    "cta": "Book the space",
    "owner": "Irene",
    "status": "Idea",
    "post_date": "2026-09-18",
    "caption": "Free is not the same as accessible. A space can charge nothing and still be intimidating: jargon on the equipment list, a booking form that assumes you know what you need, hours that only suit people without shift work. We have tried to design those barriers out rather than apologise for them later. Still learning, and still listening.",
    "alt_text": "Type-led design reading Free is not the same as accessible, in bold rounded type on cream.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Truth and Reconciliation Day",
    "channel": "Instagram",
    "pillar": "For Us",
    "format": "Mission or quote",
    "template": "Hours or closure notice",
    "cta": "Follow",
    "owner": "Irene",
    "status": "Idea",
    "post_date": "2026-09-30",
    "caption": "We are closed today for the National Day for Truth and Reconciliation. Please take the time to listen to Survivors and to learn whose land you are on. We will share local ways to do that in our stories.",
    "alt_text": "A quiet notice card in muted brand tones marking the National Day for Truth and Reconciliation.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "What has happened since we opened",
    "channel": "LinkedIn",
    "pillar": "For Us",
    "format": "Mission or quote",
    "template": "LinkedIn post",
    "cta": "Visit the site",
    "owner": "Irene",
    "status": "Idea",
    "post_date": "2026-10-02",
    "caption": "Six weeks in, here is what has actually happened. Fill in the real numbers before this goes out: people signed up, bookings made, workshops run, and one thing somebody made that we could not have predicted. Early proof matters more than polish.",
    "alt_text": "Type-led design with space for early milestone numbers from the first six weeks.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "Thank you to the people who made this possible",
    "channel": "Instagram",
    "pillar": "For Us",
    "format": "Community reshare",
    "template": "Thank a partner",
    "cta": "Follow",
    "owner": "Ivy",
    "status": "Idea",
    "post_date": "2026-10-06",
    "caption": "None of this happens on its own. Thank you to the partners and funders who backed a space like this before there was anything to see. Tag them properly when this goes out. #MadeAtLabForUs #labforus",
    "alt_text": "A thank you card with space for partner and funder logos.",
    "is_reshare": false,
    "permission_status": "not_needed"
  },
  {
    "title": "A day in the life",
    "channel": "Instagram",
    "pillar": "The space and its tools",
    "format": "Day in the life",
    "template": "Day in the life cover",
    "cta": "Sign up",
    "owner": "Zack and Adrian",
    "status": "Idea",
    "post_date": "2026-09-24",
    "caption": "One ordinary day here, start to finish. Doors open, kit goes out, someone learns something, someone finishes a thing they have been chipping at for weeks. Come see it. #MadeAtLabForUs #labforus",
    "alt_text": "A bold title card reading A day in the life at Lab for Us over a photo of the studio.",
    "is_reshare": false,
    "permission_status": "not_needed"
  }
];

/**
 * Preview-mode rows. Ids are deterministic so React keys stay stable, and the
 * publish fields are blank because nothing here has gone anywhere yet.
 */
export function launchRunAsPosts(): Post[] {
  const now = new Date().toISOString();
  return LAUNCH_RUN.map((p, i) => ({
    id: `launch-${i + 1}`,
    title: p.title,
    channel: p.channel,
    pillar: p.pillar,
    format: p.format,
    template: p.template,
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
