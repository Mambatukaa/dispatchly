'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useGetDrivers } from './useDrivers'
import { useDriverService } from './useDriverService'
import DriverDetail from '../components/detail'

export default function DriverDetailContainer() {
  const router = useRouter()
  const params = useParams()
  const driverId = params?.id as string

  const { data } = useGetDrivers()
  const { updateDriver } = useDriverService()

  const drivers = (data as any)?.drivers || []
  const driver = drivers.find((d: any) => d.id === driverId || d.id === parseInt(driverId))

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

  if (!driver) {
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

  // Mock loads data - replace with actual GraphQL query when available
  const mockLoads = [
    { id: '1', ref: 'LD-001', pickup: 'New York, NY', dropoff: 'Boston, MA', status: 'DELIVERED', pickupDate: '2024-01-15' },
    { id: '2', ref: 'LD-002', pickup: 'Boston, MA', dropoff: 'Philadelphia, PA', status: 'ON_LOAD', pickupDate: '2024-01-16' },
    { id: '3', ref: 'LD-003', pickup: 'Philadelphia, PA', dropoff: 'Washington, DC', status: 'NEW', pickupDate: '2024-01-17' },
  ]

  return <DriverDetail driver={driver} loads={mockLoads} onEditDriver={handleEditDriver} />
}
