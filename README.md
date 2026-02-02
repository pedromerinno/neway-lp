# Neway — Landing Page

LP da Neway (piscinas e paisagismo) com **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, **React Hook Form** e **Zod**.

## Stack

- **Frontend:** React + Next.js (App Router) + TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui (Radix UI)
- **Animações:** Framer Motion
- **Formulário:** React Hook Form + Zod (validação)
- **Deploy:** Vercel (recomendado)

## Estrutura

```
src/
├── app/           # App Router (layout, page, globals.css)
├── components/    # Seções da LP (Hero, WhyChoose, Services, etc.)
├── ui/            # Componentes shadcn (Button, Card, Input, etc.)
└── lib/           # Utils (cn), schemas (Zod)
```

## Como rodar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Formulário de contato

O formulário está preparado para **Formspree**. Para ativar:

1. Crie uma conta em [formspree.io](https://formspree.io).
2. Crie um novo formulário e copie o **Form ID**.
3. Em `src/components/ContactForm.tsx`, substitua `YOUR_FORM_ID` pela URL do Formspree, por exemplo:

   ```ts
   const res = await fetch("https://formspree.io/f/xxxxxxxx", {
   ```

Alternativas: **Supabase** (Edge Functions) ou **webhook** (Make/Zapier) — basta trocar o `fetch` em `onSubmit`.

## Deploy (Vercel)

```bash
npm run build
```

Conecte o repositório na Vercel; o build e o domínio são configurados automaticamente.

### Página sem estilos (CSS não carrega)

Se a página aparecer só com texto preto/azul e fundo branco (sem Tailwind):

1. **Vercel** → seu projeto → **Settings** → **General** → **Build & Development Settings**
2. Defina **Framework Preset** = **Next.js**
3. Deixe **Output Directory** em branco (apague `public` se estiver preenchido)
4. Salve e faça **Redeploy** (Deployments → ⋮ → Redeploy)
5. Abra o site em aba anônima ou com hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servidor de produção
- `npm run lint` — ESLint
