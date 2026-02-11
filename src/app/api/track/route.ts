import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getClientIp, getGeoWithFallback, getReferrer, getUserAgent } from "@/lib/request-metadata";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TrackPayload = {
  path?: string;
  query?: string;
  is_admin?: boolean;
};

function getOrCreateSessionId() {
  const store = cookies();
  const existing = store.get("nv_session")?.value?.trim();
  if (existing) return existing;

  const id = crypto.randomUUID();
  // Best-effort: setting cookies in route handlers is supported.
  store.set("nv_session", id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
  return id;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as TrackPayload;
    const path = (body.path ?? "").toString().slice(0, 2048);
    const query = (body.query ?? "").toString().slice(0, 2048);
    const isAdmin = Boolean(body.is_admin);

    if (!path) {
      return NextResponse.json({ ok: false, error: "Missing path" }, { status: 400 });
    }

    // We only track the public home page.
    if (path !== "/") {
      return NextResponse.json({ ok: true });
    }

    const headers = req.headers;
    const ip = getClientIp(headers);
    const geo = await getGeoWithFallback(headers, ip);
    const userAgent = getUserAgent(headers);
    const referrer = getReferrer(headers);
    const sessionId = getOrCreateSessionId();

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("pageviews").insert({
      path,
      query: query || null,
      referrer: referrer || null,
      user_agent: userAgent || null,
      ip: ip || null,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      session_id: sessionId,
      is_admin: false,
    });

    if (error) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

