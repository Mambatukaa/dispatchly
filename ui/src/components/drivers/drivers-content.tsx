'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { DriverDialog } from '@/components/drivers/add-driver-dialog'
import { useState } from 'react'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'

interface Driver {
  id: string | number
  name: string
  url: string
  email: string
  phone: string
  ridesCompleted: number
  rating: string
  status: string
  imgUrl: string
  totalEarnings?: string
  totalEarningsChange?: string
  ridesCompletedChange?: string
  ratingChange?: string
  thumbUrl?: string
}

interface DriversContentProps {
  drivers: Driver[]
}

export function DriversContent({ drivers }: DriversContentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(undefined)

  const handleAddDriver = async (data: any) => {
    // Handle driver submission
    console.log('Adding/updating driver:', data)
    // You can add API call here
  }

  const handleOpenAddDialog = () => {
    setSelectedDriver(undefined)
    setIsDialogOpen(true)
  }

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedDriver(undefined)
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Drivers</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search drivers&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Button onClick={handleOpenAddDialog} className="cursor-pointer">Add driver</Button>
      </div>
      <ul className="mt-10">
        {drivers.map((driver, index) => (
          <li key={driver.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between">
              <div key={driver.id} className="flex gap-6 py-6">
                <div className="w-32 shrink-0">
                  <Link href={driver.url} aria-hidden="true">
                    <img className="aspect-3/2 rounded-lg shadow-sm" src={driver.imgUrl} alt="" />
                  </Link>
                </div>
                <div className="space-y-1.5">
                  <div className="text-base/6 font-semibold">
                    <Link href={driver.url}>{driver.name}</Link>
                  </div>
                  <div className="text-xs/6 text-zinc-500">
                    {driver.email} <span aria-hidden="true">·</span> {driver.phone}
                  </div>
                  <div className="text-xs/6 text-zinc-600">
                    {driver.ridesCompleted} rides completed <span aria-hidden="true">·</span> {driver.rating} ⭐
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="max-sm:hidden" color={driver.status === 'Active' ? 'lime' : 'zinc'}>
                  {driver.status}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label="More options" className="cursor-pointer">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={driver.url}>View</DropdownItem>
                    <DropdownItem onClick={() => handleEditDriver(driver)} className="cursor-pointer">Edit</DropdownItem>
                    <DropdownItem className="cursor-pointer">Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <DriverDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        driver={selectedDriver}
        onSubmit={handleAddDriver}
      />
    </>
  )
}
