'use client'

import { useState, useEffect } from 'react'
import type { Broker } from '../types'
import { Fieldset, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Button } from '@/components/button'

type Props = {
  broker?: Broker
  onSubmit: (data: any) => Promise<void>
  onCancel?: () => void
}

export default function BrokerForm({ broker, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    logisticName: '',
    mc: '',
    brokerName: '',
    phoneNumber: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (broker) {
      setFormData({
        logisticName: broker.logisticName || '',
        mc: broker.mc || '',
        brokerName: broker.brokerName || '',
        phoneNumber: broker.phoneNumber || '',
      })
    } else {
      setFormData({
        logisticName: '',
        mc: '',
        brokerName: '',
        phoneNumber: '',
      })
    }
  }, [broker])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Fieldset>
          <Field>
            <Label>Logistic Name *</Label>
            <Input
              name="logisticName"
              value={formData.logisticName}
              onChange={handleChange}
              placeholder="Enter logistic name"
              required
            />
          </Field>
        </Fieldset>

        <Fieldset>
          <Field>
            <Label>MC Number *</Label>
            <Input
              name="mc"
              value={formData.mc}
              onChange={handleChange}
              placeholder="Enter MC number"
              required
            />
          </Field>
        </Fieldset>

        <Fieldset>
          <Field>
            <Label>Broker Name *</Label>
            <Input
              name="brokerName"
              value={formData.brokerName}
              onChange={handleChange}
              placeholder="Enter broker name"
              required
            />
          </Field>
        </Fieldset>

        <Fieldset>
          <Field>
            <Label>Phone Number *</Label>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
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
          {isSubmitting ? 'Saving...' : broker ? 'Update Broker' : 'Create Broker'}
        </Button>
      </div>
    </form>
  )
}
