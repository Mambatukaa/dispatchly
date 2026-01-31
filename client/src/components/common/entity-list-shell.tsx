"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function EntityListShell({
  title,
  description,
  searchPlaceholder = "Search...",
  rightAction,
  children,
}: {
  title: string
  description?: string
  searchPlaceholder?: string
  rightAction?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {rightAction}
      </div>

      <Card className="p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-sm">
            <Input placeholder={searchPlaceholder} />
          </div>
        </div>
      </Card>

      {children}
    </div>
  )
}
