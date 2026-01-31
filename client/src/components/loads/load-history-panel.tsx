import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoadHistoryPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">History</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Status changes, assignments, and document uploads will show here.
      </CardContent>
    </Card>
  )
}
