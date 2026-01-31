import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { getLoads } from '@/data'
import { ChevronLeftIcon, MapPinIcon, TruckIcon, CalendarIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  let { id } = await params
  let loads = await getLoads()
  let load = loads.find((l) => l.id === id)

  return {
    title: load && `Load ${load.ref}`,
  }
}

export default async function LoadDetail({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params
  let loads = await getLoads()
  let load = loads.find((l) => l.id === id)

  if (!load) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orders" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Loads
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Load {load.ref}</Heading>
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
              <span>{load.driver}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{load.date}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Load Details</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Reference</DescriptionTerm>
          <DescriptionDetails>{load.ref}</DescriptionDetails>
          <DescriptionTerm>Pickup Location</DescriptionTerm>
          <DescriptionDetails>{load.pickup}</DescriptionDetails>
          <DescriptionTerm>Dropoff Location</DescriptionTerm>
          <DescriptionDetails>{load.dropoff}</DescriptionDetails>
          <DescriptionTerm>Driver</DescriptionTerm>
          <DescriptionDetails>{load.driver}</DescriptionDetails>
          <DescriptionTerm>Date</DescriptionTerm>
          <DescriptionDetails>{load.date}</DescriptionDetails>
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
