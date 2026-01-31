import { gql } from '@apollo/client'

export const CREATE_DRIVER = gql`
  mutation CreateDriver($input: CreateDriverInput!) {
    createDriver(input: $input) {
      id
      name
      phone
      status
      avatar
      createdAt
    }
  }
`

export const UPDATE_DRIVER = gql`
  mutation UpdateDriver($id: ID!, $input: UpdateDriverInput!) {
    updateDriver(id: $id, input: $input) {
      id
      name
      phone
      status
      avatar
      createdAt
    }
  }
`

export const DELETE_DRIVER = gql`
  mutation DeleteDriver($id: ID!) {
    deleteDriver(id: $id) {
      success
      message
    }
  }
`
