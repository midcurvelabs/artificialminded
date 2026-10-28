import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MAGNETS, getMagnet } from "@/lib/magnets";
import MagnetShell from "@/components/magnets/MagnetShell";
import SystemMagnet from "@/components/magnets/SystemMagnet";

export const dynamicParams = false;

export function generateStaticParams() {
  return MAGNETS.map((m) => ({ keyword: m.keyword }));
}

export async function generateMetadata({ params }: { params: Promise<{ keyword: string }> }): Promise<Metadata> {
  const m = getMagnet((await params).keyword);
  if (!m) return {};
  return {
    title: `${m.title} · ARTIFICIALMINDED`,
    description: m.description,
    robots: { index: false, follow: false },
  };
}

const BODY: Record<string, React.ComponentType<{ keyword: string }>> = {
  system: SystemMagnet,
};

export default async function MagnetPage({ params }: { params: Promise<{ keyword: string }> }) {
  const keyword = (await params).keyword;
  const m = getMagnet(keyword);
  const Body = BODY[keyword];
  if (!m || !Body) notFound();
  return (
    <MagnetShell magnet={m}>
      <Body keyword={keyword} />
    </MagnetShell>
  );
}
