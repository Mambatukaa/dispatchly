CREATE TABLE drivers
(
  id VARCHAR(24) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  status VARCHAR(50) DEFAULT 'AVAILABLE',
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE loads
(
  id VARCHAR(24) PRIMARY KEY,
  ref VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'NEW',
  driver_id VARCHAR(24),
  pickup VARCHAR(255) NOT NULL,
  dropoff VARCHAR(255) NOT NULL,
  pickup_date TIMESTAMP NOT NULL,
  rate DECIMAL(10, 2),
  broker_name VARCHAR(255),
  shipper_name VARCHAR(255),
  notes TEXT,
  FOREIGN KEY (driver_id) REFERENCES drivers(id)
);
