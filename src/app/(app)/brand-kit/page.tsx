import Swatches from "@/components/Swatches";
import { DIVIDERS, HASHTAGS, SQUIGGLES } from "@/lib/content";

export const metadata = { title: "Brand kit — Lab for Us" };

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
            here stay in step.
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
            The full set, straight from the design system. Squiggles are
            accents, dividers are section breaks, the mascot is a sparing guide,
            and the logo carries the wordmark.
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
          <h3>Type</h3>
          <p className="strat-lead" style={{ marginBottom: 14 }}>
            <strong style={{ fontFamily: "var(--disp)", fontWeight: 800 }}>
              Baloo 2
            </strong>{" "}
            at 700 to 800 for headings, the bold rounded look.{" "}
            <strong style={{ fontWeight: 600 }}>Inter</strong> at 400 to 600 for
            body and UI.
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
