export type DriverStatus = 'AVAILABLE' | 'ON_LOAD' | 'OFF_DUTY'

export interface Driver {
  id: string | number
  name: string
  phone: string
  email?: string
  status: DriverStatus
  avatar: string
  rating?: number
  createdAt: string
}

export interface DriverInput {
  name: string
  phone: string
  email: string
  status?: DriverStatus
  avatar?: string
}

export type LoadStatus = 'NEW' | 'BOOKED' | 'DISPATCHED' | 'PICKED_UP' | 'DELIVERED' | 'INVOICED' | 'PAID' | 'CANCELED'

export interface Load {
  id: string | number
  ref: string
  status: LoadStatus
  driver?: Driver
  driverId?: string
  pickup: string
  dropoff: string
  pickupDate: string
  rate?: number
  brokerName?: string
  shipperName?: string
  notes?: string
}

export interface DriverResponse {
  success: boolean
  message: string
}
