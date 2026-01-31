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
import { Driver } from '../types'

const formatUSPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 0) return phone
  if (cleaned.length <= 3) return `(${cleaned}`
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
}

interface DriversContentProps {
  drivers: any[]
  loading: boolean
  error: any
  isDialogOpen: boolean
  selectedDriver?: Driver
  isSubmitting: boolean
  onAddDriver: (formData: any) => Promise<void>
  onOpenAddDialog: () => void
  onEditDriver: (driver: Driver) => void
  onDeleteDriver: (driverId: string | number) => Promise<void>
  onCloseDialog: () => void
}

export default function Drivers({
  drivers,
  loading,
  error,
  isDialogOpen,
  selectedDriver,
  isSubmitting,
  onAddDriver,
  onOpenAddDialog,
  onEditDriver,
  onDeleteDriver,
  onCloseDialog,
}: DriversContentProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState<Driver | undefined>(undefined)

  const handleCreateClick = () => {
    setEditingDriver(undefined)
    setIsCreateDialogOpen(true)
  }

  const handleEditClick = (driver: Driver) => {
    setEditingDriver(driver)
    setIsCreateDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsCreateDialogOpen(false)
    setEditingDriver(undefined)
  }

  const handleSubmit = async (formData: any) => {
    if (editingDriver) {
      await onEditDriver(editingDriver)
    } else {
      await onAddDriver(formData)
    }
    handleDialogClose()
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
        <Button onClick={handleCreateClick} className="cursor-pointer">
          Add driver
        </Button>
      </div>
      <ul className="mt-10">
        {drivers.map((driver: any, index: number) => (
          <li key={driver.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between py-6 px-4">
              <div className="flex gap-6 flex-1">
                <Link href={`/drivers/${driver.id}`} className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-zinc-100">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(driver.name)}`}
                    alt={driver.name}
                  />
                </Link>
                <div className="space-y-1.5 flex-1">
                  <Link href={`/drivers/${driver.id}`} className="text-base/6 font-semibold block">
                    {driver.name}
                  </Link>
                  <div className="text-xs/6 text-zinc-600">
                    {formatUSPhone(driver.phone)}
                  </div>
                  <div className="text-xs/6 text-zinc-500">
                    {driver.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  className="max-sm:hidden"
                  color={
                    driver.status === 'AVAILABLE' || driver.status === 'Active'
                      ? 'lime'
                      : driver.status === 'ON_LOAD'
                        ? 'blue'
                        : 'zinc'
                  }
                >
                  {driver.status === 'AVAILABLE' || driver.status === 'Active'
                    ? 'Available'
                    : driver.status === 'ON_LOAD'
                      ? 'On Load'
                      : 'Offline'}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault()
                        handleEditClick(driver)
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault()
                        onDeleteDriver(driver.id)
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <DriverDialog
        open={isCreateDialogOpen}
        onOpenChange={handleDialogClose}
        driver={editingDriver}
        onSubmit={handleSubmit}
      />
    </>
  )
}
