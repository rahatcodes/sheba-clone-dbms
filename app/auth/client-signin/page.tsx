'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ClientSignIn() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Assume identifier is email for Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });
    if (error) {
      setError(error.message);
      return;
    }
    if (data.user && data.user.user_metadata?.role !== 'client') {
      await supabase.auth.updateUser({ data: { role: 'client' } });
    }
    router.push('/client/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Client Sign In</h1>
      <form className="space-y-4 w-80" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
  );
}
