# Configuração Vercel — Neway LP

Se o deploy falhar com:

```text
Error: No Output Directory named "public" found after the Build completed.
```

**Corrija no dashboard da Vercel:**

1. Abra o projeto na Vercel → **Settings** → **General**
2. Em **Build & Development Settings**:
   - **Framework Preset:** selecione **Next.js**
   - **Output Directory:** deixe **em branco** (apague o valor `public` se estiver preenchido)
3. Salve e faça um novo deploy (**Redeploy** ou push no GitHub)

Para Next.js, a Vercel não usa “Output Directory”; o build usa o runtime do Next.js. O `vercel.json` já define `"framework": "nextjs"`; o problema costuma ser o **Output Directory** definido como `public` nas configurações do projeto.
