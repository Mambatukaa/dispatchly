export interface Load {
  id: string
  ref?: string
  driverId: string
  brokerId: string
  pickup: string
  dropoff: string
  pickupDate?: string
  dropoffDate?: string
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
  pickupDate?: string
  dropoffDate?: string
  rate?: number
  notes?: string
  status?: 'NEW' | 'BOOKED' | 'DISPATCHED' | 'PICKED_UP' | 'DELIVERED' | 'INVOICED' | 'PAID' | 'CANCELED'
}
