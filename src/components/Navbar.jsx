// Navbar.jsx — Sticky, transparent-to-solid premium navbar
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#about' },
  { label: 'Voices', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active link detection via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(`#${e.target.id}`)),
      { threshold: 0.4 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000, padding: scrolled ? '14px 40px' : '24px 40px',
          background: scrolled ? 'rgba(15,10,7,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: '#c9a96e', letterSpacing: '0.08em' }}>CAFFE SORELLA</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', fontWeight: 300, color: '#a08060', letterSpacing: '0.3em', marginTop: 2 }}>FOREST HILL, QLD</span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); scrollTo(link.href); }}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px', fontWeight: 400,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: active === link.href ? '#c9a96e' : 'rgba(232,213,183,0.65)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                position: 'relative',
              }}
              className="nav-link"
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 1, background: '#c9a96e' }}
                />
              )}
            </a>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '10px', fontWeight: 400, letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '10px 24px',
              background: 'transparent',
              border: '1px solid rgba(201,169,110,0.6)',
              color: '#c9a96e', cursor: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = '#c9a96e'; e.target.style.color = '#0f0a07'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c9a96e'; }}
          >
            Book a Table
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'none', padding: 8 }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: menuOpen ? 0 : 5 }}>
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: 'block', height: 1, background: '#c9a96e', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', height: 1, background: '#c9a96e' }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: 'block', height: 1, background: '#c9a96e', transformOrigin: 'center' }} />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(10,6,3,0.97)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 40,
            }}
            className="mobile-overlay"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '36px', fontWeight: 400, fontStyle: 'italic',
                  color: '#e8d5b7', textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo('#contact')}
              style={{
                marginTop: 16, fontFamily: "'Jost', sans-serif",
                fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
                padding: '14px 40px', border: '1px solid #c9a96e',
                background: 'transparent', color: '#c9a96e', cursor: 'none',
              }}
            >
              Book a Table
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-overlay { display: flex !important; }
          nav { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
