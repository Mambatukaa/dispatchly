'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Driver } from '@/types/driver';

const driverFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string()
    .min(1, 'Phone is required')
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone must be in format (555) 123-4567'),
  note: z.string().optional(),
});

type DriverFormData = z.infer<typeof driverFormSchema>;

interface DriverFormProps {
  driver?: Driver;
  onSubmit: (data: DriverFormData) => Promise<void>;
  isLoading?: boolean;
}

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return `(${cleaned}`;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

export function DriverForm({ driver, onSubmit, isLoading }: DriverFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: driver ? {
      name: driver.name,
      phone: driver.phone,
      note: driver.note,
    } : {},
  });

  const phoneValue = watch('phone');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          placeholder="James Carter"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          placeholder="(555) 123-4567"
          {...register('phone', {
            onChange: (e) => {
              const formatted = formatPhoneNumber(e.target.value);
              setValue('phone', formatted);
            }
          })}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          placeholder="Additional notes..."
          className="resize-none"
          {...register('note')}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : driver ? 'Update Driver' : 'Create Driver'}
      </Button>
    </form>
  );
}
