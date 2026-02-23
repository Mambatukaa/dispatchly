'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_BROKER, DELETE_BROKER, GET_BROKER, GET_BROKERS, UPDATE_BROKER } from '../graphql'

export const useGetBrokers = (page: number = 1, perPage: number = 20) => {
  return useQuery(GET_BROKERS, {
    variables: { page, perPage },
  })
}

export const useGetBroker = (id: string | number) => {
  return useQuery(GET_BROKER, {
    variables: { id: String(id) },
    skip: !id,
  })
}

export const useCreateBroker = () => {
  return useMutation(CREATE_BROKER, {
    refetchQueries: [{ query: GET_BROKERS, variables: { page: 1, perPage: 20 } }],
  })
}

export const useUpdateBroker = (id: string | number) => {
  return useMutation(UPDATE_BROKER, {
    refetchQueries: [
      { query: GET_BROKERS, variables: { page: 1, perPage: 20 } },
      { query: GET_BROKER, variables: { id: String(id) } },
    ],
  })
}

export const useDeleteBroker = () => {
  return useMutation(DELETE_BROKER, {
    refetchQueries: [{ query: GET_BROKERS, variables: { page: 1, perPage: 20 } }],
  })
}
