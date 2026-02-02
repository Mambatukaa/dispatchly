export type Broker = {
  id: string;
  logisticName: string;
  mc: string;
  brokerName: string;
  phoneNumber: string;
  createdAt: string;
};

export type BrokerInput = {
  logisticName: string;
  mc: string;
  brokerName: string;
  phoneNumber: string;
};
