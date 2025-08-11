import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { TopProviders } from '@/components/TopProviders'

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Service Providers</h1>
          <p className="text-xl text-gray-600 mb-12">Connect with our verified professionals</p>
        </div>
        <TopProviders />
      </div>
      <Footer />
    </div>
  )
}