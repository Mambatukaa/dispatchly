'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import { Fieldset, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Select } from '@/components/select'

export interface LoadFormProps {
  editingLoad?: any
  onSubmit: (data: any) => void
  drivers: any[]
  isLoading?: boolean
  onCancel?: () => void
}

const LOAD_STATUSES = [
  { value: 'NEW', label: 'New' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'DISPATCHED', label: 'Dispatched' },
  { value: 'PICKED_UP', label: 'Picked Up' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'INVOICED', label: 'Invoiced' },
  { value: 'PAID', label: 'Paid' },
  { value: 'CANCELED', label: 'Canceled' },
]

export default function LoadForm({
  editingLoad,
  onSubmit,
  drivers,
  isLoading = false,
  onCancel,
}: LoadFormProps) {
  const [formData, setFormData] = useState({
    driverId: '',
    pickup: '',
    dropoff: '',
    ref: '',
    pickupDate: '',
    rate: '',
    shipperName: '',
    notes: '',
    status: 'NEW',
  })

  useEffect(() => {
    if (editingLoad) {
      let formattedDate = ''
      if (editingLoad.pickupDate) {
        const dateStr = editingLoad.pickupDate.toString()
        if (dateStr.includes('T')) {
          formattedDate = dateStr.substring(0, 10)
        } else if (dateStr.length === 10 && dateStr.includes('-')) {
          formattedDate = dateStr
        } else {
          try {
            const parsed = new Date(dateStr)
            if (!isNaN(parsed.getTime())) {
              formattedDate = parsed.toISOString().substring(0, 10)
            }
          } catch {
            formattedDate = ''
          }
        }
      }

      setFormData({
        driverId: editingLoad.driverId || '',
        pickup: editingLoad.pickup || '',
        dropoff: editingLoad.dropoff || '',
        ref: editingLoad.ref || '',
        pickupDate: formattedDate,
        rate: editingLoad.rate ? String(editingLoad.rate) : '',
        shipperName: editingLoad.shipperName || '',
        notes: editingLoad.notes || '',
        status: editingLoad.status || 'NEW',
      })
    } else {
      setFormData({
        driverId: '',
        pickup: '',
        dropoff: '',
        ref: '',
        pickupDate: '',
        rate: '',
        shipperName: '',
        notes: '',
        status: 'NEW',
      })
    }
  }, [editingLoad])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const submissionData = {
      ...formData,
      rate: formData.rate ? parseFloat(formData.rate) : null,
    }

    onSubmit(submissionData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Fieldset>
        <Field>
          <Label>Driver *</Label>
          <Select
            name="driverId"
            value={formData.driverId}
            onChange={handleChange}
            required
          >
            <option value="">Select a driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </Select>
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Pickup Location *</Label>
          <Input
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            placeholder="e.g., Los Angeles, CA"
            required
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Dropoff Location *</Label>
          <Input
            name="dropoff"
            value={formData.dropoff}
            onChange={handleChange}
            placeholder="e.g., Seattle, WA"
            required
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Pickup Date</Label>
          <Input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Reference</Label>
          <Input
            name="ref"
            value={formData.ref}
            onChange={handleChange}
            placeholder="e.g., ORD-12345"
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Rate</Label>
          <Input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Shipper Name</Label>
          <Input
            name="shipperName"
            value={formData.shipperName}
            onChange={handleChange}
            placeholder="Company name"
          />
        </Field>
      </Fieldset>

      <Fieldset>
        <Field>
          <Label>Notes</Label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes..."
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
            {LOAD_STATUSES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </Fieldset>

      <div className="mt-8 flex justify-end gap-3">
        <Button plain onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : editingLoad ? 'Update Load' : 'Create Load'}
        </Button>
      </div>
    </form>
  )
}
