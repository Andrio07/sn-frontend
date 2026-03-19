'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ anggota: 0, kegiatan: 0, berita: 0, download: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [anggota, kegiatan, berita, download] = await Promise.all([
          api.get('/anggota', { headers }).then(r => r.data.data.length),
          api.get('/kegiatan').then(r => r.data.data.length),
          api.get('/berita').then(r => r.data.data.length),
          api.get('/download').then(r => r.data.data.length),
        ]);
        setStats({ anggota, kegiatan, berita, download });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total anggota', nilai: stats.anggota, warna: '#1D9E75', bg: '#E1F5EE', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Total kegiatan', nilai: stats.kegiatan, warna: '#D85A30', bg: '#FAECE7', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Total berita', nilai: stats.berita, warna: '#534AB7', bg: '#EEEDFE', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { label: 'Total download', nilai: stats.download, warna: '#BA7517', bg: '#FAEEDA', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  ];

  return (
    <div>
      <h1 className="text-xl font-medium text-gray-800 mb-6">Beranda</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{c.label}</span>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: c.bg }}>
                <svg className="w-5 h-5" fill="none" stroke={c.warna} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={c.icon} />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-medium" style={{ color: c.warna }}>
              {loading ? '...' : c.nilai}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-base font-medium text-gray-800 mb-4">Menu cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Tambah anggota', href: '/dashboard/anggota', warna: '#1D9E75', bg: '#E1F5EE' },
            { label: 'Tambah kegiatan', href: '/dashboard/kegiatan', warna: '#D85A30', bg: '#FAECE7' },
            { label: 'Tambah berita', href: '/dashboard/berita', warna: '#534AB7', bg: '#EEEDFE' },
            { label: 'Tambah download', href: '/dashboard/download', warna: '#BA7517', bg: '#FAEEDA' },
          ].map((m, i) => (
            <a key={i} href={m.href}
              className="flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition hover:opacity-80"
              style={{ background: m.bg, color: m.warna }}>
              {m.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
