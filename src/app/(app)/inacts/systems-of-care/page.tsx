import { redirect } from "next/navigation";

/** The Systems of Care text now lives on the Overview. This keeps a shared link working. */
export default function SystemsOfCareRedirect() {
  redirect("/inacts");
}
