'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase, Booking } from '@/lib/supabase'
import { Calendar, Clock, User, Phone, MapPin } from 'lucide-react'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customers (full_name, phone, address),
          service_providers (full_name, phone, expertise),
          services (service_name, base_price)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>
            <div className="grid gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-48"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>
          
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start by booking a service from our homepage</p>
              <Button className="bg-teal-500 hover:bg-teal-600">
                Browse Services
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.booking_id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">
                        {booking.services?.service_name || 'Service'}
                      </CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-teal-600" />
                          <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                        </div>
                        {booking.booking_time && (
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-teal-600" />
                            <span>{booking.booking_time}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-teal-600" />
                          <span>{booking.service_providers?.full_name || 'Provider TBD'}</span>
                        </div>
                        {booking.service_providers?.phone && (
                          <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-teal-600" />
                            <span>{booking.service_providers.phone}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        {booking.total_amount && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              ৳{booking.total_amount.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">Total Amount</div>
                          </div>
                        )}
                        {booking.notes && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">Notes:</div>
                            <div className="text-sm text-gray-600">{booking.notes}</div>
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {booking.status === 'pending' && (
                            <Button variant="destructive" size="sm">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}