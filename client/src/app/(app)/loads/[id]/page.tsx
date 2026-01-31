"use client"

import { useParams } from "next/navigation"
import { mockLoads } from "@/lib/mock/loads"
import { LoadStatusBadge } from "@/components/loads/load-status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadDocumentsPanel } from "@/components/loads/load-documents-panel"
import { LoadHistoryPanel } from "@/components/loads/load-history-panel"

export default function LoadDetailPage() {
  const params = useParams()
  const loadId = String(params.id)

  const load = mockLoads.find((l) => l.id === loadId)
  if (!load) return <div className="text-sm text-muted-foreground">Load not found.</div>

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{load.ref}</h1>
          <p className="text-sm text-muted-foreground">
            {load.pickup} → {load.dropoff} • Pickup {load.pickupDate}
          </p>
        </div>
        <LoadStatusBadge status={load.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Broker</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{load.brokerName ?? "—"}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Shipper</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{load.shipperName ?? "—"}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Rate</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{load.rate ? `$${load.rate}` : "—"}</CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {load.notes ?? "No notes yet."}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <LoadDocumentsPanel />
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <LoadHistoryPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
