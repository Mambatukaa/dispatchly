import { gql } from '@apollo/client';

// Queries
export const GET_DRIVERS = gql`
  query GetDrivers {
    drivers {
      id
      name
      phone
      note
      createdAt
    }
  }
`;

export const GET_DRIVER = gql`
  query GetDriver($id: ID!) {
    driver(id: $id) {
      id
      name
      phone
      note
      createdAt
    }
  }
`;

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
      notes
    }
  }
`;

// Mutations
export const CREATE_DRIVER = gql`
  mutation CreateDriver($input: CreateDriverInput!) {
    createDriver(input: $input) {
      id
      name
      phone
      note
      createdAt
    }
  }
`;

export const UPDATE_DRIVER = gql`
  mutation UpdateDriver($id: ID!, $input: UpdateDriverInput!) {
    updateDriver(id: $id, input: $input) {
      id
      name
      phone
      note
      createdAt
    }
  }
`;

export const DELETE_DRIVER = gql`
  mutation DeleteDriver($id: ID!) {
    deleteDriver(id: $id) {
      id
    }
  }
`;
