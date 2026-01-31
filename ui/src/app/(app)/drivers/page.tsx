import DriversContainer from '@/modules/drivers/containers/list'
import { getDrivers } from '@/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drivers',
}

export default async function Drivers() {
  let drivers = await getDrivers()

  return <DriversContainer initialDrivers={drivers} />
}
