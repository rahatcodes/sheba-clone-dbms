import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, Award, Clock } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Trusted & Verified',
      description: 'All our service providers are background-checked and verified professionals'
    },
    {
      icon: Users,
      title: '50,000+ Happy Customers',
      description: 'Join thousands of satisfied customers who trust us for their service needs'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'We guarantee quality work with our satisfaction promise and warranty'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you whenever you need assistance'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About Sheba
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're on a mission to make quality home services accessible, reliable, and affordable for everyone. 
              Since our founding, we've connected thousands of customers with trusted professionals across Bangladesh.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sheba?</h2>
              <p className="text-gray-600 text-lg">We're committed to providing the best service experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 mx-auto mb-6 bg-teal-100 rounded-2xl flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            </div>
            
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                Sheba was born from a simple idea: everyone deserves access to reliable, quality home services 
                without the hassle of searching for trustworthy professionals.
              </p>
              
              <p className="leading-relaxed mb-6">
                We started as a small team in Dhaka, frustrated by the difficulty of finding reliable service 
                providers for everyday needs. Whether it was fixing a leaky pipe, cleaning the house, or 
                repairing electronics, the process was always time-consuming and uncertain.
              </p>
              
              <p className="leading-relaxed mb-6">
                Today, we've grown into Bangladesh's leading on-demand service platform, connecting customers 
                with thousands of verified professionals across multiple categories. Our technology-driven 
                approach ensures quality, transparency, and convenience at every step.
              </p>
              
              <p className="leading-relaxed">
                We're not just a service platform – we're your trusted partner in maintaining and improving 
                your home, giving you more time to focus on what matters most to you.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}