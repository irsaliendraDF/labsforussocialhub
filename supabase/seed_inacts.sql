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
  ('inacts', 'In practice', '#121212', 'How the work is done: participatory, asset based, trauma informed.', 1),
  ('inacts', 'In evidence', '#3d3d3d', 'What the making taught us, read out of the projects and the Digital Library.', 2),
  ('inacts', 'In public',   '#5e5e5e', 'Libraries, galleries and schools, and who they are built for.', 3),
  ('inacts', 'In company',  '#808080', 'Partners, collaborators and youth co-producers, credited as makers.', 4),
  ('inacts', 'In the open', '#a3a3a3', 'What InACTS is, how to work with it, calls, invitations and news.', 5)
on conflict (name) do update
  set hub         = excluded.hub,
      color       = excluded.color,
      description = excluded.description,
      sort_order  = excluded.sort_order;

-- InACTS has no Canva templates yet, so nothing is inserted into templates.
-- The composer drops the template field for a hub that has none.
