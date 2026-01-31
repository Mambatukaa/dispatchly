'use client';

import * as React from 'react';
import { Driver } from '@/types/driver';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DriverForm } from '@/components/drivers/driver-form';
import { DriverCard } from '@/components/drivers/driver-card';
import { Skeleton } from '@/components/ui/skeleton';

interface DriverFormData {
  name: string;
  phone: string;
  note?: string;
}

interface DriversComponentProps {
  drivers: Driver[];
  loading: boolean;
  isDialogOpen: boolean;
  selectedDriver: Driver | null;
  isDeletingId: string | null;
  isCreating: boolean;
  isUpdating: boolean;
  onAddClick: () => void;
  onEditClick: (driver: Driver) => void;
  onDeleteClick: (id: string) => void;
  onFormSubmit: (data: DriverFormData) => Promise<void>;
  onDialogOpenChange: (open: boolean) => void;
}

/**
 * Presentational Component - Handles all UI rendering for driver CRUD
 * 
 * Receives:
 * - drivers: List of drivers to display
 * - loading: Loading state while fetching
 * - dialog state: isDialogOpen, selectedDriver
 * - operation states: isCreating, isUpdating, isDeleting
 * - callbacks: onAddClick, onEditClick, onDeleteClick, onFormSubmit, etc.
 * 
 * This component only renders UI - all business logic comes from props
 */
export function DriversComponent({
  drivers,
  loading,
  isDialogOpen,
  selectedDriver,
  isDeletingId,
  isCreating,
  isUpdating,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onFormSubmit,
  onDialogOpenChange,
}: DriversComponentProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Drivers</h2>
          <Button disabled>Add Driver</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Drivers</h2>
          <p className="text-muted-foreground">
            Manage your driver fleet ({drivers.length} drivers)
          </p>
        </div>
        <Button onClick={onAddClick}>+ Add Driver</Button>
      </div>

      {drivers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No drivers yet. Add one to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onEdit={onEditClick}
              onDelete={onDeleteClick}
              isDeleting={isDeletingId === driver.id}
            />
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedDriver ? 'Edit Driver' : 'New Driver'}
            </DialogTitle>
          </DialogHeader>
          <DriverForm
            driver={selectedDriver || undefined}
            onSubmit={onFormSubmit}
            isLoading={isCreating || isUpdating}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
