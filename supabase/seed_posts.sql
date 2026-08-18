-- ============================================================
-- Lab for Us launch run
--
-- GENERATED FILE. Do not edit by hand.
-- Source: src/lib/launchRun.ts   Regenerate: npm run seed:sql
--
-- 19 posts over six weeks: 13 Instagram, 6 LinkedIn.
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
  (title, channel, pillar, format, template, cta, owner, status, post_date,
   caption, alt_text, is_reshare, permission_status)
select * from (values
  ('Introducing Lab for Us',
   'LinkedIn', 'For Us', 'Launch announcement', 'Launch announcement',
   'Visit the site', 'Irene', 'Idea', DATE '2026-08-19',
   'Something new is opening in the neighbourhood. Lab for Us is a space for art, community, creativity, and collaboration, built for the people usually left outside those rooms. Cameras, audio kit, editing software, studio time: all of it bookable, none of it gatekept. More soon. #MadeAtLabForUs #labforus',
   'The Lab for Us logo, a stacked colourful wordmark, on a cream background.',
   false, 'not_needed'),

  ('We are open: meet the Digital Library',
   'Instagram', 'For Us', 'Launch announcement', 'Launch announcement',
   'Sign up', 'Ivy', 'Idea', DATE '2026-08-21',
   'We are open. The Digital Library is the catalogue of everything you can borrow or book here: cameras, audio kit, editing software, studio and workshop time. Sign up, see what is free, reserve it. That is the whole thing. #MadeAtLabForUs #labforus',
   'The Lab for Us logo above the words Digital Library, with brand squiggles in orange and blue.',
   false, 'not_needed'),

  ('A walk through the space',
   'Instagram', 'The space and its tools', 'Day in the life', 'Behind the scenes',
   'Book the space', 'Zack and Adrian', 'Idea', DATE '2026-08-25',
   'Come in and have a look around. Here is the studio, the edit bay, the kit shelf, and the big table where most of the good ideas actually happen. Doors are open. #MadeAtLabForUs #labforus',
   'A wide view of the Lab for Us studio with equipment shelves and a large shared work table.',
   false, 'not_needed'),

  ('How to book the space in a few taps',
   'Instagram', 'Access and how it works', 'Tip or how-to', 'Tip / how-to',
   'Book the space', 'Ivy', 'Idea', DATE '2026-08-27',
   'Booking takes about a minute. Open the Digital Library, pick what you need, choose your time, done. No membership, no deposit, no phone call. If you get stuck, message us and a human will answer. #MadeAtLabForUs #labforus',
   'A phone screen showing the Lab for Us booking flow, with a finger tapping a time slot.',
   false, 'not_needed'),

  ('What the Digital Library actually holds',
   'LinkedIn', 'The space and its tools', 'Tip or how-to', 'Carousel: how-to',
   'Explore the library', 'Irene', 'Idea', DATE '2026-08-28',
   'People keep asking what is in the Digital Library, so here it is in plain terms: cameras and lenses, audio recorders and mics, lighting, editing software, and bookable studio and workshop time. Everything is listed with what it does and who it suits, because equipment lists written for experts keep beginners out.',
   'A carousel cover reading What is in the Digital Library, with icons for camera, microphone, and laptop.',
   false, 'not_needed'),

  ('The questions we get asked most',
   'Instagram', 'Access and how it works', 'Tip or how-to', 'Carousel: common questions',
   'Explore the library', 'Ivy', 'Idea', DATE '2026-09-01',
   'Do I need experience? No. Does it cost anything? No. Can I come on my own? Yes. Can I just look around first? Also yes. Swipe for the rest, and if your question is not here, ask us. #MadeAtLabForUs #labforus',
   'A carousel cover reading Questions we get asked most, in bold rounded type on cream.',
   false, 'not_needed'),

  ('Maker spotlight',
   'Instagram', 'People and community', 'Maker spotlight', 'Maker spotlight',
   'Explore the library', 'Zack and Adrian', 'Idea', DATE '2026-09-03',
   'Meet someone who has been making things here since week one. Swap the name, the photo, and the quote before this goes out. Ask them what they made and what they would tell someone nervous about walking in. #MadeAtLabForUs #labforus',
   'A portrait of a Lab for Us member in the studio, with their name and a short quote alongside.',
   false, 'not_needed'),

  ('Who is behind the space',
   'LinkedIn', 'People and community', 'Maker spotlight', 'Maker spotlight',
   'Visit the site', 'Irene', 'Idea', DATE '2026-09-04',
   'The facilitators are the reason this works. They are the ones who show someone how to hold a camera without making them feel small, and who remember your name the second time you come in. Worth naming them properly here.',
   'A facilitator helping a member set up a camera on a tripod in the Lab for Us studio.',
   false, 'not_needed'),

  ('Thursday group night',
   'Instagram', 'People and community', 'Story takeover', 'Hashtag lockup',
   'Follow', 'Zack and Adrian', 'Idea', DATE '2026-09-10',
   'Group night. Bring whatever you are working on or bring nothing at all and just see what everyone else is up to. Same time every week. #MadeAtLabForUs #labforus',
   'A sticker-style hashtag lockup reading Made At Lab For Us over a photo of a busy studio evening.',
   false, 'not_needed'),

  ('Made here: work from the community',
   'Instagram', 'Made here', 'Community reshare', 'Community reshare frame',
   'Book the space', 'Ivy', 'Idea', DATE '2026-09-15',
   'Made here. Ask permission before this goes out and credit the maker in the first line of the caption. #MadeAtLabForUs #labforus',
   'A branded frame around a piece of member work, with the maker credited underneath.',
   true, 'requested'),

  ('International Literacy Day',
   'Instagram', 'For Us', 'Mission or quote', 'Mission / quote',
   'Explore the library', 'Ivy', 'Idea', DATE '2026-09-08',
   'Literacy is not only reading and writing. It is being able to tell your own story in whatever form fits you, and having the tools to do it. That is most of why this space exists. #MadeAtLabForUs #labforus',
   'Type-led design reading Everyone deserves the tools to tell their own story, with brand squiggles.',
   false, 'not_needed'),

  ('Why a community model',
   'LinkedIn', 'For Us', 'Mission or quote', 'LinkedIn post',
   'Visit the site', 'Irene', 'Idea', DATE '2026-09-11',
   'A shared equipment library works for a reason that is easy to miss: the barrier to creative work is almost never talent, it is access. One camera used by forty people does more good than forty people each deciding they cannot afford one. That is the whole model.',
   'Type-led design reading Access, not talent, is the barrier, in bold rounded type.',
   false, 'not_needed'),

  ('Our first workshop',
   'Instagram', 'People and community', 'Tip or how-to', 'Workshop or class',
   'Sign up', 'Zack and Adrian', 'Idea', DATE '2026-09-17',
   'First workshop is on the calendar. No experience needed, everything provided, and you will leave having actually made something. Spaces are limited so grab one. #MadeAtLabForUs #labforus',
   'A workshop announcement card with the date, time, and title in bold rounded type.',
   false, 'not_needed'),

  ('Call for submissions',
   'Instagram', 'People and community', 'Community reshare', 'Call for submissions',
   'Explore the library', 'Ivy', 'Idea', DATE '2026-09-22',
   'Made something here? We want to show it. Tag us or use #MadeAtLabForUs and we will ask before we share anything. #labforus',
   'A call for submissions card inviting members to share work made at the space.',
   false, 'not_needed'),

  ('What lowering the barrier actually looks like',
   'LinkedIn', 'Access and how it works', 'Tip or how-to', 'LinkedIn post',
   'Book the space', 'Irene', 'Idea', DATE '2026-09-18',
   'Free is not the same as accessible. A space can charge nothing and still be intimidating: jargon on the equipment list, a booking form that assumes you know what you need, hours that only suit people without shift work. We have tried to design those barriers out rather than apologise for them later. Still learning, and still listening.',
   'Type-led design reading Free is not the same as accessible, in bold rounded type on cream.',
   false, 'not_needed'),

  ('Truth and Reconciliation Day',
   'Instagram', 'For Us', 'Mission or quote', 'Hours or closure notice',
   'Follow', 'Irene', 'Idea', DATE '2026-09-30',
   'We are closed today for the National Day for Truth and Reconciliation. Please take the time to listen to Survivors and to learn whose land you are on. We will share local ways to do that in our stories.',
   'A quiet notice card in muted brand tones marking the National Day for Truth and Reconciliation.',
   false, 'not_needed'),

  ('What has happened since we opened',
   'LinkedIn', 'For Us', 'Mission or quote', 'LinkedIn post',
   'Visit the site', 'Irene', 'Idea', DATE '2026-10-02',
   'Six weeks in, here is what has actually happened. Fill in the real numbers before this goes out: people signed up, bookings made, workshops run, and one thing somebody made that we could not have predicted. Early proof matters more than polish.',
   'Type-led design with space for early milestone numbers from the first six weeks.',
   false, 'not_needed'),

  ('Thank you to the people who made this possible',
   'Instagram', 'For Us', 'Community reshare', 'Thank a partner',
   'Follow', 'Ivy', 'Idea', DATE '2026-10-06',
   'None of this happens on its own. Thank you to the partners and funders who backed a space like this before there was anything to see. Tag them properly when this goes out. #MadeAtLabForUs #labforus',
   'A thank you card with space for partner and funder logos.',
   false, 'not_needed'),

  ('A day in the life',
   'Instagram', 'The space and its tools', 'Day in the life', 'Day in the life cover',
   'Sign up', 'Zack and Adrian', 'Idea', DATE '2026-09-24',
   'One ordinary day here, start to finish. Doors open, kit goes out, someone learns something, someone finishes a thing they have been chipping at for weeks. Come see it. #MadeAtLabForUs #labforus',
   'A bold title card reading A day in the life at Lab for Us over a photo of the studio.',
   false, 'not_needed')
) as seed(title, channel, pillar, format, template, cta, owner, status, post_date,
          caption, alt_text, is_reshare, permission_status)
where not exists (select 1 from posts);
