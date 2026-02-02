'use client'

import React, { useState } from 'react'
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <Fieldset>
        <Field>
          <Label>Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter driver name"
            required
          />
        </Field>
        <Field>
          <Label>Phone</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </Field>
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
        <Field>
          <Label>Status</Label>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="AVAILABLE">Available</option>
            <option value="ON_LOAD">On Load</option>
            <option value="OFF_DUTY">Off Duty</option>
          </Select>
        </Field>
      </Fieldset>
      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <Button
            type="button"
            plain
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : driver ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
