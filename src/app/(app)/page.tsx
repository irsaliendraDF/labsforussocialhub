import Link from "next/link";
import { DIVIDERS, FORMATS, PILLARS } from "@/lib/content";

export const metadata = { title: "Overview — Lab for Us" };

export default function OverviewPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Strategy</span>
        <h1>Everything the team needs to post as Lab for Us.</h1>
        <p>
          The brand kit, the pillars, the templates, and a living content
          calendar, all in one place. Plan it here, make it in Canva, schedule
          it, and watch how it lands.
        </p>
      </div>

      <div className="stack">
        <div className="assetbox">
          <h3>The goal</h3>
          <p className="strat-lead">
            Lab for Us is a space for art, community, creativity, and
            collaboration. The content exists to get people onto the platform
            and keep the conversation going. Right now it is about activating
            and engaging, not hitting set numbers.
          </p>
        </div>

        <div className="strat-grid">
          <div className="assetbox">
            <h3>Channels and cadence</h3>
            <div className="chan">
              <div className="chan-card ig">
                <h4>Instagram</h4>
                <p className="cad">2 to 3 posts a week</p>
                <p className="role">
                  Visual and community facing. Reels, Stories, and spotlights.
                  Posts live at @labforus.
                </p>
              </div>
              <div className="chan-card li">
                <h4>LinkedIn</h4>
                <p className="cad">1 post a week</p>
                <p className="role">
                  Institutional and credibility. Partners, funders, outcomes,
                  and the mission.
                </p>
              </div>
            </div>
          </div>

          <div className="assetbox">
            <h3>Formats that feed the pillars</h3>
            <div className="fmts">
              {FORMATS.map((f) => (
                <span className="fmtchip" key={f}>
                  {f}
                </span>
              ))}
            </div>
            <p className="note">
              These are the vehicles, not the themes. Not an exhaustive list,
              just the top-performing formats to draw from, and it can grow.
            </p>
          </div>
        </div>
      </div>

      <h2 className="strat-sub">Content pillars</h2>
      <p className="strat-subnote">
        Five themes drawn from what Lab for Us is. Every post ladders up to one.
      </p>
      <div className="pillars">
        {PILLARS.map((p) => (
          <div className="pill" key={p.name}>
            <div className="cap" style={{ background: p.color }} />
            <div className="bd">
              <h3>
                <span className="dot" style={{ background: p.color }} />
                {p.name}
              </h3>
              <p>{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DIVIDERS[0]}
        alt=""
        style={{ height: 18, width: "auto", margin: "34px 0 26px" }}
      />

      <h2 className="strat-sub" style={{ marginTop: 0 }}>
        How the week runs
      </h2>
      <p className="strat-subnote">
        The loop this hub is built around. Everyone sees the same board.
      </p>
      <div className="strat-grid">
        <div className="assetbox">
          <h3>Plan and make</h3>
          <p className="strat-lead">
            Open the <Link href="/calendar">Calendar</Link>, plan a post against
            a pillar and a template, then jump to that{" "}
            <Link href="/templates">template in Canva</Link>, duplicate it, and
            paste the finished link back onto the post. Move it through Idea,
            Drafting, and Ready.
          </p>
        </div>
        <div className="assetbox">
          <h3>Ship and measure</h3>
          <p className="strat-lead">
            Once a post is Ready, the{" "}
            <Link href="/scheduler">Scheduler</Link> sends it to Instagram or
            LinkedIn at the time you pick. After it goes out,{" "}
            <Link href="/analytics">Analytics</Link> pulls the numbers back and
            rolls them up by pillar, format, and channel.
          </p>
        </div>
      </div>
    </>
  );
}
