import { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { toCsv } from "@/lib/csv";
import { normalizeHumanText } from "@/lib/safe-decode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabaseAuth = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pageviews")
    .select("*")
    .eq("path", "/")
    .eq("is_admin", false)
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    return new Response("Failed to export", { status: 500 });
  }

  const rows = (data ?? []).map((pv) => ({
    created_at: pv.created_at,
    path: pv.path,
    query: pv.query ?? "",
    country: pv.country ? normalizeHumanText(pv.country) : "",
    region: pv.region ? normalizeHumanText(pv.region) : "",
    city: pv.city ? normalizeHumanText(pv.city) : "",
    ip: pv.ip ?? "",
    session_id: pv.session_id ?? "",
    is_admin: pv.is_admin ? "true" : "false",
    referrer: pv.referrer ?? "",
    user_agent: pv.user_agent ?? "",
  }));

  const csv = toCsv(rows, [
    { key: "created_at", header: "created_at" },
    { key: "path", header: "path" },
    { key: "query", header: "query" },
    { key: "country", header: "country" },
    { key: "region", header: "region" },
    { key: "city", header: "city" },
    { key: "ip", header: "ip" },
    { key: "session_id", header: "session_id" },
    { key: "is_admin", header: "is_admin" },
    { key: "referrer", header: "referrer" },
    { key: "user_agent", header: "user_agent" },
  ]);

  const filename = `pageviews-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

