import Navbar from '@/components/Navbar';
import GaleriSlideshow from '@/components/GaleriSlideshow';
import api from '@/lib/api';
import Link from 'next/link';

async function getData() {
  try {
    const [kegiatan, berita, galeri] = await Promise.all([
      api.get('/kegiatan').then(r => r.data.data.slice(0, 3)),
      api.get('/berita?published=true').then(r => r.data.data.slice(0, 3)),
      api.get('/galeri').then(r => r.data.data.slice(0, 8)),
    ]);
    return { kegiatan, berita, galeri };
  } catch {
    return { kegiatan: [], berita: [], galeri: [] };
  }
}

export default async function Home() {
  const { kegiatan, berita, galeri } = await getData();
  return (
    <main>
      <Navbar />
      <section className="bg-[#1D9E75] py-20 px-4 text-center">
        <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-4">Gerakan Pramuka Indonesia</span>
        <h1 className="text-white text-4xl font-medium leading-tight mb-4">Bersatu, Bergerak,<br />Membangun Nusantara</h1>
        <p className="text-white/80 text-base max-w-md mx-auto mb-8">Platform digital resmi Scout Nusantara untuk mengelola kegiatan, anggota, dan informasi kepramukaan Indonesia.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/register" className="bg-white text-[#0F6E56] font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition">Bergabung sekarang</Link>
          <Link href="#kegiatan" className="border border-white/50 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition">Lihat kegiatan</Link>
        </div>
      </section>
      <section className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { nilai: '1.200+', label: 'Anggota aktif', warna: '#1D9E75' },
            { nilai: '85+', label: 'Kegiatan per tahun', warna: '#D85A30' },
            { nilai: '34', label: 'Provinsi terjangkau', warna: '#534AB7' },
            { nilai: '500+', label: 'Sertifikat diterbitkan', warna: '#BA7517' },
          ].map((s, i) => (
            <div key={i} className="py-4">
              <div className="text-2xl font-medium" style={{ color: s.warna }}>{s.nilai}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section id="tentang" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Tentang kami</p>
            <h2 className="text-2xl font-medium mb-4">Membangun karakter generasi penerus bangsa</h2>
            <p className="text-gray-500 leading-relaxed mb-6">Scout Nusantara hadir sebagai platform digital yang menghubungkan seluruh anggota pramuka di Indonesia.</p>
            <ul className="flex flex-col gap-3">
              {['Manajemen anggota terpusat', 'Sertifikat digital terverifikasi', 'Informasi kegiatan real-time'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#1D9E75]"></div>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#E1F5EE] rounded-xl h-64 flex items-center justify-center text-gray-400 text-sm">Foto kegiatan</div>
        </div>
      </section>
      <section id="kegiatan" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Kegiatan terbaru</p>
              <h2 className="text-xl font-medium">Jadwal kegiatan</h2>
            </div>
            <Link href="/kegiatan" className="text-sm text-[#1D9E75] hover:underline">Lihat semua</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {kegiatan.length > 0 ? kegiatan.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition">
                <div className="bg-[#E1F5EE] h-40 flex items-center justify-center text-gray-400 text-sm">
                  {k.foto_cover ? <img src={k.foto_cover} alt={k.judul} className="w-full h-full object-cover" /> : 'Foto kegiatan'}
                </div>
                <div className="p-4">
                  <span className="text-xs bg-[#E1F5EE] text-[#0F6E56] px-2 py-1 rounded-full">Kegiatan</span>
                  <h3 className="font-medium text-sm mt-2 mb-1">{k.judul}</h3>
                  <p className="text-xs text-gray-400">{new Date(k.tanggal_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} · {k.lokasi}</p>
                </div>
              </div>
            )) : <p className="text-sm text-gray-400 col-span-3">Belum ada kegiatan.</p>}
          </div>
        </div>
      </section>
      <section id="berita" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Berita terbaru</p>
            <h2 className="text-xl font-medium">Informasi terkini</h2>
          </div>
          <Link href="/berita" className="text-sm text-[#1D9E75] hover:underline">Lihat semua</Link>
        </div>
        <div className="flex flex-col gap-4">
          {berita.length > 0 ? berita.map((b, i) => (
            <div key={i} className="flex gap-4 items-center bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
              <div className="w-16 h-16 min-w-16 bg-[#E1F5EE] rounded-lg flex items-center justify-center text-gray-400 text-xs overflow-hidden">
                {b.foto_cover ? <img src={b.foto_cover} alt={b.judul} className="w-full h-full object-cover" /> : 'Foto'}
              </div>
              <div>
                <h3 className="font-medium text-sm">{b.judul}</h3>
                <p className="text-xs text-gray-400 mt-1">{b.author_nama} · {new Date(b.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          )) : <p className="text-sm text-gray-400">Belum ada berita.</p>}
        </div>
      </section>
      <section id="galeri" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Galeri foto</p>
              <h2 className="text-xl font-medium">Dokumentasi kegiatan</h2>
            </div>
            <Link href="/galeri" className="text-sm text-[#1D9E75] hover:underline">Lihat semua</Link>
          </div>
          {galeri.length > 0
            ? <GaleriSlideshow photos={galeri} />
            : <div className="bg-[#E1F5EE] rounded-xl h-64 flex items-center justify-center text-gray-400 text-sm">Belum ada foto</div>
          }
        </div>
      </section>
      <section className="bg-[#1D9E75] py-20 px-4 text-center">
        <h2 className="text-white text-2xl font-medium mb-3">Siap bergabung bersama kami?</h2>
        <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">Daftarkan diri dan jadilah bagian dari gerakan pramuka digital Indonesia.</p>
        <Link href="/register" className="bg-white text-[#0F6E56] font-medium px-8 py-3 rounded-lg hover:bg-white/90 transition">Daftar sekarang</Link>
      </section>
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Scout Nusantara. All rights reserved.</p>
      </footer>
    </main>
  );
}
