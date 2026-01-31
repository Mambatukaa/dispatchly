'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { AddLoadDialog } from '@/components/loads/add-load-dialog'
import { getLoads } from '@/data'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from 'react'

export default function Loads() {
  const [loads, setLoads] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLoad, setSelectedLoad] = useState<any | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchLoads = async () => {
      const data = await getLoads()
      setLoads(data)
    }
    fetchLoads()
  }, [])

  const handleAddLoad = async (formData: any) => {
    setIsSubmitting(true)
    try {
      if (selectedLoad) {
        // Update existing load
        setLoads(loads.map(load => load.id === selectedLoad.id ? { ...load, ...formData } : load))
      } else {
        // Create new load
        const newLoad = {
          id: String(Date.now()),
          url: `/loads/${Date.now()}`,
          ...formData
        }
        setLoads([newLoad, ...loads])
      }
      setIsDialogOpen(false)
      setSelectedLoad(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenAddDialog = () => {
    setSelectedLoad(undefined)
    setIsDialogOpen(true)
  }

  const handleEditLoad = (load: any) => {
    setSelectedLoad(load)
    setIsDialogOpen(true)
  }

  const handleDeleteLoad = (loadId: string) => {
    if (confirm('Are you sure you want to delete this load?')) {
      setLoads(loads.filter(load => load.id !== loadId))
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedLoad(undefined)
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Loads</Heading>
        <Button onClick={handleOpenAddDialog} className="cursor-pointer">
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
          {loads.map((load: any) => (
            <TableRow key={load.id}>
              <TableCell className="font-semibold">{load.ref}</TableCell>
              <TableCell>{load.pickup}</TableCell>
              <TableCell>{load.dropoff}</TableCell>
              <TableCell>{load.driver}</TableCell>
              <TableCell className="text-zinc-500">{load.date}</TableCell>
              <TableCell>
                <Badge color={load.status === 'NEW' ? 'yellow' : load.status === 'DELIVERED' ? 'green' : load.status === 'DISPATCHED' ? 'blue' : 'zinc'}>
                  {load.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={load.url}>View</DropdownItem>
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault()
                        handleEditLoad(load)
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault()
                        handleDeleteLoad(load.id)
                      }}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddLoadDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        load={selectedLoad}
        onSubmit={handleAddLoad}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
