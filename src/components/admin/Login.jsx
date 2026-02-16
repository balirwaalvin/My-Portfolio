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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 text-red-400 mb-4">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Admin Access</h2>
          <p className="text-gray-500 mt-2">Enter credentials to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl text-white focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none transition-all placeholder-gray-700"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl text-white focus:ring-2 focus:ring-red-500/30 focus:border-red-500/30 outline-none transition-all placeholder-gray-700"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:bg-red-600/30 shadow-lg shadow-red-500/10"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Login'}
          </button>

          <div className="text-center mt-6">
            <a href="/" className="text-sm text-gray-500 hover:text-red-400 transition-colors">
              ← Return to Website
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
