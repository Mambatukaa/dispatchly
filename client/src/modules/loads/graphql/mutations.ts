import { gql } from '@apollo/client'

export const CREATE_LOAD = gql`
  mutation CreateLoad($input: LoadInput!) {
    createLoad(input: $input) {
      id
      ref
      status
      pickup
      dropoff
      driverId
      pickupDate
      rate
      shipperName
      notes
    }
  }
`

export const UPDATE_LOAD = gql`
  mutation UpdateLoad($id: ID!, $input: LoadInput!) {
    updateLoad(id: $id, input: $input) {
      id
      ref
      status
      pickup
      dropoff
      driverId
      pickupDate
      rate
      shipperName
      notes
    }
  }
`

export const DELETE_LOAD = gql`
  mutation DeleteLoad($id: ID!) {
    deleteLoad(id: $id)
  }
`
