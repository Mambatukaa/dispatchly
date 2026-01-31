export type DriverStatus = 'AVAILABLE' | 'ON_LOAD' | 'OFF_DUTY';

export type Driver = {
  id: string;
  name: string;
  phone: string;
  note?: string;
  createdAt: string;
};
