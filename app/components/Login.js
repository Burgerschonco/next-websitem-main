'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const { theme } = useTheme();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        onLogin(true);
      } else {
        setError(data.message || 'Giriş başarısız');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="p-8 rounded-2xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF' }}>
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7' }}>
              <FaLock className="text-3xl" style={{ color: theme === 'dark' ? '#E6E6E6' : '#2B2B2B' }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A' }}>
              Admin Giriş
            </h1>
            <p style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
              Yönetim paneline erişim için giriş yapın
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg text-red-500 text-sm"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)' }}
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-sm" style={{ color: theme === 'dark' ? '#B8B8B8' : '#666' }} />
                </div>
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:scale-[1.02] transition-all duration-300"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                    borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                    color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                  }}
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C' }}>
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-sm" style={{ color: theme === 'dark' ? '#B8B8B8' : '#666' }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 focus:outline-none focus:scale-[1.02] transition-all duration-300"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
                    borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6',
                    color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-300"
                  style={{ color: theme === 'dark' ? '#B8B8B8' : '#666' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                backgroundColor: loading ? (theme === 'dark' ? '#3C3C3C' : '#E6E6E6') : '#2B2B2B',
                color: loading ? (theme === 'dark' ? '#B8B8B8' : '#999') : '#FFFFFF'
              }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <FaLock />
                  Giriş Yap
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t text-center"
            style={{ borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6' }}
          >
            <p className="text-sm" style={{ color: theme === 'dark' ? '#B8B8B8' : '#666' }}>
              Güvenli yönetim paneli • 256-bit SSL şifreleme
            </p>
          </motion.div>
        </div>

        {/* Background decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
          style={{ backgroundColor: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full"
          style={{ backgroundColor: theme === 'dark' ? '#FFFFFF' : '#2B2B2B' }}
        />
      </motion.div>
    </div>
  );
};

export default Login;
