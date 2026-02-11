import type { Metadata } from "next";
import LogoutButton from "@/components/admin/LogoutButton";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin | Neway",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let hasUser = false;

  try {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    hasUser = Boolean(user);
  } catch {
    // If env isn't configured yet, keep header minimal.
    hasUser = false;
  }

  return (
    <div className="min-h-screen bg-neway-cream">
      <header className="bg-neway-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">Neway</span>
            <span className="text-sm text-white/60">Admin</span>
          </div>
          {hasUser ? <LogoutButton /> : null}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
