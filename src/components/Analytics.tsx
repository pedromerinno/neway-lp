"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function track(path: string, query: string, isAdmin: boolean) {
  const payload = JSON.stringify({ path, query, is_admin: isAdmin });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/track", blob);
    return;
  }

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const path = pathname ?? "/";
    const query = searchParams?.toString() ?? "";
    // Track only the home page.
    if (path !== "/") return;
    track(path, query, false);
  }, [pathname, searchParams]);

  return null;
}

