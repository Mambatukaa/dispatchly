'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Stat } from '@/app/stat'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Dialog } from '@/components/dialog'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import DriverForm from './DriverForm'
import type { Driver } from '../types'

interface Load {
  id: string | number
  ref?: string
  pickup: string
  dropoff: string
  status?: string
  pickupDate?: string
}

interface DriverDetailProps {
  driver: Driver
  loads: Load[]
  onEditDriver: (data: any) => Promise<void>
}

export default function DriverDetail({ driver, loads, onEditDriver }: DriverDetailProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEditDriver = async (data: any) => {
    setIsSubmitting(true)
    try {
      await onEditDriver(data)
      setIsDialogOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'lime'
      case 'ON_LOAD':
        return 'blue'
      case 'OFF_DUTY':
        return 'zinc'
      default:
        return 'zinc'
    }
  }

  const getLoadStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'yellow'
      case 'DELIVERED':
        return 'green'
      case 'DISPATCHED':
        return 'blue'
      default:
        return 'zinc'
    }
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/drivers" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Drivers
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img
              className="aspect-square rounded-lg shadow-sm"
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(driver.name)}`}
              alt={driver.name}
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{driver.name}</Heading>
              <Badge color={getStatusColor(driver.status)}>
                {driver.status === 'AVAILABLE' ? 'Available' : driver.status === 'ON_LOAD' ? 'On Load' : 'Off Duty'}
              </Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {driver.email && (
                <>
                  {driver.email} <span aria-hidden="true">·</span>{' '}
                </>
              )}
              {driver.phone}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline onClick={() => setIsDialogOpen(true)}>
            Edit
          </Button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Total loads" value={loads.length.toString()} change="+0%" />
        <Stat title="Completed loads" value={loads.filter((l) => l.status === 'DELIVERED').length.toString()} change="+0%" />
        <Stat title="Active loads" value={loads.filter((l) => l.status === 'ON_LOAD' || l.status === 'DISPATCHED').length.toString()} change="+0%" />
      </div>
      <Subheading className="mt-12">Recent loads</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Reference</TableHeader>
            <TableHeader>Pickup</TableHeader>
            <TableHeader>Dropoff</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {loads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                No loads found
              </TableCell>
            </TableRow>
          ) : (
            loads.map((load) => (
              <TableRow key={load.id}>
                <TableCell className="font-semibold">{load.ref || '—'}</TableCell>
                <TableCell>{load.pickup}</TableCell>
                <TableCell>{load.dropoff}</TableCell>
                <TableCell className="text-zinc-500">{load.pickupDate || '—'}</TableCell>
                <TableCell>
                  <Badge color={getLoadStatusColor(load.status || 'NEW')}>
                    {load.status || 'NEW'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Edit Driver</h2>
        <p className="text-sm text-gray-600 mb-4">Update driver information</p>
        <DriverForm driver={driver} onSubmit={handleEditDriver} onCancel={() => setIsDialogOpen(false)} />
      </Dialog>
    </>
  )
}
