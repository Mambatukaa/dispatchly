import { Badge } from "@/components/ui/badge"
import type { DriverStatus } from "@/types/driver"

export function DriverStatusBadge({ status }: { status: DriverStatus }) {
  const label =
    status === "AVAILABLE" ? "Available" : status === "ON_LOAD" ? "On Load" : "Off Duty"

  // Minimal now; you can add variants/colors later
  return <Badge variant="secondary">{label}</Badge>
}
