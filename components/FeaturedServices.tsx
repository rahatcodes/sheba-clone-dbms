'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase, Service } from '@/lib/supabase'
import { Clock, Star, ArrowRight } from 'lucide-react'

export function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchFeaturedServices()
  }, [])

  async function fetchFeaturedServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          service_categories (
            category_name
          )
        `)
        .limit(6)

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-gray-600">Our most popular and trusted services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
          <p className="text-gray-600 text-lg">Our most popular and trusted services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card 
              key={service.service_id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                    {service.service_categories?.category_name || 'Service'}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">4.8</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-teal-600 transition-colors">
                  {service.service_name}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description || 'Professional service with quality guarantee'}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.duration_minutes} mins</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ৳{service.base_price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Starting price</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-teal-500 hover:bg-teal-600 group-hover:bg-teal-600" 
                  size="lg"
                 onClick={() => router.push(`/book/${service.service_id}`)}
                >
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="group border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white px-8"
            onClick={() => router.push('/services')}
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}