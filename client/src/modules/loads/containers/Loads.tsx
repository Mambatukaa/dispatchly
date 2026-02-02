'use client'

import { useState } from 'react'
import Alert from '@/utils/alert'
import { useGetLoads } from './useLoads'
import { useLoadService } from './useLoadService'
import { useGetDrivers } from '@/modules/drivers/containers/useDrivers'
import Loads from '@/modules/loads/components/Loads'
import LoadForm from '@/components/loads/load-form'
import { Dialog } from '@/components/dialog'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'

export default function LoadsContainer() {
  const { data: loadsData, loading: loadsLoading, refetch } = useGetLoads()
  const { data: driversData } = useGetDrivers()
  const { createLoad, updateLoad, deleteLoad, loading: isSubmitting } = useLoadService()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedLoad, setSelectedLoad] = useState<any | undefined>(undefined)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingLoadId, setDeletingLoadId] = useState<string | null>(null)
  const [isDeletingLoad, setIsDeletingLoad] = useState(false)

  const loads = (loadsData as any)?.loads || []
  const drivers = (driversData as any)?.drivers || []

  const handleLoadMutation = async (
    mutationFn: (data: any) => Promise<any>,
    formData: any,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      const result = await mutationFn(formData)
      if (result.success) {
        await refetch()
        setIsFormOpen(false)
        setSelectedLoad(undefined)
        Alert.success(successMessage)
      } else {
        Alert.error(String(result.error) || errorMessage)
      }
    } catch (error: any) {
      Alert.error(error.message || errorMessage)
    }
  }

  const handleAddLoad = async (formData: any) => {
    await handleLoadMutation(createLoad, formData, 'Load created successfully', 'Failed to create load')
  }

  const handleEditLoad = (load: any) => {
    setSelectedLoad(load)
    setIsFormOpen(true)
  }

  const handleUpdateLoad = async (formData: any) => {
    await handleLoadMutation(
      (data) => updateLoad(selectedLoad.id, data),
      formData,
      'Load updated successfully',
      'Failed to update load'
    )
  }

  const handleDeleteClick = (loadId: string) => {
    setDeletingLoadId(loadId)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingLoadId) return

    setIsDeletingLoad(true)
    try {
      const result = await deleteLoad(deletingLoadId)
      if (result.success) {
        await refetch()
        setIsDeleteDialogOpen(false)
        setDeletingLoadId(null)
        Alert.success('Load deleted successfully')
      } else {
        Alert.error(String(result.error) || 'Failed to delete load')
      }
    } catch (error: any) {
      Alert.error(error.message || 'Failed to delete load')
    } finally {
      setIsDeletingLoad(false)
    }
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
    setSelectedLoad(undefined)
  }

  return (
    <>
      <Loads
        loads={loads}
        drivers={drivers}
        isLoading={loadsLoading}
        onCreateClick={() => setIsFormOpen(true)}
        onEditClick={handleEditLoad}
        onDeleteClick={handleDeleteClick}
      />

      <Dialog open={isFormOpen} onClose={handleFormCancel}>
        <Heading>{selectedLoad ? 'Edit Load' : 'Create Load'}</Heading>
        <LoadForm
          editingLoad={selectedLoad}
          onSubmit={selectedLoad ? handleUpdateLoad : handleAddLoad}
          drivers={drivers}
          isLoading={isSubmitting}
          onCancel={handleFormCancel}
        />
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={() => !isDeletingLoad && setIsDeleteDialogOpen(false)}>
        <Heading>Delete Load</Heading>
        <p className="mt-4 text-sm text-zinc-600">
          Are you sure you want to delete this load? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button plain onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeletingLoad}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isDeletingLoad}
            className={isDeletingLoad ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isDeletingLoad ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Dialog>
    </>
  )
}
