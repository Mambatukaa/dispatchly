export interface Load {
  id: string
  ref?: string
  driverId: string
  pickup: string
  dropoff: string
  pickupDate?: string
  rate?: number
  shipperName?: string
  notes?: string
  status?: 'NEW' | 'BOOKED' | 'DISPATCHED' | 'PICKED_UP' | 'DELIVERED' | 'INVOICED' | 'PAID' | 'CANCELED'
}

export interface LoadInput {
  driverId: string
  pickup: string
  dropoff: string
  ref?: string
  pickupDate?: string
  rate?: number
  shipperName?: string
  notes?: string
  status?: 'NEW' | 'BOOKED' | 'DISPATCHED' | 'PICKED_UP' | 'DELIVERED' | 'INVOICED' | 'PAID' | 'CANCELED'
}
