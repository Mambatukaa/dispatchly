'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '@/components/badge'
import { TableCell, TableRow } from '@/components/table'
import { Button } from '@/components/button'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import { formatDate } from '@/lib/dateUtils'
import type { Load } from '../types'

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
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this load?')) {
      setIsDeleting(true)
      try {
        await onDelete(load.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

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
      <TableCell className="text-zinc-500">{formatDate(load.pickupDate)}</TableCell>
      <TableCell>
        <Badge color={getStatusColor(load.status)}>{load.status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => onEdit(load)}
            className="text-sm cursor-pointer"
            plain
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
            plain
            disabled={isDeleting}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
