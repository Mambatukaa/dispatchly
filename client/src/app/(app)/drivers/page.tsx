import { DriversContainer } from '@/modules/drivers/containers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drivers',
}

export default function DriversPage() {
  return <DriversContainer />
}

