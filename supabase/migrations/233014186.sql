-- Table: Admins
CREATE TABLE Admins (
admin_id INT PRIMARY KEY,
full_name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
phone VARCHAR(15) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL
);

-- Table: Clients (Service Users)
CREATE TABLE Clients (
client_id INT PRIMARY KEY,
full_name VARCHAR(100) NOT NULL,
phone VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE,
address TEXT NOT NULL
);

-- Table: Service_Categories
CREATE TABLE Service_Categories (
category_id INT PRIMARY KEY,
category_name VARCHAR(50) NOT NULL UNIQUE
);

-- Table: Services
CREATE TABLE Services (
service_id INT PRIMARY KEY,
category_id INT NOT NULL,
service_name VARCHAR(100) NOT NULL,
base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
FOREIGN KEY (category_id) REFERENCES Service_Categories(category_id)
ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table: Service_Providers
CREATE TABLE Service_Providers (
provider_id INT PRIMARY KEY,
admin_id INT NOT NULL,
full_name VARCHAR(100) NOT NULL,
phone VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE,
expertise VARCHAR(100) NOT NULL,
rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
FOREIGN KEY (admin_id) REFERENCES Admins(admin_id)
ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: Bookings
CREATE TABLE Bookings (
booking_id INT PRIMARY KEY,
client_id INT NOT NULL,
provider_id INT NOT NULL,
service_id INT NOT NULL,
booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
status VARCHAR(20) NOT NULL DEFAULT 'Pending'
CHECK(status IN ('Pending', 'In Progress', 'Completed', 'Cancelled')),
FOREIGN KEY (client_id) REFERENCES Clients(client_id)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (provider_id) REFERENCES Service_Providers(provider_id)
ON UPDATE CASCADE ON DELETE SET NULL,
FOREIGN KEY (service_id) REFERENCES Services(service_id)
ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table: Payments
CREATE TABLE Payments (
payment_id INT PRIMARY KEY,
booking_id INT NOT NULL,
amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
payment_method VARCHAR(20) NOT NULL
CHECK(payment_method IN ('Cash', 'Card', 'Mobile Banking')),
FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
ON UPDATE CASCADE ON DELETE CASCADE
);

-- Sample Data
INSERT INTO Admins VALUES
(1, 'Shafiq Ahmed', 'admin@sheba.xyz', '01719990000', 'hashed_password_here');

INSERT INTO Clients VALUES
(1, 'Rahim Uddin', '01710000001', 'rahim@example.com', 'Banani, Dhaka');

INSERT INTO Service_Categories VALUES
(1, 'Cleaning'),
(2, 'Electronics Repair');

INSERT INTO Services VALUES
(1, 1, 'Home Deep Cleaning', 2500.00),
(2, 2, 'AC Repair Service', 1500.00);

INSERT INTO Service_Providers VALUES
(1, 1, 'Karim Khan', '01710000002', 'karim@example.com', 'Cleaning', 4.8);

INSERT INTO Bookings VALUES
(1, 1, 1, 1, '2025-08-11', 'Pending');

INSERT INTO Payments VALUES
(1, 1, 2500.00, '2025-08-11', 'Mobile Banking');
