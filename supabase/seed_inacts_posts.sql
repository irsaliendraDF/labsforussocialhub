-- ============================================================
-- InACTS starter month
--
-- GENERATED FILE. Do not edit by hand.
-- Source: src/lib/inactsStarter.ts   Regenerate: npm run seed:sql
--
-- 6 drafts across the five InACTS pillars: 2 Instagram, 4 LinkedIn.
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
  ('inacts', 'What InACTS is, in one paragraph',
   'LinkedIn', 'In the open', 'Plain language explainer', NULL,
   'Follow the page', 'April', 'Idea', DATE '2026-11-02',
   'InACTS is the Institute for Art, Community and Transdisciplinary Studies, a street level space at 1871 Granville in Halifax, and part of NSCAD University. We exist to connect the university directly with communities that institutions have usually kept outside: newcomers, racialized communities and young people. What happens here is research talks, skills sharing, method building and screenings, and everything that happens here has to involve people from beyond the university. If that sounds like a room you have been looking for, say hello.',
   'The InACTS name in plain capitals on a white background, with the full institute name beneath it.',
   false, 'not_needed'),

  ('inacts', 'Who is a library actually for?',
   'Instagram', 'In public', 'Carousel, five cards', NULL,
   'Read the research', 'April', 'Idea', DATE '2026-11-04',
   'A library is one of the last places you can be without buying anything. It holds books, and it also holds people waiting out the cold, teenagers with nowhere else, and families new to a country learning how it works. Our Canada Research Chair asks what happens when young newcomers get to shape those spaces themselves rather than be served by them. Five cards on what we are asking, and why we are asking it in a library.',
   'Five plain white cards with black text, each carrying one question about who public libraries are designed for.',
   false, 'not_needed'),

  ('inacts', 'Asset based, in practice',
   'LinkedIn', 'In practice', 'Method note', NULL,
   'Comment with your own', 'April', 'Idea', DATE '2026-11-09',
   'Asset based is easy to write in a grant and hard to do in a room. In practice it changes the first question. Not what does this group lack, which puts us in charge of filling it, but what is already here, which puts them in charge of using it. The second question is slower and it gets better work. It also makes the research harder to write up, because what you learn is not the thing you planned to measure. We would rather have that problem.',
   'Black text on white reading, what is already here, above a thin rule.',
   false, 'not_needed'),

  ('inacts', 'Halifax Fashion Heart, and the people who made it',
   'LinkedIn', 'In company', 'Partner credit', NULL,
   'Meet the partners', 'Shakara', 'Idea', DATE '2026-11-16',
   'Halifax Fashion Heart is an intergenerational fashion incubator for newcomers who arrive here already carrying fashion and textile skill, and it put work on the runway at Halifax Fashion Week. It exists because of the people who built it with us: Soli Productions, TD Link Up and Youth Art Connection. Naming partners is not a courtesy. A project like this is held up by relationships that long predate the funding, and the record should say so.',
   'A garment made in the Halifax Fashion Heart programme, photographed on a plain background.',
   false, 'requested'),

  ('inacts', 'For Us by Us: what the picture books taught us',
   'Instagram', 'In evidence', 'Carousel, four cards', NULL,
   'Read the project page', 'April', 'Idea', DATE '2026-11-18',
   'For Us by Us is a project where children and young people with refugee experience, aged seven to eighteen, make and publish their own picture books. Not books about them. Books by them, in the words and pictures they choose. What came out of it is the thing we keep returning to: given the materials and the time, young people tell a more complicated story about their own lives than anyone tells on their behalf. Four cards on what we learned.',
   'Four plain cards showing spreads from picture books made by young people, with faces not shown.',
   false, 'requested'),

  ('inacts', 'Working with us',
   'LinkedIn', 'In the open', 'Invitation', NULL,
   'Get in touch', 'Shakara', 'Idea', DATE '2026-11-23',
   'If you run a community organisation and you are wondering whether there is something here for you, this is what working with InACTS looks like. You get a street level space, people who build methods with you rather than on you, and a university connection that does not require you to speak university. We ask for three things in return: that the work is useful to your community first, that the people in it are credited as makers, and that we are honest with each other about time. If that sounds workable, get in touch.',
   'Black text on white reading, working with us, above the InACTS address at 1871 Granville Street.',
   false, 'not_needed')
) as seed(hub, title, channel, pillar, format, template, cta, owner, status, post_date,
          caption, alt_text, is_reshare, permission_status)
where not exists (select 1 from posts where hub = 'inacts');
