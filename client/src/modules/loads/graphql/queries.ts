import { gql } from '@apollo/client'

export const GET_LOADS = gql`
  query Loads($page: Int, $perPage: Int) {
    loads(page: $page, perPage: $perPage) {
      total
      loads {
        id
        ref
        status
        pickup
        dropoff
        driverId
        brokerId
        pickupDate
        dropoffDate
        rate
        notes
      }
    }
  }
`

export const GET_LOAD = gql`
  query GetLoad($id: ID!) {
    load(id: $id) {
      id
      ref
      status
      pickup
      dropoff
      driverId
      brokerId
      pickupDate
      dropoffDate
      rate
      notes
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
      dropoffDate
      rat
      shipperName
      notes
    }
  }
`
