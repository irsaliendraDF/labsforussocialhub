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

/**
 * How the parts connect, from the team's Miro board (reworked 8 to 10
 * November 2026). Structure only: no grant amounts, end dates or
 * unconfirmed funder detail, because this page is public and those are
 * still heard, not confirmed. The board holds the detail.
 */
export const CONNECTS = [
  {
    label: "The two people",
    body: "April Mandrona and Shakara Joseph are two personal brands that complement each other. April brings art education and making, Shakara brings entrepreneurship and building, and both lead research through InACTS.",
  },
  {
    label: "The research",
    body: "InACTS holds the thinking: strategy, hypotheses and the academic side. Projects sit under it, among them Storying Transnational Knowledges, Transform and Traveling Images, each funded by its own grant. Research not yet funded stays on the board as not started.",
  },
  {
    label: "The funding",
    body: "Funding is drawn by colour on the board: money tied to the Canada Research Chair, grants InACTS leads, grants InACTS joins, and finished work. Every grant sits on top of the project it pays for.",
  },
  {
    label: "The Digital Library",
    body: "The library is the asset April and Shakara use to deepen the research. It is funded separately from the research projects and pays for technical expertise, not research.",
  },
  {
    label: "Lab for Us",
    body: "The community side, where the research is put into practice. It is how the work moves into community, alongside Tiny Labs and applied research.",
  },
] as const;

/**
 * The Systems of Care page, from the 16 November 2026 sessions. Their words,
 * trimmed: heard, not established, and approved by Irene as drafted in chat
 * on 21 November 2026. Nothing about roles, staff or the research flow.
 */
export const SYSTEMS_OF_CARE = {
  intro:
    "InACTS works on systems of care: how people and places take care of each other, and what care and repair structures look like when they work.",
  sections: [
    {
      heading: "What It Means",
      body: "A north star pulled through everything the institute does: systems of care, and how they interact with the actors and players within those spaces. In practice that is building spaces, places and community around care structures or repair structures, and imagining possible futures, because this cannot be the end.",
    },
    {
      heading: "Across Disciplines",
      body: "April Mandrona brings art education and Shakara Joseph brings innovation and entrepreneurship. The aim is not to sit side by side but to cross until neither is separate.",
    },
    {
      heading: "Quiet Activism",
      body: "The work moves through small, subtle acts in the spaces where people gather, not only through loud ones.",
    },
  ],
} as const;

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

/**
 * Why April and Shakara came together, from the 9 November 2026 call.
 * Heard, not established: the speaker is read as Shakara. Written with the
 * results shown side by side, at Irene's instruction of 14 November 2026.
 */
export const TOGETHER = {
  why: "April held the Canada Research Chair for two years before they met, and the work was not moving. They were introduced by a mutual contact and found the same question under both fields: how do we take better care of each other? April comes at it through art and education, Shakara through innovation and entrepreneurship. The care is the same and the lens differs.",
  means:
    "They are both transdisciplinary thinkers. Their fields are not side by side without touching. Ideas are blended and each person stays themselves, which is not a melting pot: April can explain her art education experience through an innovation lens, and Shakara can use an art education lens. The aim is to solve real societal problems. They work from mutual respect, support and alignment. United does not mean always agreeing, and each protects their own time and boundaries. Everything they build is built with a community partner, across international, inter-university and community scales.",
  inTheirWords: [
    {
      label: "The aim",
      body: "Boundary annihilation. By the end, April should be an innovation scholar and Shakara an art educator.",
    },
    {
      label: "How it shows",
      body: "Keep showing up as they are. People either elect in and find it makes sense, or find it too big.",
    },
    {
      label: "Not traditional academics",
      body: "Neither wants to go deeper and deeper into one subject, and the space itself challenges what universities count as output.",
    },
    {
      label: "Quiet activism",
      body: "Once a throwaway descriptor, now something they do: action within the spaces where people gather, not only talk.",
    },
  ],
  results: [
    {
      label: "CliftonStrengths",
      body: "The two profiles barely overlap, which is the point. Restorative and Analytical, the first two of Shakara's top five, sit in April's lower half, at 20th and 23rd. April's top five (Strategic, Learner, Arranger, Communication and Individualization) are not in Shakara's top five. They share Relator and Ideation, which both appear in April's top ten. Between them they cover all four domains: April supplies pattern, story and arrangement, Shakara supplies diagnosis, proof and drive for impact, and Communication and Significance are the two influencing themes between them.",
    },
    {
      label: "Working Genius",
      body: "Both are Discriminating Ideators, so the pair generates ideas and judges them well. The gap is shared as well: Galvanizing is a frustration for both, so rallying people to act is nobody's gift in the partnership. Each covers the other's second frustration. April's competency is Enablement, which is Shakara's frustration, and Shakara's competency is Tenacity, which is April's. Neither has Tenacity, Enablement or Galvanizing as a genius, so the team around them has to carry the finishing, the support and the rallying. The report warns that this pairing can appear impatient with pushback and lose interest once the invention phase is over.",
    },
    {
      label: "Enneagram",
      body: "April leads with care for people (Type 2, The Helper) and Shakara with direct action and protection (Type 8, The Challenger). Both have Type 6, The Loyalist, in their top three, at 22 for April and 20 for Shakara. One leads with relationship and the other with directness, and both share a loyalty to the people and commitments they hold.",
    },
  ],
} as const;

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
  /** Things said about their own work in the 9 and 16 November sessions. Heard, not confirmed. */
  heard: string[];
  /** What each test says about this person alone. */
  results: { label: string; body: string }[];
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
    heard: [
      "Came up through fine arts and psychology, then art education and quantitative work, a PhD, rural kids in South Africa, and McGill: a hybrid path.",
      "In community art education, formal structures can be harmful, so the answer is to make something over here.",
      "Her presence alone can give people the legitimacy to do what they already want to do.",
    ],
    results: [
      {
        label: "CliftonStrengths",
        body: "April leads with Strategic Thinking. Her top ten are Strategic, Learner, Arranger, Communication, Individualization, Input, Achiever, Relator, Ideation and Connectedness. Strategic means she spots patterns and issues others miss and chooses the best of several paths. Learner means the process of learning, not only the result, is what energises her. Arranger means she aligns people and resources, organised and flexible at once. Communication means she puts thoughts into words and tells the story. The report's own caution is that she can move through options so quickly that others cannot follow, so explaining how she got there helps.",
      },
      {
        label: "Working Genius",
        body: "Invention and Discernment are her geniuses, the Discriminating Ideator: new ideas from scratch, then an instinct for which ones will work. Wonder and Enablement are competencies, work she does well without being fed by it. Tenacity, pushing a task through to done, and Galvanizing, rallying people to act, are her frustrations. The report says she craves freedom and trust, is crushed by constraint and having to prove her gut, and can lose interest once the first invention phase is over.",
      },
      {
        label: "Enneagram",
        body: "Type 2, The Helper, scored highest at 24, then Type 6, The Loyalist, at 22 and Type 3, The Achiever, at 20. Twos are the most people-oriented type: they feel best when meaningfully engaged with others and make good things happen for them. The report's caution is attending to others' needs without enough attention to their own, and the boundaries that go with it.",
      },
    ],
  },
  {
    id: "shakara",
    name: "Shakara Russell Joseph",
    title:
      "Associate Professor, Dalhousie. Co-director of InACTS",
    archetype: "The builder-theorist",
    archetypeNote:
      "She builds in public, from an entrepreneurial lens, and theorises the thing while it is still moving.",
    sentence:
      "Shakara is an entrepreneurship scholar who builds several things at once, studies them while they move, and brings a relational lens to what counts as legitimate enterprise: even business is how people take care of each other.",
    topics: [
      "Entrepreneurship theory and practice",
      "Entrepreneurship as care",
      "Black entrepreneurship",
      "Risk and early-stage building",
      "Building in public",
      "Community-scale economic participation",
    ],
    yes: [
      "Keynotes to large audiences",
      "Entrepreneurship and innovation programming",
      "Research on entrepreneurship as care, and on Black entrepreneurship",
      "Partnerships with business schools and hubs",
      "Speaking to government on community economic questions",
    ],
    routes:
      "Art education pedagogy, fine-art scholarship, and anything needing one narrow maker discipline, go to April.",
    bio: "Shakara is an entrepreneurship scholar at Dalhousie, co-director of InACTS and co-steward of Lab for Us.",
    heard: [
      "Not attached to any one organization. The range runs from business leaders to community work, and it should all make sense together.",
      "Systems of innovation that recognize how the system is, then innovate in ways that are not harmful.",
      "Builds until it works, then hands it on.",
    ],
    results: [
      {
        label: "CliftonStrengths",
        body: "Shakara's top five are Restorative, Analytical, Relator, Ideation and Significance. Restorative means problems energise her: she diagnoses what is wrong and fixes it. Analytical means she looks for reasons and causes and asks others to prove it, which some read as critical when she is only trying to understand. Relator means close relationships, and people regularly ask what she thinks. Ideation means original ideas come easily. Significance means she wants to make a big impact and to be recognised for her unique strengths. Only the top five are on file.",
      },
      {
        label: "Working Genius",
        body: "Invention and Discernment are her geniuses, the same Discriminating Ideator pairing. Wonder and Tenacity are competencies, so she can push work through to completion without being fed by it. Galvanizing and Enablement are her frustrations: rallying people, and providing steady support to get something started. The same report cautions apply: she craves freedom and trust and is crushed by constraint and having to prove her gut.",
      },
      {
        label: "Enneagram",
        body: "Type 8, The Challenger, scored highest at 27, then Type 1, The Reformer, at 21 and Type 6, The Loyalist, at 20. Eights are independent, assertive, natural leaders, people of vision and action who protect others and help them stand on their own. They are direct and expect directness back.",
      },
    ],
  },
];
