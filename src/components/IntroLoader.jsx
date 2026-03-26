// IntroLoader.jsx — Cinematic loading screen that fades away
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: showing, 1: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 0 && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0f0a07',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Logo reveal */}
          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 600, color: '#c9a96e', letterSpacing: '0.15em' }}
            >
              Caffe Sorella
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 300, color: '#6b4f35', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Forest Hill
          </motion.div>

          {/* Progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 2, background: 'linear-gradient(to right, transparent, #c9a96e, transparent)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
