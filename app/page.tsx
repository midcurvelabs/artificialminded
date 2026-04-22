import { IssueFrontPage } from "@/components/IssueFrontPage";
import { mockIssue } from "@/lib/mock-issue";

export default function HomePage() {
  // Phase 1: hardcoded mock issue. Phase 2 swaps this for the latest MDX from content/issues/.
  return <IssueFrontPage issue={mockIssue} isHomepage />;
}
