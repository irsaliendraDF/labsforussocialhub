import Swatches from "@/components/Swatches";
import { DIVIDERS, HASHTAGS, SQUIGGLES } from "@/lib/content";

export const metadata = { title: "Brand kit · Lab for Us" };

/**
 * The researchers' identity additions (2026-08-27): the logo family and the
 * walking pencil, cropped from their visual identity board.
 */
const LOGO_FAMILY = [
  { src: "/brand/identity/wordmark-black.webp", alt: "The stacked Labs For Us wordmark in black" },
  { src: "/brand/identity/wordmark-color.webp", alt: "The stacked Labs For Us wordmark with each letter in a palette colour" },
  { src: "/brand/identity/mark-hands.webp", alt: "A circular line drawing of many hands making things, ringed by the words Lab For Us" },
  { src: "/brand/identity/badge-grey.webp", alt: "The wordmark inside a soft grey circle badge" },
  { src: "/brand/identity/badge-cream.webp", alt: "The colourful wordmark inside a cream circle badge" },
  { src: "/brand/identity/badge-outline.webp", alt: "The wordmark inside a thin black outline circle" },
  { src: "/brand/identity/badge-pencil.webp", alt: "The pencil mascot ringed by the words Connecting art, research, community for change" },
];

const ACTION_WORDS = [
  "watch", "play", "craft", "thinker", "share", "grow",
  "experiment", "learn", "interact", "build", "discover",
];

const WORD_COLORS = [
  "#f46129", "#3d3bf5", "#edb919", "#2a6b12", "#9191ea",
  "#5ce1e6", "#db385a",
];

export default function BrandKitPage() {
  return (
    <>
      <div className="head-row">
        <div className="page-head">
          <span className="eyebrow">Strategy</span>
          <h1>Brand kit</h1>
          <p>
            Tap any colour to copy its hex. These are the same values loaded
            into the Canva Brand Kit, so what you build there and what you see
            here stay in step. The colour meanings come from the research
            team&apos;s visual identity work.
          </p>
        </div>
        <a
          className="btn solid head-action"
          href="/Lab_for_Us_Brand_Kit.zip"
          download="Lab_for_Us_Brand_Kit.zip"
        >
          Grab the brand kit
        </a>
      </div>

      <Swatches />

      <div className="brand-extra">
        <div className="assetbox">
          <h3>The identity in motion</h3>
          <div className="idmotion">
            <video
              src="/brand/identity/identity-board.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-label="The Lab for Us visual identity board: wordmark, palette, logo family, and the walking pencil animation"
            />
            <div className="idmotion-side">
              <video
                src="/brand/identity/pencil-walk.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="The pencil mascot walking"
              />
              <p className="note">
                The identity board from the research team, with the walking
                pencil that anchors the animated side of the brand. Use the
                loop anywhere a little life helps: Stories, page headers, the
                end of a Reel.
              </p>
            </div>
          </div>
        </div>

        <div className="assetbox">
          <h3>The logo family</h3>
          <p className="strat-subnote" style={{ marginBottom: 12 }}>
            One wordmark, many coats. Black for quiet contexts, colour for
            loud ones, badges when it needs to sit on a photo, and the hands
            mark when the community is the story.
          </p>
          <div className="gallery logos">
            {LOGO_FAMILY.map((m) => (
              <div className="gtile" key={m.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="note">
            Cropped from the identity board for reference here; the original
            vector files live with the research team and belong in the shared
            Canva folder.
          </p>
        </div>

        <div className="assetbox">
          <h3>Brand elements</h3>
          <div className="marks">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt="Lab for Us logo" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/mascot.webp" alt="Lab for Us pencil mascot" />
          </div>

          <p className="subhead">Squiggles</p>
          <div className="gallery">
            {SQUIGGLES.map((src) => (
              <div className="gtile" key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Lab for Us brand element" loading="lazy" />
              </div>
            ))}
          </div>

          <p className="subhead">Dividers</p>
          <div className="gallery">
            {DIVIDERS.map((src) => (
              <div className="gtile" key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Lab for Us brand element" loading="lazy" />
              </div>
            ))}
          </div>

          <p className="note">
            Squiggles are accents, dividers are section breaks, the mascot is a
            sparing guide, and the logo carries the wordmark.
          </p>
        </div>

        <div className="assetbox hashbox">
          <h3>Campaign hashtag</h3>
          <div className="tagrow">
            {HASHTAGS.map((h) => (
              <span className="tag" key={h}>
                {h}
              </span>
            ))}
          </div>
          <p className="note">
            On every post and reshare. No reward tied to it yet.
          </p>
        </div>

        <div className="assetbox">
          <h3>Words we build from</h3>
          <p className="strat-subnote" style={{ marginBottom: 12 }}>
            The verbs of the space, straight from the identity work. Reach for
            them in captions, Stories, and headlines.
          </p>
          <div className="fmts">
            {ACTION_WORDS.map((w, i) => (
              <span className="fmtchip wordchip" key={w}>
                <span
                  className="dot"
                  style={{
                    background: WORD_COLORS[i % WORD_COLORS.length],
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    marginRight: 7,
                  }}
                />
                {w}.
              </span>
            ))}
          </div>
        </div>

        <div className="assetbox">
          <h3>The institute behind the space</h3>
          <p className="strat-lead" style={{ marginBottom: 10 }}>
            Lab for Us grows out of InACTS, the Institute of Art, Community,
            and Transdisciplinary Studies: a space for research and creative
            practice committed to equity, belonging, and social justice,
            community-based and participatory research, accessible and
            inclusive design, and knowledge as a living, collective, visual
            practice.
          </p>
          <p className="strat-lead" style={{ marginBottom: 0 }}>
            In short: turning research into accessible and transformative art,
            speaking <em>with</em> the public rather than about them, and
            making visuals that welcome, connect, and invite. Every post this
            hub sends out is carrying that.
          </p>
        </div>

        <div className="assetbox">
          <h3>Type</h3>
          <p className="strat-lead" style={{ marginBottom: 14 }}>
            Headlines belong to the team&apos;s <strong>custom Lab for Us
            letterforms</strong>, the playful cut alphabet from the identity
            work. Running text uses <strong>Open Sauce</strong>. This hub
            stands in with Baloo 2 and Inter until the font files join the
            shared kit; the templates in Canva are where the real letterforms
            live.
          </p>
          <p
            style={{
              fontFamily: "var(--disp)",
              fontWeight: 800,
              fontSize: 34,
              lineHeight: 1.1,
              margin: "0 0 6px",
            }}
          >
            Made at Lab for Us
          </p>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            A space for art, community, creativity, and collaboration.
          </p>
        </div>
      </div>
    </>
  );
}
