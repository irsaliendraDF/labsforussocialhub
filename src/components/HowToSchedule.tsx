/**
 * Onboarding written into the tool rather than into a document nobody opens.
 *
 * Covers both paths deliberately: what to do *today*, while Meta and LinkedIn
 * app review is still pending and the manual fallback is doing the work, and
 * what changes once direct posting is switched on. Someone new should be able
 * to open the Scheduler and run a week of content without asking anyone.
 */
export default function HowToSchedule() {
  return (
    <>
      <h2 className="strat-sub">How to schedule</h2>
      <p className="strat-subnote">
        Open the channel you&apos;re posting to. Everything here works whether
        or not direct posting has been switched on yet.
      </p>

      {/* ------------------------------ Instagram ------------------------ */}
      <details className="fold guide">
        <summary>
          <span className="dot" style={{ background: "#db385a" }} />
          Instagram
          <span className="cnt">@labforus</span>
          <span className="chev" aria-hidden="true">
            ▾
          </span>
        </summary>
        <div className="fold-bd">
          <p className="guide-lead">
            Instagram is the busy channel: two to three posts a week, visual and
            community-facing. The most important thing to know is that
            Instagram needs an actual <strong>image file</strong>, not a Canva
            link. A Canva URL opens a design in the editor; Instagram
            can&apos;t read that. Export first.
          </p>

          <p className="subhead">Every time you post</p>
          <ol className="steps-list">
            <li>
              <strong>Plan it on the Calendar.</strong> Pick Instagram, a
              pillar, and a template, and give it a date.
            </li>
            <li>
              <strong>Make the design.</strong> Open the template from Content
              Pillars, <em>File &rarr; Make a copy</em>, and edit your copy so
              the master stays clean.
            </li>
            <li>
              <strong>Export it as a JPEG.</strong> In Canva:{" "}
              <em>Share &rarr; Download &rarr; JPG</em>. Instagram is fussy
              about formats — JPEG is the safe one, and the image needs to sit
              between 4:5 (tall) and 1.91:1 (wide). The square and portrait
              templates are already inside that range.
            </li>
            <li>
              <strong>Write the caption</strong> on the post in the Calendar.
              Up to 2,200 characters and no more than 30 hashtags. Always
              include #MadeAtLabForUs and #labforus.
            </li>
            <li>
              <strong>Move it to Ready.</strong> It appears under &quot;Ready to
              schedule&quot; here.
            </li>
            <li>
              <strong>Pick a time and hit Schedule.</strong> The row tells you
              which daily sweep it will actually leave on.
            </li>
          </ol>

          <p className="subhead">While approval is pending</p>
          <p className="guide-lead">
            Until Meta approves the app, the post won&apos;t leave on its own —
            and the tool will say so rather than pretending it went. When it
            comes up in the queue: open the post, copy the caption, post it from
            the Instagram app with your exported image, then hit{" "}
            <strong>Mark posted</strong> and paste the link. Analytics still
            tracks it once the account is connected.
          </p>

          <p className="subhead">Worth knowing</p>
          <ul className="steps-list plain">
            <li>
              <strong>Carousels</strong> are 2 to 10 images. Each slide is
              uploaded separately, so export every slide, in order.
            </li>
            <li>
              <strong>Stories aren&apos;t covered</strong> by this tool. Plan
              them on the Calendar for visibility, but post them from your
              phone.
            </li>
            <li>
              <strong>There&apos;s a ceiling of 50 posts per day</strong> through
              the API. Nowhere near a 2-to-3-a-week cadence, so it won&apos;t
              bite.
            </li>
            <li>
              <strong>The connection expires roughly every 60 days.</strong> If
              the card above stops saying &quot;Posting live&quot;, hit
              Reconnect. Nothing is lost — queued posts just wait.
            </li>
          </ul>
        </div>
      </details>

      {/* ------------------------------ LinkedIn ------------------------- */}
      <details className="fold guide">
        <summary>
          <span className="dot" style={{ background: "#3d3bf5" }} />
          LinkedIn
          <span className="cnt">Lab for Us Page</span>
          <span className="chev" aria-hidden="true">
            ▾
          </span>
        </summary>
        <div className="fold-bd">
          <p className="guide-lead">
            LinkedIn is the credibility channel: one post a week, aimed at
            partners, funders, and outcomes. It&apos;s more forgiving than
            Instagram in one useful way — <strong>text-only posts work</strong>,
            so a strong written update needs no design at all.
          </p>

          <p className="subhead">Every time you post</p>
          <ol className="steps-list">
            <li>
              <strong>Plan it on the Calendar.</strong> Pick LinkedIn and a
              pillar. The <em>LinkedIn post</em> template under &quot;For
              Us&quot; is laid out for this feed if you want a graphic.
            </li>
            <li>
              <strong>Write the caption.</strong> This <em>is</em> the post on
              LinkedIn — the words carry it. Up to about 3,000 characters, but
              the first two lines are what people see before &quot;see
              more&quot;, so lead with the point.
            </li>
            <li>
              <strong>Add an image only if it earns its place.</strong> Export
              from Canva as PNG or JPEG and paste the link onto the post.
              Text-only is completely normal here.
            </li>
            <li>
              <strong>Move it to Ready</strong>, then schedule it. One a week,
              posted consistently, beats three in a burst.
            </li>
          </ol>

          <p className="subhead">While approval is pending</p>
          <p className="guide-lead">
            Same as Instagram: the post waits in the queue with its caption
            ready to copy. Post it from the Lab for Us Page, then{" "}
            <strong>Mark posted</strong> with the link.
          </p>

          <p className="subhead">Worth knowing</p>
          <ul className="steps-list plain">
            <li>
              <strong>It posts as the Page, not as a person.</strong> Whoever
              connects the account has to be an admin of the Lab for Us Page.
            </li>
            <li>
              <strong>LinkedIn has no native scheduling through the API</strong>{" "}
              — the timing comes from this tool, which is exactly why the queue
              exists.
            </li>
            <li>
              <strong>Editing a published post isn&apos;t possible from
              here.</strong> Fix typos on LinkedIn itself, or delete and repost.
              Proofread before it goes.
            </li>
            <li>
              <strong>The connection expires too.</strong> Same fix: Reconnect.
            </li>
          </ul>
        </div>
      </details>

      {/* ------------------------------ Both ----------------------------- */}
      <details className="fold guide">
        <summary>
          <span className="dot" style={{ background: "#b07d2a" }} />
          If something fails
          <span className="chev" aria-hidden="true">
            ▾
          </span>
        </summary>
        <div className="fold-bd">
          <p className="guide-lead">
            A failed post shows under <strong>Needs attention</strong> with the
            actual reason, and nothing is lost — the post and its caption are
            still there.
          </p>
          <ul className="steps-list plain">
            <li>
              <strong>&quot;needs an image or video URL&quot;</strong> — the
              post has a Canva <em>design</em> link rather than an exported
              image. Export it and paste that link instead.
            </li>
            <li>
              <strong>&quot;isn&apos;t connected for direct posting&quot;</strong>{" "}
              — expected until approval lands. Post it by hand and hit Mark
              posted.
            </li>
            <li>
              <strong>Anything about tokens or permissions</strong> — the
              connection lapsed. Hit Reconnect on the card above, then{" "}
              <strong>Retry</strong>.
            </li>
            <li>
              <strong>Retry</strong> re-runs it immediately.{" "}
              <strong>Unschedule</strong> puts it back to Ready so you can fix
              it and try again later.
            </li>
          </ul>
        </div>
      </details>
    </>
  );
}
