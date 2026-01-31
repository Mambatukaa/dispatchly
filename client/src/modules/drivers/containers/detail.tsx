'use client'

import { DriverDetail } from '../components/detail'
import { useParams } from 'next/navigation'
import { useGetDriver, useGetDriverLoads } from './useDrivers'

interface Driver {
  id: string | number
  name: string
  email?: string
  phone: string
  status: string
  imgUrl?: string
  totalEarnings?: string
  totalEarningsChange?: string
  ridesCompleted?: number
  ridesCompletedChange?: string
  rating?: string
  ratingChange?: string
}

interface Ride {
  id: string | number
  url?: string
  date: string
  passenger: { name: string }
  earnings: string
}

export default function DriverDetailContainer() {
  const params = useParams()
  const id = params.id as string

  const { data: driverData, loading: driverLoading, error: driverError } = useGetDriver(id)
  const { data: ridesData, loading: ridesLoading } = useGetDriverLoads(id)

  const loading = driverLoading || ridesLoading
  const error = driverError
  const driver = driverData?.driver as Driver | null
  const rides = (ridesData?.driverLoads || []) as Ride[]

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error.message}</div>
  }

  if (!driver) {
    return <div className="text-center py-10 text-red-600">Driver not found</div>
  }

  return <DriverDetail driver={driver} rides={rides} />
}
