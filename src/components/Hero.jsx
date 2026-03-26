// Hero.jsx — Full-screen cinematic hero with parallax
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const parallaxRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate preload
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=85&auto=format';
    img.onload = () => setLoaded(true);

    const handleParallax = () => {
      if (parallaxRef.current) {
        const y = window.scrollY * 0.45;
        parallaxRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener('scroll', handleParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Image with Parallax */}
      <div
        ref={parallaxRef}
        style={{
          position: 'absolute', inset: '-10%',
          backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=85&auto=format')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'opacity 1.2s ease',
          opacity: loaded ? 1 : 0,
        }}
      />

      {/* Multi-layer gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,6,3,0.3) 0%, rgba(10,6,3,0.15) 40%, rgba(10,6,3,0.65) 100%)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,3,1,0.7) 100%)',
        zIndex: 1,
      }} />

      {/* Floating grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4, pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: 900, margin: '0 auto' }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: loaded ? 1 : 0, letterSpacing: loaded ? '0.35em' : '0.5em' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '10px', fontWeight: 300,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: 28,
          }}
        >
          Forest Hill, QLD · Premium Cafe Experience
        </motion.p>

        {/* Main Headline */}
        <div style={{ overflow: 'hidden', marginBottom: 12 }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: loaded ? 0 : '100%' }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(52px, 10vw, 120px)',
              fontWeight: 300, lineHeight: 0.9,
              color: '#f5ead8', letterSpacing: '-0.01em',
            }}
          >
            Welcome to
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 32 }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: loaded ? 0 : '100%' }}
            transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(52px, 10vw, 120px)',
              fontWeight: 300, lineHeight: 0.9,
              color: '#c9a96e', fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}
          >
            Caffe Sorella
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(14px, 2vw, 17px)', fontWeight: 300,
            color: 'rgba(232,213,183,0.7)', maxWidth: 480,
            margin: '0 auto 48px', lineHeight: 1.7, letterSpacing: '0.04em',
          }}
        >
          From artisan coffee and all-day brunch to house-made desserts, Caffe Sorella brings warm hospitality and premium flavor to every table.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo('#contact')}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              padding: '16px 40px',
              background: '#c9a96e', color: '#0f0a07',
              border: 'none', cursor: 'none',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
            onMouseEnter={e => { e.target.style.background = '#e8c988'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(201,169,110,0.3)'; }}
            onMouseLeave={e => { e.target.style.background = '#c9a96e'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
          >
            Book a Table
          </button>
          <button
            onClick={() => scrollTo('#menu')}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              padding: '16px 40px',
              background: 'transparent', color: '#e8d5b7',
              border: '1px solid rgba(232,213,183,0.3)', cursor: 'none',
              transition: 'all 0.35s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#c9a96e'; e.target.style.color = '#c9a96e'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(232,213,183,0.3)'; e.target.style.color = '#e8d5b7'; }}
          >
            Explore Menu
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}
      >
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(201,169,110,0.6)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, #c9a96e, transparent)' }}
        />
      </motion.div>
    </section>
  );
}
