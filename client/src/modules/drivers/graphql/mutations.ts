import { gql } from '@apollo/client'

export const CREATE_DRIVER = gql`
  mutation CreateDriver($input: DriverInput!) {
    createDriver(input: $input) {
      id
      name
      email
      phone
      status
      avatar
    }
  }
`

export const UPDATE_DRIVER = gql`
  mutation UpdateDriver($id: ID!, $input: DriverInput!) {
    updateDriver(id: $id, input: $input) {
      id
      name
      email
      phone
      status
      avatar
    }
  }
`

export const DELETE_DRIVER = gql`
  mutation DeleteDriver($id: ID!) {
    deleteDriver(id: $id)
  }
`
