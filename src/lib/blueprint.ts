/**
 * The Lab for Us service blueprint.
 *
 * One journey across three places: the Social Hub that brings people in, the
 * Digital Library that holds the booking, and the space itself where things
 * change hands. This file is the single source for the Service blueprint page,
 * and later for Best practices and each person's role overview, so a step is
 * changed here once and every view picks it up.
 *
 * Content as decided with Shakara and April on 14 September 2026. The breaks
 * inside `lines` are deliberate: each line fits a box in the diagram.
 */

export type Where =
  | "in_person"
  | "digital_library"
  | "social_hub"
  | "visitor"
  | "none";

export type StepStatus =
  | "built"
  | "written"
  | "in_build"
  | "to_write"
  | "to_scope"
  | "open";

export type Owner =
  | "irene"
  | "paul"
  | "anissa"
  | "diane"
  | "kirsty"
  | "april"
  | "shakara"
  | "chido"
  | "ivy"
  | "zack"
  | "adrian"
  | "team"
  | "to_name";

export const OWNER_NAMES: Record<Owner, string> = {
  irene: "Irene",
  paul: "Paul",
  anissa: "Anissa",
  diane: "Diane",
  kirsty: "Kirsty",
  april: "April",
  shakara: "Shakara",
  chido: "Chido",
  ivy: "Ivy",
  zack: "Zack",
  adrian: "Adrian",
  team: "The team",
  to_name: "To name",
};

export type GlyphKind =
  | "house"
  | "person"
  | "laptop"
  | "team"
  | "backstage"
  | "gear";

export const MOMENTS = [
  { id: "reach", label: "Reach" },
  { id: "signup", label: "Sign up" },
  { id: "book", label: "Book" },
  { id: "arrive", label: "Arrive" },
  { id: "borrow", label: "Borrow and make" },
  { id: "return", label: "Return and share" },
] as const;
export type MomentId = (typeof MOMENTS)[number]["id"];

export const LAYERS: {
  id: "physical" | "user" | "digital" | "inperson" | "backstage" | "support";
  label: string;
  note: string;
  icon: GlyphKind;
}[] = [
  { id: "physical", label: "Physical space", note: "The room and everything in it.", icon: "house" },
  { id: "user", label: "User action", note: "What the visitor does, in their own words.", icon: "person" },
  { id: "digital", label: "Digital actions", note: "What the team does on a screen.", icon: "laptop" },
  { id: "inperson", label: "In person actions", note: "What the team does face to face.", icon: "team" },
  { id: "backstage", label: "Backstage digital actions", note: "System and team work, out of sight.", icon: "backstage" },
  { id: "support", label: "Support processes", note: "The tools and policies underneath.", icon: "gear" },
];
export type LayerId = (typeof LAYERS)[number]["id"];

/** The three lines of a service blueprint, each drawn just above `above`. */
export const LINES: { above: LayerId; label: string; note: string }[] = [
  {
    above: "digital",
    label: "Line of interaction",
    note: "Where a visitor touches the service. Above it is their experience, below it is ours.",
  },
  {
    above: "backstage",
    label: "Line of visibility",
    note: "Everything below is invisible to the visitor, and they feel it when it is missing.",
  },
  {
    above: "support",
    label: "Line of internal interaction",
    note: "Where work passes between people and systems.",
  },
];

/** Colour of the small label under a step, usually who owns it. */
export type TagTone = "built" | "open" | "paul" | "irene" | "anissa" | "team";

export type Step = {
  moment: MomentId;
  layer: LayerId;
  where: Where;
  status: StepStatus;
  title?: string;
  lines: string[];
  tag?: string;
  tone?: TagTone;
  owners?: Owner[];
  /** An orange star: a decision is still open at this step. */
  star?: boolean;
  /** Replaces the where label above the title. */
  label?: string;
};

export const STEPS: Step[] = [
  // Physical space
  { moment: "reach", layer: "physical", where: "in_person", status: "written",
    title: "Brochure and one pager", lines: ["Window vinyl and signage", "An event held in the space"] },
  { moment: "signup", layer: "physical", where: "in_person", status: "written",
    title: "The QR code, on every slide", lines: ["and every printed piece", "Or staff point them to the", "website"] },
  { moment: "book", layer: "physical", where: "none", status: "written",
    lines: ["Booking happens online.", "There is no physical step", "at this moment."] },
  { moment: "arrive", layer: "physical", where: "in_person", status: "to_write",
    title: "The door, and who gets in", lines: ["Kids area, pocket gallery,", "and the rules poster"],
    tag: "AFTER HOURS, SECURITY TOLD", tone: "built", owners: ["anissa"] },
  { moment: "borrow", layer: "physical", where: "in_person", status: "written",
    title: "QR sticker on the item", lines: ["Property of Lab for Us", "The materials themselves"] },
  { moment: "return", layer: "physical", where: "in_person", status: "written",
    title: "The thing they made", lines: ["The pocket gallery wall", "it might end up on"] },

  // User action
  { moment: "reach", layer: "user", where: "visitor", status: "written",
    title: "Hears about the space", lines: ["Through a post, through", "NSCAD, a poster, or a friend"] },
  { moment: "signup", layer: "user", where: "visitor", status: "written",
    title: "Creates an account", lines: ["Taps or scans, then waits", "for approval to borrow"] },
  { moment: "book", layer: "user", where: "visitor", status: "written",
    title: "Books what they need", lines: ["Table or studio, adds", "items, says what it is for"] },
  { moment: "arrive", layer: "user", where: "visitor", status: "written",
    title: "Shows up on time", lines: ["Arrives at Lab for Us for", "the booking they made"] },
  { moment: "borrow", layer: "user", where: "visitor", status: "written",
    title: "Takes it and makes", lines: ["Works on site, takes", "something home, or both"] },
  { moment: "return", layer: "user", where: "visitor", status: "written",
    title: "Brings it back and shares", lines: ["Photos and videos of what", "they made go to the space"] },

  // Digital actions
  { moment: "reach", layer: "digital", where: "social_hub", status: "built",
    title: "Post goes out 10:09am", lines: ["Every caption invites people", "into Lab for Us or to the site"],
    tag: "SOMEONE ON THE TEAM", tone: "team", owners: ["team"] },
  { moment: "signup", layer: "digital", where: "digital_library", status: "built",
    title: "Signup screen", lines: ["Guided walkthrough runs", "on the first visit"],
    tag: "BUILT", tone: "built", owners: ["paul"] },
  { moment: "book", layer: "digital", where: "digital_library", status: "built",
    title: "Booking screen", lines: ["All booking details captured", "for admin to collect items"],
    tag: "BUILT", tone: "built", owners: ["paul"] },
  { moment: "arrive", layer: "digital", where: "digital_library", status: "to_scope",
    title: "Check in on arrival", lines: ["Walks through the arrival", "steps and security details"],
    tag: "NEW, TO SCOPE WITH PAUL", tone: "paul", owners: ["paul"] },
  { moment: "borrow", layer: "digital", where: "none", status: "written",
    lines: ["No screen needed here.", "Their basket is made up on", "site, ready to use or take home."] },
  { moment: "return", layer: "digital", where: "digital_library", status: "to_scope",
    title: "Upload the creation to", lines: ["their profile, with a reflection", "and a testimonial"],
    tag: "NEW, TO SCOPE WITH PAUL", tone: "paul", owners: ["paul"] },

  // In person actions
  { moment: "reach", layer: "inperson", where: "none", status: "written",
    lines: ["Nobody from the team", "is involved yet. This", "moment is all reach."] },
  { moment: "signup", layer: "inperson", where: "in_person", status: "to_write",
    title: "Walk them through signing", lines: ["up on the spot, at an", "activation or a first visit"],
    tag: "IRENE TO WRITE THE PROCESS", tone: "irene", owners: ["anissa", "irene"] },
  { moment: "book", layer: "inperson", where: "none", status: "written",
    lines: ["Nothing in the room.", "Booking happens on a screen."] },
  { moment: "arrive", layer: "inperson", where: "in_person", status: "to_write",
    title: "Greet them, match them to", lines: ["their booking, and show", "them their items"],
    tag: "ANISSA OR DIANE, TO WRITE", tone: "anissa", owners: ["anissa", "diane"] },
  { moment: "borrow", layer: "inperson", where: "in_person", status: "written",
    title: "Hand over the items and go", lines: ["over the terms of borrowing", "The return date is on the booking"],
    tag: "WRITTEN, SOP SECTION 4", tone: "built", owners: ["anissa", "diane"] },
  { moment: "return", layer: "inperson", where: "in_person", status: "to_write",
    title: "Check everything came back,", lines: ["flag what is running low, ask", "for a reflection, offer media help"],
    tag: "NEEDS A DECISION", tone: "open", star: true, owners: ["anissa"] },

  // Backstage digital actions
  { moment: "reach", layer: "backstage", where: "social_hub", status: "built",
    title: "Pick a template by pillar,", lines: ["edit it in Canva, mark it", "done on the calendar"],
    tag: "WHOEVER POSTS", tone: "team", owners: ["team"] },
  { moment: "signup", layer: "backstage", where: "digital_library", status: "open",
    title: "New member waits for", lines: ["approval, then can borrow.", "Onto the newsletter list"],
    tag: "WHO APPROVES, TO NAME", tone: "open", star: true, owners: ["to_name"] },
  { moment: "book", layer: "backstage", where: "digital_library", status: "open",
    title: "Booking lands with Anissa", lines: ["at an InACTS library inbox,", "one address, still to pick"],
    tag: "INBOX ADDRESS, TO PICK", tone: "open", star: true, owners: ["anissa"] },
  { moment: "arrive", layer: "backstage", where: "digital_library", status: "to_write",
    title: "Items packed the day before,", lines: ["labelled with the booking", "reference, from a weekly list"],
    tag: "ANISSA, TO WRITE", tone: "anissa", owners: ["anissa"] },
  { moment: "borrow", layer: "backstage", where: "digital_library", status: "written",
    title: "Review new borrowing", lines: ["requests. The record was", "created by the user at booking"],
    tag: "WRITTEN, SOP SECTION 4", tone: "built", owners: ["anissa"] },
  { moment: "return", layer: "backstage", where: "digital_library", status: "to_write",
    title: "Close it, chase overdue", lines: [], owners: ["anissa"] },
  { moment: "return", layer: "backstage", where: "social_hub", status: "open",
    title: "Photo moves to the calendar", lines: [], star: true, owners: ["to_name"] },

  // Support processes
  { moment: "reach", layer: "support", where: "social_hub", status: "in_build",
    title: "On Lab for Us’s own", lines: ["database, six week run", "loaded on the calendar"],
    tag: "META AND LINKEDIN PENDING", tone: "open", owners: ["irene"] },
  { moment: "signup", layer: "support", where: "digital_library", status: "in_build",
    title: "Approval step goes back in.", lines: ["Newsletter, policies and", "terms taken at signup"],
    tag: "PAUL, TO REBUILD", tone: "paul", owners: ["paul"] },
  { moment: "book", layer: "support", where: "digital_library", status: "built",
    title: "Booking engine", lines: ["Adding event type, a weekly", "printable list, item locations"],
    tag: "BUILT, REFINEMENTS WITH PAUL", tone: "built", owners: ["paul"] },
  { moment: "arrive", layer: "support", where: "digital_library", status: "open",
    title: "Notification routing", lines: ["After hours goes to NSCAD", "security, CRC chairs exempt"],
    tag: "PAUL, ONCE THE INBOX IS PICKED", tone: "open", star: true, owners: ["paul"] },
  { moment: "borrow", layer: "support", where: "digital_library", status: "built",
    title: "Inventory and QR codes", lines: ["Item level check in and", "out, plus off site filter"],
    tag: "IRENE AND PAUL", tone: "paul", owners: ["irene", "paul"] },
  { moment: "return", layer: "support", where: "in_person", status: "in_build",
    label: "IN PERSON AND LIBRARY",
    title: "The SOP that says where", lines: ["every capture lives, plus", "history tab and exports"],
    tag: "EXTENDING TO PUBLIC BOOKINGS", tone: "open", owners: ["shakara"] },
];

export const DECIDED_ON = "14 September 2026";

export type DecisionPart = {
  kind: "done" | "open" | "note";
  label: string;
  text: string;
};

export type Decision = {
  n: string;
  question: string;
  settled: boolean;
  parts: DecisionPart[];
};

export const DECISIONS: Decision[] = [
  {
    n: "01",
    question: "Which inbox receives a booking?",
    settled: false,
    parts: [
      { kind: "done", label: "Decided", text: "Bookings move off the address Paul set up for himself and onto an InACTS library inbox. Anissa receives them." },
      { kind: "open", label: "Still to pick", text: "Which address. The candidates are teams@inacts.ca, info@inacts.ca, infoandteams@inacts.ca, the one Paul built, and inacts@nscad.ca." },
      { kind: "note", label: "Alongside it", text: "Clear out the accounts that have built up: two Google, one Proton and two Microsoft." },
    ],
  },
  {
    n: "02",
    question: "What does someone agree to at signup, and what lets them borrow?",
    settled: true,
    parts: [
      { kind: "done", label: "Decided", text: "Sign up, then approval, then borrowing. Only an approved membership can borrow from the space." },
      { kind: "done", label: "At signup", text: "They join the newsletter and accept the policies and terms of service." },
      { kind: "note", label: "Alongside it", text: "The community agreement is updated to cover how borrowed things are treated." },
      { kind: "open", label: "Still to name", text: "Who approves a new member, so nobody sits waiting." },
    ],
  },
  {
    n: "03",
    question: "Who covers the room?",
    settled: true,
    parts: [
      { kind: "done", label: "By day", text: "Anissa runs operations. Diane covers when she is in." },
      { kind: "done", label: "Partners", text: "Mahnaz on Sundays during the day. The Hub on Thursdays, with Ryan and Maje." },
      { kind: "note", label: "Every booking", text: "Says what type of event it is, so the checklist matches the group." },
    ],
  },
  {
    n: "04",
    question: "Posting cadence, and who takes the photo?",
    settled: false,
    parts: [
      { kind: "open", label: "Waiting on", text: "A branding strategy for the space from Chido, so the team knows what to post." },
      { kind: "note", label: "Then", text: "The posting cadence, and who moves a photo from the room to the calendar." },
    ],
  },
  {
    n: "05",
    question: "What happens for security when someone arrives?",
    settled: true,
    parts: [
      { kind: "done", label: "Anissa is there", text: "She shows them their booking, checks them in, and checks them out." },
      { kind: "done", label: "Anissa is not there", text: "Usually an evening. Every after hours booking notifies NSCAD security, even for groups the building knows. CRC chairs are the only exception." },
      { kind: "note", label: "Alongside it", text: "A security document and instructions are posted, with a checklist for each group by the type of event booked." },
    ],
  },
];

export const ACCESS_TIERS = [
  {
    n: 1,
    who: "CRC chairs at NSCAD: Eddie, April and Josh.",
    text: "First priority, any time, and a right of first refusal. Moving someone else’s booking for them gives 24 hours notice, or 30 days for a Thursday, under the MOU. Other NSCAD administration and faculty come just after.",
  },
  {
    n: 2,
    who: "Key partners.",
    text: "The Hub on Thursdays, and Mahnaz on Sundays during the day, booked until December. Without an MOU the space is closed in the evenings. It can open with notice if Anissa is going to be there.",
  },
  {
    n: 3,
    who: "Everyone else, students and community.",
    text: "Welcome 9 to 5 when staff are present.",
  },
];

export const MANDATE = {
  lead: "A programmatic space, not an institutional one.",
  text: "It is for research and community engagement, and clubs and societies are welcome. It is not a room for holding a class.",
};

export type Tone = "done" | "doing" | "open";

export type OutstandingItem = {
  title: string;
  detail: string;
  where: Exclude<Where, "visitor" | "none">;
  owners: Owner[];
  status: string;
  tone: Tone;
};

export const OUTSTANDING: { group: string; items: OutstandingItem[] }[] = [
  {
    group: "Still to decide",
    items: [
      { title: "Pick the booking inbox address", detail: "Decision 01. Five candidates, above.", where: "digital_library", owners: ["april", "shakara"], status: "Open", tone: "open" },
      { title: "Name who approves new members", detail: "Decision 02 puts an approval step before anyone can borrow", where: "digital_library", owners: ["april", "shakara"], status: "Open", tone: "open" },
      { title: "A branding strategy for the space", detail: "Decision 04. The posting cadence and who moves a photo to the calendar follow from it.", where: "social_hub", owners: ["chido"], status: "Not started", tone: "open" },
    ],
  },
  {
    group: "New from the review",
    items: [
      { title: "Put the signup approval step back", detail: "It was removed in June so people could join without waiting", where: "digital_library", owners: ["paul"], status: "To build", tone: "doing" },
      { title: "Event type, a weekly printable bookings list, and item locations", detail: "So Anissa can pack each booking the day before and label it with the booking reference", where: "digital_library", owners: ["paul"], status: "To build", tone: "doing" },
      { title: "After hours notifications to NSCAD security", detail: "Every booking without Anissa there, CRC chairs excepted", where: "digital_library", owners: ["paul"], status: "To build", tone: "doing" },
      { title: "Update the community agreement", detail: "How borrowed things are treated", where: "in_person", owners: ["to_name"], status: "Open", tone: "open" },
      { title: "Security document, instructions, and a checklist for each group", detail: "By the type of event booked", where: "in_person", owners: ["to_name"], status: "Open", tone: "open" },
      { title: "Clear out the extra accounts", detail: "Two Google, one Proton and two Microsoft", where: "digital_library", owners: ["to_name"], status: "Open", tone: "open" },
    ],
  },
  {
    group: "Social Hub, and the order is fixed",
    items: [
      { title: "Create the Facebook Page and link it to @labforus", detail: "Instagram publishing cannot work without it, so everything below waits here", where: "social_hub", owners: ["anissa"], status: "Not started", tone: "open" },
      { title: "Add Irene as an admin of that Page", detail: "So the approvals get run without borrowing anyone’s login", where: "social_hub", owners: ["anissa"], status: "Not started", tone: "open" },
      { title: "Fifteen minutes with whoever holds the Instagram login", detail: "The final connect is approved from the account itself", where: "social_hub", owners: ["anissa"], status: "Not started", tone: "open" },
      { title: "Name or create the LinkedIn Page admin", detail: "The app and its approval attach to the Page", where: "social_hub", owners: ["shakara"], status: "Not started", tone: "open" },
      { title: "Brand asset files", detail: "Some arrived on 28 August and are in the brand kit. Still to check: vector logos, the custom font, the icon set as SVGs, and the hex for the vivid red.", where: "social_hub", owners: ["anissa"], status: "Partly in", tone: "doing" },
      { title: "Share the eighteen Canva templates with everyone who posts", detail: "Test it by opening the pillars page and clicking through to Canva", where: "social_hub", owners: ["anissa"], status: "Not started", tone: "open" },
      { title: "Review the awareness day calendar", detail: "Nocturne, African Heritage Month, Pride and Mi’kmaq History Month are one line each to add", where: "social_hub", owners: ["april", "shakara"], status: "To discuss", tone: "open" },
      { title: "Meta app, LinkedIn app, and both approvals", detail: "Then connect the accounts and switch direct posting on", where: "social_hub", owners: ["irene"], status: "Behind the Page", tone: "open" },
    ],
  },
  {
    group: "Digital Library, in build",
    items: [
      { title: "Item level check in and check out", detail: "Tied to the object, with taken and due dates, so the team knows what left the building", where: "digital_library", owners: ["irene", "paul"], status: "Underway", tone: "doing" },
      { title: "Three booking types", detail: "On site, take home, and both in one visit", where: "digital_library", owners: ["paul"], status: "Requested", tone: "doing" },
      { title: "Booking activity in the History tab", detail: "The booking shows, the history does not", where: "digital_library", owners: ["paul"], status: "Requested", tone: "doing" },
      { title: "Security and access form", detail: "Who is getting access, with emails. The content comes from Anissa.", where: "digital_library", owners: ["paul", "anissa"], status: "Waiting on content", tone: "open" },
      { title: "Recurring bookings, and event booking", detail: "For the Thursday and Sunday groups, with reminders and a cancel. The booking engine itself is built, and these are refinements.", where: "digital_library", owners: ["paul"], status: "Refinement", tone: "doing" },
      { title: "Basket, favourites, quantities, inventory export", detail: "What Select does, where the heart lives, how many are left", where: "digital_library", owners: ["paul"], status: "Requested", tone: "doing" },
      { title: "Wording fixes", detail: "Loan becomes off site bookings, Browse says one thing, My Bookings and My Events merge", where: "digital_library", owners: ["paul"], status: "Requested", tone: "doing" },
      { title: "Notification routing, and the off site filter", detail: "Admin picks who gets told. Admin sees what may leave the building.", where: "digital_library", owners: ["paul"], status: "Behind the inbox address", tone: "open" },
      { title: "Check in on arrival", detail: "A screen that walks someone through the arrival steps and the security details. New, and it needs scoping.", where: "digital_library", owners: ["paul"], status: "New, to scope", tone: "open" },
      { title: "Upload a creation to the member profile", detail: "With a written reflection on what was made and a testimonial on the experience. New, and it needs scoping.", where: "digital_library", owners: ["paul"], status: "New, to scope", tone: "open" },
    ],
  },
  {
    group: "In the space",
    items: [
      { title: "Extend the SOP to cover public bookings", detail: "Agreed 31 August. Four unwritten room steps become four sections of a document that already exists.", where: "in_person", owners: ["shakara"], status: "Agreed, not started", tone: "doing" },
      { title: "Storage sweep and labelling", detail: "Books, then furniture. Chairs, tables, TVs, the whiteboard. The sticker design with the ownership label is done.", where: "in_person", owners: ["irene"], status: "Underway", tone: "doing" },
      { title: "Train the designated admin", detail: "Adding items, printing codes, tagging. Who it is still needs saying in those words.", where: "in_person", owners: ["irene"], status: "To confirm who", tone: "open" },
      { title: "Re-date and run the three activations", detail: "Staff, then the Thursday and Sunday groups. Everyone signs up and does one real borrow on the spot.", where: "in_person", owners: ["irene"], status: "Pushed, no new date", tone: "open" },
      { title: "Brochure, one pager, walkthrough video and audio cut", detail: "The same content for people who prefer to read, watch or listen", where: "in_person", owners: ["ivy", "zack", "adrian"], status: "Assigned", tone: "doing" },
      { title: "Test the QR flow on site before it goes live", detail: "So a fault is found before anyone else runs it", where: "in_person", owners: ["irene"], status: "Underway", tone: "doing" },
      { title: "Real folder names in the SOP", detail: "Section 6 uses placeholders, so a borrow record cannot link straight to a location", where: "in_person", owners: ["shakara"], status: "Placeholders", tone: "open" },
    ],
  },
];
