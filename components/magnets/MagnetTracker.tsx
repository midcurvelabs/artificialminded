"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

export default function MagnetTracker({ keyword }: { keyword: string }) {
  useEffect(() => {
    track("magnet_view", keyword);
  }, [keyword]);
  return null;
}
