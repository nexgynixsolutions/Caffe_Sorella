// App.js — Main application shell
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import IntroLoader from './components/IntroLoader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import { CTABanner, WhatsAppButton } from './components/FloatingCTA';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Cinematic intro loader */}
      <IntroLoader onComplete={() => setLoaded(true)} />

      {/* Main site — fades in after loader */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <main>
              <Hero />
              <Menu />
              <About />
              <CTABanner />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent floating WhatsApp */}
      {loaded && <WhatsAppButton />}
    </>
  );
}
