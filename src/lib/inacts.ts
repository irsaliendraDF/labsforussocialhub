/**
 * InACTS, as data.
 *
 * One file so an edit is one file, the same arrangement the service
 * blueprint uses. Two sources feed it and they are kept apart on purpose:
 *
 *   PUBLIC   facts NSCAD, McGill or Dalhousie have already published, so
 *            anything here is safe to repeat outside the team.
 *   WORKING  the Branding and Positioning document April and Shakara wrote
 *            in April 2026. A working brainstorm, theirs to change.
 */

/** The loop: what makes the two hubs one body of work rather than two sites. */
export const LOOP = [
  {
    n: "01",
    title: "Make",
    body: "People come into Lab for Us with tools, time and company, and make something.",
  },
  {
    n: "02",
    title: "Deposit",
    body: "What they made lands in the Digital Library, described in their own words.",
  },
  {
    n: "03",
    title: "Read",
    body: "InACTS reads the library as a body of evidence and writes the how and the why.",
  },
  {
    n: "04",
    title: "Return",
    body: "That work brings attention, partners and funding, which bring more people into the room.",
  },
] as const;

/** On the record, and therefore safe to repeat. */
export const ON_THE_RECORD = [
  {
    label: "What it is",
    body: "The Institute for Art, Community and Transdisciplinary Studies, a NSCAD unit at 1871 Granville in Halifax, established 2023.",
  },
  {
    label: "The chair",
    body: "It houses NSCAD's Tier 2 Canada Research Chair in Art Education, Belonging and Social Change, held by April Mandrona and announced in November 2024.",
  },
  {
    label: "The mandate",
    body: "A site for connecting the university directly with communities institutions have kept outside: newcomers, racialized communities and young people. What happens here has to involve people from beyond the university.",
  },
  {
    label: "How the work is done",
    body: "Transdisciplinary, and in partnerships described as long term, asset based and trauma informed.",
  },
] as const;

export type Person = {
  id: string;
  name: string;
  title: string;
  /** Their short form in the joint story. */
  archetype: string;
  archetypeNote: string;
  sentence: string;
  topics: string[];
  yes: string[];
  routes: string;
  bio: string;
};

/**
 * The persona cards, from the April 2026 positioning document.
 *
 * Titles are the current ones, confirmed 26 October 2026: the Dalhousie
 * faculty profile that still reads MBA 2024 and instructor is behind, not
 * wrong, and updating it is on the list.
 */
export const PEOPLE: Person[] = [
  {
    id: "april",
    name: "April Mandrona",
    title: "Associate Professor, NSCAD, Art Education. Director of InACTS",
    archetype: "The maker-scholar",
    archetypeNote:
      "She came from makers and making, and she brings that lineage into the academy.",
    sentence:
      "April is an art education scholar whose research turns communities of makers into bodies of knowledge the academy can learn from.",
    topics: [
      "Art education",
      "Community-based research",
      "Transdisciplinary practice",
      "Making as method",
      "Belonging and social change",
      "Professionalizing creatives",
    ],
    yes: [
      "Keynotes on art and community",
      "Panels on transdisciplinary research",
      "Academic collaborations and post-doc supervision",
      "Partnerships with maker-adjacent organisations",
    ],
    routes:
      "Pure entrepreneurship programming, venture-side partnerships, and anything framed commercially rather than scholarly or community, go to Shakara.",
    bio: "April is an Associate Professor at NSCAD and the founder of InACTS, where she builds research from communities of makers and treats making itself as a method of inquiry.",
  },
  {
    id: "shakara",
    name: "Shakara Russell Joseph",
    title:
      "Associate Professor, Dalhousie. Co-founder, Black Entrepreneurship Knowledge Hub",
    archetype: "The builder-theorist",
    archetypeNote:
      "She builds in public, from a feminist and entrepreneurial lens, and theorises the thing while it is still moving.",
    sentence:
      "Shakara is an entrepreneurship scholar who builds several things at once, studies them while they move, and brings a gendered, relational lens to what counts as legitimate enterprise.",
    topics: [
      "Entrepreneurship theory and practice",
      "Feminist approaches to enterprise",
      "Black entrepreneurship",
      "Risk and early-stage building",
      "Building in public",
      "Community-scale economic participation",
    ],
    yes: [
      "Keynotes to large audiences",
      "Entrepreneurship and innovation programming",
      "Feminist and Black entrepreneurship research",
      "Partnerships with business schools and hubs",
      "Speaking to government on community economic questions",
    ],
    routes:
      "Art education pedagogy, fine-art scholarship, and anything needing one narrow maker discipline, go to April.",
    bio: "Shakara is an entrepreneurship scholar at Dalhousie, co-founder of the Black Entrepreneurship Knowledge Hub, and co-steward of Lab for Us and InACTS.",
  },
];
