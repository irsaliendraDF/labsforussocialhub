"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LayerGlyph } from "@/components/BlueprintIcons";
import {
  LAYERS,
  LINES,
  MOMENTS,
  STEPS,
  type LayerId,
  type Step,
  type TagTone,
  type Where,
} from "@/lib/blueprint";

/*
 * The service blueprint diagram, drawn from src/lib/blueprint.ts. Geometry
 * lives here, content lives in the data file. The diagram is wide by nature,
 * so it zooms and pans inside its own frame rather than squashing to fit.
 */

const W = 1560;
const H = 892;
const BOX_W = 208;
const colX = (i: number) => 180 + 228 * i;

const INK = "#221f19";
const MUTED = "#6a6155";
const FAINT = "#8a8173";
const GROUND = "#fffdf7";
const EMPTY_LINE = "#d6ccb6";
const DECIDE = "#e04e10";

type Row = {
  band: [number, number];
  box: [number, number];
  sys: number | null;
  title: number;
  first: number;
  step: number;
  tag: number | null;
  gutter: string[];
  gutterNote?: string[];
  iconY: number;
  labelY: number;
  noteY?: number;
  bandFill: string;
  bandOpacity: number;
  tone: string;
  boldTitle?: boolean;
};

const ROWS: Record<LayerId, Row> = {
  physical: {
    band: [52, 88], box: [60, 72], sys: null, title: 76, first: 91, step: 15, tag: 124,
    gutter: ["PHYSICAL", "SPACE"], iconY: 80, labelY: 92,
    bandFill: "#2a6a12", bandOpacity: 0.045, tone: "#2a6a12",
  },
  user: {
    band: [150, 88], box: [158, 72], sys: null, title: 178, first: 196, step: 17, tag: null,
    gutter: ["USER", "ACTION"], iconY: 178, labelY: 190,
    bandFill: "#edb919", bandOpacity: 0.08, tone: "#a5820c", boldTitle: true,
  },
  digital: {
    band: [268, 112], box: [276, 96], sys: 292, title: 311, first: 328, step: 17, tag: 365,
    gutter: ["DIGITAL", "ACTIONS"], gutterNote: ["what the team does", "on a screen"],
    iconY: 300, labelY: 312, noteY: 348,
    bandFill: "#2b29e6", bandOpacity: 0.035, tone: "#2b29e6",
  },
  inperson: {
    band: [392, 112], box: [400, 96], sys: 416, title: 435, first: 452, step: 17, tag: 489,
    gutter: ["IN PERSON", "ACTIONS"], gutterNote: ["what the team does", "face to face"],
    iconY: 424, labelY: 436, noteY: 472,
    bandFill: "#2a6a12", bandOpacity: 0.045, tone: "#2a6a12",
  },
  backstage: {
    band: [534, 112], box: [542, 96], sys: 558, title: 577, first: 594, step: 17, tag: 631,
    gutter: ["BACKSTAGE", "DIGITAL", "ACTIONS"], gutterNote: ["out of the", "visitor’s sight"],
    iconY: 552, labelY: 566, noteY: 616,
    bandFill: "#5350c4", bandOpacity: 0.05, tone: "#5350c4",
  },
  support: {
    band: [676, 104], box: [684, 88], sys: 700, title: 719, first: 736, step: 17, tag: 768,
    gutter: ["SUPPORT", "PROCESSES"], iconY: 702, labelY: 714,
    bandFill: "#221f19", bandOpacity: 0.03, tone: MUTED,
  },
};

const WHERE: Record<Where, { stroke: string; fill: string; op: number; label: string }> = {
  in_person: { stroke: "#2a6a12", fill: "#2a6a12", op: 0.09, label: "IN PERSON" },
  digital_library: { stroke: "#2b29e6", fill: "#2b29e6", op: 0.09, label: "DIGITAL LIBRARY" },
  social_hub: { stroke: "#0f8f97", fill: "#0f8f97", op: 0.11, label: "SOCIAL HUB" },
  visitor: { stroke: "#a5820c", fill: "#edb919", op: 0.16, label: "" },
  none: { stroke: EMPTY_LINE, fill: "none", op: 0, label: "" },
};

/** New ideas that still need scoping with Paul are drawn in his colour. */
const SCOPE = { stroke: "#c72b4d", fill: "#c72b4d", op: 0.07 };

const TONE: Record<TagTone, string> = {
  built: "#2a6a12",
  open: DECIDE,
  paul: "#c72b4d",
  irene: "#2b29e6",
  anissa: "#5350c4",
  team: "#5350c4",
};

const LEGEND: { label: string; stroke: string; fill: string; op: number; dashed?: boolean; star?: boolean }[] = [
  { label: "IN PERSON", stroke: "#2a6a12", fill: "#2a6a12", op: 0.12 },
  { label: "DIGITAL LIBRARY", stroke: "#2b29e6", fill: "#2b29e6", op: 0.1 },
  { label: "SOCIAL HUB", stroke: "#0f8f97", fill: "#0f8f97", op: 0.12 },
  { label: "THE VISITOR’S OWN STEP", stroke: "#a5820c", fill: "#edb919", op: 0.18 },
  { label: "NEW, TO SCOPE WITH PAUL", stroke: "#c72b4d", fill: "#c72b4d", op: 0.1, dashed: true },
  { label: "NEEDS A DECISION", stroke: DECIDE, fill: DECIDE, op: 1, star: true },
  { label: "NO STEP AT THIS MOMENT", stroke: EMPTY_LINE, fill: "none", op: 0, dashed: true },
];

function StepBox({
  step, x, y, h, row, compact = false,
}: {
  step: Step; x: number; y: number; h: number; row: Row; compact?: boolean;
}) {
  if (step.where === "none") {
    const n = step.lines.length;
    const start = y + h / 2 - ((n - 1) * 17) / 2 + 4;
    return (
      <g>
        <rect x={x} y={y} width={BOX_W} height={h} rx={4} fill="none" stroke={EMPTY_LINE} strokeWidth={1.4} strokeDasharray="4 4" />
        {step.lines.map((l, i) => (
          <text key={i} x={x + 11} y={start + i * 17} fill={FAINT}>{l}</text>
        ))}
      </g>
    );
  }

  const scope = step.status === "to_scope";
  const st = scope ? SCOPE : WHERE[step.where];
  const solid = step.status === "built" || step.status === "written";
  const off = row.box[0];
  const sysY = compact ? y + 16 : row.sys === null ? null : y + (row.sys - off);
  const titleY = compact ? y + 35 : y + (row.title - off);
  const firstY = y + (row.first - off);
  const tagY = compact || row.tag === null ? null : y + (row.tag - off);
  const label = step.label ?? WHERE[step.where].label;

  return (
    <g>
      <rect
        x={x} y={y} width={BOX_W} height={h} rx={4}
        fill={st.fill} fillOpacity={st.op} stroke={st.stroke} strokeWidth={1.3}
        strokeDasharray={solid ? undefined : "5 3"}
      />
      {sysY !== null && label && (
        <text x={x + 11} y={sysY} fill={st.stroke} fontSize={8} fontWeight={700} letterSpacing={0.6}>{label}</text>
      )}
      {step.title && (
        <text x={x + 11} y={titleY} fill={INK} fontWeight={row.boldTitle ? 600 : 400}>{step.title}</text>
      )}
      {!compact && step.lines.map((l, i) => (
        <text key={i} x={x + 11} y={firstY + i * row.step} fill={MUTED}>{l}</text>
      ))}
      {tagY !== null && step.tag && (
        <text x={x + 11} y={tagY} fill={TONE[step.tone ?? "team"]} fontSize={8} fontWeight={700} letterSpacing={0.4}>{step.tag}</text>
      )}
      {step.star && <use href="#bp-star" x={x + BOX_W - 16} y={y + 14} />}
    </g>
  );
}

function Diagram() {
  const cells = LAYERS.flatMap((layer) =>
    MOMENTS.map((m, mi) => {
      const steps = STEPS.filter((s) => s.layer === layer.id && s.moment === m.id);
      if (!steps.length) return null;
      const row = ROWS[layer.id];
      const x = colX(mi);
      const key = `${layer.id}-${m.id}`;
      if (steps.length === 1) {
        return <StepBox key={key} step={steps[0]} x={x} y={row.box[0]} h={row.box[1]} row={row} />;
      }
      const gap = 6;
      const h1 = Math.ceil((row.box[1] - gap) / 2);
      const h2 = row.box[1] - gap - h1;
      return (
        <g key={key}>
          <StepBox step={steps[0]} x={x} y={row.box[0]} h={h1} row={row} compact />
          <StepBox step={steps[1]} x={x} y={row.box[0] + h1 + gap} h={h2} row={row} compact />
        </g>
      );
    }),
  );

  let lx = 180;
  const legend = LEGEND.map((item) => {
    const x = lx;
    lx += 20 + item.label.length * 6.6 + 34;
    return { ...item, x };
  });

  return (
    <>
      <defs>
        <g id="bp-star">
          <polygon
            points="0,-7 1.7,-2.35 6.66,-2.16 2.76,0.9 4.12,5.66 0,2.9 -4.12,5.66 -2.76,0.9 -6.66,-2.16 -1.7,-2.35"
            fill={DECIDE} stroke={GROUND} strokeWidth={1.1} strokeLinejoin="round"
          />
        </g>
        <marker id="bp-loop" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f8f97" />
        </marker>
      </defs>

      {/* Moments across the top */}
      <g style={{ fontFamily: "var(--body)" }} fontSize={10.5} fontWeight={600} letterSpacing={1.4} fill={FAINT}>
        {MOMENTS.map((m, i) => (
          <text key={m.id} x={colX(i)} y={16}>{String(i + 1).padStart(2, "0")}</text>
        ))}
      </g>
      <g style={{ fontFamily: "var(--disp)" }} fontSize={16} fontWeight={700} fill={INK}>
        {MOMENTS.map((m, i) => (
          <text key={m.id} x={colX(i)} y={39}>{m.label}</text>
        ))}
      </g>

      {/* Layer bands */}
      {LAYERS.map((l) => {
        const r = ROWS[l.id];
        return <rect key={l.id} x={168} y={r.band[0]} width={1372} height={r.band[1]} rx={5} fill={r.bandFill} fillOpacity={r.bandOpacity} />;
      })}

      {/* Layer names down the side */}
      <g style={{ fontFamily: "var(--body)" }} fontSize={10} fontWeight={700} letterSpacing={1.1}>
        {LAYERS.map((l) => {
          const r = ROWS[l.id];
          return (
            <g key={l.id}>
              <g transform={`translate(14 ${r.iconY})`} fill="none" stroke={r.tone} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <LayerGlyph kind={l.icon} />
              </g>
              {r.gutter.map((t, i) => (
                <text key={t} x={40} y={r.labelY + i * 14} fill={r.tone}>{t}</text>
              ))}
              {r.gutterNote && r.noteY !== undefined && r.gutterNote.map((t, i) => (
                <text key={t} x={14} y={r.noteY! + i * 12} fill={FAINT} fontSize={9} fontWeight={400} letterSpacing={0}>{t}</text>
              ))}
            </g>
          );
        })}
      </g>

      {/* The three lines */}
      <g style={{ fontFamily: "var(--body)" }}>
        {LINES.map((line) => {
          const y = ROWS[line.above].band[0] - 14;
          const label = line.label.toUpperCase();
          const w = label.length * 8.4 + 44;
          return (
            <g key={line.label}>
              <line x1={14} y1={y} x2={1540} y2={y} stroke={INK} strokeWidth={1.4} strokeDasharray="9 5" />
              <rect x={782 - w / 2} y={y - 10} width={w} height={20} rx={10} fill={GROUND} />
              <text x={782} y={y + 4} textAnchor="middle" fill={INK} fontSize={9.5} fontWeight={700} letterSpacing={1.6}>{label}</text>
            </g>
          );
        })}
      </g>

      {/* The steps */}
      <g style={{ fontFamily: "var(--body)" }} fontSize={10.5}>
        {cells}
      </g>

      {/* The loop: what gets made refills the calendar */}
      <path
        d="M 1424 778 C 1424 812, 900 820, 284 820 C 220 820, 200 810, 195 784"
        fill="none" stroke="#0f8f97" strokeWidth={1.8} strokeDasharray="6 4" markerEnd="url(#bp-loop)"
      />
      <rect x={612} y={808} width={340} height={20} rx={10} fill={GROUND} />
      <text x={782} y={822} textAnchor="middle" style={{ fontFamily: "var(--body)" }} fontSize={9.5} fontWeight={700} letterSpacing={1} fill="#0f8f97">
        WHAT GETS MADE HERE REFILLS THE CALENDAR
      </text>

      {/* Legend */}
      <g style={{ fontFamily: "var(--body)" }} fontSize={9.5} fontWeight={600} letterSpacing={0.7}>
        {legend.map((item) => (
          <g key={item.label}>
            {item.star ? (
              <use href="#bp-star" x={item.x + 6} y={866} />
            ) : (
              <rect
                x={item.x} y={860} width={13} height={13} rx={3}
                fill={item.fill} fillOpacity={item.op} stroke={item.stroke} strokeWidth={1.4}
                strokeDasharray={item.dashed ? "4 3" : undefined}
              />
            )}
            <text x={item.x + 20} y={870} fill={item.stroke === EMPTY_LINE ? FAINT : item.stroke}>{item.label}</text>
          </g>
        ))}
      </g>
    </>
  );
}

export default function BlueprintDiagram() {
  const box = useRef<HTMLDivElement>(null);
  const atFit = useRef(true);
  const drag = useRef<{ x: number; y: number; l: number; t: number } | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  const fitZoom = useCallback(() => {
    const el = box.current;
    if (!el) return 1;
    return Math.max(0.3, Math.min(1, (el.clientWidth - 24) / W));
  }, []);

  useEffect(() => {
    setZoom(fitZoom());
    const onResize = () => {
      if (atFit.current) setZoom(fitZoom());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fitZoom]);

  const zoomBy = (factor: number) => {
    const el = box.current;
    const current = zoom ?? fitZoom();
    const next = Math.max(0.3, Math.min(3, current * factor));
    atFit.current = false;
    setZoom(next);
    if (!el) return;
    const cx = el.scrollLeft + el.clientWidth / 2;
    const cy = el.scrollTop + el.clientHeight / 2;
    const ratio = next / current;
    requestAnimationFrame(() => {
      el.scrollLeft = cx * ratio - el.clientWidth / 2;
      el.scrollTop = cy * ratio - el.clientHeight / 2;
    });
  };

  const toFit = () => {
    atFit.current = true;
    setZoom(fitZoom());
    box.current?.scrollTo(0, 0);
  };

  const toFull = () => {
    atFit.current = false;
    setZoom(1);
    box.current?.scrollTo(0, 0);
  };

  // Mouse drag pans the frame. Touch already scrolls natively, so it is left alone.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = box.current;
    if (!el) return;
    drag.current = { x: e.clientX, y: e.clientY, l: el.scrollLeft, t: el.scrollTop };
    el.setPointerCapture(e.pointerId);
    setGrabbing(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = box.current;
    if (!d || !el) return;
    el.scrollLeft = d.l - (e.clientX - d.x);
    el.scrollTop = d.t - (e.clientY - d.y);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    setGrabbing(false);
    try {
      box.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <div className="bp-frame">
      <div className="bp-zoombar">
        <button type="button" className="btn sm" onClick={() => zoomBy(1 / 1.25)} aria-label="Zoom out">−</button>
        <span className="bp-zlevel">{zoom === null ? "Fit" : `${Math.round(zoom * 100)}%`}</span>
        <button type="button" className="btn sm" onClick={() => zoomBy(1.25)} aria-label="Zoom in">+</button>
        <button type="button" className="btn sm" onClick={toFit}>Fit</button>
        <button type="button" className="btn sm" onClick={toFull}>Full size</button>
        <span className="bp-zhint">Drag or scroll to move around</span>
      </div>
      <div
        ref={box}
        className={`bp-scroller${grabbing ? " grabbing" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: zoom === null ? "100%" : Math.round(W * zoom) }}
          role="img"
          aria-label="Service blueprint for Lab for Us across six moments, from reach to return and share, and six layers, from the physical space down to the support processes. Green marks in person, blue the Digital Library, teal the Social Hub, gold the visitor’s own step, and an orange star a decision that is still open."
        >
          <Diagram />
        </svg>
      </div>
    </div>
  );
}
