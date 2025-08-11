import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { ServiceCategories } from '@/components/ServiceCategories'
import { FeaturedServices } from '@/components/FeaturedServices'
import { HowItWorks } from '@/components/HowItWorks'
import { TopProviders } from '@/components/TopProviders'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <div className="flex flex-col items-center my-8">
        <h2 className="text-xl font-bold mb-4">Choose Your Role</h2>
        <div className="flex gap-4 mb-6">
          <a href="/auth/admin-signin" className="px-4 py-2 bg-blue-600 text-white rounded">Admin Sign In</a>
          <a href="/auth/provider-signin" className="px-4 py-2 bg-green-600 text-white rounded">Provider Sign In</a>
          <a href="/auth/client-signin" className="px-4 py-2 bg-purple-600 text-white rounded">Client Sign In</a>
        </div>
        <div className="flex gap-4">
          <a href="/admin/dashboard" className="px-4 py-2 border border-blue-600 text-blue-600 rounded">Admin Dashboard</a>
          <a href="/provider/dashboard" className="px-4 py-2 border border-green-600 text-green-600 rounded">Provider Dashboard</a>
          <a href="/client/dashboard" className="px-4 py-2 border border-purple-600 text-purple-600 rounded">Client Dashboard</a>
        </div>
      </div>
      <ServiceCategories />
      <FeaturedServices />
      <HowItWorks />
      <TopProviders />
      <Footer />
    </div>
  )
}