'use client'

import React from 'react'
import { Drivers as DriversComponent } from '../components'
import { useGetDrivers } from './useDrivers'
import { useDriverService } from './useDriverService'
import Alert from '@/utils/alert'

export default function DriversContainer() {
  const { data, loading } = useGetDrivers()
  const { createDriver, updateDriver, deleteDriver } = useDriverService()

  const drivers = (data as any)?.drivers || []

  const handleDriverMutation = async (
    mutationFn: (data: any) => Promise<any>,
    formData: any,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      const result = await mutationFn(formData)

      if (result.success) {
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
        Alert.success('Driver deleted successfully')
      } else {
        Alert.error(String(result.error) || 'Failed to delete driver')
      }
    } catch (error: any) {
      Alert.error(error.message || 'Failed to delete driver')
    }
  }

  return (
    <DriversComponent
      drivers={drivers}
      totalCount={drivers.length}
      isLoading={loading}
      remove={handleDeleteDriver}
      onAddDriver={handleAddDriver}
      onEditDriver={handleEditDriver}
    />
  )
}
