import { getDrivers } from '@/data'
import { ApplicationLayout } from './application-layout'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let drivers = await getDrivers()

  return <ApplicationLayout events={drivers}>{children}</ApplicationLayout>
}
