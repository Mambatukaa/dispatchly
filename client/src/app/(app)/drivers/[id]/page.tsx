"use client"

import { useParams, useRouter } from "next/navigation"
import { mockDrivers } from "@/lib/mock/drivers"
import { mockLoads } from "@/lib/mock/loads"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EntityTable } from "@/components/common/entity-table"

export default function DriverDetailPage() {
  const params = useParams()
  const router = useRouter()
  const driverId = String(params.id)

  const driver = mockDrivers.find((d) => d.id === driverId)
  const loads = mockLoads.filter((l) => l.driverId === driverId)

  if (!driver) return <div className="text-sm text-muted-foreground">Driver not found.</div>

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{driver.name}</h1>
          <p className="text-sm text-muted-foreground">{driver.phone}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Created</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{driver.createdAt}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Note</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {driver.note ?? "No notes yet."}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="loads">
        <TabsList>
          <TabsTrigger value="loads">Loads</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="loads" className="mt-4">
          <EntityTable
            rows={loads}
            onRowClick={(l) => router.push(`/loads/${l.id}`)}
            columns={[
              { key: "ref", header: "Load", cell: (l) => <span className="font-medium">{l.ref}</span> },
              { key: "status", header: "Status", cell: (l) => l.status },
              { key: "pickup", header: "Pickup", cell: (l) => l.pickup },
              { key: "dropoff", header: "Dropoff", cell: (l) => l.dropoff },
              { key: "pickupDate", header: "Pickup Date", cell: (l) => l.pickupDate },
            ]}
          />
        </TabsContent>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Driver Profile</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Add driver profile details here later (license, home base, etc).
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
