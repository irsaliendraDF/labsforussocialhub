import Link from "next/link";
import { FORMATS } from "@/lib/content";

export const metadata = { title: "Strategy · Lab for Us" };

function Arrow() {
  return (
    <div className="step-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </div>
  );
}

export default function StrategyPage() {
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
            <h3>The mission, in one line</h3>
            <p className="strat-lead">
              Lab for Us exists so that making things is not something you need
              money, equipment, or permission to do. It is a space for art,
              community, creativity, and collaboration, built for the people
              who are usually left outside those rooms. Belonging first, then
              access, then the work itself.
            </p>
          </div>

          <div className="assetbox">
            <h3>What the Digital Library is</h3>
            <p className="strat-lead">
              The Digital Library is the catalogue of what the space has and
              what you can borrow or book: cameras, audio kit, editing
              software, studio and workshop time. Someone signs up, sees what
              is available, and reserves it. That is the thing the content is
              pointing at, so when a post says{" "}
              <em>Explore the library</em> or <em>Book the space</em>, this is
              where it lands.
            </p>
          </div>
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

      <h2 className="strat-sub" style={{ marginTop: 24 }}>
        How the week runs
      </h2>
      <p className="strat-subnote">
        The loop this hub is built around. Everyone sees the same board.
      </p>

      <div className="steps">
        <div className="assetbox">
          <div className="step-head">
            <span className="step-num">1</span>
            <h3>Plan and make</h3>
          </div>
          <p className="strat-lead">
            Open the <Link href="/calendar">Calendar</Link>, plan a post against
            a pillar and a template, then jump to that{" "}
            <Link href="/pillars">template in Canva</Link>, duplicate it, and
            paste the finished link back onto the post. Move it through Idea,
            Drafting, and Ready.
          </p>
        </div>

        <Arrow />

        <div className="assetbox">
          <div className="step-head">
            <span className="step-num">2</span>
            <h3>Ship and measure</h3>
          </div>
          <p className="strat-lead">
            Once a post is Ready, the <Link href="/scheduler">Scheduler</Link>{" "}
            sends it to Instagram or LinkedIn at the time you pick. After it
            goes out, <Link href="/analytics">Analytics</Link> pulls the numbers
            back and rolls them up by pillar, format, and channel.
          </p>
        </div>
      </div>

      <h2 className="strat-sub">When to revisit this</h2>
      <p className="strat-subnote">
        A plan you never review is a guess you keep repeating.
      </p>

      <div className="assetbox">
        <h3>Check in at 60 to 80 published posts</h3>
        <p className="strat-lead" style={{ marginBottom: 12 }}>
          Not monthly, and not after a good week. At this cadence, roughly three
          or four posts a week, that lands somewhere around five to six months
          in. The reason for waiting is honest: below about 60 posts there
          simply is not enough data to tell a real pattern from a fluke, and
          reacting to noise is how a good strategy gets abandoned early. One
          post going quiet means nothing. Twenty posts in the same pillar going
          quiet means something.
        </p>
        <p className="subhead">What to look at when you get there</p>
        <ul className="steps-list plain">
          <li>
            <strong>Which pillars earn their slot.</strong> If one consistently
            under-delivers on engagement, it does not necessarily get cut, but
            it should get fewer slots or a different format.
          </li>
          <li>
            <strong>Which formats do the work.</strong> Reels against carousels
            against stills. Put the effort where it returns.
          </li>
          <li>
            <strong>Instagram against LinkedIn.</strong> They serve different
            audiences, so judge them separately rather than against each other.
          </li>
          <li>
            <strong>What the tagged links actually drove.</strong> Reach is
            nice; signups and bookings are the goal.
          </li>
          <li>
            <strong>Day and time.</strong> Only by this point is there enough
            history for posting-time patterns to mean anything.
          </li>
        </ul>
        <p className="note">
          The <Link href="/report">quarterly report</Link> is the natural place
          to run this, since the numbers are already gathered there.
        </p>
      </div>
    </>
  );
}
