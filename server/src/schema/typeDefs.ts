import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum DriverStatus {
    AVAILABLE
    ON_LOAD
    OFF_DUTY
  }

  type Driver {
    id: ID!
    name: String!
    phone: String!
    email: String
    status: DriverStatus!
    avatar: String!
    createdAt: String!
  }

  enum LoadStatus {
    NEW
    BOOKED
    DISPATCHED
    PICKED_UP
    DELIVERED
    INVOICED
    PAID
    CANCELED
  }

  type Load {
    id: ID!
    ref: String!
    status: LoadStatus!
    driver: Driver
    driverId: String
    pickup: String!
    dropoff: String!
    pickupDate: String!
    rate: Float
    shipperName: String
    notes: String
  }

  input DriverInput {
    name: String!
    phone: String!
    email: String
    status: DriverStatus
    avatar: String
  }

  input LoadInput {
    driverId: ID!
    pickup: String!
    dropoff: String!
    ref: String
    pickupDate: String
    rate: Float
    brokerName: String
    notes: String
    status: LoadStatus
  }

  type Query {
    drivers: [Driver!]!
    driver(id: ID!): Driver
    loads: [Load!]!
    load(id: ID!): Load
    driverLoads(driverId: ID!): [Load!]!
  }

  type Mutation {
    createDriver(input: DriverInput!): Driver!
    updateDriver(id: ID!, input: DriverInput!): Driver!
    deleteDriver(id: ID!): Boolean!

    createLoad(input: LoadInput!): Load!
    updateLoad(id: ID!, input: LoadInput!): Load!
    deleteLoad(id: ID!): Boolean!
  }
`;
