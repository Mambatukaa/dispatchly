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
  email?: string
  phone: string
  status: string
  avatar?: File | string
}

interface DriverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driver?: Driver
  onSubmit: (driver: Driver) => void | Promise<void>
}

const validateUSPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

const formatUSPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length === 0) return ''
  if (cleaned.length <= 3) return `(${cleaned}`
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
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
      status: 'AVAILABLE',
      avatar: undefined,
    }
  )

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    driver?.avatar && typeof driver.avatar === 'string' ? driver.avatar : null
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const formatted = formatUSPhone(value)
      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }))
      // Clear phone error when user starts typing
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: '' }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
      // Clear name error when user starts typing
      if (name === 'name' && errors.name) {
        setErrors((prev) => ({ ...prev, name: '' }))
      }
      // Clear email error when user starts typing
      if (name === 'email' && errors.email) {
        setErrors((prev) => ({ ...prev, email: '' }))
      }
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }))
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (formData.email && !formData.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!validateUSPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid US phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSubmit(formData)
      onOpenChange(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'AVAILABLE',
        avatar: undefined,
      })
      setAvatarPreview(null)
      setErrors({})
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
          status: 'AVAILABLE',
          avatar: undefined,
        }
      )
      setAvatarPreview(driver?.avatar && typeof driver.avatar === 'string' ? driver.avatar : null)
      setErrors({})
    }
    onOpenChange(newOpen)
  }

  const isEditing = !!driver?.id
  const title = isEditing ? 'Edit Driver' : 'Add Driver'
  const description = isEditing
    ? 'Update the driver information below.'
    : 'Register a new driver.'

  return (
    <Dialog open={open} onClose={handleOpenChange}>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
      <DialogBody>
        <Fieldset>
          <Field>
            <Label>Avatar</Label>
            <div className="flex items-center gap-4">
              {avatarPreview && (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100">
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg text-sm cursor-pointer"
              />
            </div>
          </Field>
          <Field>
            <Label>Name *</Label>
            <Input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email || ''}
              onChange={handleChange}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </Field>
          <Field>
            <Label>Phone *</Label>
            <Input
              name="phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </Field>
          <Field>
            <Label>Status</Label>
            <Select value={formData.status} onChange={handleStatusChange}>
              <option value="AVAILABLE">Available</option>
              <option value="ON_LOAD">On Load</option>
              <option value="OFF_DUTY">Off Duty</option>
            </Select>
          </Field>
        </Fieldset>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => handleOpenChange(false)} className="cursor-pointer">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading} className="cursor-pointer">
          {isLoading ? 'Saving...' : isEditing ? 'Update Driver' : 'Register Driver'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
