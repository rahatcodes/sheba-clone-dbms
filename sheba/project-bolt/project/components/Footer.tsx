import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest updates on services and offers</p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white rounded-r-none"
              />
              <Button 
                className="bg-teal-500 hover:bg-teal-600 rounded-l-none px-6"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">Sheba</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for all home services. Quality work, 
              fair prices, and guaranteed satisfaction.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/cleaning" className="text-gray-400 hover:text-white transition-colors">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/electronics" className="text-gray-400 hover:text-white transition-colors">
                  Electronics Repair
                </Link>
              </li>
              <li>
                <Link href="/services/plumbing" className="text-gray-400 hover:text-white transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link href="/services/electrical" className="text-gray-400 hover:text-white transition-colors">
                  Electrical Work
                </Link>
              </li>
              <li>
                <Link href="/services/ac" className="text-gray-400 hover:text-white transition-colors">
                  AC Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/providers/join" className="text-gray-400 hover:text-white transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-teal-500" />
                <span className="text-gray-400">+880 1700-000000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-teal-500" />
                <span className="text-gray-400">hello@sheba.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-teal-500 mt-1" />
                <span className="text-gray-400">
                  House 123, Road 456<br />
                  Gulshan, Dhaka 1212<br />
                  Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Sheba. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}