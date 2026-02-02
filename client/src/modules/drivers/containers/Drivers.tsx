'use client'

import React from 'react'
import { Drivers as DriversComponent } from '../components'
import { useGetDrivers } from './useDrivers'
import { useDriverService } from './useDriverService'

export default function DriversContainer() {
  const { data, loading } = useGetDrivers()
  const { createDriver, updateDriver, deleteDriver } = useDriverService()

  const drivers = (data as any)?.drivers || []

  const handleAddDriver = async (formData: any) => {
    const result = await createDriver({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status || 'AVAILABLE',
    })

    if (!result.success) {
      alert(`Error creating driver: ${result.error}`)
    }
  }

  const handleEditDriver = async (formData: any) => {
    const result = await updateDriver(formData.id, {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status || 'AVAILABLE',
    })

    if (!result.success) {
      alert(`Error updating driver: ${result.error}`)
    }
  }

  const handleDeleteDriver = async (driverId: string) => {
    await deleteDriver(driverId)
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
