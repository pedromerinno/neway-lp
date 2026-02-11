import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { ZodError } from "zod";
import { getClientIp, getGeoWithFallback, getReferrer, getUserAgent } from "@/lib/request-metadata";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactLeadInsert = {
  name: string;
  email: string;
  phone: string;
  city_state: string;
  type_of_interest: string;
  approximate_budget?: string | null;
  message?: string | null;
  ip?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = contactFormSchema.parse(body);

    const ip = getClientIp(req.headers);
    const geo = await getGeoWithFallback(req.headers, ip);

    const lead: ContactLeadInsert = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      city_state: payload.cityState,
      type_of_interest: payload.typeOfInterest,
      approximate_budget: payload.approximateBudget ?? null,
      message: payload.message ?? null,
      ip,
      ...geo,
      referrer: getReferrer(req.headers),
      user_agent: getUserAgent(req.headers),
    };

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("contact_leads")
      .insert(lead)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to save lead" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Validation error" },
        { status: 400 },
      );
    }

    // invalid JSON, missing env, etc.
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

