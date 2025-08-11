'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase, ServiceCategory } from '@/lib/supabase'
import { 
  Home, 
  Zap, 
  Wrench, 
  Droplets, 
  Wind, 
  Car, 
  Scissors, 
  ShoppingCart,
  ArrowRight 
} from 'lucide-react'

const categoryIcons: Record<string, any> = {
  'Home Cleaning': Home,
  'Electronics Repair': Zap,
  'Plumbing': Droplets,
  'Electrical Work': Zap,
  'AC Service': Wind,
  'Car Service': Car,
  'Beauty Service': Scissors,
  'Grocery': ShoppingCart,
}

export function ServiceCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('category_name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-gray-600">Choose from our most requested services</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
          <p className="text-gray-600 text-lg">Choose from our most requested services</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.category_name] || Home
            
            return (
              <Card 
                key={category.category_id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-0 hover:-translate-y-2"
                onClick={() => router.push(`/services?category=${category.category_id}`)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                    <IconComponent className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {category.category_name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {category.description || 'Professional service'}
                  </p>
                </CardContent>
              </Card>
            )
          })}
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