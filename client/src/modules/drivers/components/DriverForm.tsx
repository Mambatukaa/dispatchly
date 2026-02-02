'use client'

import { useState } from 'react'
import type { Driver } from '../types'
import { Fieldset, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Button } from '@/components/button'

type Props = {
  driver?: Driver
  onSubmit: (data: any) => Promise<void>
  onCancel?: () => void
}

const DRIVER_STATUSES = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'ON_LOAD', label: 'On Load' },
  { value: 'OFF_DUTY', label: 'Off Duty' },
]

export default function DriverForm({ driver, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: driver?.name || '',
    phone: driver?.phone || '',
    email: driver?.email || '',
    status: driver?.status || 'AVAILABLE',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({
        ...formData,
        id: driver?.id,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Fieldset>
        <Field>
          <Label>Name *</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter driver name"
            required
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Phone *</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Status</Label>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {DRIVER_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Select>
        </Field>
      </Fieldset>

      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <Button
            type="button"
            plain
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : driver ? 'Update Driver' : 'Create Driver'}
        </Button>
      </div>
    </form>
  )
}