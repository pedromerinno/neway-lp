# Deploy no Git + Vercel — Projetos criados no Cursor

Projetos feitos no **Lovable** já vêm com o repositório e a Vercel configurados pela própria plataforma. Projetos criados **no Cursor** você conecta manualmente ao GitHub e à Vercel — por isso é fácil aparecer erro de deploy se alguma configuração ficar errada.

---

## Por que dá erro?

Ao **importar** um repo no Vercel, ela tenta adivinhar o tipo do projeto. Às vezes:

- Define **Framework Preset** como **Other**
- Preenche **Output Directory** com `public` (padrão de sites estáticos)

Para **Next.js**, o correto é:

- **Framework Preset:** Next.js  
- **Output Directory:** em branco (Next.js usa o próprio runtime, não uma pasta `public` como output)

Se isso não for ajustado, o build falha com algo como: *"No Output Directory named 'public' found"*.

---

## Checklist — Primeira vez que conectar este projeto à Vercel

Siga **antes** do primeiro deploy (ou logo após criar o projeto na Vercel):

### 1. No repositório (já feito neste projeto)

- [x] `vercel.json` na raiz com `"framework": "nextjs"`
- [x] `.gitignore` com `node_modules`, `.next`, `.env*`
- [x] Build local funciona: `npm run build`

### 2. Na Vercel (dashboard)

1. **Settings** → **General**
2. Em **Build & Development Settings**:
   - **Framework Preset:** **Next.js**
   - **Build Command:** em branco (usa `npm run build` do `package.json`)
   - **Output Directory:** **em branco** (não use `public`)
   - **Install Command:** em branco (usa `npm install`)
3. **Save**
4. **Deployments** → no último deploy, **Redeploy** (opcional: desmarque **Use existing Build Cache**)

### 3. Depois disso

- Cada **push na branch conectada** (ex.: `main`) gera deploy automático.
- Não é preciso mexer em Output Directory de novo.

---

## Resumo

| Onde      | Lovable                    | Cursor + Git + Vercel     |
|----------|----------------------------|----------------------------|
| Criar app| Na plataforma              | No seu editor              |
| Repo     | Criado pela Lovable        | Você cria no GitHub       |
| Vercel   | Já vinculada e configurada | Você importa e configura  |
| Erro?    | Raro (tudo padronizado)    | Comum se Framework/Output estiver errado |

**Dica:** em todo projeto **Next.js** criado no Cursor, ao importar na Vercel, confira sempre **Framework Preset = Next.js** e **Output Directory = em branco**. Assim o deploy se comporta como nos projetos da Lovable.
