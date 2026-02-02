'use client'

import Link from 'next/link'
import { Badge } from '@/components/badge'
import { TableCell, TableRow } from '@/components/table'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'

interface Load {
  id: string
  ref?: string
  pickup: string
  dropoff: string
  pickupDate?: string
  status?: string
}

interface Driver {
  id: string
  name: string
}

interface LoadRowProps {
  load: Load
  driver?: Driver
  onEdit: (load: Load) => void
  onDelete: (loadId: string) => void
}

const getStatusColor = (status?: string) => {
  if (status === 'NEW') return 'yellow'
  if (status === 'DELIVERED') return 'green'
  if (status === 'DISPATCHED') return 'blue'
  return 'zinc'
}

export default function LoadRow({ load, driver, onEdit, onDelete }: LoadRowProps) {
  return (
    <TableRow>
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
        <Badge color={getStatusColor(load.status)}>{load.status}</Badge>
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
                onEdit(load)
              }}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={(e) => {
                e.preventDefault()
                onDelete(load.id)
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
}
