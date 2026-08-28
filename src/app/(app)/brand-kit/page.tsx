import Swatches from "@/components/Swatches";
import { DIVIDERS, HASHTAGS, SQUIGGLES } from "@/lib/content";

export const metadata = { title: "Brand kit · Lab for Us" };

/**
 * The team's identity additions (2026-08-27): the logo family and the
 * walking pencil, cropped from their visual identity board.
 */
const LOGO_FAMILY = [
  { src: "/brand/team/logo-black.png", alt: "The stacked Labs For Us wordmark in black" },
  { src: "/brand/team/logo-colorful.png", alt: "The stacked Labs For Us wordmark with each letter in a palette colour" },
  { src: "/brand/team/logo-white.png", alt: "The stacked Labs For Us wordmark in white, shown on a dark tile", dark: true },
  { src: "/brand/identity/mark-hands.webp", alt: "A circular line drawing of many hands making things, ringed by the words Lab For Us" },
  { src: "/brand/identity/badge-grey.webp", alt: "The wordmark inside a soft grey circle badge" },
  { src: "/brand/identity/badge-cream.webp", alt: "The colourful wordmark inside a cream circle badge" },
  { src: "/brand/identity/badge-outline.webp", alt: "The wordmark inside a thin black outline circle" },
  { src: "/brand/team/pencil-badge.png", alt: "The pencil mascot ringed by the words Connecting art, research, community for change" },
];

/** LABFORUS spelled in the team's custom letterform PNGs. */
const LETTERFORM_SAMPLE = ["L", "A", "B", "F", "O", "R", "U", "S"];

const STICKERS = [
  { src: "/brand/team/whats-new.png", alt: "A colourful What's New sticker in the custom letterforms" },
  { src: "/brand/team/whats-new-2.png", alt: "A second What's New sticker variant" },
  { src: "/brand/team/pencilman.png", alt: "The pencil mascot standing on its own" },
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
            here stay in step. The colour meanings come from the team&apos;s
            visual identity work.
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="pencil-gif"
                src="/brand/team/pencilman.gif"
                alt="The pencil mascot walking, an animated loop"
              />
              <p className="note">
                The identity board from the team, with the walking
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
              <div className={"gtile" + ("dark" in m && m.dark ? " dark" : "")} key={m.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="note">
            The black, colour, and white wordmarks and the pencil badge are the
            team&apos;s own files. The print-ready vector versions, including
            each vinyl-cut letter and the full colour logo at 70 by 70 cm, are
            inside the downloadable kit under vinyl-print.
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

        <div className="assetbox">
          <h3>The custom letterforms</h3>
          <p className="strat-subnote" style={{ marginBottom: 12 }}>
            The team&apos;s own alphabet, one file per character, ready to
            assemble into headlines and stickers.
          </p>
          <div className="letterrow" aria-label="LABFORUS spelled in the custom letterforms">
            {LETTERFORM_SAMPLE.map((ch, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={"/brand/type/" + ch + ".png"} alt={ch} />
            ))}
          </div>
          <p className="subhead">Stickers</p>
          <div className="gallery">
            {STICKERS.map((m) => (
              <div className="gtile" key={m.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="note">
            The full set, numbers and uppercase plus most of the lowercase,
            ships in the downloadable kit as individual files.
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
            letterforms</strong>, now in the kit as one image per character.
            Running text uses <strong>Open Sauce</strong>. This hub stands in
            with Baloo 2 and Inter, since an installable font file for the
            letterforms does not exist yet; the templates in Canva are where
            the real letterforms live.
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
