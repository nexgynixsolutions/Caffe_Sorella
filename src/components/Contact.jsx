// Contact.jsx — Styled form with validation + map embed
import { useState } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const INPUT_STYLE = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(201,169,110,0.2)',
  padding: '14px 0',
  fontFamily: "'Jost', sans-serif",
  fontSize: '14px', fontWeight: 300,
  color: '#e8d5b7',
  letterSpacing: '0.04em',
  outline: 'none',
  transition: 'border-color 0.3s',
};

function FormField({ label, type = 'text', name, value, onChange, error, as }) {
  const [focused, setFocused] = useState(false);
  const Component = as || 'input';
  return (
    <div style={{ position: 'relative', marginBottom: 36 }}>
      <label style={{
        position: 'absolute', top: focused || value ? '-14px' : '14px',
        fontFamily: "'Jost', sans-serif",
        fontSize: focused || value ? '9px' : '13px',
        letterSpacing: focused || value ? '0.2em' : '0.04em',
        textTransform: focused || value ? 'uppercase' : 'none',
        color: focused ? '#c9a96e' : 'rgba(201,169,110,0.45)',
        transition: 'all 0.25s',
        pointerEvents: 'none',
      }}>
        {label}
      </label>
      <Component
        type={type} name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={as === 'textarea' ? 4 : undefined}
        style={{
          ...INPUT_STYLE,
          borderBottomColor: error ? '#c0604a' : focused ? '#c9a96e' : 'rgba(201,169,110,0.2)',
          resize: as === 'textarea' ? 'none' : undefined,
          cursor: 'none',
        }}
      />
      {error && (
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: '#c0604a', letterSpacing: '0.05em', position: 'absolute', bottom: -18, left: 0 }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [sectionRef, inView] = useScrollAnimation(0.1);
  const [form, setForm] = useState({ name: '', email: '', date: '', guests: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.date) e.date = 'Please select a date';
    if (!form.guests) e.guests = 'Number of guests required';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  return (
    <section id="contact" style={{ background: '#0c0804', padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)' }}>
      <div ref={sectionRef} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.35em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16 }}>
            Visit Caffe Sorella
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px,6vw,72px)', fontWeight: 300, color: '#f5ead8' }}>
            Book a Table
          </h2>
          <div style={{ width: 40, height: 1, background: '#c9a96e', margin: '24px auto 0' }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80,
          alignItems: 'start',
        }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '60px 0' }}
              >
                <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid #c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#f5ead8', marginBottom: 16 }}>
                  Reservation Received
                </h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', fontWeight: 400, color: 'rgba(232,213,183,0.72)', lineHeight: 1.7 }}>
                  We'll confirm your booking within 24 hours.<br />We look forward to welcoming you.
                </p>
              </motion.div>
            ) : (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <FormField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                  <FormField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
                  <FormField label="Preferred Date" type="date" name="date" value={form.date} onChange={handleChange} error={errors.date} />
                  <FormField label="Number of Guests" type="number" name="guests" value={form.guests} onChange={handleChange} error={errors.guests} />
                </div>
                <FormField label="Special Requests (optional)" name="message" value={form.message} onChange={handleChange} as="textarea" />

                <button
                  onClick={handleSubmit}
                  style={{
                    fontFamily: "'Jost', sans-serif", fontSize: '11px',
                    fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
                    padding: '16px 48px', background: '#c9a96e',
                    color: '#0f0a07', border: 'none', cursor: 'none',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    marginTop: 16,
                  }}
                  onMouseEnter={e => { e.target.style.background = '#e8c988'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(201,169,110,0.3)'; }}
                  onMouseLeave={e => { e.target.style.background = '#c9a96e'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
                >
                  Confirm Reservation
                </button>
              </div>
            )}
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Info blocks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', gap: 20, marginBottom: 32 }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#c9a96e', lineHeight: 1, marginTop: 2 }}>
                ◎
              </span>
              <div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)', marginBottom: 6 }}>
                  Address
                </div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(232,213,183,0.75)', lineHeight: 1.5 }}>
                  42 Victoria St, Forest Hill QLD 4342, Australia
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: 20, marginBottom: 32 }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#c9a96e', lineHeight: 1, marginTop: 2 }}>
                ◷
              </span>
              <div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)', marginBottom: 6 }}>
                  Hours
                </div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(232,213,183,0.75)', lineHeight: 1.5 }}>
                  Thursday - Wednesday: 7:00 AM - 3:00 PM
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: 20, marginBottom: 32 }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#c9a96e', lineHeight: 1, marginTop: 2 }}>
                ◻
              </span>
              <div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)', marginBottom: 6 }}>
                  Phone
                </div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(232,213,183,0.75)', lineHeight: 1.5 }}>
                  +61 7 5465 4106
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', gap: 20, marginBottom: 32 }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#c9a96e', lineHeight: 1, marginTop: 2 }}>
                ◇
              </span>
              <div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.5)', marginBottom: 6 }}>
                  Facebook
                </div>
                <a
                  href="https://m.facebook.com/caffesorella/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(232,213,183,0.85)', lineHeight: 1.5, textDecoration: 'none' }}
                >
                  m.facebook.com/caffesorella
                </a>
              </div>
            </motion.div>

            {/* Map */}
            <div style={{ marginTop: 16, border: '1px solid rgba(201,169,110,0.15)', overflow: 'hidden', filter: 'grayscale(0.7) brightness(0.7) sepia(0.3)', maxWidth: '100%' }}>
              <iframe
                title="Caffe Sorella Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d354959.25235988176!2d151.79957870900802!3d-27.545029977432584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b96ecaa27180869%3A0xdc899abb24bbd198!2sCaffe%20Sorella!5e1!3m2!1sen!2slk!4v1774502149894!5m2!1sen!2slk"
                width="600"
                height="450"
                style={{ border: 0, display: 'block', width: '100%', height: '320px' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) saturate(2) hue-rotate(5deg); cursor: none; }
        @media (max-width: 640px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
