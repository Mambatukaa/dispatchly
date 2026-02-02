'use client'

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import LoadRow from './LoadRow'

interface Load {
  id: string
  ref?: string
  pickup: string
  dropoff: string
  driverId?: string
  pickupDate?: string
  status?: string
}

interface Driver {
  id: string
  name: string
}

interface LoadsProps {
  loads: Load[]
  drivers: Driver[]
  isLoading: boolean
  onCreateClick: () => void
  onEditClick: (load: Load) => void
  onDeleteClick: (loadId: string) => void
}

export default function Loads({
  loads,
  drivers,
  isLoading,
  onCreateClick,
  onEditClick,
  onDeleteClick,
}: LoadsProps) {
  return (
    <>
      {/* Action Bar */}
      <div className="flex items-end justify-between gap-4">
        <Heading>Loads ({loads.length})</Heading>
        <Button onClick={onCreateClick} className="cursor-pointer">
          Create load
        </Button>
      </div>

      {/* Table */}
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Reference</TableHeader>
            <TableHeader>Pickup Location</TableHeader>
            <TableHeader>Dropoff Location</TableHeader>
            <TableHeader>Driver</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-zinc-500">
                Loading loads...
              </TableCell>
            </TableRow>
          ) : loads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-zinc-500">
                No loads found
              </TableCell>
            </TableRow>
          ) : (
            loads.map((load) => (
              <LoadRow
                key={load.id}
                load={load}
                driver={drivers.find((d) => d.id === load.driverId)}
                onEdit={onEditClick}
                onDelete={onDeleteClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}
