'use client'

import { BrokerInput } from '../types'
import { useCreateBroker, useDeleteBroker, useUpdateBroker } from './useBrokers'

export const useBrokerService = () => {
  const [createBroker, createBrokerState] = useCreateBroker()
  const [updateBroker, updateBrokerState] = useUpdateBroker('')
  const [deleteBroker, deleteBrokerState] = useDeleteBroker()

  const handleCreateBroker = async (input: BrokerInput) => {
    try {
      const result = await createBroker({
        variables: {
          input: {
            logisticName: input.logisticName,
            mc: input.mc,
            brokerName: input.brokerName,
            phoneNumber: input.phoneNumber,
          },
        },
      })
      return { success: true, data: (result as any).data.createBroker }
    } catch (error) {
      return { success: false, error }
    }
  }

  const handleUpdateBroker = async (id: string | number, input: BrokerInput) => {
    try {
      const result = await updateBroker({
        variables: {
          id: String(id),
          input: {
            logisticName: input.logisticName,
            mc: input.mc,
            brokerName: input.brokerName,
            phoneNumber: input.phoneNumber,
          },
        },
      })
      return { success: true, data: (result as any).data.updateBroker }
    } catch (error) {
      return { success: false, error }
    }
  }

  const handleDeleteBroker = async (id: string | number) => {
    try {
      const result = await deleteBroker({
        variables: { id: String(id) },
      })
      return { success: true, data: (result as any).data.deleteBroker }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    createBroker: handleCreateBroker,
    updateBroker: handleUpdateBroker,
    deleteBroker: handleDeleteBroker,
    loading: createBrokerState.loading || updateBrokerState.loading || deleteBrokerState.loading,
    error: createBrokerState.error || updateBrokerState.error || deleteBrokerState.error,
  }
}
