// This enables static export for Next.js dynamic routes. Replace with real IDs if available.
export function generateStaticParams() {
  return [{ serviceId: "1" }];
}
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { supabase, Service } from '@/lib/supabase'
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react'

export default function BookServicePage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.serviceId as string
  
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    phone: '',
    notes: ''
  })

  useEffect(() => {
    fetchService()
    checkUser()
  }, [serviceId])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
  }

  async function fetchService() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          service_categories (
            category_name
          )
        `)
        .eq('service_id', serviceId)
        .single()

      if (error) throw error
      setService(data)
    } catch (error) {
      console.error('Error fetching service:', error)
      router.push('/services')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please sign in to book a service')
      return
    }

    setBooking(true)

    try {
      // For demo purposes, we'll create a booking with a random provider
      const { data: providers } = await supabase
        .from('service_providers')
        .select('provider_id')
        .eq('availability_status', 'available')
        .limit(1)

      if (!providers || providers.length === 0) {
        throw new Error('No available providers at the moment')
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          customer_id: parseInt(user.id), // This would need proper customer ID mapping
          provider_id: providers[0].provider_id,
          service_id: parseInt(serviceId),
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          status: 'pending',
          total_amount: service?.base_price,
          notes: bookingData.notes
        })

      if (error) throw error

      alert('Booking created successfully! You will be contacted shortly.')
      router.push('/bookings')
    } catch (error: any) {
      alert(error.message || 'Failed to create booking')
    } finally {
      setBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-96"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <Button onClick={() => router.push('/services')}>
              Browse Services
            </Button>
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
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 w-fit">
                  {service.service_categories?.category_name}
                </Badge>
                <CardTitle className="text-2xl">{service.service_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  {service.description || 'Professional service with quality guarantee'}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-teal-600" />
                    <span>Duration: {service.duration_minutes} minutes</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl font-bold text-gray-900">
                      ৳{service.base_price.toLocaleString()}
                    </div>
                    <span className="text-gray-500">Starting price</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Book This Service</CardTitle>
              </CardHeader>
              <CardContent>
                {!user ? (
                  <div className="text-center py-8">
                    <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign In Required</h3>
                    <p className="text-gray-600 mb-4">Please sign in to book this service</p>
                    <Button className="bg-teal-500 hover:bg-teal-600">
                      Sign In
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={bookingData.time}
                          onChange={(e) => handleInputChange('time', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Service Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete address"
                        value={bookingData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Contact Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={bookingData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any specific requirements or instructions"
                        value={bookingData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                      />
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total Amount:</span>
                        <span className="text-2xl font-bold text-teal-600">
                          ৳{service.base_price.toLocaleString()}
                        </span>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-teal-500 hover:bg-teal-600" 
                        size="lg"
                        disabled={booking}
                      >
                        {booking ? 'Creating Booking...' : 'Book Now'}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}