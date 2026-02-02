'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Driver } from '../types'
import { Badge } from '@/components/badge'
import { TableCell, TableRow } from '@/components/table'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/button'

type Props = {
  driver: Driver
  removeItem: (id: string) => void
  onEdit: (driver: Driver) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'AVAILABLE':
      return 'green'
    case 'ON_LOAD':
      return 'blue'
    case 'OFF_DUTY':
      return 'zinc'
    default:
      return 'zinc'
  }
}

export default function DriverRow({ driver, removeItem, onEdit }: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      setIsDeleting(true)
      try {
        await removeItem(driver.id as string)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <TableRow>
      <TableCell className="font-semibold">
        <Link href={`/drivers/${driver.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
          {driver.name}
        </Link>
      </TableCell>
      <TableCell>{driver.phone}</TableCell>
      <TableCell className="text-zinc-500">{driver.email || '—'}</TableCell>
      <TableCell>
        <Badge color={getStatusColor(driver.status)}>{driver.status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => onEdit(driver)}
            className="text-sm cursor-pointer"
            plain
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleRemove}
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
