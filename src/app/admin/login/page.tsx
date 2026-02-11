"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    let supabase: ReturnType<typeof getSupabaseBrowserClient>;
    try {
      supabase = getSupabaseBrowserClient();
    } catch {
      setError(
        "Admin indisponível: configure as variáveis do Supabase na Vercel (/admin/setup).",
      );
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ou senha inválidos.");
      setLoading(false);
      return;
    }

    // Force full navigation so middleware receives fresh cookies in production (Vercel).
    window.location.assign("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neway-cream px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-neway-navy">Neway Admin</h1>
          <p className="mt-1 text-sm text-neway-navy/60">
            Faça login para continuar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-neway-navy"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@neway.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-neway-navy"
              >
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center text-sm">
              <Link
                href="/admin/setup"
                className="text-neway-navy/70 underline-offset-4 hover:underline"
              >
                Problemas no login? Ver configuração
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
