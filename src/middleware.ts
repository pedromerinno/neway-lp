import { NextRequest, NextResponse } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createSupabaseMiddlewareClient(request, response);

  // If Supabase env isn't configured, don't crash the app.
  // We just disable /admin/* until NEXT_PUBLIC_SUPABASE_URL/ANON_KEY are set.
  if (!supabase) {
    const pathname = request.nextUrl.pathname;
    const isAllowed =
      pathname === "/admin/login" ||
      pathname === "/admin/setup" ||
      pathname.startsWith("/admin/setup/");

    if (isAllowed) return response;

    const setupUrl = new URL("/admin/setup", request.url);
    return NextResponse.redirect(setupUrl);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (!user && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isLoginPage) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
