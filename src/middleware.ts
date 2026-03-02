import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Desabilitado temporariamente para debugar deploy na Vercel (erro interno no pipeline Edge).
// Para reativar proteção do /admin, restaure o conteúdo de middleware.original.ts
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [], // desliga o middleware
};
