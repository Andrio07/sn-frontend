'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: '', email: '', password: '', konfirmasi: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.konfirmasi) {
      setError('Password dan konfirmasi password tidak sama');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/register', {
        nama: form.nama,
        email: form.email,
        password: form.password,
        role: 'anggota',
      });
      router.push('/login?registered=1');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#1D9E75] rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-medium text-gray-800">Scout Nusantara</span>
          </Link>
          <h1 className="text-2xl font-medium text-gray-800">Buat akun baru</h1>
          <p className="text-gray-500 text-sm mt-2">Bergabung bersama ribuan anggota pramuka Indonesia</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama lengkap</label>
              <input
                type="text"
                placeholder="Nama lengkap kamu"
                value={form.nama}
                onChange={e => setForm({ ...form, nama: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="email@contoh.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Minimal 8 karakter"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi password</label>
              <input
                type="password"
                placeholder="Ulangi password"
                value={form.konfirmasi}
                onChange={e => setForm({ ...form, konfirmasi: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-medium py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Daftar sekarang'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#1D9E75] font-medium hover:underline">Masuk di sini</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Scout Nusantara
        </p>
      </div>
    </div>
  );
}
