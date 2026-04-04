import { ConvexHttpClient } from "convex/browser";

function getConvexUrl(): string {
  // On the server we can use either; prefer non-public if provided.
  const url =
    process.env.CONVEX_URL ||
    process.env.NEXT_PUBLIC_CONVEX_URL ||
    process.env.NEXT_PUBLIC_CONVEX_HTTP_URL;
  if (!url) {
    throw new Error(
      "Missing Convex URL. Set CONVEX_URL (recommended) or NEXT_PUBLIC_CONVEX_URL."
    );
  }
  return url;
}

let _client: ConvexHttpClient | null = null;

export function convexServerClient() {
  if (!_client) _client = new ConvexHttpClient(getConvexUrl());
  return _client;
}

