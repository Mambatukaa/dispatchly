'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { ChevronLeftIcon, MapPinIcon, TruckIcon, CalendarIcon } from '@heroicons/react/16/solid'

interface Load {
  id: string
  ref?: string
  pickup: string
  dropoff: string
  driverId?: string
  pickupDate?: string
  rate?: number
  shipperName?: string
  notes?: string
  status?: string
}

interface Driver {
  id: string
  name: string
}

interface LoadDetailViewProps {
  load?: Load
  drivers: Driver[]
  isLoading: boolean
  isDeleting: boolean
  onDelete: () => void
  onEdit: () => void
}

export default function LoadDetailView({
  load,
  drivers,
  isLoading,
  isDeleting,
  onDelete,
  onEdit,
}: LoadDetailViewProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-zinc-500">
        Loading load details...
      </div>
    )
  }

  if (!load) {
    return (
      <div className="text-center py-8 text-zinc-500">
        Load not found
      </div>
    )
  }

  const driver = drivers.find((d) => d.id === load.driverId)

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/loads" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Loads
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Load {load.ref || 'Details'}</Heading>
          <Badge
            color={
              load.status === 'NEW'
                ? 'yellow'
                : load.status === 'DELIVERED'
                  ? 'green'
                  : load.status === 'DISPATCHED'
                    ? 'blue'
                    : 'zinc'
            }
          >
            {load.status}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <MapPinIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{load.pickup}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <TruckIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{driver?.name || '-'}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{load.pickupDate || '-'}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button onClick={onEdit} className="cursor-pointer">
              Edit
            </Button>
            <Button onClick={onDelete} disabled={isDeleting} className="cursor-pointer">
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Load Details</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Reference</DescriptionTerm>
          <DescriptionDetails>{load.ref || '-'}</DescriptionDetails>
          <DescriptionTerm>Pickup Location</DescriptionTerm>
          <DescriptionDetails>{load.pickup}</DescriptionDetails>
          <DescriptionTerm>Dropoff Location</DescriptionTerm>
          <DescriptionDetails>{load.dropoff}</DescriptionDetails>
          <DescriptionTerm>Driver</DescriptionTerm>
          <DescriptionDetails>{driver?.name || '-'}</DescriptionDetails>
          <DescriptionTerm>Pickup Date</DescriptionTerm>
          <DescriptionDetails>{load.pickupDate || '-'}</DescriptionDetails>
          <DescriptionTerm>Rate</DescriptionTerm>
          <DescriptionDetails>${load.rate || '0.00'}</DescriptionDetails>
          <DescriptionTerm>Shipper Name</DescriptionTerm>
          <DescriptionDetails>{load.shipperName || '-'}</DescriptionDetails>
          <DescriptionTerm>Notes</DescriptionTerm>
          <DescriptionDetails>{load.notes || '-'}</DescriptionDetails>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <Badge
              color={
                load.status === 'NEW'
                  ? 'yellow'
                  : load.status === 'DELIVERED'
                    ? 'green'
                    : load.status === 'DISPATCHED'
                      ? 'blue'
                      : 'zinc'
              }
            >
              {load.status}
            </Badge>
          </DescriptionDetails>
        </DescriptionList>
      </div>
    </>
  )
}
