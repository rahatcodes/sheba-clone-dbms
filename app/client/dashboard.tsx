import React from 'react';

export default function ClientDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
      {/* Booking UI will go here */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Book a Service</h2>
        {/* List of available services and booking form */}
      </div>
    </div>
  );
}
