import React from 'react';

export default function ProviderDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>
      {/* Add new service and category UI will go here */}
      <div className="bg-white shadow rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Service</h2>
        {/* Form for adding new service */}
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Add New Category</h2>
        {/* Form for adding new category */}
      </div>
    </div>
  );
}
