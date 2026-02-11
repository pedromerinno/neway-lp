# Neway Pools — Landing Page

LP da **Neway Pools** (piscinas e paisagismo) com Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, React Hook Form e Zod.

---

## Stack

| Camada      | Tecnologia                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 14 (App Router) + React     |
| Linguagem   | TypeScript                          |
| Estilo      | Tailwind CSS + shadcn/ui (Radix UI) |
| Animações   | Framer Motion                       |
| Formulário  | React Hook Form + Zod               |
| Deploy      | Vercel (recomendado)                |

---

## Estrutura do projeto

```
src/
├── app/           # App Router (layout, page, globals.css)
├── components/    # Seções da LP (Hero, WhyChoose, Services, etc.)
├── ui/            # Componentes shadcn (Button, Card, Input, etc.)
└── lib/           # Utils (cn), schemas (Zod)
```

---

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Deploy no GitHub

### 1. Inicializar repositório (se ainda não tiver)

```bash
git init
git add .
git commit -m "chore: initial commit — Neway Pools LP"
```

### 2. Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new).
2. Nome sugerido: `neway-pools-lp` ou `neway-lp`.
3. **Não** marque “Add a README” (o projeto já tem um).
4. Crie o repositório.

### 3. Conectar e enviar

```bash
git remote add origin https://github.com/SEU_USUARIO/neway-pools-lp.git
git branch -M main
git push -u origin main
```

Substitua `SEU_USUARIO/neway-pools-lp` pelo seu usuário e nome do repo.

---

## Deploy na Vercel (a partir do GitHub)

1. Acesse [vercel.com](https://vercel.com) e faça login (GitHub).
2. **Add New** → **Project**.
3. Importe o repositório do GitHub (ex.: `neway-pools-lp`).
4. **Na tela de configuração do projeto**, confira:
   - **Framework Preset:** selecione **Next.js** (não deixe em "Other").
   - **Output Directory:** deixe **em branco** (não use `public`).
   - **Root Directory:** em branco.
5. Clique em **Deploy**.

A Vercel faz build com `npm run build` e publica. A cada push em `main`, um novo deploy é gerado.

**Se o deploy falhar** com *"No Output Directory named public"*: vá em **Settings** → **General** → **Build & Development Settings**, defina **Framework Preset** = **Next.js** e **Output Directory** = em branco; depois faça **Redeploy**. Detalhes em [DEPLOY.md](./DEPLOY.md).

---

## Formulário de contato (Supabase)

O formulário grava leads no **Supabase** via `POST /api/contact` (server-side com `service role key`).

### 1) Variáveis de ambiente

Crie um `.env.local` baseado no `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Preencha:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (pública, ok expor)
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)

### 2) Criar tabela no Supabase (SQL Editor)

No Supabase Dashboard → **SQL Editor**, rode:

```sql
create extension if not exists pgcrypto;

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  city_state text not null,
  type_of_interest text not null,
  contacted boolean not null default false,
  approximate_budget text,
  message text,
  ip inet,
  country text,
  region text,
  city text,
  referrer text,
  user_agent text
);

alter table public.contact_leads enable row level security;

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create table if not exists public.pageviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path text not null,
  query text,
  referrer text,
  user_agent text,
  ip inet,
  country text,
  region text,
  city text,
  session_id uuid,
  is_admin boolean not null default false
);

alter table public.pageviews enable row level security;

create index if not exists pageviews_created_at_idx
  on public.pageviews (created_at desc);

create index if not exists pageviews_path_idx
  on public.pageviews (path);
```

> Observação: com RLS habilitado e **sem policies**, o acesso público fica bloqueado por padrão. O endpoint usa `SUPABASE_SERVICE_ROLE_KEY` (bypassa RLS) para inserir com segurança.

### 3) Tracking de acessos (IP + região)

O site registra pageviews em `public.pageviews` via `POST /api/track`.

- **Escopo**: registramos **somente a Home (`/`)**. Não registramos `/admin`.
- **Localização (cidade/estado/país)**:
  - Em produção na **Vercel**, vem de headers como `x-vercel-ip-country`, `x-vercel-ip-country-region`, `x-vercel-ip-city`
  - Se esses headers não existirem, tentamos um **fallback por IP** (best-effort) para preencher `city/region/country`
  - Em **localhost**, é esperado aparecer `Localhost`/sem localização.

---

## Scripts

| Comando           | Descrição                |
| ----------------- | ------------------------ |
| `npm run dev`     | Servidor de desenvolvimento |
| `npm run build`   | Build de produção        |
| `npm run start`   | Servidor de produção    |
| `npm run lint`     | ESLint                   |

---

## Licença

Projeto privado — Neway Pools.
