'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Alert from '@/utils/alert'
import { useGetLoads } from './useLoads'
import { useLoadService } from './useLoadService'
import { useGetDrivers } from '@/modules/drivers/containers/useDrivers'
import { useGetBrokers } from '@/modules/brokers'
import Loads from '@/modules/loads/components/Loads'
import { Dialog } from '@/components/dialog'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import LoadForm from '@/modules/loads/components/LoadForm'

const ITEMS_PER_PAGE = 20

export default function LoadsContainer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      setCurrentPage(Math.max(1, parseInt(pageParam, 10)))
    }
  }, [])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    router.push(`?page=${newPage}`)
  }

  const { data: loadsData, loading: loadsLoading, refetch } = useGetLoads(currentPage, ITEMS_PER_PAGE)
  const { data: driversData } = useGetDrivers(1, 100)
  const { data: brokersData } = useGetBrokers(1, 100)
  const { createLoad, updateLoad, deleteLoad, loading: isSubmitting } = useLoadService()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingLoadId, setDeletingLoadId] = useState<string | null>(null)
  const [isDeletingLoad, setIsDeletingLoad] = useState(false)

  const loads = (loadsData as any)?.loads?.loads || []
  const total = (loadsData as any)?.loads?.total || 0
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
  const drivers = (driversData as any)?.drivers?.drivers || []
  const brokers = (brokersData as any)?.brokers?.brokers || []

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

  const handleUpdateLoad = async (id: string, formData: any) => {
    await handleLoadMutation(
      (data) => updateLoad(id, data),
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

  return (
    <>
      <Loads
        loads={loads}
        drivers={drivers}
        brokers={brokers}
        isLoading={loadsLoading}
        onAddLoad={handleAddLoad}
        onUpdateLoad={handleUpdateLoad}
        onDeleteClick={handleDeleteClick}
        isSubmitting={isSubmitting}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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
