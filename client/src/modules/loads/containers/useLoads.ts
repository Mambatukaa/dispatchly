'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_LOAD, DELETE_LOAD, GET_LOAD, GET_LOADS, UPDATE_LOAD } from '../graphql'

export const useGetLoads = (page: number = 1, perPage: number = 20) => {
  return useQuery(GET_LOADS, {
    variables: { page, perPage },
  })
}

export const useGetLoad = (id: string | number) => {
  return useQuery(GET_LOAD, {
    variables: { id: String(id) },
    skip: !id,
  })
}

export const useCreateLoad = () => {
  return useMutation(CREATE_LOAD, {
    refetchQueries: [{ query: GET_LOADS, variables: { page: 1, perPage: 20 } }],
  })
}

export const useUpdateLoad = (id: string | number) => {
  return useMutation(UPDATE_LOAD, {
    refetchQueries: [
      { query: GET_LOADS, variables: { page: 1, perPage: 20 } },
      { query: GET_LOAD, variables: { id: String(id) } },
    ],
  })
}

export const useDeleteLoad = () => {
  return useMutation(DELETE_LOAD, {
    refetchQueries: [{ query: GET_LOADS, variables: { page: 1, perPage: 20 } }],
  })
}
