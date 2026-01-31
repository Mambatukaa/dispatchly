import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoadDocumentsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Documents</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Upload Rate Confirm, BOL, POD, Invoice (next step).
      </CardContent>
    </Card>
  )
}
