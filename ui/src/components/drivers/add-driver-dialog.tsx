'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Fieldset, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { useState } from 'react'

interface Driver {
  id?: string | number
  name: string
  email: string
  phone: string
  status: string
}

interface DriverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driver?: Driver
  onSubmit: (driver: Driver) => void | Promise<void>
}

export function DriverDialog({
  open,
  onOpenChange,
  driver,
  onSubmit,
}: DriverDialogProps) {
  const [formData, setFormData] = useState<Driver>(
    driver || {
      name: '',
      email: '',
      phone: '',
      status: 'Active',
    }
  )

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await onSubmit(formData)
      onOpenChange(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'Active',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setFormData(
        driver || {
          name: '',
          email: '',
          phone: '',
          status: 'Active',
        }
      )
    }
    onOpenChange(newOpen)
  }

  const isEditing = !!driver?.id
  const title = isEditing ? 'Edit Driver' : 'Add Driver'
  const description = isEditing
    ? 'Update the driver information below.'
    : 'Create a new driver profile.'

  return (
    <Dialog open={open} onClose={handleOpenChange}>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
      <DialogBody>
        <Fieldset>
          <Field>
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Phone</Label>
            <Input
              name="phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <Label>Status</Label>
            <Select value={formData.status} onChange={handleStatusChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </Field>
        </Fieldset>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => handleOpenChange(false)} className="cursor-pointer">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading} className="cursor-pointer">
          {isLoading ? 'Saving...' : isEditing ? 'Update Driver' : 'Add Driver'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
