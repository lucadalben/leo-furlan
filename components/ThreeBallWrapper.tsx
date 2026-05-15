"use client";

import dynamic from "next/dynamic";
import { BallSettings } from "@/lib/sanity/queries";

const ThreeBall = dynamic(() => import("./ThreeBall"), { ssr: false });

export default function ThreeBallWrapper({ settings }: { settings?: BallSettings }) {
  return <ThreeBall settings={settings} />;
}
