import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Approval system UI will go here */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Pending Services for Approval</h2>
        {/* List of pending services with approve/reject buttons */}
      </div>
    </div>
  );
}
