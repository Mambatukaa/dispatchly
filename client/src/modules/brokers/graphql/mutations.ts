import { gql } from '@apollo/client'

export const CREATE_BROKER = gql`
  mutation CreateBroker($input: BrokerInput!) {
    createBroker(input: $input) {
      id
      logisticName
      mc
      brokerName
      phoneNumber
    }
  }
`

export const UPDATE_BROKER = gql`
  mutation UpdateBroker($id: ID!, $input: BrokerInput!) {
    updateBroker(id: $id, input: $input) {
      id
      logisticName
      mc
      brokerName
      phoneNumber
    }
  }
`

export const DELETE_BROKER = gql`
  mutation DeleteBroker($id: ID!) {
    deleteBroker(id: $id)
  }
`
