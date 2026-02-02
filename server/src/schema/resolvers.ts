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

export const resolvers = {
  Query: {
    drivers: async () => {
      return await getDrivers();
    },

    driver: async (_: any, { id }: { id: string }) => {
      return await getDriverById(id);
    },

    brokers: async () => {
      return await getBrokers();
    },

    broker: async (_: any, { id }: { id: string }) => {
      return await getBrokerById(id);
    },

    loads: async () => {
      return await getLoads();
    },

    load: async (_: any, { id }: { id: string }) => {
      return await getLoadById(id);
    },

    driverLoads: async (_: any, { driverId }: { driverId: string }) => {
      return await getLoadsByDriver(driverId);
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

  Load: {
    driver: async (load: Load) => {
      if (!load.driverId) return null;
      return await getDriverById(load.driverId);
    }
  }
};
