'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Driver } from '../types'
import { Badge } from '@/components/badge'
import { TableCell, TableRow } from '@/components/table'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'

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
        <Dropdown>
          <DropdownButton plain aria-label="More options">
            <EllipsisVerticalIcon className="w-4 h-4" />
          </DropdownButton>
          <DropdownMenu anchor="bottom end">
            <DropdownItem
              onClick={(e) => {
                e.preventDefault()
                onEdit(driver)
              }}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={(e) => {
                e.preventDefault()
                handleRemove()
              }}
              disabled={isDeleting}
              className="text-red-600"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </TableCell>
    </TableRow>
  )
}
