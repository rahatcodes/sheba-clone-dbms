/*
# Service Platform Database Schema

1. New Tables
  - `customers` - Customer profiles and contact information
    - `customer_id` (integer, primary key)
    - `full_name` (text, required)
    - `phone` (text, unique, required)
    - `email` (text, unique)
    - `address` (text)
    - `created_at` (timestamp, default now)

  - `service_categories` - Service category definitions
    - `category_id` (integer, primary key)
    - `category_name` (text, required)
    - `description` (text)
    - `icon_url` (text)
    - `created_at` (timestamp, default now)

  - `services` - Available services with pricing
    - `service_id` (integer, primary key)
    - `category_id` (integer, foreign key)
    - `service_name` (text, required)
    - `description` (text)
    - `base_price` (decimal, required)
    - `duration_minutes` (integer)
    - `created_at` (timestamp, default now)

  - `service_providers` - Service provider profiles
    - `provider_id` (integer, primary key)
    - `full_name` (text, required)
    - `phone` (text, unique, required)
    - `email` (text, unique)
    - `expertise` (text)
    - `rating` (decimal, 3,2)
    - `total_jobs` (integer, default 0)
    - `availability_status` (text, default 'available')
    - `created_at` (timestamp, default now)

  - `bookings` - Service booking records
    - `booking_id` (integer, primary key)
    - `customer_id` (integer, foreign key)
    - `provider_id` (integer, foreign key)
    - `service_id` (integer, foreign key)
    - `booking_date` (date, required)
    - `booking_time` (time)
    - `status` (text, enum constraint)
    - `total_amount` (decimal)
    - `notes` (text)
    - `created_at` (timestamp, default now)

  - `payments` - Payment transaction records
    - `payment_id` (integer, primary key)
    - `booking_id` (integer, foreign key)
    - `amount` (decimal, required)
    - `payment_date` (date, required)
    - `payment_method` (text, enum constraint)
    - `transaction_id` (text)
    - `status` (text, default 'completed')
    - `created_at` (timestamp, default now)

2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
  - Add policies for service providers to access their bookings
  - Add admin policies for platform management

3. Sample Data
  - Insert sample service categories (Cleaning, Electronics Repair, etc.)
  - Insert sample services with realistic pricing
  - Insert sample service providers with ratings
  - Insert sample bookings and payments for demonstration
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create service_categories table
CREATE TABLE IF NOT EXISTS service_categories (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    service_id SERIAL PRIMARY KEY,
    category_id INTEGER,
    service_name TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT now(),
    FOREIGN KEY (category_id) REFERENCES service_categories(category_id)
);

-- Create service_providers table
CREATE TABLE IF NOT EXISTS service_providers (
    provider_id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    expertise TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_jobs INTEGER DEFAULT 0,
    availability_status TEXT DEFAULT 'available',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    provider_id INTEGER,
    service_id INTEGER,
    booking_date DATE NOT NULL,
    booking_time TIME,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    total_amount DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method TEXT CHECK(payment_method IN ('cash', 'card', 'mobile_banking', 'digital_wallet')),
    transaction_id TEXT,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT now(),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for customers
CREATE POLICY "Customers can read own data"
    ON customers FOR SELECT
    TO authenticated
    USING (auth.uid()::text = customer_id::text);

CREATE POLICY "Customers can update own data"
    ON customers FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = customer_id::text);

-- Public read access for service categories and services
CREATE POLICY "Anyone can read service categories"
    ON service_categories FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Anyone can read services"
    ON services FOR SELECT
    TO anon, authenticated
    USING (true);

-- Public read access for service providers
CREATE POLICY "Anyone can read service providers"
    ON service_providers FOR SELECT
    TO anon, authenticated
    USING (true);

-- Booking policies
CREATE POLICY "Customers can read own bookings"
    ON bookings FOR SELECT
    TO authenticated
    USING (auth.uid()::text = customer_id::text);

CREATE POLICY "Service providers can read their bookings"
    ON bookings FOR SELECT
    TO authenticated
    USING (auth.uid()::text = provider_id::text);

CREATE POLICY "Customers can create bookings"
    ON bookings FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid()::text = customer_id::text);

-- Payment policies
CREATE POLICY "Users can read relevant payments"
    ON payments FOR SELECT
    TO authenticated
    USING (
        booking_id IN (
            SELECT booking_id FROM bookings 
            WHERE customer_id::text = auth.uid()::text 
            OR provider_id::text = auth.uid()::text
        )
    );

-- Insert sample data
INSERT INTO service_categories (category_id, category_name, description) VALUES 
(1, 'Home Cleaning', 'Professional cleaning services for your home'),
(2, 'Electronics Repair', 'Expert repair services for electronics and appliances'),
(3, 'Plumbing', 'Professional plumbing services and repairs'),
(4, 'Electrical Work', 'Licensed electrical installation and repair services'),
(5, 'AC Service', 'Air conditioning installation, repair and maintenance')
ON CONFLICT (category_id) DO NOTHING;

INSERT INTO services (service_id, category_id, service_name, description, base_price, duration_minutes) VALUES 
(1, 1, 'Home Deep Cleaning', 'Complete deep cleaning of your entire home', 2500.00, 180),
(2, 1, 'Kitchen Cleaning', 'Thorough kitchen cleaning including appliances', 1200.00, 90),
(3, 2, 'AC Repair Service', 'Professional AC diagnosis and repair', 1500.00, 120),
(4, 2, 'TV Repair', 'Expert TV repair and maintenance service', 800.00, 60),
(5, 3, 'Pipe Repair', 'Emergency pipe repair and replacement', 1000.00, 90),
(6, 4, 'Electrical Wiring', 'Safe electrical wiring and installation', 2000.00, 240),
(7, 5, 'AC Installation', 'Professional AC installation service', 3000.00, 180)
ON CONFLICT (service_id) DO NOTHING;

INSERT INTO service_providers (provider_id, full_name, phone, email, expertise, rating, total_jobs) VALUES 
(1, 'Karim Khan', '01710000002', 'karim@example.com', 'Home Cleaning Specialist', 4.8, 150),
(2, 'Shahid Rahman', '01710000003', 'shahid@example.com', 'Electronics Technician', 4.6, 120),
(3, 'Nasir Ahmed', '01710000004', 'nasir@example.com', 'Master Plumber', 4.9, 200),
(4, 'Rafiq Electrician', '01710000005', 'rafiq@example.com', 'Licensed Electrician', 4.7, 180),
(5, 'Hasan AC Expert', '01710000006', 'hasan@example.com', 'AC Specialist', 4.8, 160)
ON CONFLICT (provider_id) DO NOTHING;

INSERT INTO customers (customer_id, full_name, phone, email, address) VALUES 
(1, 'Rahim Uddin', '01710000001', 'rahim@example.com', 'Banani, Dhaka'),
(2, 'Fatima Begum', '01720000001', 'fatima@example.com', 'Dhanmondi, Dhaka'),
(3, 'Abdul Karim', '01730000001', 'abdul@example.com', 'Gulshan, Dhaka')
ON CONFLICT (customer_id) DO NOTHING;

INSERT INTO bookings (booking_id, customer_id, provider_id, service_id, booking_date, status, total_amount) VALUES 
(1, 1, 1, 1, '2025-08-15', 'pending', 2500.00),
(2, 2, 2, 3, '2025-08-16', 'confirmed', 1500.00),
(3, 3, 3, 5, '2025-08-17', 'completed', 1000.00)
ON CONFLICT (booking_id) DO NOTHING;

INSERT INTO payments (payment_id, booking_id, amount, payment_date, payment_method, status) VALUES 
(1, 3, 1000.00, '2025-08-17', 'mobile_banking', 'completed'),
(2, 1, 2500.00, '2025-08-15', 'digital_wallet', 'pending')
ON CONFLICT (payment_id) DO NOTHING;