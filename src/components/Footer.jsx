// Footer.jsx — Minimal, elegant footer with social links
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://m.facebook.com/caffesorella/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13.5 9H15V6h-1.5c-2.07 0-3.5 1.43-3.5 3.5V11H8v3h2v4h3v-4h2.25l.75-3H13v-1.5c0-.32.18-.5.5-.5z" />
      </svg>
    ),
  },
];

const NAV_FOOTER = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#about' },
  { label: 'Voices', href: '#testimonials' },
  { label: 'Book a Table', href: '#contact' },
];

export default function Footer() {
  const [ref, inView] = useScrollAnimation(0.1);
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#080503', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px) clamp(32px,4vw,48px)' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 60, marginBottom: 72,
        }}>
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: '#c9a96e', letterSpacing: '0.08em' }}>CAFFE SORELLA</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', fontWeight: 300, color: '#a08060', letterSpacing: '0.3em', marginTop: 2 }}>FOREST HILL, QLD</div>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(232,213,183,0.92)', lineHeight: 1.8, maxWidth: 240 }}>
              42 Victoria St, Forest Hill QLD 4342, Australia<br />
              +61 7 5465 4106
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.8)', marginBottom: 24 }}>
              Navigate
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {NAV_FOOTER.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  style={{
                    fontFamily: "'Jost', sans-serif", fontSize: '13px', fontWeight: 400,
                    color: 'rgba(232,213,183,0.92)', textDecoration: 'none',
                    letterSpacing: '0.04em', transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = 'rgba(232,213,183,0.92)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.8)', marginBottom: 24 }}>
              Hours
            </div>
            {[['Thursday - Wednesday', '7:00 AM - 3:00 PM']].map(([day, time]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 14 }}>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(232,213,183,0.92)' }}>{day}</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(201,169,110,0.8)', whiteSpace: 'nowrap' }}>{time}</span>
              </div>
            ))}
          </motion.div>

          {/* Social + Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.8)', marginBottom: 24 }}>
              Facebook
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 36 }}>
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{ color: 'rgba(201,169,110,0.7)', transition: 'color 0.3s', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,169,110,0.4)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            {/* <a
              href="https://m.facebook.com/caffesorella/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '13px',
                color: 'rgba(232,213,183,0.9)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              m.facebook.com/caffesorella
            </a> */}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(201,169,110,0.08)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', fontWeight: 400, color: 'rgba(232,213,183,0.55)', letterSpacing: '0.06em' }}>
            © 2026 Caffe Sorella. All rights reserved.
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontStyle: 'italic', color: 'rgba(201,169,110,0.6)' }}>
            Premium Coffee Experience
          </span>
        </div>
      </div>
    </footer>
  );
}
