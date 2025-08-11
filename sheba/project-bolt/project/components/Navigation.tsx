'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuthModal } from '@/components/auth/AuthModal'
import { supabase } from '@/lib/supabase'
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sheba</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-700 hover:text-teal-600 transition-colors">
              Services
            </Link>
            <Link href="/providers" className="text-gray-700 hover:text-teal-600 transition-colors">
              Service Providers
            </Link>
            <Link href="/bookings" className="text-gray-700 hover:text-teal-600 transition-colors">
              My Bookings
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors">
              About
            </Link>
            {/* Modern Sign In and Sign Up Dropdowns */}
            {!user && (
              <div className="flex gap-2 items-center">
                <div className="relative group">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />Sign In
                  </Button>
                  <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Link href="/auth/admin-signin" className="block px-4 py-2 hover:bg-blue-50 text-blue-600 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />Admin
                    </Link>
                    <Link href="/auth/provider-signin" className="block px-4 py-2 hover:bg-green-50 text-green-600 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />Provider
                    </Link>
                    <Link href="/auth/client-signin" className="block px-4 py-2 hover:bg-purple-50 text-purple-600 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />Client
                    </Link>
                  </div>
                </div>
                <div className="relative group">
                  <Button variant="default" size="sm" className="flex items-center gap-2 bg-teal-500 text-white">
                    <User className="h-4 w-4" />Sign Up
                  </Button>
                  <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Link href="/auth/admin-signup" className="block px-4 py-2 hover:bg-blue-50 text-blue-600 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />Admin
                    </Link>
                    <Link href="/auth/provider-signup" className="block px-4 py-2 hover:bg-green-50 text-green-600 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />Provider
                    </Link>
                    <Link href="/auth/client-signup" className="block px-4 py-2 hover:bg-purple-50 text-purple-600 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />Client
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {/* Dashboard Link for logged in user */}
            {user && (
              <>
                {/* Example: role detection, replace with your actual logic */}
                {user.user_metadata?.role === 'admin' && (
                  <Link href="/admin/dashboard" className="text-blue-600 font-semibold">Admin Dashboard</Link>
                )}
                {user.user_metadata?.role === 'provider' && (
                  <Link href="/provider/dashboard" className="text-green-600 font-semibold">Provider Dashboard</Link>
                )}
                {user.user_metadata?.role === 'client' && (
                  <Link href="/client/dashboard" className="text-purple-600 font-semibold">Client Dashboard</Link>
                )}
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            {user ? (
              <>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user.user_metadata?.full_name || user.email}
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-teal-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/providers" 
                className="text-gray-700 hover:text-teal-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Service Providers
              </Link>
              <Link 
                href="/bookings" 
                className="text-gray-700 hover:text-teal-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-teal-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                {user ? (
                  <Button size="sm" variant="outline" className="flex-1" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => openAuthModal('signin')}>
                      Sign In
                    </Button>
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-600 flex-1" onClick={() => openAuthModal('signup')}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </nav>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={authMode}
      />
    </>
  )
}