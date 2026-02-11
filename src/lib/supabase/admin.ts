import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    ""
  ).trim();
}

function getServiceRoleKey() {
  return (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
}

export function getSupabaseAdmin() {
  const url = getSupabaseUrl();
  const serviceRoleKey = getServiceRoleKey();

  if (!url) {
    throw new Error(
      "Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (recommended) or SUPABASE_URL.",
    );
  }
  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Set it in .env.local (server-only).",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

