// CustomCursor.jsx — Luxury magnetic cursor
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const handleEnter = () => {
      dotRef.current?.classList.add('cursor-hover');
      ringRef.current?.classList.add('cursor-hover');
    };
    const handleLeave = () => {
      dotRef.current?.classList.remove('cursor-hover');
      ringRef.current?.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    rafRef.current = requestAnimationFrame(animateRing);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed; top: -6px; left: -6px;
          width: 12px; height: 12px;
          background: #c9a96e;
          border-radius: 50%;
          pointer-events: none; z-index: 99999;
          transition: width 0.2s, height 0.2s, background 0.2s;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: -20px; left: -20px;
          width: 40px; height: 40px;
          border: 1px solid rgba(201,169,110,0.5);
          border-radius: 50%;
          pointer-events: none; z-index: 99998;
          will-change: transform;
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .cursor-dot.cursor-hover { width: 8px; height: 8px; background: #f5ead8; }
        .cursor-ring.cursor-hover { width: 56px; height: 56px; border-color: rgba(201,169,110,0.8); }
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none; } }
      `}</style>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
