import type { Metadata } from "next";
import OwnerTest from "@/components/site/OwnerTest";

export const metadata: Metadata = {
  title: "The Owner Test",
  description: "Ten questions, two minutes, a first fix at the end. Find out which gap is costing you most: your AI or your content.",
};

export default function TestPage() {
  return (
    <div className="am-shell" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <section className="am-stack">
        <div className="am-label">The Owner Test · 2 minutes</div>
        <h1 className="am-h2" style={{ maxWidth: "20ch" }}>
          You do not have a content problem or an AI problem. You have no owner for either.
        </h1>
        <p className="am-lede">Find out which gap is costing you most. Ten questions, two minutes, a first fix at the end.</p>
      </section>
      <OwnerTest />
    </div>
  );
}
