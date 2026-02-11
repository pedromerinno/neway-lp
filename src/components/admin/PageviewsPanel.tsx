"use client";

import { useCallback, useEffect, useState } from "react";
import type { Pageview } from "@/lib/types/pageview";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Download, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { normalizeHumanText } from "@/lib/safe-decode";

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export default function PageviewsPanel() {
  const [pageviews, setPageviews] = useState<Pageview[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 50,
    total: 0,
    totalPages: 0,
  });

  const fetchPageviews = useCallback(async (page = 1) => {
    setLoading(true);
    const res = await fetch(`/api/admin/pageviews?page=${page}`);
    if (res.ok) {
      const json = await res.json();
      setPageviews(json.pageviews ?? []);
      if (json.pagination) setPagination(json.pagination);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPageviews(1);
  }, [fetchPageviews]);

  function formatDateTime(dateStr: string) {
    return new Date(dateStr).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatGeo(pv: Pageview) {
    // Desired order: City / State(Region) / Country
    const parts = [pv.city, pv.region, pv.country]
      .filter(Boolean)
      .map((v) => normalizeHumanText(String(v)));
    if (parts.length) return parts.join(" / ");

    const ip = (pv.ip ?? "").toLowerCase();
    const isLocal =
      ip === "::1" ||
      ip.startsWith("127.") ||
      ip.startsWith("10.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("172.16.") ||
      ip.startsWith("172.17.") ||
      ip.startsWith("172.18.") ||
      ip.startsWith("172.19.") ||
      ip.startsWith("172.2") || // covers 172.20-172.29
      ip.startsWith("172.3"); // covers 172.30-172.31

    return isLocal ? "Localhost" : "—";
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-neway-navy">Acessos na Home (IP / Cidade / Estado / País)</h2>
          <p className="text-sm text-neway-navy/60">
            Últimos acessos na página inicial. Em produção, a localização vem de headers da Vercel.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            window.location.href = "/api/admin/pageviews/export";
          }}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead className="hidden md:table-cell">Local</TableHead>
                  <TableHead className="hidden lg:table-cell">IP</TableHead>
                  <TableHead className="text-right">Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-neway-navy/50">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : pageviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-neway-navy/50">
                      Nenhum acesso registrado ainda.
                    </TableCell>
                  </TableRow>
                ) : (
                  pageviews.map((pv) => (
                    <TableRow key={pv.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDateTime(pv.created_at)}
                      </TableCell>
                      <TableCell className="max-w-[520px] truncate">
                        <span className="inline-flex items-center gap-2">
                          <Eye className="h-4 w-4 text-neway-navy/40" aria-hidden />
                          <span className="truncate">{pv.path}</span>
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatGeo(pv)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-xs text-neway-navy/70">
                        {pv.ip ?? "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {pv.is_admin ? "Admin" : "Site"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-neway-navy/60">
            {pagination.total} acesso{pagination.total !== 1 ? "s" : ""} no total
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => fetchPageviews(pagination.page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-neway-navy/70">
              {pagination.page} / {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => fetchPageviews(pagination.page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

