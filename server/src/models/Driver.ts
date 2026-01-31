export type DriverStatus = 'AVAILABLE' | 'ON_LOAD' | 'OFF_DUTY';

export type Driver = {
  id: string;
  name: string;
  phone: string;
  status: DriverStatus;
  avatar: string;
  createdAt: string;
};

export type CreateDriverInput = {
  name: string;
  phone: string;
  status?: DriverStatus;
  avatar?: string;
};

export type UpdateDriverInput = {
  name?: string;
  phone?: string;
  status?: DriverStatus;
  avatar?: string;
};
