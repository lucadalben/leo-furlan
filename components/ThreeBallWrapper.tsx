"use client";

import dynamic from "next/dynamic";

// ThreeBall usa browser API (WebGL) — caricato solo lato client
const ThreeBall = dynamic(() => import("./ThreeBall"), { ssr: false });

export default function ThreeBallWrapper() {
  return <ThreeBall />;
}
