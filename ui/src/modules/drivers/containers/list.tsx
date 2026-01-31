'use client'

import { useState } from 'react'
import Drivers from '../components/list'
import { useGetDrivers } from './useDrivers'
import { useDriverService } from './useDriverService'
import type { Driver } from '../types'

interface DriversContainerProps {
  initialDrivers?: any[]
}

export default function DriversContainer({ initialDrivers }: DriversContainerProps) {
  const { data, loading, error } = useGetDrivers()
  const { createDriver, updateDriver, deleteDriver } = useDriverService()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use Apollo data if available, fall back to initial data
  const drivers = (data as any)?.drivers || initialDrivers || []

  const handleAddDriver = async (formData: any) => {
    setIsSubmitting(true)
    try {
      // Convert avatar file to URL if it's a file
      let avatarUrl = formData.avatar
      if (formData.avatar instanceof File) {
        // Generate URL from name using DiceBear
        avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`
      }

      if (selectedDriver) {
        // Update existing driver
        const result = await updateDriver(selectedDriver.id, {
          name: formData.name,
          phone: formData.phone,
          status: formData.status || 'AVAILABLE',
          avatar: avatarUrl,
        })
        if (!result.success) {
          alert(`Error updating driver: ${result.error}`)
        }
      } else {
        // Create new driver
        const result = await createDriver({
          name: formData.name,
          phone: formData.phone,
          status: formData.status || 'AVAILABLE',
          avatar: avatarUrl,
        })
        if (!result.success) {
          alert(`Error creating driver: ${result.error}`)
        }
      }

      setIsDialogOpen(false)
      setSelectedDriver(undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenAddDialog = () => {
    setSelectedDriver(undefined)
    setIsDialogOpen(true)
  }

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver)
    setIsDialogOpen(true)
  }

  const handleDeleteDriver = async (driverId: string | number) => {
    if (confirm('Are you sure you want to delete this driver?')) {
      const result = await deleteDriver(driverId)
      if (!result.success) {
        alert(`Error deleting driver: ${result.error}`)
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedDriver(undefined)
  }

  return (
    <Drivers
      drivers={drivers}
      loading={loading}
      error={error}
      isDialogOpen={isDialogOpen}
      selectedDriver={selectedDriver}
      isSubmitting={isSubmitting}
      onAddDriver={handleAddDriver}
      onOpenAddDialog={handleOpenAddDialog}
      onEditDriver={handleEditDriver}
      onDeleteDriver={handleDeleteDriver}
      onCloseDialog={handleCloseDialog}
    />
  )
}
