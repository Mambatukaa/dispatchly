'use client';

import * as React from 'react';
import { useCreateDriver, useDeleteDriver, useDrivers, useUpdateDriver } from '@/hooks/use-driver';
import { DriversComponent } from '../components/drivers';
import { Driver } from '@/types/driver';

interface DriverFormData {
  name: string;
  phone: string;
  note?: string;
}

/**
 * Smart Container Component - Handles all business logic
 * 
 * Responsibilities:
 * - Manage GraphQL queries and mutations for driver CRUD
 * - Handle loading and error states
 * - Manage local UI state (dialog, selection)
 * - Pass all props to presentation component (DriversComponent)
 * 
 * Uses custom hooks:
 * - useDrivers() - fetch all drivers
 * - useCreateDriver() - create new driver
 * - useUpdateDriver() - update existing driver
 * - useDeleteDriver() - delete driver
 */
export function DriversContainer() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = React.useState<Driver | null>(null);
  const [isDeletingId, setIsDeletingId] = React.useState<string | null>(null);

  // GraphQL hooks
  const { drivers, loading: loadingDrivers, refetch: refetchDrivers } = useDrivers();
  const { createDriver, loading: isCreating } = useCreateDriver();
  const { updateDriver, loading: isUpdating } = useUpdateDriver();
  const { deleteDriver } = useDeleteDriver();

  const handleAddClick = () => {
    setSelectedDriver(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    setIsDeletingId(id);
    try {
      await deleteDriver(id);
      await refetchDrivers();
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleFormSubmit = async (data: DriverFormData) => {
    try {
      if (selectedDriver) {
        // Update existing driver
        await updateDriver(selectedDriver.id, data);
      } else {
        // Create new driver
        await createDriver(data);
      }
      setIsDialogOpen(false);
      setSelectedDriver(null);
      await refetchDrivers();
    } catch (error) {
      console.error('Error saving driver:', error);
    }
  };

  // Pass all props to presentational component
  return (
    <DriversComponent
      drivers={drivers}
      loading={loadingDrivers}
      isDialogOpen={isDialogOpen}
      selectedDriver={selectedDriver}
      isDeletingId={isDeletingId}
      isCreating={isCreating}
      isUpdating={isUpdating}
      onAddClick={handleAddClick}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      onFormSubmit={handleFormSubmit}
      onDialogOpenChange={setIsDialogOpen}
    />
  );
}
