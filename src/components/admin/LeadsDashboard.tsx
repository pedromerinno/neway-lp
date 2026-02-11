"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lead } from "@/lib/types/lead";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  UserPlus,
} from "lucide-react";
import LeadDetailDialog from "./LeadDetailDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Stats {
  total: number;
  contacted: number;
  new: number;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

const TYPE_OPTIONS = [
  "Construção de piscina",
  "Reforma de piscina",
  "Manutenção de piscina",
  "Espaço de lazer",
  "Paisagismo",
  "Outro",
];

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, contacted: 0, new: 0 });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [contactedFilter, setContactedFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchLeads = useCallback(
    async (page = 1) => {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (search) params.set("search", search);
      if (typeFilter && typeFilter !== "all") params.set("type", typeFilter);
      if (contactedFilter && contactedFilter !== "all")
        params.set("contacted", contactedFilter);

      const res = await fetch(`/api/admin/leads?${params}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        setStats(data.stats);
        setPagination(data.pagination);
      }
      setLoading(false);
    },
    [search, typeFilter, contactedFilter],
  );

  useEffect(() => {
    fetchLeads(1);
  }, [fetchLeads]);

  async function handleToggleContacted(lead: Lead) {
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contacted: !lead.contacted }),
    });
    if (res.ok) {
      fetchLeads(pagination.page);
    }
  }

  async function handleDelete() {
    if (!deleteLead) return;
    setDeleteLoading(true);
    const res = await fetch(`/api/admin/leads/${deleteLead.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setDeleteLead(null);
      fetchLeads(pagination.page);
    }
    setDeleteLoading(false);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Total de Leads"
          value={stats.total}
          color="text-neway-navy"
        />
        <StatCard
          icon={<UserPlus className="h-5 w-5" />}
          label="Novos"
          value={stats.new}
          color="text-amber-600"
        />
        <StatCard
          icon={<UserCheck className="h-5 w-5" />}
          label="Contatados"
          value={stats.contacted}
          color="text-green-600"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neway-navy/40" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Tipo de interesse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {TYPE_OPTIONS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={contactedFilter} onValueChange={setContactedFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="false">Novos</SelectItem>
            <SelectItem value="true">Contatados</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            if (typeFilter) params.set("type", typeFilter);
            if (contactedFilter) params.set("contacted", contactedFilter);
            const url = `/api/admin/leads/export?${params.toString()}`;
            window.location.href = url;
          }}
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Telefone</TableHead>
              <TableHead className="hidden lg:table-cell">Cidade/UF</TableHead>
              <TableHead className="hidden sm:table-cell">Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-neway-navy/50">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-neway-navy/50">
                  Nenhum lead encontrado.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lead.email}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {lead.phone}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {lead.city_state}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {lead.type_of_interest}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={lead.contacted ? "default" : "secondary"}
                      className={
                        lead.contacted
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {lead.contacted ? "Contatado" : "Novo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-neway-navy/60">
                    {formatDate(lead.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setDetailLead(lead)}
                        className="rounded-md p-1.5 text-neway-navy/60 hover:bg-neway-cream hover:text-neway-navy"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleContacted(lead)}
                        className={`rounded-md p-1.5 ${
                          lead.contacted
                            ? "text-green-600 hover:bg-green-50 hover:text-green-700"
                            : "text-amber-500 hover:bg-amber-50 hover:text-amber-600"
                        }`}
                        title={
                          lead.contacted
                            ? "Marcar como novo"
                            : "Marcar como contatado"
                        }
                      >
                        {lead.contacted ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteLead(lead)}
                        className="rounded-md p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600"
                        title="Deletar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-neway-navy/60">
            {pagination.total} lead{pagination.total !== 1 ? "s" : ""} no total
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => fetchLeads(pagination.page - 1)}
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
              onClick={() => fetchLeads(pagination.page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <LeadDetailDialog
        lead={detailLead}
        open={!!detailLead}
        onOpenChange={(open) => !open && setDetailLead(null)}
      />
      <DeleteConfirmDialog
        leadName={deleteLead?.name ?? ""}
        open={!!deleteLead}
        onOpenChange={(open) => !open && setDeleteLead(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`rounded-lg bg-neway-cream p-2.5 ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-neway-navy/60">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
