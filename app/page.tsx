import { IssueFrontPage } from "@/components/IssueFrontPage";
import { latestIssue } from "@/lib/load-issue";

export default async function HomePage() {
  const issue = await latestIssue();
  return <IssueFrontPage issue={issue} isHomepage />;
}
