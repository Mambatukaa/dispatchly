import {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
} from '../services/driver.service';
import {
  getBrokers,
  getBrokerById,
  createBroker,
  updateBroker,
  deleteBroker
} from '../services/broker.service';
import {
  getLoads,
  getLoadById,
  getLoadsByDriver,
  createLoad,
  updateLoad,
  deleteLoad
} from '../services/load.service';
import { Driver } from '../models/Driver';
import { Load } from '../models/Load';
import { GraphQLScalarType, Kind } from 'graphql';

// Date scalar implementation
const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: any) {
    // Convert outgoing Date to ISO string
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'string') {
      return value;
    }
    throw new Error(`Unable to serialize value as date: ${value}`);
  },
  parseValue(value: any) {
    // Convert incoming string or timestamp to Date
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error(`Unable to parse value as date: ${value}`);
      }
      return date;
    }
    throw new Error(`Unable to parse value as date: ${value}`);
  },
  parseLiteral(ast) {
    // Convert literal value in query to Date
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      const date = new Date(
        ast.kind === Kind.INT ? parseInt(ast.value) : ast.value
      );
      if (isNaN(date.getTime())) {
        throw new Error(`Unable to parse literal value as date: ${ast.value}`);
      }
      return date;
    }
    throw new Error(`Cannot represent Date value as: ${ast.kind}`);
  }
});

export const resolvers = {
  Date: DateScalar,
  Query: {
    drivers: async (
      _: any,
      { page, perPage }: { page?: number; perPage?: number }
    ) => {
      const pageValue = page || 1;
      const perPageValue = perPage || 20;
      const skip = (pageValue - 1) * perPageValue;
      return await getDrivers(skip, perPageValue);
    },

    driver: async (_: any, { id }: { id: string }) => {
      return await getDriverById(id);
    },

    brokers: async (
      _: any,
      { page, perPage }: { page?: number; perPage?: number }
    ) => {
      const pageValue = page || 1;
      const perPageValue = perPage || 20;
      const skip = (pageValue - 1) * perPageValue;
      return await getBrokers(skip, perPageValue);
    },

    broker: async (_: any, { id }: { id: string }) => {
      return await getBrokerById(id);
    },

    loads: async (
      _: any,
      { page, perPage }: { page?: number; perPage?: number }
    ) => {
      const pageValue = page || 1;
      const perPageValue = perPage || 20;
      const skip = (pageValue - 1) * perPageValue;
      return await getLoads(skip, perPageValue);
    },

    load: async (_: any, { id }: { id: string }) => {
      return await getLoadById(id);
    },

    driverLoads: async (
      _: any,
      {
        driverId,
        page,
        perPage
      }: { driverId: string; page?: number; perPage?: number }
    ) => {
      const pageValue = page || 1;
      const perPageValue = perPage || 20;
      const skip = (pageValue - 1) * perPageValue;
      return await getLoadsByDriver(driverId, skip, perPageValue);
    }
  },

  Mutation: {
    createDriver: async (_: any, { input }: { input: any }) => {
      return await createDriver(input);
    },

    updateDriver: async (_: any, { id, input }: { id: string; input: any }) => {
      return await updateDriver(id, input);
    },

    deleteDriver: async (_: any, { id }: { id: string }) => {
      return await deleteDriver(id);
    },

    createBroker: async (_: any, { input }: { input: any }) => {
      return await createBroker(input);
    },

    updateBroker: async (_: any, { id, input }: { id: string; input: any }) => {
      return await updateBroker(id, input);
    },

    deleteBroker: async (_: any, { id }: { id: string }) => {
      return await deleteBroker(id);
    },

    createLoad: async (_: any, { input }: { input: any }) => {
      return await createLoad(input);
    },

    updateLoad: async (_: any, { id, input }: { id: string; input: any }) => {
      return await updateLoad(id, input);
    },

    deleteLoad: async (_: any, { id }: { id: string }) => {
      return await deleteLoad(id);
    }
  },

  Driver: {
    loads: async (driver: Driver) => {
      const result = await getLoadsByDriver(driver.id, 0, 100);
      return result.loads;
    }
  },

  Load: {
    driver: async (load: Load) => {
      if (!load.driverId) return null;
      return await getDriverById(load.driverId);
    },
    broker: async (load: Load) => {
      if (!load.brokerId) return null;
      return await getBrokerById(load.brokerId);
    }
  }
};
