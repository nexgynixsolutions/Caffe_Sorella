// Testimonials.jsx — Animated drag-to-scroll testimonial carousel
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Alyssa M.',
    role: 'Google Review',
    quote: 'Beautiful cafe atmosphere, friendly service, and excellent coffee. We loved the warm hospitality and the food was fantastic.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3bc?w=120&q=80&auto=format',
    stars: 5,
  },
  {
    id: 2,
    name: 'Daniel R.',
    role: 'Google Review',
    quote: 'Great local spot with consistently good meals and coffee. Staff are welcoming and the service is always attentive.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format',
    stars: 5,
  },
  {
    id: 3,
    name: 'Priya K.',
    role: 'Google Review',
    quote: 'The breakfast menu is delicious and portions are generous. A perfect place to relax and enjoy a quality brunch.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format',
    stars: 5,
  },
  {
    id: 4,
    name: 'Liam T.',
    role: 'Google Review',
    quote: 'Excellent coffee, friendly team, and a great family-friendly vibe. Definitely one of our favorite cafes in the area.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&auto=format',
    stars: 5,
  },
  {
    id: 5,
    name: 'Emma J.',
    role: 'Google Review',
    quote: 'Fresh food, fantastic sweets, and wonderful customer service. We always leave happy after visiting Caffe Sorella.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format',
    stars: 5,
  },
];

const MAX_REVIEWS = 6;

function StarRating({ count }) {
  const safeCount = Math.max(1, Math.min(5, Number(count) || 0));

  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
      {Array.from({ length: safeCount }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#c9a96e">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [avatarLoadFailed, setAvatarLoadFailed] = useState({});
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sectionRef, inView] = useScrollAnimation(0.1);
  const autoRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchGoogleReviews = async () => {
      try {
        const endpoint = '/api/google-reviews';
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Backend reviews request failed: ${response.status}`);
        }

        const reviews = await response.json();
        console.log('[Testimonials] Reviews from backend:', reviews);

        if (!Array.isArray(reviews) || reviews.length === 0) {
          if (mounted) {
            setTestimonials([]);
            setCurrent(0);
            setErrorMessage('No Google reviews are available right now.');
          }
          return;
        }

        const mapped = reviews.slice(0, MAX_REVIEWS).map((review, index) => {
          const fallbackAvatar = FALLBACK_TESTIMONIALS[index % FALLBACK_TESTIMONIALS.length].avatar;
          const rawAvatar = review?.profile_photo_url || '';
          const proxiedAvatar = rawAvatar
            ? `/api/google-avatar?url=${encodeURIComponent(rawAvatar)}`
            : fallbackAvatar;

          return {
            id: index + 1,
            name: review?.name || 'Guest',
            rating: Number(review?.rating) || 5,
            comment: review?.text || 'Great experience at Caffe Sorella.',
            image: proxiedAvatar,
            fallbackAvatar,
          };
        });

        const normalized = mapped.map((item) => ({
          id: item.id,
          name: item.name,
          role: 'Google Review',
          quote: item.comment,
          avatar: item.image,
          fallbackAvatar: item.fallbackAvatar,
          stars: Math.max(1, Math.min(5, item.rating)),
        }));

        if (mounted && normalized.length > 0) {
          setTestimonials(normalized);
          setAvatarLoadFailed({});
          setCurrent(0);
          setErrorMessage('');
        }
      } catch (error) {
        console.error('[Testimonials] Failed to fetch backend reviews:', error);
        if (mounted) {
          setTestimonials(FALLBACK_TESTIMONIALS);
          setAvatarLoadFailed({});
          setCurrent(0);
          setErrorMessage('Unable to load live Google reviews. Showing fallback reviews.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchGoogleReviews();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (testimonials.length < 2) return;

    autoRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current);
      }
    };
  }, [testimonials.length]);

  const goTo = (index, dir) => {
    if (testimonials.length === 0) return;
    if (autoRef.current) {
      clearInterval(autoRef.current);
    }
    setDirection(dir);
    setCurrent(index);
  };

  const prev = () => {
    if (testimonials.length < 2) return;
    goTo((current - 1 + testimonials.length) % testimonials.length, -1);
  };

  const next = () => {
    if (testimonials.length < 2) return;
    goTo((current + 1) % testimonials.length, 1);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section id="testimonials" style={{ background: '#0f0a07', padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>
      {/* Large decorative quote mark */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(120px,20vw,280px)', fontWeight: 300,
        color: 'rgba(201,169,110,0.04)', lineHeight: 1, userSelect: 'none',
        pointerEvents: 'none',
      }}>
        "
      </div>

      <div ref={sectionRef} style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.35em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16 }}>
            What Guests Say
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px,6vw,72px)', fontWeight: 300, color: '#f5ead8' }}>
            Voices
          </h2>
          <div style={{ width: 40, height: 1, background: '#c9a96e', margin: '24px auto 0' }} />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{ position: 'relative', minHeight: 320 }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(201,169,110,0.2)', borderTopColor: '#c9a96e', margin: '0 auto 24px' }}
              />
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.9)' }}>
                Loading Google Reviews
              </p>
            </div>
          ) : testimonials.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(232,213,183,0.8)' }}>
                {errorMessage || 'No testimonials available.'}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: 'center' }}
              >
                <StarRating count={testimonials?.[current]?.stars} />

                <blockquote style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 300,
                  fontStyle: 'italic', color: '#e8d5b7', lineHeight: 1.7,
                  marginBottom: 48, letterSpacing: '0.01em',
                }}>
                  "{testimonials?.[current]?.quote}"
                </blockquote>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <img
                    src={avatarLoadFailed[testimonials?.[current]?.id] ? testimonials?.[current]?.fallbackAvatar : testimonials?.[current]?.avatar}
                    alt={testimonials?.[current]?.name}
                    onError={() => {
                      const currentId = testimonials?.[current]?.id;
                      if (!currentId) return;
                      setAvatarLoadFailed((prev) => (prev[currentId] ? prev : { ...prev, [currentId]: true }));
                    }}
                    style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(201,169,110,0.3)' }}
                  />
                  <div>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', fontWeight: 400, color: '#f5ead8', letterSpacing: '0.08em' }}>
                      {testimonials?.[current]?.name}
                    </div>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: 'rgba(201,169,110,0.85)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>
                      {testimonials?.[current]?.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        {/* Navigation */}
        {!loading && errorMessage && (
          <p style={{ textAlign: 'center', marginTop: 20, fontFamily: "'Jost', sans-serif", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(201,169,110,0.8)' }}>
            {errorMessage}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginTop: 56 }}>
          <button
            onClick={prev}
            disabled={loading || testimonials.length < 2}
            style={{ background: 'none', border: '1px solid rgba(201,169,110,0.3)', padding: '12px 16px', cursor: 'none', color: '#c9a96e', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'}
            aria-label="Previous"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 1L1 6M1 6L6 11M1 6H15" />
            </svg>
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                disabled={loading}
                style={{
                  width: i === current ? 28 : 8, height: 2,
                  background: i === current ? '#c9a96e' : 'rgba(201,169,110,0.25)',
                  border: 'none', padding: 0, cursor: 'none',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={loading || testimonials.length < 2}
            style={{ background: 'none', border: '1px solid rgba(201,169,110,0.3)', padding: '12px 16px', cursor: 'none', color: '#c9a96e', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'}
            aria-label="Next"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 1L15 6M15 6L10 11M15 6H1" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
