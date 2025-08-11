
'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [pendingServices, setPendingServices] = useState<any[]>([]);
  const [providersCount, setProvidersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch pending services (not approved)
      const { data: services } = await supabase
        .from('services')
        .select('*')
        .eq('approved', false);
      setPendingServices(services || []);

      // Fetch provider count
      const { count: providerCount } = await supabase
        .from('service_providers')
        .select('*', { count: 'exact', head: true });
      setProvidersCount(providerCount || 0);

      // Fetch client count
      const { count: clientCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });
      setClientsCount(clientCount || 0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleApprove = async (service_id: number) => {
    await supabase
      .from('services')
      .update({ approved: true })
      .eq('service_id', service_id);
    setPendingServices(pendingServices.filter(s => s.service_id !== service_id));
  };

  const handleReject = async (service_id: number) => {
    await supabase
      .from('services')
      .delete()
      .eq('service_id', service_id);
    setPendingServices(pendingServices.filter(s => s.service_id !== service_id));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">{pendingServices.length}</span>
          <span className="text-gray-600">Pending Approvals</span>
        </div>
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">{providersCount}</span>
          <span className="text-gray-600">Providers</span>
        </div>
        <div className="bg-white shadow rounded p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-purple-600">{clientsCount}</span>
          <span className="text-gray-600">Clients</span>
        </div>
      </div>
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Pending Services for Approval</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y">
            {pendingServices.map(service => (
              <li key={service.service_id} className="py-2 flex justify-between items-center">
                <span>{service.service_name}</span>
                <div>
                  <button className="px-3 py-1 bg-green-500 text-white rounded mr-2" onClick={() => handleApprove(service.service_id)}>Approve</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleReject(service.service_id)}>Reject</button>
                </div>
              </li>
            ))}
            {pendingServices.length === 0 && <li className="py-2 text-gray-500">No pending services.</li>}
          </ul>
        )}
      </div>
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Admin</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded">View Reports</button>
        </div>
      </div>
    </div>
  );
}
