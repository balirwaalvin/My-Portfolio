import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../lib/appwrite';
import { Loader2, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await account.createEmailPasswordSession(email, password);
      localStorage.setItem('isAdmin', 'true'); // Simple session flag
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 429) {
        setError('Too many attempts. Please wait 15 minutes before trying again.');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <p className="text-gray-400 mt-2">Enter credentials to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-600/50"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Login'}
          </button>

          <div className="text-center mt-6">
            <a href="/" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
              ← Return to Website
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
