'use client'

import { LoadInput } from '../types'
import { useCreateLoad, useDeleteLoad, useUpdateLoad } from './useLoads'

export const useLoadService = () => {
  const [createLoad, createLoadState] = useCreateLoad()
  const [updateLoad, updateLoadState] = useUpdateLoad('')
  const [deleteLoad, deleteLoadState] = useDeleteLoad()

  const handleCreateLoad = async (input: LoadInput) => {
    try {
      const result = await createLoad({
        variables: {
          input: {
            driverId: input.driverId,
            pickup: input.pickup,
            dropoff: input.dropoff,
            ref: input.ref,
            pickupDate: input.pickupDate,
            rate: input.rate,
            shipperName: input.shipperName,
            notes: input.notes,
            status: input.status,
          },
        },
      })
      return { success: true, data: (result as any).data.createLoad }
    } catch (error) {
      return { success: false, error }
    }
  }

  const handleUpdateLoad = async (id: string | number, input: LoadInput) => {
    try {
      const result = await updateLoad({
        variables: {
          id: String(id),
          input: {
            driverId: input.driverId,
            pickup: input.pickup,
            dropoff: input.dropoff,
            ref: input.ref,
            pickupDate: input.pickupDate,
            rate: input.rate,
            shipperName: input.shipperName,
            notes: input.notes,
            status: input.status,
          },
        },
      })
      return { success: true, data: (result as any).data.updateLoad }
    } catch (error) {
      return { success: false, error }
    }
  }

  const handleDeleteLoad = async (id: string | number) => {
    try {
      const result = await deleteLoad({
        variables: { id: String(id) },
      })
      return { success: true, data: (result as any).data.deleteLoad }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    createLoad: handleCreateLoad,
    updateLoad: handleUpdateLoad,
    deleteLoad: handleDeleteLoad,
    loading: createLoadState.loading || updateLoadState.loading || deleteLoadState.loading,
    error: createLoadState.error || updateLoadState.error || deleteLoadState.error,
  }
}
