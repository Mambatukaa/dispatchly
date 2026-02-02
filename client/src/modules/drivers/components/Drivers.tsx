'use client'

import React from 'react'
import type { Driver } from '../types'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Dialog } from '@/components/dialog'
import DriverForm from './DriverForm'
import DriverRow from './DriverRow'

type Props = {
  drivers: Driver[]
  totalCount: number
  isLoading: boolean
  remove: (id: string) => void
  onAddDriver: (data: any) => Promise<void>
  onEditDriver: (data: any) => Promise<void>
}

export default function Drivers({
  drivers,
  totalCount,
  isLoading,
  remove,
  onAddDriver,
  onEditDriver,
}: Props) {
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [editingDriver, setEditingDriver] = React.useState<Driver | undefined>()

  const handleAddClick = () => {
    setEditingDriver(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (driver: Driver) => {
    setEditingDriver(driver)
    setIsFormOpen(true)
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
  }

  const handleFormSubmit = async (data: any) => {
    if (editingDriver) {
      await onEditDriver(data)
    } else {
      await onAddDriver(data)
    }
    handleFormCancel()
  }

  return (
    <>
      {/* Action Bar */}
      <div className="flex items-end justify-between gap-4">
        <Heading>Drivers ({totalCount})</Heading>
        <Button onClick={handleAddClick} className="cursor-pointer">
          Create driver
        </Button>
      </div>

      {/* Table */}
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                Loading drivers...
              </TableCell>
            </TableRow>
          ) : drivers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                No drivers found
              </TableCell>
            </TableRow>
          ) : (
            drivers.map((driver) => (
              <DriverRow
                key={driver.id}
                driver={driver}
                removeItem={remove}
                onEdit={handleEditClick}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onClose={handleFormCancel}>
        <Heading>{editingDriver ? 'Edit Driver' : 'Create Driver'}</Heading>
        <DriverForm
          driver={editingDriver}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Dialog>
    </>
  )
}
