"use client";

import type { Lead } from "@/lib/types/lead";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Badge } from "@/ui/badge";

interface LeadDetailDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LeadDetailDialog({
  lead,
  open,
  onOpenChange,
}: LeadDetailDialogProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {lead.name}
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
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <Row label="Email" value={lead.email} />
          <Row label="Telefone" value={lead.phone} />
          <Row label="Cidade/Estado" value={lead.city_state} />
          <Row label="Interesse" value={lead.type_of_interest} />
          {lead.approximate_budget && (
            <Row label="Orçamento" value={lead.approximate_budget} />
          )}
          {lead.message && (
            <div>
              <span className="font-medium text-neway-navy/70">Mensagem</span>
              <p className="mt-1 whitespace-pre-wrap rounded-md bg-neway-cream p-3 text-neway-navy">
                {lead.message}
              </p>
            </div>
          )}
          <Row label="Recebido em" value={formatDate(lead.created_at)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-medium text-neway-navy/70">{label}</span>
      <span className="text-right text-neway-navy">{value}</span>
    </div>
  );
}
