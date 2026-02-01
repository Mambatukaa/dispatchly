'use client'

import { useState } from 'react'
import { useGetLoads } from './useLoads'
import { useLoadService } from './useLoadService'
import { useGetDrivers } from '@/modules/drivers/containers/useDrivers'
import LoadsTable from '@/modules/loads/components/list'
import LoadForm from '@/components/loads/load-form'

export default function LoadsListContainer() {
  const { data: loadsData, loading: loadsLoading, refetch } = useGetLoads()
  const { data: driversData } = useGetDrivers()
  const { createLoad, updateLoad, deleteLoad, loading: isSubmitting } = useLoadService()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLoad, setSelectedLoad] = useState<any | undefined>(undefined)

  const loads = (loadsData as any)?.loads || []
  const drivers = (driversData as any)?.drivers || []

  const handleAddLoad = async (formData: any) => {
    try {
      if (selectedLoad) {
        const result = await updateLoad(selectedLoad.id, formData)
        if (result.success) {
          await refetch()
          setIsDialogOpen(false)
          setSelectedLoad(undefined)
        }
      } else {
        const result = await createLoad(formData)
        if (result.success) {
          await refetch()
          setIsDialogOpen(false)
          setSelectedLoad(undefined)
        }
      }
    } catch (error) {
      console.error('Error saving load:', error)
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

  const handleDeleteLoad = async (loadId: string) => {
    if (confirm('Are you sure you want to delete this load?')) {
      const result = await deleteLoad(loadId)
      if (result.success) {
        await refetch()
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedLoad(undefined)
  }

  return (
    <>
      <LoadsTable
        loads={loads}
        drivers={drivers}
        isLoading={loadsLoading}
        onCreateClick={handleOpenAddDialog}
        onEditClick={handleEditLoad}
        onDeleteClick={handleDeleteLoad}
      />

      <LoadForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingLoad={selectedLoad}
        onSubmit={handleAddLoad}
        drivers={drivers}
        isLoading={isSubmitting}
      />
    </>
  )
}
