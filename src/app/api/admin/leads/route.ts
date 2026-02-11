import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Verify auth
  const supabaseAuth = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const typeFilter = searchParams.get("type") ?? "";
  const contactedFilter = searchParams.get("contacted") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = 20;

  const supabase = getSupabaseAdmin();

  // Count queries for stats
  const [totalResult, contactedResult] = await Promise.all([
    supabase.from("contact_leads").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_leads")
      .select("*", { count: "exact", head: true })
      .eq("contacted", true),
  ]);

  const totalCount = totalResult.count ?? 0;
  const contactedCount = contactedResult.count ?? 0;
  const newCount = totalCount - contactedCount;

  // Main query
  let query = supabase
    .from("contact_leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  if (typeFilter) {
    query = query.eq("type_of_interest", typeFilter);
  }

  if (contactedFilter === "true") {
    query = query.eq("contacted", true);
  } else if (contactedFilter === "false") {
    query = query.eq("contacted", false);
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    leads: data ?? [],
    pagination: {
      page,
      perPage,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / perPage),
    },
    stats: {
      total: totalCount,
      contacted: contactedCount,
      new: newCount,
    },
  });
}
