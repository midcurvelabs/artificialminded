import { notFound } from "next/navigation";
import { IssueFrontPage } from "@/components/IssueFrontPage";
import { findIssue } from "@/lib/load-issue";

export default async function DailyIssuePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const issue = await findIssue(date);
  if (!issue) notFound();
  return <IssueFrontPage issue={issue} />;
}
