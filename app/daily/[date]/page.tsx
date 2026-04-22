import { notFound } from "next/navigation";
import { IssueFrontPage } from "@/components/IssueFrontPage";
import { mockIssue } from "@/lib/mock-issue";

export default async function DailyIssuePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  // Phase 1: only the mock issue date matches. Phase 2 reads MDX by date.
  if (date !== mockIssue.date) notFound();
  return <IssueFrontPage issue={mockIssue} />;
}
