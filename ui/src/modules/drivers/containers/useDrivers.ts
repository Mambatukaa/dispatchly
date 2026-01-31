'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_DRIVER, DELETE_DRIVER, GET_DRIVER, GET_DRIVER_LOADS, GET_DRIVERS, UPDATE_DRIVER } from '../graphql'

export const useGetDrivers = () => {
  return useQuery(GET_DRIVERS)
}

export const useGetDriver = (id: string | number) => {
  return useQuery(GET_DRIVER, {
    variables: { id: String(id) },
    skip: !id,
  })
}

export const useGetDriverLoads = (driverId: string | number) => {
  return useQuery(GET_DRIVER_LOADS, {
    variables: { driverId: String(driverId) },
    skip: !driverId,
  })
}

export const useCreateDriver = () => {
  return useMutation(CREATE_DRIVER, {
    refetchQueries: [{ query: GET_DRIVERS }],
  })
}

export const useUpdateDriver = (id: string | number) => {
  return useMutation(UPDATE_DRIVER, {
    refetchQueries: [{ query: GET_DRIVERS }, { query: GET_DRIVER, variables: { id: String(id) } }],
  })
}

export const useDeleteDriver = () => {
  return useMutation(DELETE_DRIVER, {
    refetchQueries: [{ query: GET_DRIVERS }],
  })
}
