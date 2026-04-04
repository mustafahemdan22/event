"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.warn("NEXT_PUBLIC_CONVEX_URL is not defined — Convex queries will return undefined during build.");
}

// Always create a client so ConvexProvider is always in the tree.
// Without it, useQuery throws "Could not find Convex client" during prerendering.
// The placeholder URL won't connect, but useQuery will safely return undefined (loading state).
const convex = new ConvexReactClient(convexUrl || "https://placeholder.convex.cloud");

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
