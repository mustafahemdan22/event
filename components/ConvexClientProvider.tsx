"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";

// Only initialize if we have a URL, otherwise provide a dummy client for build time or error out later
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    if (process.env.NODE_ENV === "production" && !convexUrl) {
       console.error("NEXT_PUBLIC_CONVEX_URL is not defined");
    }
    return <>{children}</>;
  }
  
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
