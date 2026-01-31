"use client"

import { useRouter } from "next/navigation"
import { EntityListShell } from "@/components/common/entity-list-shell"
import { EntityTable } from "@/components/common/entity-table"
import { mockLoads } from "@/lib/mock/loads"
import { LoadStatusBadge } from "@/components/loads/load-status-badge"
import { AddLoadDialog } from "@/components/loads/add-load-dialog"

export default function LoadsPage() {
  const router = useRouter()

  return (
    <EntityListShell
      title="Loads"
      description="Manage loads, assignments, documents, and history."
      searchPlaceholder="Search loads..."
      rightAction={<AddLoadDialog />}
    >
      <EntityTable
        rows={mockLoads}
        onRowClick={(l) => router.push(`/loads/${l.id}`)}
        columns={[
          { key: "ref", header: "Load", cell: (l) => <span className="font-medium">{l.ref}</span> },
          { key: "status", header: "Status", cell: (l) => <LoadStatusBadge status={l.status} /> },
          { key: "broker", header: "Broker", cell: (l) => l.brokerName ?? "—" },
          { key: "pickup", header: "Pickup", cell: (l) => l.pickup },
          { key: "dropoff", header: "Dropoff", cell: (l) => l.dropoff },
          { key: "date", header: "Pickup Date", cell: (l) => l.pickupDate },
          { key: "rate", header: "Rate", cell: (l) => (l.rate ? `$${l.rate}` : "—") },
        ]}
      />
    </EntityListShell>
  )
}
