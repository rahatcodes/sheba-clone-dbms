'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin } from 'lucide-react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`)
    } else {
      router.push('/services')
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Your On-Demand
          <span className="block text-teal-600">Service Partner</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Book trusted professionals for home services, repairs, and maintenance. 
          Quality work, fair prices, guaranteed satisfaction.
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg border-0 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 py-4 text-lg border-0 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <Button 
              size="lg" 
              className="bg-teal-500 hover:bg-teal-600 px-8 py-4 text-lg font-semibold"
              onClick={handleSearch}
            >
              Search Services
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">5K+</div>
            <div className="text-gray-600">Service Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
            <div className="text-gray-600">Services Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}