-- ============================================================
-- Lab for Us seed data
-- Run after schema.sql. Safe to re-run: everything upserts.
--
-- Seeds the strategy (5 pillars, 18 templates with their real Canva links).
-- The `posts` table is deliberately NOT seeded. The calendar starts empty so
-- the team plans their own run.
-- ============================================================

insert into pillars (name, color, description, sort_order) values
  ('For Us',                  '#db385a', 'Mission and who the space is for. Belonging and access.', 1),
  ('The space and its tools', '#3d3bf5', 'The place, the equipment, and the Digital Library catalog.', 2),
  ('Access and how it works', '#f46129', 'Booking, tips, and lowering the barrier to using the space.', 3),
  ('People and community',    '#2a6a12', 'The artists, students, facilitators, groups, and collaborations.', 4),
  ('Made here',               '#edb919', 'The creative work and projects that come out of the space.', 5)
on conflict (name) do update
  set color       = excluded.color,
      description = excluded.description,
      sort_order  = excluded.sort_order;

-- Canva URLs point at the real "Lab for Us: ..." designs by stable design ID,
-- so each template card opens that exact template in the editor.
insert into templates (name, pillar, description, canva_url, sort_order) values
  ('Launch announcement',        'For Us',                  'Logo front and center with a clear sign-up call to action.', 'https://www.canva.com/design/DAHR4gdBk_U/edit', 1),
  ('Mission / quote',            'For Us',                  'Type-led, using the palette and squiggles.',                 'https://www.canva.com/design/DAHR4luYxiQ/edit', 2),
  ('LinkedIn post',              'For Us',                  'A cleaner layout tuned for the LinkedIn feed.',              'https://www.canva.com/design/DAHR44lUYDE/edit', 3),
  ('Thank a partner',            'For Us',                  'A warm shout-out to a partner or funder.',                   'https://www.canva.com/design/DAHR43pzOM8/edit', 4),
  ('Behind the scenes',          'The space and its tools', 'A peek at the space, the gear, and the making in progress.', 'https://www.canva.com/design/DAHR43jq__M/edit', 5),
  ('Day in the life cover',      'The space and its tools', 'A bold title card for a day-in-the-life Reel.',              'https://www.canva.com/design/DAHR4tsQ6Fk/edit', 6),
  ('Event announcement',         'The space and its tools', 'Date, time, and location for what''s happening.',            'https://www.canva.com/design/DAHR4ve8DNo/edit', 7),
  ('Tip / how-to',               'Access and how it works', 'A single quick tip on booking or using the space.',          'https://www.canva.com/design/DAHR4p0hh4I/edit', 8),
  ('Carousel: how-to',           'Access and how it works', 'A swipeable, step-by-step how-to for using the space.',      'https://www.canva.com/design/DAHR4_jBEpU/edit', 9),
  ('Carousel: common questions', 'Access and how it works', 'A multi-slide answer to the questions people ask most.',     'https://www.canva.com/design/DAHR44OLuv4/edit', 10),
  ('Hours or closure notice',    'Access and how it works', 'A quick notice for opening hours or a closure.',             'https://www.canva.com/design/DAHR477i1kc/edit', 11),
  ('Maker spotlight',            'People and community',    'Photo area plus a name and a short quote.',                  'https://www.canva.com/design/DAHR4piLudw/edit', 12),
  ('Carousel: member story',     'People and community',    'A member''s story told across a few slides.',                'https://www.canva.com/design/DAHR47BR9Gw/edit', 13),
  ('Testimonial',                'People and community',    'A member or partner quote, front and center.',               'https://www.canva.com/design/DAHR4_GGGdw/edit', 14),
  ('Call for submissions',       'People and community',    'Invite the community to submit their work or ideas.',        'https://www.canva.com/design/DAHR45P5nNA/edit', 15),
  ('Workshop or class',          'People and community',    'Announce a workshop or class and how to join.',              'https://www.canva.com/design/DAHR4wZHdFg/edit', 16),
  ('Community reshare frame',    'Made here',               'A branded frame for reposting member work.',                 'https://www.canva.com/design/DAHR41doXrY/edit', 17),
  ('Hashtag lockup',             'Made here',               'A sticker-style #MadeAtLabForUs for any post or Story.',     'https://www.canva.com/design/DAHR451tRDs/edit', 18)
on conflict (name) do update
  set pillar      = excluded.pillar,
      description = excluded.description,
      canva_url   = excluded.canva_url,
      sort_order  = excluded.sort_order;
