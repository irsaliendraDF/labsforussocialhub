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
  ('inacts', 'Imagine a different future', '#121212', 'How do we imagine a different future than what we have today? Imagining possible futures, because this cannot be the end.', 1),
  ('inacts', 'Change the systems',          '#3d3d3d', 'How do we change the system so that future can be realized? Ways to innovate that are not harmful, including quiet activism.', 2),
  ('inacts', 'Make spaces',                 '#5e5e5e', 'How do we create spaces where people can come together to imagine these systems and futures intersecting? Lab for Us, the Digital Library and the institute.', 3),
  ('inacts', 'Youth-led futures',           '#808080', 'We prioritize young people, and the futures are youth-led.', 4),
  -- Earlier names, kept so posts that still carry them stay valid. Replaced 2026-11-21.
  ('inacts', 'In practice',        '#121212', 'Replaced.', 5),
  ('inacts', 'In evidence',        '#3d3d3d', 'Replaced.', 6),
  ('inacts', 'In public',          '#5e5e5e', 'Replaced.', 7),
  ('inacts', 'In company',         '#808080', 'Replaced.', 8),
  ('inacts', 'In the open',        '#a3a3a3', 'Replaced.', 9),
  ('inacts', 'Systems of care',    '#121212', 'Replaced.', 10),
  ('inacts', 'Imagined futures',   '#3d3d3d', 'Replaced.', 11),
  ('inacts', 'Spaces to gather',   '#5e5e5e', 'Replaced.', 12),
  ('inacts', 'Quiet activism',     '#808080', 'Replaced.', 13),
  ('inacts', 'Across disciplines', '#a3a3a3', 'Replaced.', 14)
on conflict (name) do update
  set hub         = excluded.hub,
      color       = excluded.color,
      description = excluded.description,
      sort_order  = excluded.sort_order;

-- InACTS has no Canva templates yet, so nothing is inserted into templates.
-- The composer drops the template field for a hub that has none.
