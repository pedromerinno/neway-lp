import Link from "next/link";

export const dynamic = "force-dynamic";

function isConfigured() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
  const serviceRole = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  return {
    url: Boolean(url),
    anonKey: Boolean(anonKey),
    serviceRole: Boolean(serviceRole),
  };
}

export default function AdminSetupPage() {
  const cfg = isConfigured();
  const ok = cfg.url && cfg.anonKey && cfg.serviceRole;

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold tracking-tight text-neway-navy">
        Configurar Admin (Vercel + Supabase)
      </h1>
      <p className="mt-2 text-sm text-neway-navy/70">
        O painel <span className="font-medium">/admin</span> depende de variáveis
        de ambiente no deploy da Vercel.
      </p>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
          <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL</span>
          <span className={cfg.url ? "text-emerald-700" : "text-red-700"}>
            {cfg.url ? "OK" : "Faltando"}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
          <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
          <span className={cfg.anonKey ? "text-emerald-700" : "text-red-700"}>
            {cfg.anonKey ? "OK" : "Faltando"}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
          <span className="font-medium">SUPABASE_SERVICE_ROLE_KEY</span>
          <span
            className={cfg.serviceRole ? "text-emerald-700" : "text-red-700"}
          >
            {cfg.serviceRole ? "OK" : "Faltando"}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-neway-cream p-4 text-sm text-neway-navy/80">
        <p className="font-medium text-neway-navy">Como resolver na Vercel</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>
            Vercel → <span className="font-medium">Project</span> →{" "}
            <span className="font-medium">Settings</span> →{" "}
            <span className="font-medium">Environment Variables</span>
          </li>
          <li>Adicione as 3 variáveis acima (para Production).</li>
          <li>Faça um novo deploy (Redeploy ou push no GitHub).</li>
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg border px-4 py-2 text-sm font-medium text-neway-navy hover:bg-neway-cream"
        >
          Voltar para o site
        </Link>
        <Link
          href={ok ? "/admin/login" : "/admin/setup"}
          className="rounded-lg bg-neway-navy px-4 py-2 text-sm font-medium text-white hover:bg-neway-navy/90"
        >
          {ok ? "Ir para login" : "Recarregar status"}
        </Link>
      </div>
    </div>
  );
}

