export interface Load {
  id: string
  ref?: string
  driverId: string
  brokerId: string
  pickup: string
  dropoff: string
  pickupDate?: Date
  dropoffDate?: Date
  rate?: number
  notes?: string
  status?: 'NEW' | 'BOOKED' | 'DISPATCHED' | 'PICKED_UP' | 'DELIVERED' | 'INVOICED' | 'PAID' | 'CANCELED'
}
export interface LoadInput {
  driverId: string
  brokerId: string
  pickup: string
  dropoff: string
  ref?: string
  pickupDate?: Date
  dropoffDate?: Date
  rate?: number
  notes?: string
  status?: 'NEW' | 'BOOKED' | 'DISPATCHED' | 'PICKED_UP' | 'DELIVERED' | 'INVOICED' | 'PAID' | 'CANCELED'
}
