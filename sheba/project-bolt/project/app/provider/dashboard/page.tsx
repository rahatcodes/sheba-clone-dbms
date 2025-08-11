
'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProviderDashboard() {
  // Replace with actual provider_id from auth/session
  const provider_id = 1;
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [loading, setLoading] = useState(true);
  const [serviceError, setServiceError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch provider's services
      const { data: providerServices } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', provider_id);
      setServices(providerServices || []);

      // Fetch all categories
          const { data: allCategories } = await supabase
            .from('service_categories')
            .select('*');
      setCategories(allCategories || []);

      // Fetch provider's bookings
      const { data: providerBookings } = await supabase
        .from('bookings')
        .select('*, service:services(service_name)')
        .eq('provider_id', provider_id);
      setBookings(providerBookings || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setServiceError('');
    if (!serviceName || !servicePrice || !serviceCategory) return;
    // Generate a random integer for service_id (not recommended for production, but works for now)
    const service_id = Math.floor(Math.random() * 1000000);
    const { error } = await supabase
      .from('services')
      .insert({
        service_id,
        service_name: serviceName,
        base_price: parseFloat(servicePrice),
        category_id: parseInt(serviceCategory),
        provider_id,
        approved: false // pending approval
      });
    if (error) {
      setServiceError(error.message);
      return;
    }
    setServiceName('');
    setServicePrice('');
    setServiceCategory('');
    // Refresh services
    const { data: providerServices } = await supabase
      .from('services')
      .select('*')
      .eq('provider_id', provider_id);
    setServices(providerServices || []);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError('');
    if (!categoryName) return;
    // Generate a random integer for category_id (not recommended for production, but works for now)
    const category_id = Math.floor(Math.random() * 1000000);
    const { error } = await supabase
      .from('service_categories')
      .insert({ category_id, category_name: categoryName });
    if (error) {
      setCategoryError(error.message);
      return;
    }
    setCategoryName('');
    // Refresh categories
    const { data: allCategories } = await supabase
      .from('service_categories')
      .select('*');
    setCategories(allCategories || []);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Provider Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">{services.length}</span>
          <span className="text-gray-600">Active Services</span>
        </div>
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">{categories.length}</span>
          <span className="text-gray-600">Categories Added</span>
        </div>
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-purple-600">{bookings.length}</span>
          <span className="text-gray-600">Bookings</span>
        </div>
      </div>
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Add New Service</h2>
        {serviceError && <div className="text-red-600 mb-2">{serviceError}</div>}
        {categories.length === 0 ? (
          <div className="text-red-600 mb-4">No categories found. Please add a category first.</div>
        ) : null}
        <form className="flex gap-4" onSubmit={handleAddService}>
          <input type="text" placeholder="Service Name" className="p-2 border rounded w-1/3" value={serviceName} onChange={e => setServiceName(e.target.value)} />
          <input type="number" placeholder="Base Price" className="p-2 border rounded w-1/4" value={servicePrice} onChange={e => setServicePrice(e.target.value)} />
          <select className="p-2 border rounded w-1/4" value={serviceCategory} onChange={e => setServiceCategory(e.target.value)} disabled={categories.length === 0}>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={categories.length === 0}>Add</button>
        </form>
      </div>
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Add New Category</h2>
        {categoryError && <div className="text-red-600 mb-2">{categoryError}</div>}
        <form className="flex gap-4" onSubmit={handleAddCategory}>
          <input type="text" placeholder="Category Name" className="p-2 border rounded w-1/2" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
        </form>
      </div>
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Recent Bookings</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y">
            {bookings.map(b => (
              <li key={b.booking_id} className="py-2 flex justify-between items-center">
                <span>{b.service?.service_name || 'Unknown Service'} - {b.booking_date}</span>
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
