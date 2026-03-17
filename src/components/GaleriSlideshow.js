'use client';
import { useState, useEffect } from 'react';

export default function GaleriSlideshow({ photos = [] }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || photos.length === 0) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPlay, photos.length, current]);

  if (photos.length === 0) return null;

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ height: '360px' }}>
      <img
        src={photos[current].url_foto}
        alt={photos[current].judul}
        className="w-full h-full object-cover transition-all duration-500"
        onError={e => { e.target.src = '/placeholder.jpg'; }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-4 py-3">
        <p className="text-white text-sm font-medium">{photos[current].judul}</p>
        {photos[current].kegiatan_judul && (
          <p className="text-white/70 text-xs mt-1">{photos[current].kegiatan_judul}</p>
        )}
      </div>
      <button onClick={() => setCurrent(c => (c - 1 + photos.length) % photos.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button onClick={() => setCurrent(c => (c + 1) % photos.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" /></svg>
      </button>
      <div className="absolute top-3 right-3 flex gap-1">
        {photos.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`} />
        ))}
      </div>
      <button onClick={() => setAutoPlay(a => !a)} className="absolute top-3 left-3 text-xs text-white bg-black/30 hover:bg-black/50 px-2 py-1 rounded-full transition">
        {autoPlay ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
