import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function verifyAuth() {
  const supabaseAuth = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  return user;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await verifyAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await request.json();

  if (typeof body.contacted !== "boolean") {
    return NextResponse.json(
      { error: "Invalid payload: contacted must be boolean" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("contact_leads")
    .update({ contacted: body.contacted })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 },
    );
  }

  return NextResponse.json({ lead: data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await verifyAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("contact_leads")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
