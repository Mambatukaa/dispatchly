import { useMutation, useQuery } from '@apollo/client';
import {
  GET_DRIVERS,
  GET_DRIVER,
  CREATE_DRIVER,
  UPDATE_DRIVER,
  DELETE_DRIVER,
  GET_DRIVER_LOADS
} from '@/modules/drivers/graphql/driver.graphql';
import { Driver, DriverStatus } from '@/types/driver';
import { toast } from 'sonner';

export interface CreateDriverInput {
  name: string;
  phone: string;
  note?: string;
}

export type UpdateDriverInput = Partial<CreateDriverInput>;

export function useDrivers() {
  const { data, loading, error, refetch } = useQuery<{ drivers: Driver[] }>(
    GET_DRIVERS
  );

  return {
    drivers: data?.drivers || [],
    loading,
    error,
    refetch
  };
}

export function useDriver(id: string) {
  const { data, loading, error } = useQuery<{ driver: Driver }>(GET_DRIVER, {
    variables: { id },
    skip: !id
  });

  return {
    driver: data?.driver,
    loading,
    error
  };
}

export function useCreateDriver() {
  const [createDriver, { loading }] = useMutation<
    { createDriver: Driver },
    { input: CreateDriverInput }
  >(CREATE_DRIVER, {
    refetchQueries: [{ query: GET_DRIVERS }],
    awaitRefetchQueries: true
  });

  const handleCreate = async (input: CreateDriverInput) => {
    try {
      const result = await createDriver({
        variables: { input }
      });
      toast.success('Driver created successfully');
      return result.data?.createDriver;
    } catch (error) {
      toast.error('Failed to create driver');
      console.error(error);
      throw error;
    }
  };

  return {
    createDriver: handleCreate,
    loading
  };
}

export function useUpdateDriver() {
  const [updateDriver, { loading }] = useMutation<
    { updateDriver: Driver },
    { id: string; input: UpdateDriverInput }
  >(UPDATE_DRIVER, {
    refetchQueries: [{ query: GET_DRIVERS }],
    awaitRefetchQueries: true
  });

  const handleUpdate = async (id: string, input: UpdateDriverInput) => {
    try {
      const result = await updateDriver({
        variables: { id, input }
      });
      toast.success('Driver updated successfully');
      return result.data?.updateDriver;
    } catch (error) {
      toast.error('Failed to update driver');
      console.error(error);
      throw error;
    }
  };

  return {
    updateDriver: handleUpdate,
    loading
  };
}

export function useDeleteDriver() {
  const [deleteDriver, { loading }] = useMutation<
    { deleteDriver: Driver },
    { id: string }
  >(DELETE_DRIVER, {
    refetchQueries: [{ query: GET_DRIVERS }],
    awaitRefetchQueries: true
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteDriver({
        variables: { id }
      });
      toast.success('Driver deleted successfully');
    } catch (error) {
      toast.error('Failed to delete driver');
      console.error(error);
      throw error;
    }
  };

  return {
    deleteDriver: handleDelete,
    loading
  };
}

export function useDriverLoads(driverId: string) {
  const { data, loading, error, refetch } = useQuery<{
    driverLoads: Array<{
      id: string;
      ref: string;
      status: string;
      pickup: string;
      dropoff: string;
      pickupDate: string;
      rate?: number;
      brokerName?: string;
      shipperName?: string;
      notes?: string;
    }>;
  }>(GET_DRIVER_LOADS, {
    variables: { driverId },
    skip: !driverId
  });

  return {
    loads: data?.driverLoads || [],
    loading,
    error,
    refetch
  };
}
