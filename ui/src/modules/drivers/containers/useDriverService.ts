'use client'

import { CreateDriverInput, UpdateDriverInput } from '../types'
import { useCreateDriver, useDeleteDriver, useUpdateDriver } from './useDrivers'

export const useDriverService = () => {
  const [createDriver, createDriverState] = useCreateDriver()
  const [updateDriver, updateDriverState] = useUpdateDriver('')
  const [deleteDriver, deleteDriverState] = useDeleteDriver()

  const handleCreateDriver = async (input: CreateDriverInput) => {
    try {
      const result = await createDriver({
        variables: {
          input: {
            name: input.name,
            phone: input.phone,
            status: input.status,
            avatar: input.avatar,
          },
        },
      })
      return { success: true, data: (result as any).data.createDriver }
    } catch (error) {
      return { success: false, error }
    }
  }

  const handleUpdateDriver = async (id: string | number, input: UpdateDriverInput) => {
    try {
      const result = await updateDriver({
        variables: {
          id: String(id),
          input: {
            name: input.name,
            phone: input.phone,
            status: input.status,
            avatar: input.avatar,
          },
        },
      })
      return { success: true, data: (result as any).data.updateDriver }
    } catch (error) {
      return { success: false, error }
    }
  }

  const handleDeleteDriver = async (id: string | number) => {
    try {
      const result = await deleteDriver({
        variables: { id: String(id) },
      })
      return { success: true, data: (result as any).data.deleteDriver }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    createDriver: handleCreateDriver,
    updateDriver: handleUpdateDriver,
    deleteDriver: handleDeleteDriver,
    loading: createDriverState.loading || updateDriverState.loading || deleteDriverState.loading,
    error: createDriverState.error || updateDriverState.error || deleteDriverState.error,
  }
}
