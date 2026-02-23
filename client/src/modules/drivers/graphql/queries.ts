import { gql } from '@apollo/client'

export const GET_DRIVERS = gql`
  query Drivers($page: Int, $perPage: Int) {
    drivers(page: $page, perPage: $perPage) {
      total
      drivers {
        id
        name
        email
        phone
        status
      }
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
      loads {
        id
        ref
        status
        pickup
        dropoff
        pickupDate
        rate
      }
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
    }
  }
`
