import { Card, CardContent } from '@/components/ui/card'
import { Search, Calendar, CheckCircle, CreditCard } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Browse & Select',
    description: 'Choose from hundreds of services and browse verified service providers'
  },
  {
    icon: Calendar,
    title: 'Book Appointment',
    description: 'Select your preferred date, time and share your requirements'
  },
  {
    icon: CheckCircle,
    title: 'Get Service',
    description: 'Our professional arrives at your doorstep and completes the job'
  },
  {
    icon: CreditCard,
    title: 'Pay Securely',
    description: 'Pay safely through cash, card, or digital payment methods'
  }
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting professional service has never been easier. Just 4 simple steps to get your job done.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            
            return (
              <div key={index} className="relative">
                <Card className="text-center bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-teal-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-teal-300"></div>
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-teal-500 rounded-full"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}