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

  const renderForm = () => {
    return (
      <DriverForm
        driver={editingDriver}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    )
  }

  const renderActionBar = () => {
    return (
      <div className="flex items-end justify-between gap-4">
        <Heading>Drivers ({totalCount})</Heading>
        <Button onClick={handleAddClick} className="cursor-pointer">
          Create driver
        </Button>
      </div>
    )
  }

  const renderTable = () => {
    if (drivers.length === 0) {
      return (
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
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                No drivers found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
    }

    return (
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
                Loading...
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
    )
  }

  const content = isLoading ? (
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
        <TableRow>
          <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
            Loading drivers...
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    renderTable()
  )

  return (
    <>
      {renderActionBar()}
      {content}

      {/* Form Modal */}
      <Dialog open={isFormOpen} onClose={handleFormCancel}>
        <h2 className="text-lg font-semibold text-white mb-1">
          {editingDriver ? 'Edit Driver' : 'Create Driver'}
        </h2>
        <p className="text-sm text-zinc-400 mb-4">
          {editingDriver ? 'Update driver information' : 'Add a new driver to the system'}
        </p>
        {renderForm()}
      </Dialog>
    </>
  )
}
