'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Fieldset, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import { useState } from 'react'

interface Load {
  id?: string
  driverId: string
  pickup: string
  dropoff: string
  ref?: string
  pickupDate?: string
  rate?: number
  shipperName?: string
  notes?: string
  status?: string
}

interface LoadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  load?: Load
  onSubmit: (load: Load) => void | Promise<void>
  isSubmitting?: boolean
}

export function AddLoadDialog({
  open,
  onOpenChange,
  load,
  onSubmit,
  isSubmitting = false,
}: LoadDialogProps) {
  const [formData, setFormData] = useState<Load>(
    load || {
      driverId: '',
      pickup: '',
      dropoff: '',
      ref: '',
      pickupDate: new Date().toISOString().split('T')[0],
      rate: undefined,
      shipperName: '',
      notes: '',
      status: 'NEW',
    }
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rate' ? (value ? parseFloat(value) : undefined) : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.driverId.trim()) {
      newErrors.driverId = 'Driver is required'
    }
    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Pickup location is required'
    }
    if (!formData.dropoff.trim()) {
      newErrors.dropoff = 'Dropoff location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await onSubmit(formData)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setFormData(
        load || {
          driverId: '',
          pickup: '',
          dropoff: '',
          ref: '',
          pickupDate: new Date().toISOString().split('T')[0],
          rate: undefined,
          shipperName: '',
          notes: '',
          status: 'NEW',
        }
      )
      setErrors({})
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onClose={handleOpenChange}>
      <DialogTitle>{load ? 'Edit Load' : 'Create Load'}</DialogTitle>
      <DialogDescription>
        {load ? 'Update load details' : 'Add a new load with driver and locations'}
      </DialogDescription>
      <form onSubmit={handleSubmit}>
        <DialogBody className="space-y-6">
          <Fieldset>
            <Field>
              <Label htmlFor="driverId">Driver *</Label>
              <Select
                id="driverId"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
              >
                <option value="">Select a driver</option>
                <option value="driver1">John Smith</option>
                <option value="driver2">Sarah Johnson</option>
                <option value="driver3">Mike Davis</option>
                <option value="driver4">Emma Wilson</option>
                <option value="driver5">James Brown</option>
              </Select>
              {errors.driverId && <span className="text-red-600 text-sm">{errors.driverId}</span>}
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="pickup">Pickup Location *</Label>
              <Input
                id="pickup"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                placeholder="e.g., Toronto, ON"
              />
              {errors.pickup && <span className="text-red-600 text-sm">{errors.pickup}</span>}
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="dropoff">Dropoff Location *</Label>
              <Input
                id="dropoff"
                name="dropoff"
                value={formData.dropoff}
                onChange={handleChange}
                placeholder="e.g., Montreal, QC"
              />
              {errors.dropoff && <span className="text-red-600 text-sm">{errors.dropoff}</span>}
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="ref">Reference Number</Label>
              <Input
                id="ref"
                name="ref"
                value={formData.ref}
                onChange={handleChange}
                placeholder="e.g., LOAD-001"
              />
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="pickupDate">Pickup Date</Label>
              <Input
                id="pickupDate"
                name="pickupDate"
                type="date"
                value={formData.pickupDate}
                onChange={handleChange}
              />
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="rate">Rate</Label>
              <Input
                id="rate"
                name="rate"
                type="number"
                step="0.01"
                value={formData.rate || ''}
                onChange={handleChange}
                placeholder="e.g., 500.00"
              />
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="shipperName">Shipper Name</Label>
              <Input
                id="shipperName"
                name="shipperName"
                value={formData.shipperName}
                onChange={handleChange}
                placeholder="e.g., ABC Company"
              />
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes..."
              />
            </Field>
          </Fieldset>

          <Fieldset>
            <Field>
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" value={formData.status} onChange={handleChange}>
                <option value="NEW">New</option>
                <option value="BOOKED">Booked</option>
                <option value="DISPATCHED">Dispatched</option>
                <option value="PICKED_UP">Picked Up</option>
                <option value="DELIVERED">Delivered</option>
              </Select>
            </Field>
          </Fieldset>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : load ? 'Update Load' : 'Create Load'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
