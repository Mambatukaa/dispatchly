import { gql } from '@apollo/client'

export const GET_LOADS = gql`
  query Loads {
    loads {
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

export const GET_LOAD = gql`
  query GetLoad($id: ID!) {
    load(id: $id) {
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
      shipperName
      notes
    }
  }
`
