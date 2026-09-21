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
    title: "Books it and makes", lines: ["Everything is used in the", "space. Nothing goes off site"] },
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
    lines: ["No screen needed here.", "Their basket is made up on", "site, ready to use there."] },
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
    title: "Anissa approves them, then", lines: ["they can borrow. Onto the", "newsletter list"],
    tag: "ANISSA, IN THE TEAM INBOX", tone: "anissa", owners: ["anissa"] },
  { moment: "book", layer: "backstage", where: "digital_library", status: "open",
    title: "Booking lands with Anissa", lines: ["at team@inacts.ca, where", "she approves new members too"],
    tag: "DECIDED 21 SEPTEMBER", tone: "anissa", owners: ["anissa"] },
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
  { moment: "arrive", layer: "support", where: "in_person", status: "to_write",
    title: "Anissa tells NSCAD security", lines: ["about after hours bookings.", "CRC chairs exempt"],
    tag: "ANISSA, AFTER HOURS", tone: "anissa", owners: ["anissa"] },
  { moment: "borrow", layer: "support", where: "digital_library", status: "built",
    title: "Inventory and QR codes", lines: ["Item level check in and out,", "so the team knows what is out"],
    tag: "IRENE AND PAUL", tone: "paul", owners: ["irene", "paul"] },
  { moment: "return", layer: "support", where: "in_person", status: "in_build",
    label: "IN PERSON AND LIBRARY",
    title: "The SOP that says where", lines: ["every capture lives, plus", "history tab and exports"],
    tag: "EXTENDING TO PUBLIC BOOKINGS", tone: "open", owners: ["shakara"] },
];

export const DECIDED_ON = "21 September 2026";

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
    settled: true,
    parts: [
      { kind: "done", label: "Decided 21 September", text: "**team@inacts.ca**, and it is the address for everything to do with the Digital Library, not bookings alone. Anissa already has access, so nothing depends on one person's phone." },
      { kind: "done", label: "Why not the NSCAD address", text: "**inacts@nscad.ca** authenticates through April's phone on a proxy account, and only NSCAD Computer Services can change that. Moving it is parked for a quieter time." },
      { kind: "note", label: "Alongside it", text: "The address Paul built for his own testing closes. Two Gmail accounts become one, kept for collaborators who cannot get a NSCAD account." },
    ],
  },
  {
    n: "02",
    question: "What does someone agree to at signup, and what lets them borrow?",
    settled: true,
    parts: [
      { kind: "done", label: "Decided", text: "Sign up, then approval, then borrowing. Only an approved membership can borrow from the space." },
      { kind: "done", label: "At signup", text: "They join the newsletter and accept the policies and terms of service." },
      { kind: "done", label: "Who approves, 21 September", text: "**Anissa**, in the team@inacts.ca inbox where the request arrives." },
      { kind: "done", label: "One approval, 21 September", text: "Approved for the space **is** approved to borrow. The one split is under 16, and the platform already asks for age at signup." },
      { kind: "note", label: "Alongside it", text: "The community agreement is updated to cover how borrowed things are treated, and goes out at signup to be accepted like the terms." },
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
      { kind: "done", label: "Anissa is not there", text: "Usually an evening. Anissa tells NSCAD security about every after hours booking, even for groups the building knows. CRC chairs are the only exception." },
      { kind: "done", label: "How, 21 September", text: "**An email to fountainsecurity@nscad.ca with the guest list**, weekly and again whenever the list changes. No form: the NSCAD form tools do not reach the booking platform, so Anissa sends it from the week's bookings." },
      { kind: "note", label: "Alongside it", text: "A security SOP and a closing checklist are posted in the space, and the guest list is a required field on every booking." },
    ],
  },
];

export const ACCESS_TIERS = [
  {
    n: 1,
    who: "CRC chairs at NSCAD: Eddie Furman, April and Josh.",
    text: "First priority, any time, and a right of first refusal. Moving someone else’s booking for them gives **48 hours notice**, agreed 21 September. Their project managers and coordinators book on their behalf, which the booking says plainly.",
  },
  {
    n: 2,
    who: "NSCAD faculty and administration.",
    text: "Just after the CRC chairs, and still held to the mandate. An assistant often books for them, so the booking says who it is really for.",
  },
  {
    n: 3,
    who: "Key partners.",
    text: "The Hub on Thursdays, and Mahnaz on Sundays during the day, booked until December. Without an MOU the space is closed in the evenings. It can open with notice if Anissa is going to be there.",
  },
  {
    n: 4,
    who: "Community VIPs, a short named list.",
    text: "Can book after hours and are the one exception to nothing leaving the space. Robert is on it, and Ryan is the likely second.",
  },
  {
    n: 5,
    who: "Everyone else, students and community.",
    text: "Welcome 9 to 5 when staff are present. Everything they book is used in the space.",
  },
];

export const MANDATE = {
  lead: "A programmatic space, not an institutional one.",
  text: "InACTS houses two of NSCAD's Canada Research Chairs and sits at 1871 Granville, where the university meets communities it has historically left out. **An event here needs a clear community or research purpose that reaches people outside the university**: making knowledge, sharing skills and training, or sharing findings. Work on what NSCAD students are up against, housing, food, mental wellbeing, belongs here too. It is not a room for holding a class. **It is shared while it is booked**, so nothing confidential belongs here, whoever booked it.",
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
      { title: "How borrowing works for under 16s", detail: "Approval to enter is approval to borrow, and under 16 is the one split. What the split actually is has not been written. To ask April and Shakara next week, and the community guidelines say to talk to staff until it is.", where: "digital_library", owners: ["april", "shakara"], status: "To ask", tone: "open" },
      { title: "A branding strategy for the space", detail: "Decision 04. The posting cadence and who moves a photo to the calendar follow from it.", where: "social_hub", owners: ["chido"], status: "Not started", tone: "open" },
    ],
  },
  {
    group: "New from the review",
    items: [
      { title: "Put the signup approval step back", detail: "It was removed in June so people could join without waiting", where: "digital_library", owners: ["paul"], status: "To build", tone: "doing" },
      { title: "Event type, a weekly printable bookings list, and item locations", detail: "So Anissa can pack each booking the day before and label it with the booking reference", where: "digital_library", owners: ["paul"], status: "To build", tone: "doing" },
      { title: "Tell NSCAD security about after hours bookings", detail: "An email to fountainsecurity@nscad.ca carrying the guest list, weekly and again when the list changes. Regulars are not re-announced. Anissa sends it from the week's bookings, since no NSCAD form reaches the platform. Later, an agent can draft it for her to check and send.", where: "in_person", owners: ["anissa"], status: "To set up", tone: "open" },
      { title: "Update the community agreement", detail: "The version in the platform wins and the Drive copy follows it. Add borrowing and the objects, large group bookings, the shared table, and closing and security. It goes out at signup to be accepted.", where: "in_person", owners: ["irene"], status: "With Irene", tone: "doing" },
      { title: "Security document, instructions, and a checklist for each group", detail: "By the type of event booked", where: "in_person", owners: ["to_name"], status: "Open", tone: "open" },
      { title: "Clear out the extra accounts", detail: "Two Gmail accounts become one, kept for collaborators who cannot get a NSCAD account. Moving the Microsoft address is parked until a quieter time.", where: "digital_library", owners: ["irene"], status: "Open", tone: "open" },
      { title: "Guest list on every booking, and who a CRC booking is really for", detail: "The guest list is a required field, and somebody booking alone puts their own name. A booking made by a project manager or an assistant says which CRC or administrator it is for.", where: "digital_library", owners: ["paul"], status: "New, to build", tone: "open" },
      { title: "The security SOP and the closing checklist", detail: "How Anissa hands the room to security when she leaves: call them, wait, watch the door, the deadbolt and the gate. The closing checklist is laminated in the space: dishes washed and on the rack, microwave and spills cleaned, counters clear, garbage out, nothing left in the fridge past the booking.", where: "in_person", owners: ["irene"], status: "Drafting, shown next week", tone: "doing" },
      { title: "A guest internet account for the space", detail: "Visitors cannot get online. NSCAD IT generates temporary accounts for conferences, so ask whether the space can have one.", where: "in_person", owners: ["irene"], status: "To ask NSCAD IT", tone: "open" },
      { title: "A list of members, and of anyone not welcome back", detail: "Held outside the platform, so Anissa can match a name at the door and say no when she needs to. It carries a way back for someone who repairs what they did.", where: "in_person", owners: ["irene", "anissa"], status: "New, to build", tone: "open" },
      { title: "Send the signup email from the team inbox", detail: "The welcome and the community guidelines go out from team@inacts.ca, not only from inside the platform, so they survive the platform changing. April builds it in Power Automate once Irene checks what Paul sends with.", where: "digital_library", owners: ["april", "irene"], status: "New, to build", tone: "open" },
      { title: "File management, starting in Google Drive", detail: "Templates live with templates and stay blank, filled in documents move out. Research files leave Google for Microsoft, branding stays in Google for the strategist, and the structure moves across once it is clean. April's and Anissa's naming conventions both come in.", where: "in_person", owners: ["irene"], status: "Underway", tone: "doing" },
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
      { title: "Three booking types", detail: "On site, take home, and both in one visit. **Paused 21 September**: everything borrowed is used in the space, so only the on site case is live.", where: "digital_library", owners: ["paul"], status: "Paused", tone: "open" },
      { title: "Booking activity in the History tab", detail: "The booking shows, the history does not", where: "digital_library", owners: ["paul"], status: "Requested", tone: "doing" },
      { title: "Security and access form", detail: "Who is getting access, with emails. The content comes from Anissa.", where: "digital_library", owners: ["paul", "anissa"], status: "Waiting on content", tone: "open" },
      { title: "Recurring bookings, and event booking", detail: "For the Thursday and Sunday groups, with reminders and a cancel. The booking engine itself is built, and these are refinements.", where: "digital_library", owners: ["paul"], status: "Refinement", tone: "doing" },
      { title: "Basket, favourites, quantities, inventory export", detail: "What Select does, where the heart lives, how many are left", where: "digital_library", owners: ["paul"], status: "Requested", tone: "doing" },
      { title: "Wording fixes", detail: "Loan becomes off site bookings, Browse says one thing, My Bookings and My Events merge", where: "digital_library", owners: ["paul"], status: "Requested", tone: "doing" },
      { title: "Notification routing", detail: "Admin picks who gets told, now that the inbox is team@inacts.ca. The off site filter waits, since nothing leaves the space for now.", where: "digital_library", owners: ["paul"], status: "To build", tone: "doing" },
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

/**
 * How a visit should run once everything is in place, for each moment and
 * each layer, plus what that moment is still waiting on. `**` marks a run of
 * bold text inside a sentence.
 */
export type Practice = { layer: LayerId; where?: Where; text: string };

export type BestPractice = {
  moment: MomentId;
  bands: Practice[];
  gate: { kind: "waiting" | "decided"; label: string; text: string };
};

export const BEST_PRACTICE: BestPractice[] = [
  {
    moment: "reach",
    bands: [
      { layer: "physical", text: "The brochure sits where people can pick it up, the window says what the space is, and an event held in the space brings people through the door who were not looking for it." },
      { layer: "user", text: "Hears about the space: a post in their feed, something through NSCAD, a poster, or a friend who books it every Thursday." },
      { layer: "digital", where: "social_hub", text: "Two or three posts a week go out on the morning send, put together by somebody on the team. Every caption invites people into Lab for Us or points at **labforus.ca**, so there is one door and everything points at it." },
      { layer: "inperson", text: "Nothing yet. Nobody from the team is involved at this moment." },
      { layer: "backstage", where: "social_hub", text: "Whoever is posting opens the calendar, picks a template by pillar, edits it in Canva, and marks it done. Nobody starts from a blank page." },
      { layer: "support", where: "social_hub", text: "The hub publishes to Instagram and LinkedIn directly, and the finished design attaches itself to the post." },
    ],
    gate: { kind: "waiting", label: "Waiting on", text: "the Facebook Page, then the Meta and LinkedIn approvals. Until those land, posts are planned in the hub and published by hand." },
  },
  {
    moment: "signup",
    bands: [
      { layer: "physical", text: "One QR code, the same one on every slide and every printed piece. A staff member can also just point somebody at the website, which is the same route through another door." },
      { layer: "user", text: "Taps the link or scans the code and makes an account. Once approved, they can borrow." },
      { layer: "digital", where: "digital_library", text: "A short guided walkthrough runs on first login: the dashboard, the four things you can do, your bookings, booking the studio, browsing inventory, the suggestion box. **This is built.**" },
      { layer: "inperson", where: "in_person", text: "At an activation or a first visit, somebody sits with them and watches them do it, so any friction is seen rather than reported. Irene writes this process down." },
      { layer: "backstage", where: "digital_library", text: "The new member goes onto the newsletter list and waits for approval. The team sees them arrive, so a first timer is recognised as one when they walk in rather than treated as a regular." },
      { layer: "support", where: "digital_library", text: "**Approval comes before borrowing.** The policies and terms are accepted at signup, and the community agreement covers how borrowed things are treated." },
    ],
    gate: { kind: "decided", label: "Decided 21 September", text: "sign up, then **Anissa approves**, then borrowing, with the newsletter and the terms at signup. Approved for the space is approved to borrow, and the one split is under 16." },
  },
  {
    moment: "book",
    bands: [
      { layer: "physical", text: "Nothing. Booking happens online and there is no physical step at this moment, which is the point of having a booking system at all." },
      { layer: "user", text: "Picks a table or the studio, adds the items they need, and says what they are making. **Everyone coming is named on the booking**, their own name included if they are on their own. Everything booked is used in the space." },
      { layer: "digital", where: "digital_library", text: "Quantities show on every item, and the screen says plainly that a single table is shared space. **Every booking detail is captured so an admin can collect the items** before the person arrives." },
      { layer: "inperson", text: "Nothing in the room. Booking happens entirely on a screen, which is the point of having one." },
      { layer: "backstage", where: "digital_library", text: "The booking lands with Anissa at **team@inacts.ca**. The room is confirmed free, the items confirmed available, and the event type tells her what the group will need." },
      { layer: "support", where: "digital_library", text: "Groups that come every week book once and get a reminder, rather than filling the same form fifty times a year." },
    ],
    gate: { kind: "decided", label: "Decided 21 September", text: "bookings go to **team@inacts.ca**. Still in build with Paul: the basket, recurring bookings and the weekly printable list." },
  },
  {
    moment: "arrive",
    bands: [
      { layer: "physical", text: "The door and who gets through it, the kids area, the pocket gallery, and the rules poster where a new person can actually read it. **When Anissa is not there, NSCAD security has been told.**" },
      { layer: "user", text: "Shows up at Lab for Us on time, for the booking they made. Nobody asks them to explain it, because it is already known." },
      { layer: "digital", where: "digital_library", text: "A **check in** on arrival walks them through the arrival steps and the security details, so the same things get covered every time and nobody has to remember them. New, and it needs scoping with Paul." },
      { layer: "inperson", where: "in_person", text: "They are greeted, matched to their booking, and shown their items. A first timer gets the thirty second version of how the space works." },
      { layer: "backstage", where: "digital_library", text: "The items were packed the day before and labelled with the booking reference, from the week’s printed list. Working a day ahead is the smallest habit here and the one that makes a visit feel run." },
      { layer: "support", where: "digital_library", text: "The booking is visible in the admin view with the items listed on the card, not buried in an email. **Its guest list is what goes to security**, so the names are already there." },
    ],
    gate: { kind: "decided", label: "Decided 14 September", text: "Anissa or Diane by day, partners on their own days, and NSCAD security told after hours. The greeting and the check in now go into the extended SOP." },
  },
  {
    moment: "borrow",
    bands: [
      { layer: "physical", text: "Every item and every piece of furniture carries a QR code and a **Property of Lab for Us** label." },
      { layer: "user", text: "Gets the item and works with it in the space. They know when it is due back because somebody said it out loud." },
      { layer: "digital", text: "No screen needed. Their basket is made up on site with everything in it, ready to use there." },
      { layer: "inperson", where: "in_person", text: "Somebody from the team hands over the items and goes over the terms of borrowing. **The return date is already on the booking**, so this is a conversation rather than a negotiation." },
      { layer: "backstage", where: "digital_library", text: "The borrow record already exists, because the user created it when they booked. What happens here is **reviewing new borrowing requests**. Where a session is documented, the observer and creator captures are logged and named to the pattern." },
      { layer: "support", where: "digital_library", text: "The admin view shows what may leave the building and what stays, and the borrow record tracks the object rather than the visit." },
    ],
    gate: { kind: "waiting", label: "Waiting on", text: "item level check in and out on the admin side, so the team knows what left the building. The SOP already covers the borrow loop for workshops and is being extended to cover everyone." },
  },
  {
    moment: "return",
    bands: [
      { layer: "physical", text: "The thing they made, and the pocket gallery wall it might end up on." },
      { layer: "user", text: "Brings the item back and shares what they made. Returning and sharing are one action with one expectation: photos and videos of the creation come back to the space. Being asked is what makes that happen, and most people say yes when somebody asks." },
      { layer: "digital", where: "digital_library", text: "They upload what they made to their own profile, with a reflection on the creation and a testimonial on the experience. New, and it needs scoping with Paul." },
      { layer: "inperson", where: "in_person", text: "Somebody checks everything came back and flags what is running low or needs replacing. They encourage a reflection, and ask whether the person wants help to photograph or film what they made." },
      { layer: "backstage", where: "digital_library", text: "The record closes with what the item actually produced attached to it, and anything overdue is chased on a known rhythm rather than when somebody happens to notice." },
      { layer: "support", where: "social_hub", text: "The photo moves to the content calendar, which is where the next maker spotlight comes from. That is the loop closing." },
    ],
    gate: { kind: "waiting", label: "Waiting on", text: "a branding strategy for the space from Chido, which decides who moves a photo from the room to the calendar. The return conversation and the overdue rhythm go into the extended SOP meanwhile." },
  },
];

/** Layer names by id, for pages that list steps outside the diagram. */
export const LAYER_LABEL = Object.fromEntries(LAYERS.map((l) => [l.id, l.label])) as Record<LayerId, string>;

/**
 * Role overviews. A person's steps and open items are not listed here: they
 * are read from `owners` on STEPS and OUTSTANDING, so an overview can never
 * disagree with the blueprint. A `null` role or an empty priorities list is a
 * slot still to fill, and the page shows it as one.
 */
export type Person = {
  id: Owner;
  name: string;
  role: string | null;
  context: string;
  priorities: string[];
};

export const PEOPLE: Person[] = [
  {
    id: "anissa",
    name: "Anissa Peralta",
    role: "Main operations",
    context: "In the space regularly, and the brand and visual identity work too.",
    priorities: [
      "Create the Facebook Page and link it to @labforus. Every other social item waits behind this one.",
      "Receive each booking at team@inacts.ca, approve new members there, pack the items the day before, and label them with the booking reference.",
      "Check people in and out of the space. For after hours bookings, email the guest list to NSCAD security.",
      "Write the content for the security and access form.",
    ],
  },
  {
    id: "kirsty",
    name: "Kirsty",
    role: "Workshops and engagement",
    context: "Workshops and engagement are not one of the six moments of a visit, so none of this work is on the blueprint yet.",
    priorities: [],
  },
  {
    id: "diane",
    name: "Diane",
    role: null,
    context: "Covers the room by day when she is in.",
    priorities: [],
  },
];
