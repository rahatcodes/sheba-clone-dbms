
'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ClientDashboard() {
  // Replace with actual client_id from auth/session
  const client_id = 1;
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch available services
      const { data: allServices } = await supabase
        .from('services')
        .select('*')
        .eq('approved', true);
      setServices(allServices || []);

      // Fetch client's bookings
      const { data: clientBookings } = await supabase
        .from('bookings')
        .select('*, services(service_name)')
        .eq('client_id', client_id);
      setBookings(clientBookings || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleBookService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !bookingDate) return;
    setBookingError('');
    // Generate a random integer for booking_id (not recommended for production, but works for now)
    const booking_id = Math.floor(Math.random() * 1000000);
    // Find provider_id from selected service
    const selected = services.find(s => s.service_id === parseInt(selectedService));
    const provider_id = selected?.provider_id;
    if (!provider_id) {
      setBookingError('Provider not found for selected service.');
      return;
    }
    // Do not set status, let DB default to 'pending'
    const { error } = await supabase
      .from('bookings')
      .insert({
        booking_id,
        client_id,
        provider_id,
        service_id: parseInt(selectedService),
        booking_date: bookingDate
      });
    if (error) {
      setBookingError(error.message);
      return;
    }
    setSelectedService('');
    setBookingDate('');
    // Refresh bookings
    const { data: clientBookings } = await supabase
      .from('bookings')
      .select('*, services(service_name)')
      .eq('client_id', client_id);
    setBookings(clientBookings || []);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Client Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-purple-600">{bookings.filter(b => b.status === 'pending').length}</span>
          <span className="text-gray-600">Active Bookings</span>
        </div>
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'completed').length}</span>
          <span className="text-gray-600">Completed Services</span>
        </div>
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">Client #{client_id}</span>
          <span className="text-gray-600">Profile</span>
        </div>
      </div>
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Book a Service</h2>
        {bookingError && <div className="text-red-600 mb-2">{bookingError}</div>}
        <form className="flex gap-4" onSubmit={handleBookService}>
          <select className="p-2 border rounded w-1/2" value={selectedService} onChange={e => setSelectedService(e.target.value)}>
            <option value="">Select Service</option>
            {services.map(s => (
              <option key={s.service_id} value={s.service_id}>{s.service_name}</option>
            ))}
          </select>
          <input type="date" className="p-2 border rounded w-1/4" value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
          <button className="px-4 py-2 bg-purple-600 text-white rounded">Book</button>
        </form>
      </div>
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Recent Bookings</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y">
            {bookings.map(b => (
              <li key={b.booking_id} className="py-2 flex justify-between items-center">
                <span>{b.service?.service_name} - {b.booking_date}</span>
                <span className={
                  b.status === 'completed' ? 'text-green-600' :
                  b.status === 'pending' ? 'text-yellow-600' :
                  'text-gray-600'
                }>{b.status}</span>
              </li>
            ))}
            {bookings.length === 0 && <li className="py-2 text-gray-500">No bookings found.</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
