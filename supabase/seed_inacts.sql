-- ============================================================
-- InACTS pillars
--
-- Run after supabase/hub.sql. Safe to re-run: it updates in place.
--
-- The names come out of the institute's own name. InACTS carries "in acts",
-- so each pillar is an "in" and the second word does the work. The colours
-- are a neutral ramp rather than the Lab for Us palette, because InACTS reads
-- as a research brand in black and white, and the label always carries the
-- meaning so nothing depends on telling two greys apart.
--
-- Names are unique across both hubs, which is what lets the two sets share a
-- table keyed by name.
-- ============================================================

insert into pillars (hub, name, color, description, sort_order) values
  ('inacts', 'Systems of care',    '#121212', 'How people and places take care of each other, and what care and repair structures look like.', 1),
  ('inacts', 'Imagined futures',   '#3d3d3d', 'What young people and communities picture when this cannot be the end, and the systems that would hold it.', 2),
  ('inacts', 'Spaces to gather',   '#5e5e5e', 'The places where people come together to imagine and design: Lab for Us, the library, the lab.', 3),
  ('inacts', 'Quiet activism',     '#808080', 'Small, subtle acts that move things, and what they change.', 4),
  ('inacts', 'Across disciplines', '#a3a3a3', 'Art education and innovation and entrepreneurship crossing until neither stands alone, shown and not defined.', 5),
  -- The first five, kept so the six starter posts that still carry these names stay valid.
  ('inacts', 'In practice', '#121212', 'Replaced 2026-11-21. How the work is done: participatory, asset based, trauma informed.', 6),
  ('inacts', 'In evidence', '#3d3d3d', 'Replaced 2026-11-21. What the making taught us, read out of the projects and the Digital Library.', 7),
  ('inacts', 'In public',   '#5e5e5e', 'Replaced 2026-11-21. Libraries, galleries and schools, and who they are built for.', 8),
  ('inacts', 'In company',  '#808080', 'Replaced 2026-11-21. Partners, collaborators and youth co-producers, credited as makers.', 9),
  ('inacts', 'In the open', '#a3a3a3', 'Replaced 2026-11-21. What InACTS is, how to work with it, calls, invitations and news.', 10)
on conflict (name) do update
  set hub         = excluded.hub,
      color       = excluded.color,
      description = excluded.description,
      sort_order  = excluded.sort_order;

-- InACTS has no Canva templates yet, so nothing is inserted into templates.
-- The composer drops the template field for a hub that has none.
