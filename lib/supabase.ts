import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Customer {
  customer_id: number
  full_name: string
  phone: string
  email?: string
  address?: string
  created_at: string
}

export interface ServiceCategory {
  category_id: number
  category_name: string
  description?: string
  icon_url?: string
  created_at: string
}

export interface Service {
  service_id: number
  category_id: number
  service_name: string
  description?: string
  base_price: number
  duration_minutes: number
  created_at: string
  approved?: boolean
  service_categories?: ServiceCategory
}

export interface ServiceProvider {
  provider_id: number
  full_name: string
  phone: string
  email?: string
  expertise?: string
  rating: number
  total_jobs: number
  availability_status: string
  created_at: string
}

export interface Booking {
  booking_id: number
  customer_id: number
  provider_id: number
  service_id: number
  booking_date: string
  booking_time?: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  total_amount?: number
  notes?: string
  created_at: string
  customers?: Customer
  service_providers?: ServiceProvider
  services?: Service
}

export interface Payment {
  payment_id: number
  booking_id: number
  amount: number
  payment_date: string
  payment_method: 'cash' | 'card' | 'mobile_banking' | 'digital_wallet'
  transaction_id?: string
  status: string
  created_at: string
}