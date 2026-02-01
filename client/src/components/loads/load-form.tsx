'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/button';
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '@/components/dialog';
import { Fieldset, Field, Label } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { SELECT_OPTIONS } from '@/modules/loads/utils/load-constants';

export interface LoadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  drivers: any[];
  editingLoad?: any;
  isLoading?: boolean;
}

export default function LoadForm({
  isOpen,
  onClose,
  onSubmit,
  drivers,
  editingLoad,
  isLoading = false,
}: LoadFormProps) {
  const [formData, setFormData] = useState({
    driverId: '',
    pickup: '',
    dropoff: '',
    ref: '',
    pickupDate: '',
    rate: 0,
    shipperName: '',
    notes: '',
    status: 'NEW',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when editingLoad changes
  useEffect(() => {
    if (editingLoad) {
      let formattedDate = '';
      if (editingLoad.pickupDate) {
        // Handle both ISO string and other date formats
        const dateStr = editingLoad.pickupDate.toString();
        if (dateStr.includes('T')) {
          // ISO format - extract just the date part
          formattedDate = dateStr.substring(0, 10);
        } else if (dateStr.length === 10 && dateStr.includes('-')) {
          // Already in YYYY-MM-DD format
          formattedDate = dateStr;
        } else {
          // Try to parse and format
          try {
            const parsed = new Date(dateStr);
            if (!isNaN(parsed.getTime())) {
              formattedDate = parsed.toISOString().substring(0, 10);
            }
          } catch {
            formattedDate = '';
          }
        }
      }

      setFormData({
        driverId: editingLoad.driverId || '',
        pickup: editingLoad.pickup || '',
        dropoff: editingLoad.dropoff || '',
        ref: editingLoad.ref || '',
        pickupDate: formattedDate,
        rate: editingLoad.rate || 0,
        shipperName: editingLoad.shipperName || '',
        notes: editingLoad.notes || '',
        status: editingLoad.status || 'NEW',
      });
    } else {
      setFormData({
        driverId: '',
        pickup: '',
        dropoff: '',
        ref: '',
        pickupDate: '',
        rate: 0,
        shipperName: '',
        notes: '',
        status: 'NEW',
      });
    }
    setErrors({});
  }, [editingLoad, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rate' ? (value ? parseFloat(value) : 0) : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.driverId.trim()) {
      newErrors.driverId = 'Driver is required';
    }
    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Pickup location is required';
    }
    if (!formData.dropoff.trim()) {
      newErrors.dropoff = 'Dropoff location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      driverId: '',
      pickup: '',
      dropoff: '',
      ref: '',
      pickupDate: '',
      rate: 0,
      shipperName: '',
      notes: '',
      status: 'NEW',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{editingLoad ? 'Edit Load' : 'Create Load'}</DialogTitle>
      <DialogBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Driver */}
          <Fieldset>
            <Field>
              <Label>Driver</Label>
              <select
                id="driverId"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
              {errors.driverId && <p className="mt-1 text-sm text-red-600">{errors.driverId}</p>}
            </Field>
          </Fieldset>

          {/* Pickup Location */}
          <Fieldset>
            <Field>
              <Label>Pickup Location *</Label>
              <Input
                id="pickup"
                name="pickup"
                type="text"
                value={formData.pickup}
                onChange={handleChange}
                placeholder="e.g., Los Angeles, CA"
              />
              {errors.pickup && <p className="mt-1 text-sm text-red-600">{errors.pickup}</p>}
            </Field>
          </Fieldset>

          {/* Dropoff Location */}
          <Fieldset>
            <Field>
              <Label>Dropoff Location *</Label>
              <Input
                id="dropoff"
                name="dropoff"
                type="text"
                value={formData.dropoff}
                onChange={handleChange}
                placeholder="e.g., Seattle, WA"
              />
              {errors.dropoff && <p className="mt-1 text-sm text-red-600">{errors.dropoff}</p>}
            </Field>
          </Fieldset>

          {/* Pickup Date */}
          <Fieldset>
            <Field>
              <Label>Pickup Date</Label>
              <Input
                id="pickupDate"
                name="pickupDate"
                type="date"
                value={formData.pickupDate}
                onChange={handleChange}
              />
            </Field>
          </Fieldset>

          {/* Reference */}
          <Fieldset>
            <Field>
              <Label>Reference</Label>
              <Input
                id="ref"
                name="ref"
                type="text"
                value={formData.ref}
                onChange={handleChange}
                placeholder="e.g., ORD-12345"
              />
            </Field>
          </Fieldset>

          {/* Rate */}
          <Fieldset>
            <Field>
              <Label>Rate</Label>
              <Input
                id="rate"
                name="rate"
                type="number"
                value={formData.rate}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
              />
            </Field>
          </Fieldset>

          {/* Shipper Name */}
          <Fieldset>
            <Field>
              <Label>Shipper Name</Label>
              <Input
                id="shipperName"
                name="shipperName"
                type="text"
                value={formData.shipperName}
                onChange={handleChange}
                placeholder="Company name"
              />
            </Field>
          </Fieldset>

          {/* Notes */}
          <Fieldset>
            <Field>
              <Label>Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes..."
              />
            </Field>
          </Fieldset>

          {/* Status */}
          <Fieldset>
            <Field>
              <Label>Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                {SELECT_OPTIONS.status.map((option: { value: string; label: string }) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </Fieldset>

          {/* Action Buttons */}
          <DialogActions>
            <Button type="button" plain onClick={handleClose} disabled={isLoading} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="cursor-pointer">
              {isLoading ? 'Saving...' : editingLoad ? 'Update Load' : 'Create Load'}
            </Button>
          </DialogActions>
        </form>
      </DialogBody>
    </Dialog>
  );
}
