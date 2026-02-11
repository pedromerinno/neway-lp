import LeadsDashboard from "@/components/admin/LeadsDashboard";
import PageviewsPanel from "@/components/admin/PageviewsPanel";

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <LeadsDashboard />
      <PageviewsPanel />
    </div>
  );
}
