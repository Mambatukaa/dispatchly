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

  const handleAddDriver = async (formData: any) => {
    try {
      const result = await createDriver({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        status: formData.status || 'AVAILABLE',
      })

      if (result.success) {
        Alert.success('Driver created successfully')
      } else {
        Alert.error(String(result.error) || 'Failed to create driver')
      }
    } catch (error: any) {
      Alert.error(error.message || 'Failed to create driver')
    }
  }

  const handleEditDriver = async (formData: any) => {
    try {
      const result = await updateDriver(formData.id, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        status: formData.status || 'AVAILABLE',
      })

      if (result.success) {
        Alert.success('Driver updated successfully')
      } else {
        Alert.error(String(result.error) || 'Failed to update driver')
      }
    } catch (error: any) {
      Alert.error(error.message || 'Failed to update driver')
    }
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
