// About.jsx — Split layout, scroll-triggered, image + text
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const STATS = [
  { value: '12+', label: 'Origins Sourced' },
  { value: '6', label: 'Years Roasting' },
  { value: '40K+', label: 'Cups Served' },
  { value: '98%', label: 'Guest Satisfaction' },
];

export default function About() {
  const [leftRef, leftIn] = useScrollAnimation(0.2);
  const [rightRef, rightIn] = useScrollAnimation(0.2);
  const [statsRef, statsIn] = useScrollAnimation(0.2);

  return (
    <section id="about" style={{ background: '#0c0804', overflow: 'hidden' }}>
      {/* Split hero */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        minHeight: '90vh',
      }}>
        {/* Left: Image */}
        <div ref={leftRef} style={{ position: 'relative', overflow: 'hidden', minHeight: 500 }}>
          <motion.div
            initial={{ scale: 1.15 }}
            animate={leftIn ? { scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&auto=format"
              alt="Barista crafting coffee"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, transparent 60%, #0c0804 100%)',
            }} />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={leftIn ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              position: 'absolute', bottom: 48, left: 40,
              width: 110, height: 110, borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.5)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(10,6,3,0.85)', backdropFilter: 'blur(12px)',
            }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: '#c9a96e' }}>19</span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '8px', letterSpacing: '0.2em', color: '#a08060', textTransform: 'uppercase' }}>Est. 20</span>
          </motion.div>
        </div>

        {/* Right: Text */}
        <div
          ref={rightRef}
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(48px,6vw,100px) clamp(32px,5vw,80px)',
            background: '#0c0804',
          }}
        >
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={rightIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.35em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 20 }}
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            animate={rightIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4.5vw,60px)', fontWeight: 300, color: '#f5ead8', lineHeight: 1.1, marginBottom: 32 }}
          >
            A Cup Rooted<br />in <span style={{ fontStyle: 'italic', color: '#c9a96e' }}>Ritual</span>
          </motion.h2>

          {[
            "We started Lumière in a small Montmartre atelier with a single conviction: that great coffee is not merely consumed — it is experienced. Every bean we source is a relationship, every roast a conversation.",
            "From the volcanic soils of Ethiopia to the misty highlands of Colombia, we trace our beans to their origin. Our small-batch roasting preserves the unique terroir that industrial roasters routinely erase.",
            "We invite you to slow down. To feel the warmth of the cup, to catch the bloom of the pour, to be present in a world that rarely asks you to be.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={rightIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
              style={{
                fontFamily: "'Jost', sans-serif", fontSize: '15px', fontWeight: 400,
                color: 'rgba(232,213,183,0.72)', lineHeight: 1.85, letterSpacing: '0.02em',
                marginBottom: i < 2 ? 20 : 40,
              }}
            >
              {text}
            </motion.p>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            animate={rightIn ? { opacity: 1 } : {}}
            transition={{ delay: 0.65 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: "'Jost', sans-serif", fontSize: '10px',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              padding: '14px 36px', width: 'fit-content',
              background: 'transparent', border: '1px solid rgba(201,169,110,0.4)',
              color: '#c9a96e', cursor: 'none', transition: 'all 0.35s',
            }}
            onMouseEnter={e => { e.target.style.background = '#c9a96e'; e.target.style.color = '#0f0a07'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c9a96e'; }}
          >
            Reserve Your Seat
          </motion.button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        style={{
          padding: 'clamp(48px,6vw,80px) clamp(24px,6vw,80px)',
          borderTop: '1px solid rgba(201,169,110,0.1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 40, textAlign: 'center',
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={statsIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px,4vw,56px)', fontWeight: 300, color: '#c9a96e', lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,213,183,0.4)', marginTop: 10 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
