'use client'

import Link from 'next/link'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'

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

interface LoadsTableProps {
  loads: Load[]
  drivers: Driver[]
  isLoading: boolean
  onCreateClick: () => void
  onEditClick: (load: Load) => void
  onDeleteClick: (loadId: string) => void
}

export default function LoadsTable({
  loads,
  drivers,
  isLoading,
  onCreateClick,
  onEditClick,
  onDeleteClick,
}: LoadsTableProps) {
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Loads</Heading>
        <Button onClick={onCreateClick} className="cursor-pointer">
          Create load
        </Button>
      </div>
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
                Loading...
              </TableCell>
            </TableRow>
          ) : loads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-zinc-500">
                No loads found
              </TableCell>
            </TableRow>
          ) : (
            loads.map((load) => {
              const driver = drivers.find((d) => d.id === load.driverId)
              return (
                <TableRow key={load.id}>
                  <TableCell className="font-semibold">
                    <Link href={`/loads/${load.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                      {load.ref || '-'}
                    </Link>
                  </TableCell>
                  <TableCell>{load.pickup}</TableCell>
                  <TableCell>{load.dropoff}</TableCell>
                  <TableCell>{driver?.name || '-'}</TableCell>
                  <TableCell className="text-zinc-500">{load.pickupDate || '-'}</TableCell>
                  <TableCell>
                    <Badge
                      color={
                        load.status === 'NEW'
                          ? 'yellow'
                          : load.status === 'DELIVERED'
                            ? 'green'
                            : load.status === 'DISPATCHED'
                              ? 'blue'
                              : 'zinc'
                      }
                    >
                      {load.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dropdown>
                      <DropdownButton plain aria-label="More options">
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </DropdownButton>
                      <DropdownMenu anchor="bottom end">
                        <DropdownItem href={`/loads/${load.id}`}>View</DropdownItem>
                        <DropdownItem
                          onClick={(e) => {
                            e.preventDefault()
                            onEditClick(load)
                          }}
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={(e) => {
                            e.preventDefault()
                            onDeleteClick(load.id)
                          }}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </>
  )
}
