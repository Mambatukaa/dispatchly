import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

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
    loads: [Load!]!
  }

  type Broker {
    id: ID!
    logisticName: String!
    mc: String!
    brokerName: String!
    phoneNumber: String!
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
    broker: Broker
    brokerId: String
    pickup: String!
    dropoff: String!
    pickupDate: Date!
    dropoffDate: Date!
    rate: Float
    notes: String
  }

  input DriverInput {
    name: String!
    phone: String!
    email: String
    status: DriverStatus
    avatar: String
  }

  input BrokerInput {
    logisticName: String!
    mc: String!
    brokerName: String!
    phoneNumber: String!
  }

  input LoadInput {
    driverId: ID
    brokerId: ID
    pickup: String
    dropoff: String
    ref: String
    pickupDate: Date!
    dropoffDate: Date!
    rate: Float
    notes: String
    status: LoadStatus
  }

  type Query {
    drivers: [Driver!]!
    driver(id: ID!): Driver
    brokers: [Broker!]!
    broker(id: ID!): Broker
    loads: [Load!]!
    load(id: ID!): Load
    driverLoads(driverId: ID!): [Load!]!
  }

  type Mutation {
    createDriver(input: DriverInput!): Driver!
    updateDriver(id: ID!, input: DriverInput!): Driver!
    deleteDriver(id: ID!): Boolean!

    createBroker(input: BrokerInput!): Broker!
    updateBroker(id: ID!, input: BrokerInput!): Broker!
    deleteBroker(id: ID!): Boolean!

    createLoad(input: LoadInput!): Load!
    updateLoad(id: ID!, input: LoadInput!): Load!
    deleteLoad(id: ID!): Boolean!
  }
`;
