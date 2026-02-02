'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Dialog } from '@/components/dialog'
import LoadRow from './LoadRow'
import LoadForm from './LoadForm'
import type { Load } from '../types'

interface Driver {
  id: string
  name: string
}

interface Broker {
  id: string
  brokerName: string
}

interface LoadsProps {
  loads: Load[]
  drivers: Driver[]
  brokers: Broker[]
  isLoading: boolean
  onAddLoad: (data: any) => Promise<void>
  onUpdateLoad: (id: string, data: any) => Promise<void>
  onDeleteClick: (loadId: string) => void
  isSubmitting: boolean
}

export default function Loads({
  loads,
  drivers,
  brokers,
  isLoading,
  onAddLoad,
  onUpdateLoad,
  onDeleteClick,
  isSubmitting,
}: LoadsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingLoad, setEditingLoad] = useState<Load | undefined>(undefined)

  const handleAddClick = () => {
    setEditingLoad(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (load: Load) => {
    setEditingLoad(load)
    setIsFormOpen(true)
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
  }

  const handleFormSubmit = async (formData: any) => {
    if (editingLoad) {
      await onUpdateLoad(editingLoad.id, formData)
    } else {
      await onAddLoad(formData)
    }
    setIsFormOpen(false)
    setEditingLoad(undefined)
  }

  return (
    <>
      {/* Action Bar */}
      <div className="flex items-end justify-between gap-4">
        <Heading>Loads ({loads.length})</Heading>
        <Button onClick={handleAddClick} className="cursor-pointer">
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
                onEdit={handleEditClick}
                onDelete={onDeleteClick}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onClose={handleFormCancel}>
        <Heading>{editingLoad ? 'Edit Load' : 'Create Load'}</Heading>
        <LoadForm
          load={editingLoad}
          onSubmit={handleFormSubmit}
          drivers={drivers}
          brokers={brokers}
          onCancel={handleFormCancel}
        />
      </Dialog>
    </>
  )
}
