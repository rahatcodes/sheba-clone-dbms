import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ServiceCategories } from '@/components/ServiceCategories'
import { FeaturedServices } from '@/components/FeaturedServices'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">All Services</h1>
          <p className="text-xl text-gray-600 mb-12">Browse our complete range of professional services</p>
        </div>
        <ServiceCategories />
        <FeaturedServices />
      </div>
      <Footer />
    </div>
  )
}