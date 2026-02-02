'use client'

import { useState, useEffect } from 'react'
import type { Load } from '../types'
import { Fieldset, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Button } from '@/components/button'
import { Textarea } from '@/components/textarea'
import { dateToDateTimeLocal, dateTimeLocalToDate } from '@/lib/dateUtils'

type Props = {
  load?: Load
  onSubmit: (data: any) => Promise<void>
  onCancel?: () => void
  drivers: any[]
  brokers: any[]
}

const LOAD_STATUSES = [
  { value: 'BOOKED', label: 'Booked' },
  { value: 'DISPATCHED', label: 'Dispatched' },
  { value: 'PICKED_UP', label: 'Picked Up' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'INVOICED', label: 'Invoiced' },
  { value: 'PAID', label: 'Paid' },
  { value: 'CANCELED', label: 'Canceled' },
]

export default function LoadForm({ load = {} as Load, onSubmit, onCancel, drivers, brokers }: Props) {
  const [formData, setFormData] = useState({
    driverId: load.driverId || '',
    brokerId: load.brokerId || '',
    pickup: load.pickup || '',
    dropoff: load.dropoff || '',
    ref: load.ref || '',
    pickupDateTime: load.pickupDate ? new Date(load.pickupDate) : new Date(),
    dropoffDateTime: load.dropoffDate ? new Date(load.dropoffDate) : new Date(),
    rate: load.rate || 0,
    notes: load.notes || '',
    status: load.status || 'BOOKED',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'pickupDateTime' || name === 'dropoffDateTime') {
      // Convert datetime-local string to Date object
      setFormData((prev) => ({ ...prev, [name]: dateTimeLocalToDate(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const pickupDate = formData.pickupDateTime instanceof Date
        ? formData.pickupDateTime.toISOString()
        : new Date(formData.pickupDateTime).toISOString()

      const dropoffDate = formData.dropoffDateTime instanceof Date
        ? formData.dropoffDateTime.toISOString()
        : new Date(formData.dropoffDateTime).toISOString()

      await onSubmit({
        ...formData,
        rate: formData.rate,
        pickupDate,
        dropoffDate,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
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
            <Label>Broker *</Label>
            <Select
              name="brokerId"
              value={formData.brokerId}
              onChange={handleChange}
              required
            >
              <option value="">Select a broker</option>
              {brokers.map((broker) => (
                <option key={broker.id} value={broker.id}>
                  {broker.brokerName}
                </option>
              ))}
            </Select>
          </Field>
        </Fieldset>

        <Fieldset>
          <Field>
            <Label>Pickup Date & Time *</Label>
            <Input
              type="datetime-local"
              name="pickupDateTime"
              value={dateToDateTimeLocal(formData.pickupDateTime)}
              onChange={handleChange}
            />
          </Field>
        </Fieldset>

        <Fieldset>
          <Field>
            <Label>Dropoff Date & Time *</Label>
            <Input
              type="datetime-local"
              name="dropoffDateTime"
              value={dateToDateTimeLocal(formData.dropoffDateTime)}
              onChange={handleChange}
            />
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

        <Fieldset className="col-span-2">
          <Field>
            <Label>Status</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {LOAD_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </Select>
          </Field>
        </Fieldset>

        <Fieldset className="col-span-2">
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
      </div>

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
          {isSubmitting ? 'Saving...' : load ? 'Update Load' : 'Create Load'}
        </Button>
      </div>
    </form>
  )
}
