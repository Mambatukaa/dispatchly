import { Badge } from "@/components/ui/badge"
import type { LoadStatus } from "@/types/load"

export function LoadStatusBadge({ status }: { status: LoadStatus }) {
  const label = status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/(^|\s)\S/g, (t) => t.toUpperCase())

  return <Badge variant="secondary">{label}</Badge>
}
