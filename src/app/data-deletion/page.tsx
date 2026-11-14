export const metadata = { title: "Data deletion" };

/**
 * The page Meta shows a person after a data deletion request. It also stands
 * as the plain statement of what the hub holds about a connected account.
 */
export default async function DataDeletionPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  return (
    <main style={{ maxWidth: 640, margin: "64px auto", padding: "0 20px" }}>
      <h1>Data deletion</h1>
      <p>
        The Lab for Us and InACTS content hub stores one thing about a
        connected Instagram account: the connection itself, which is the
        account name, its Instagram ID and the access token that lets the hub
        post for it. It stores nothing else from Instagram.
      </p>
      <p>
        {code
          ? "Your request has been received and the stored connection has been deleted."
          : "When a deletion request arrives from Instagram, the stored connection is deleted straight away and a confirmation code is shown here."}
      </p>
      {code ? <p>Confirmation code: {code}</p> : null}
    </main>
  );
}
