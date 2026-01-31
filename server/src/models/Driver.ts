export type DriverStatus = 'AVAILABLE' | 'ON_LOAD' | 'OFF_DUTY';

export type Driver = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: DriverStatus;
  avatar: string;
  createdAt: string;
};

export type DriverInput = {
  name: string;
  phone: string;
  email: string;
  status?: DriverStatus;
  avatar?: string;
};
