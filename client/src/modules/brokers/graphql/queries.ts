import { gql } from '@apollo/client'

export const GET_BROKERS = gql`
  query Brokers($page: Int, $perPage: Int) {
    brokers(page: $page, perPage: $perPage) {
      total
      brokers {
        id
        logisticName
        mc
        brokerName
        phoneNumber
      }
    }
  }
`

export const GET_BROKER = gql`
  query GetBroker($id: ID!) {
    broker(id: $id) {
      id
      logisticName
      mc
      brokerName
      phoneNumber
      createdAt
    }
  }
`
