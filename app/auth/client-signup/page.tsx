'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ClientSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: 'client' } }
    });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/client/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Client Sign Up</h1>
      <form className="space-y-4 w-80" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
