import { Stat } from '@/app/stat'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { DriverDetail } from '@/components/drivers/driver-detail'
import { getDriver, getDriverRides } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  let { id } = await params
  let driver = await getDriver(id)

  return {
    title: driver?.name,
  }
}

export default async function Driver({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let driver = await getDriver(id)
  let rides = await getDriverRides(id)

  if (!driver) {
    notFound()
  }

  return <DriverDetail driver={driver} rides={rides} />
}
