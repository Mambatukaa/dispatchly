'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Drivers } from '../components'
import { useGetDrivers } from './useDrivers'
import { useDriverService } from './useDriverService'
import Alert from '@/utils/alert'

const ITEMS_PER_PAGE = 20

export default function DriversContainer() {
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

  const { data, loading, refetch } = useGetDrivers(currentPage, ITEMS_PER_PAGE)
  const { createDriver, updateDriver, deleteDriver } = useDriverService()

  const drivers = (data as any)?.drivers?.drivers || []
  const total = (data as any)?.drivers?.total || 0
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const handleDriverMutation = async (
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

  const handleAddDriver = async (formData: any) => {
    await handleDriverMutation(
      (data) =>
        createDriver({
          name: data.name,
          phone: data.phone,
          email: data.email,
          status: data.status || 'AVAILABLE',
        }),
      formData,
      'Driver created successfully',
      'Failed to create driver'
    )
  }

  const handleEditDriver = async (formData: any) => {
    await handleDriverMutation(
      (data) =>
        updateDriver(data.id, {
          name: data.name,
          phone: data.phone,
          email: data.email,
          status: data.status || 'AVAILABLE',
        }),
      formData,
      'Driver updated successfully',
      'Failed to update driver'
    )
  }

  const handleDeleteDriver = async (driverId: string) => {
    try {
      const result = await deleteDriver(driverId)
      if (result.success) {
        await refetch()
        Alert.success('Driver deleted successfully')
      } else {
        Alert.error(String(result.error) || 'Failed to delete driver')
      }
    } catch (error: any) {
      Alert.error(error.message || 'Failed to delete driver')
    }
  }

  return (
    <Drivers
      drivers={drivers}
      totalCount={drivers.length}
      isLoading={loading}
      remove={handleDeleteDriver}
      onAddDriver={handleAddDriver}
      onEditDriver={handleEditDriver}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  )
}
