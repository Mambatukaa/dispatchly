'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Dialog } from '@/components/dialog'
import BrokerRow from './BrokerRow'
import BrokerForm from './BrokerForm'

interface Broker {
  id: string
  logisticName: string
  mc: string
  brokerName: string
  phoneNumber: string
}

interface BrokersProps {
  brokers: Broker[]
  isLoading: boolean
  onAddBroker: (data: any) => Promise<void>
  onUpdateBroker: (id: string, data: any) => Promise<void>
  onDeleteClick: (brokerId: string) => void
  isSubmitting: boolean
}

export default function Brokers({
  brokers,
  isLoading,
  onAddBroker,
  onUpdateBroker,
  onDeleteClick,
  isSubmitting,
}: BrokersProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBroker, setEditingBroker] = useState<Broker | undefined>(undefined)

  const handleAddClick = () => {
    setEditingBroker(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (broker: Broker) => {
    setEditingBroker(broker)
    setIsFormOpen(true)
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
  }

  const handleFormSubmit = async (formData: any) => {
    if (editingBroker) {
      await onUpdateBroker(editingBroker.id, formData)
    } else {
      await onAddBroker(formData)
    }
    setIsFormOpen(false)
    setEditingBroker(undefined)
  }

  return (
    <>
      {/* Action Bar */}
      <div className="flex items-end justify-between gap-4">
        <Heading>Brokers ({brokers.length})</Heading>
        <Button onClick={handleAddClick} className="cursor-pointer">
          Create broker
        </Button>
      </div>

      {/* Table */}
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Logistic Name</TableHeader>
            <TableHeader>MC</TableHeader>
            <TableHeader>Broker Name</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                Loading brokers...
              </TableCell>
            </TableRow>
          ) : brokers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                No brokers found
              </TableCell>
            </TableRow>
          ) : (
            brokers.map((broker) => (
              <BrokerRow
                key={broker.id}
                broker={broker}
                onEdit={handleEditClick}
                onDelete={onDeleteClick}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onClose={handleFormCancel}>
        <Heading>{editingBroker ? 'Edit Broker' : 'Create Broker'}</Heading>
        <BrokerForm
          broker={editingBroker}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Dialog>
    </>
  )
}
