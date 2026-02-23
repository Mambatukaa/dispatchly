'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Alert from '@/utils/alert'
import { useGetBrokers } from './useBrokers'
import { useBrokerService } from './useBrokerService'
import Brokers from '@/modules/brokers/components/Brokers'
import { Dialog } from '@/components/dialog'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'

const ITEMS_PER_PAGE = 20

export default function BrokersContainer() {
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

  const { data: brokersData, loading: brokersLoading, refetch } = useGetBrokers(currentPage, ITEMS_PER_PAGE)
  const { createBroker, updateBroker, deleteBroker, loading: isSubmitting } = useBrokerService()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingBrokerId, setDeletingBrokerId] = useState<string | null>(null)
  const [isDeletingBroker, setIsDeletingBroker] = useState(false)

  const brokersList = (brokersData as any)?.brokers?.brokers || []
  const total = (brokersData as any)?.brokers?.total || 0
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const handleBrokerMutation = async (
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

  const handleAddBroker = async (formData: any) => {
    await handleBrokerMutation(createBroker, formData, 'Broker created successfully', 'Failed to create broker')
  }

  const handleUpdateBroker = async (id: string, formData: any) => {
    await handleBrokerMutation(
      (data) => updateBroker(id, data),
      formData,
      'Broker updated successfully',
      'Failed to update broker'
    )
  }

  const handleDeleteClick = (brokerId: string) => {
    setDeletingBrokerId(brokerId)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingBrokerId) return

    setIsDeletingBroker(true)
    try {
      const result = await deleteBroker(deletingBrokerId)
      if (result.success) {
        await refetch()
        setIsDeleteDialogOpen(false)
        setDeletingBrokerId(null)
        Alert.success('Broker deleted successfully')
      } else {
        Alert.error(String(result.error) || 'Failed to delete broker')
      }
    } catch (error: any) {
      Alert.error(error.message || 'Failed to delete broker')
    } finally {
      setIsDeletingBroker(false)
    }
  }

  return (
    <>
      <Brokers
        brokers={brokersList}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={brokersLoading}
        onAddBroker={handleAddBroker}
        onUpdateBroker={handleUpdateBroker}
        onDeleteClick={handleDeleteClick}
        isSubmitting={isSubmitting}
        onPageChange={handlePageChange}
      />

      <Dialog open={isDeleteDialogOpen} onClose={() => !isDeletingBroker && setIsDeleteDialogOpen(false)}>
        <Heading>Delete Broker</Heading>
        <p className="mt-4 text-sm text-zinc-600">
          Are you sure you want to delete this broker? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button plain onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeletingBroker}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isDeletingBroker}
            className={isDeletingBroker ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isDeletingBroker ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Dialog>
    </>
  )
}
