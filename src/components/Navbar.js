'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-[#1D9E75] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-[#1D9E75] rounded-sm"></div>
          </div>
          <span className="text-white font-medium text-base">Scout Nusantara</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#tentang" className="text-white/80 hover:text-white text-sm transition">Tentang</Link>
          <Link href="#kegiatan" className="text-white/80 hover:text-white text-sm transition">Kegiatan</Link>
          <Link href="#berita" className="text-white/80 hover:text-white text-sm transition">Berita</Link>
          <Link href="#galeri" className="text-white/80 hover:text-white text-sm transition">Galeri</Link>
          <Link href="#download" className="text-white/80 hover:text-white text-sm transition">Download</Link>
          <Link href="/login" className="bg-white text-[#0F6E56] text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/90 transition">Masuk</Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href="#tentang" className="text-white/80 text-sm">Tentang</Link>
          <Link href="#kegiatan" className="text-white/80 text-sm">Kegiatan</Link>
          <Link href="#berita" className="text-white/80 text-sm">Berita</Link>
          <Link href="#galeri" className="text-white/80 text-sm">Galeri</Link>
          <Link href="/login" className="text-white/80 text-sm">Masuk</Link>
        </div>
      )}
    </nav>
  );
}
