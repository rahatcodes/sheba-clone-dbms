'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { supabase, ServiceProvider } from '@/lib/supabase'
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react'

export function TopProviders() {
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchTopProviders()
  }, [])

  async function fetchTopProviders() {
    try {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .order('rating', { ascending: false })
        .limit(6)

      if (error) throw error
      setProviders(data || [])
    } catch (error) {
      console.error('Error fetching providers:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Service Providers</h2>
            <p className="text-gray-600">Meet our highest-rated professionals</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Service Providers</h2>
          <p className="text-gray-600 text-lg">Meet our highest-rated professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {providers.map((provider) => (
            <Card 
              key={provider.provider_id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-20 h-20 ring-4 ring-teal-100">
                    <AvatarImage src={`https://images.unsplash.com/photo-${1500 + provider.provider_id}0000000-6c0b-4da6-81b2-56a0ec06d0d0?w=150&h=150&fit=crop&crop=face`} />
                    <AvatarFallback className="text-lg font-semibold bg-teal-100 text-teal-700">
                      {provider.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1">
                    {provider.availability_status === 'available' ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                  {provider.full_name}
                </h3>
                
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 mt-2">
                  {provider.expertise || 'Professional'}
                </Badge>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {provider.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-gray-500">•</div>
                  <div className="text-sm text-gray-600">
                    {provider.total_jobs} jobs completed
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 mb-4 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{provider.phone}</span>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <Badge 
                    variant={provider.availability_status === 'available' ? 'default' : 'secondary'}
                    className={`${
                      provider.availability_status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {provider.availability_status === 'available' ? 'Available Now' : 'Busy'}
                  </Badge>
                </div>

                <Button 
                  className="w-full bg-teal-500 hover:bg-teal-600 group-hover:bg-teal-600" 
                  size="lg"
                  disabled={provider.availability_status !== 'available'}
                 onClick={() => router.push(`/provider/${provider.provider_id}`)}
                >
                  {provider.availability_status === 'available' ? 'Book Now' : 'View Profile'}
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
            onClick={() => router.push('/providers')}
          >
            View All Providers
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}