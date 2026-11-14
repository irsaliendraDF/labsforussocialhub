import Link from "next/link";
import { Rich } from "@/components/BlueprintBits";
import { ACCESS_TIERS, MANDATE } from "@/lib/blueprint";
import { FORMATS } from "@/lib/content";

export const metadata = { title: "Strategy · Lab for Us" };

export default function StrategyPage() {
  return (
    <>
      <div className="page-head wide">
        <span className="eyebrow">Strategy</span>
        <h1>Lab for Us Strategy</h1>
        <p>
          How the team plans, posts, and reviews content for Lab for Us.
        </p>
      </div>

      <article className="strat-doc">
        <h2>What the Digital Library Is</h2>
        <p>
          The Digital Library is the catalogue of what the space has and what
          you can borrow or book: cameras, audio kit, editing software, studio
          and workshop time. Someone signs up, sees what is available, and
          reserves it. That is the thing the content is pointing at, so when a
          post says <em>Explore the library</em> or <em>Book the space</em>,
          this is where it lands.
        </p>

        <h2>The Goal</h2>
        <p>
          Lab for Us is a space for art, community, creativity, and
          collaboration. The content exists to get people onto the platform and
          keep the conversation going. Right now it is about activating and
          engaging, not hitting set numbers.
        </p>

        <h2>The Mission</h2>
        <p>
          Lab for Us exists so that making things is not something you need
          money, equipment, or permission to do. It is a space for art,
          community, creativity, and collaboration, built for the people who
          are usually left outside those rooms. Belonging first, then access,
          then the work itself.
        </p>

        <h2>Who Gets the Space</h2>
        <ol className="strat-tiers">
          {ACCESS_TIERS.map((t) => (
            <li key={t.n}>
              <b>{t.who}</b> <Rich text={t.text} />
            </li>
          ))}
        </ol>
        <p>
          <b>{MANDATE.lead}</b> <Rich text={MANDATE.text} />
        </p>

        <h2>Channels and Cadence</h2>
        <p>
          <b>Instagram, 2 to 3 posts a week.</b> Visual and community facing.
          Reels, Stories, and spotlights. Posts live at @labforus.
        </p>
        <p>
          <b>LinkedIn, 1 post a week.</b> Institutional and credibility.
          Partners, funders, outcomes, and the mission.
        </p>

        <h2>Formats That Feed the Pillars</h2>
        <ul>
          {FORMATS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="strat-note">
          These are the vehicles, not the themes. Not an exhaustive list, just
          the top-performing formats to draw from, and it can grow.
        </p>

        <h2>How the Week Runs</h2>
        <p className="strat-note">
          The loop this hub is built around. Everyone sees the same board.
        </p>
        <ol>
          <li>
            <b>Plan and make.</b> Open the <Link href="/calendar">Calendar</Link>
            , plan a post against a pillar and a template, then jump to that{" "}
            <Link href="/pillars">template in Canva</Link>, duplicate it, and
            paste the finished link back onto the post. Move it through Idea,
            Drafting, and Ready.
          </li>
          <li>
            <b>Ship and measure.</b> Once a post is Ready, the{" "}
            <Link href="/scheduler">Scheduler</Link> sends it to Instagram or
            LinkedIn at the time you pick. After it goes out,{" "}
            <Link href="/analytics">Analytics</Link> pulls the numbers back and
            rolls them up by pillar, format, and channel.
          </li>
        </ol>

        <h2>When to Revisit This</h2>
        <p>
          <b>Check in at 60 to 80 published posts.</b> Not monthly, and not
          after a good week. At this cadence, roughly three or four posts a
          week, that lands somewhere around five to six months in. The reason
          for waiting is honest: below about 60 posts there simply is not
          enough data to tell a real pattern from a fluke, and reacting to
          noise is how a good strategy gets abandoned early. One post going
          quiet means nothing. Twenty posts in the same pillar going quiet
          means something.
        </p>
        <p>What to look at when you get there:</p>
        <ul>
          <li>
            <b>Which pillars earn their slot.</b> If one consistently
            under-delivers on engagement, it does not necessarily get cut, but
            it should get fewer slots or a different format.
          </li>
          <li>
            <b>Which formats do the work.</b> Reels against carousels against
            stills. Put the effort where it returns.
          </li>
          <li>
            <b>Instagram against LinkedIn.</b> They serve different audiences,
            so judge them separately rather than against each other.
          </li>
          <li>
            <b>What the tagged links actually drove.</b> Reach is nice; signups
            and bookings are the goal.
          </li>
          <li>
            <b>Day and time.</b> Only by this point is there enough history for
            posting-time patterns to mean anything.
          </li>
        </ul>
        <p className="strat-note">
          The quarterly report on the <Link href="/analytics">Analytics</Link>{" "}
          page is the natural place to run this, since the numbers are already
          gathered there.
        </p>
      </article>
    </>
  );
}
