'use client'

import { Stat } from '@/app/stat'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { DriverDialog } from '@/components/drivers/add-driver-dialog'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

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

interface DriverDetailProps {
  driver: Driver
  rides: Ride[]
}

export function DriverDetail({ driver, rides }: DriverDetailProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEditDriver = async (data: any) => {
    console.log('Updating driver:', data)
    setIsDialogOpen(false)
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/drivers" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Drivers
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img
              className="aspect-3/2 rounded-lg shadow-sm"
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(driver.name)}`}
              alt=""
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{driver.name}</Heading>
              <Badge
                color={driver.status === 'AVAILABLE' || driver.status === 'Active' ? 'lime' : driver.status === 'ON_LOAD' ? 'blue' : 'zinc'}
              >
                {driver.status === 'AVAILABLE' || driver.status === 'Active' ? 'Available' : driver.status === 'ON_LOAD' ? 'On Load' : 'Offline'}
              </Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {driver.email && (
                <>
                  {driver.email} <span aria-hidden="true">·</span>{' '}
                </>
              )}
              {driver.phone}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline onClick={() => setIsDialogOpen(true)}>
            Edit
          </Button>
          <Button>View</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Total earnings" value={driver.totalEarnings || '$0.00'} change={driver.totalEarningsChange || '+0%'} />
        <Stat
          title="Rides completed"
          value={`${driver.ridesCompleted || 0}`}
          change={driver.ridesCompletedChange || '+0%'}
        />
        <Stat title="Average rating" value={driver.rating || '0.0'} change={driver.ratingChange || '+0'} />
      </div>
      <Subheading className="mt-12">Recent rides</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Ride ID</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Passenger</TableHeader>
            <TableHeader className="text-right">Earnings</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id} href={ride.url} title={`Ride #${ride.id}`}>
              <TableCell>{ride.id}</TableCell>
              <TableCell className="text-zinc-500">{ride.date}</TableCell>
              <TableCell>{ride.passenger.name}</TableCell>
              <TableCell className="text-right">${ride.earnings}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DriverDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        driver={driver}
        onSubmit={handleEditDriver}
      />
    </>
  )
}
