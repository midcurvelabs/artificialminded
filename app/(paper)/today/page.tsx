import { IssueFrontPage } from "@/components/IssueFrontPage";
import { latestIssue } from "@/lib/load-issue";

export default async function TodayPage() {
  const issue = await latestIssue();
  return <IssueFrontPage issue={issue} isHomepage />;
}
