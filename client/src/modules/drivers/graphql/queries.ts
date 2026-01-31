import { gql } from '@apollo/client'

export const GET_DRIVERS = gql`
  query Drivers {
    drivers {
      id
      name
      email
      phone
      status
    }
  }
`

export const GET_DRIVER = gql`
  query GetDriver($id: ID!) {
    driver(id: $id) {
      id
      name
      email
      phone
      status
      createdAt
    }
  }
`

export const GET_DRIVER_LOADS = gql`
  query GetDriverLoads($driverId: ID!) {
    driverLoads(driverId: $driverId) {
      id
      ref
      status
      pickup
      dropoff
      pickupDate
      rate
      brokerName
      shipperName
    }
  }
`
