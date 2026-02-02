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
4. **Framework Preset:** Next.js (detectado automaticamente).
5. **Root Directory:** deixe em branco.
6. Clique em **Deploy**.

A Vercel faz build com `npm run build` e publica. A cada push em `main`, um novo deploy é gerado.

---

## Formulário de contato (Formspree)

O formulário está preparado para **Formspree**. Para ativar:

1. Crie uma conta em [formspree.io](https://formspree.io).
2. Crie um novo formulário e copie o **Form ID**.
3. Em `src/components/ContactForm.tsx`, substitua `YOUR_FORM_ID` pela URL do Formspree:

   ```ts
   const res = await fetch("https://formspree.io/f/xxxxxxxx", {
   ```

Alternativas: Supabase (Edge Functions) ou webhook (Make/Zapier) — altere o `fetch` em `onSubmit`.

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
