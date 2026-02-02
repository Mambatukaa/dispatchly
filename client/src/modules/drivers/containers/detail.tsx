'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useGetDriver } from './useDrivers'
import { useDriverService } from './useDriverService'
import DriverDetail from '../components/detail'

export default function DriverDetailContainer() {
  const router = useRouter()
  const params = useParams()
  const driverId = params?.id as string

  const { data, loading, error } = useGetDriver(driverId)
  const { updateDriver } = useDriverService()

  const driver = (data as any)?.driver
  const loads = driver?.loads || []

  const handleEditDriver = async (formData: any) => {
    const result = await updateDriver(driverId, {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status || 'AVAILABLE',
      avatar: formData.avatar,
    })

    if (!result.success) {
      alert(`Error updating driver: ${result.error}`)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Loading driver...</p>
      </div>
    )
  }

  if (!driver || error) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Driver not found</p>
        <button
          onClick={() => router.push('/drivers')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Drivers
        </button>
      </div>
    )
  }

  return <DriverDetail driver={driver} loads={loads} onEditDriver={handleEditDriver} />
}
