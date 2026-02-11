import { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { toCsv } from "@/lib/csv";

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

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const typeFilter = searchParams.get("type") ?? "";
  const contactedFilter = searchParams.get("contacted") ?? "";

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  if (typeFilter && typeFilter !== "all") {
    query = query.eq("type_of_interest", typeFilter);
  }
  if (contactedFilter === "true") {
    query = query.eq("contacted", true);
  } else if (contactedFilter === "false") {
    query = query.eq("contacted", false);
  }

  const { data, error } = await query;
  if (error) {
    return new Response("Failed to export", { status: 500 });
  }

  const rows = (data ?? []).map((lead) => ({
    created_at: lead.created_at,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    city_state: lead.city_state,
    type_of_interest: lead.type_of_interest,
    approximate_budget: lead.approximate_budget ?? "",
    message: lead.message ?? "",
    contacted: lead.contacted ? "true" : "false",
    ip: lead.ip ?? "",
    country: lead.country ?? "",
    region: lead.region ?? "",
    city: lead.city ?? "",
    referrer: lead.referrer ?? "",
    user_agent: lead.user_agent ?? "",
    id: lead.id,
  }));

  const csv = toCsv(rows, [
    { key: "created_at", header: "created_at" },
    { key: "name", header: "name" },
    { key: "email", header: "email" },
    { key: "phone", header: "phone" },
    { key: "city_state", header: "city_state" },
    { key: "type_of_interest", header: "type_of_interest" },
    { key: "approximate_budget", header: "approximate_budget" },
    { key: "message", header: "message" },
    { key: "contacted", header: "contacted" },
    { key: "ip", header: "ip" },
    { key: "country", header: "country" },
    { key: "region", header: "region" },
    { key: "city", header: "city" },
    { key: "referrer", header: "referrer" },
    { key: "user_agent", header: "user_agent" },
    { key: "id", header: "id" },
  ]);

  const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

