// Menu.jsx — Interactive menu cards with hover tilt + stagger
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CATEGORIES = ['All', 'Coffee', 'Breakfast', 'Mains', 'Desserts'];

const MENU_ITEMS = [
  { id: 1, category: 'Coffee', name: 'Hot Chocolate', price: 'Popular', desc: 'Rich, velvety hot chocolate made to order.', image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=600&q=80&auto=format', tag: 'Popular' },
  { id: 2, category: 'Desserts', name: 'Turkish Delight Cheesecake', price: 'House Made', desc: 'Creamy cheesecake with fragrant Turkish delight notes.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format', tag: 'House Made' },
  { id: 3, category: 'Desserts', name: 'Pina Colada Cheesecake', price: 'House Made', desc: 'Tropical cheesecake inspired by pineapple and coconut.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80&auto=format', tag: 'House Made' },
  { id: 4, category: 'Mains', name: 'Seafood Platter', price: 'Chef Pick', desc: 'A generous platter of fresh seafood favorites.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80&auto=format', tag: 'Chef Pick' },
  { id: 5, category: 'Mains', name: 'Chicken N Avo Toastie', price: 'Favorite', desc: 'Toasted sandwich with chicken, avocado, and melty comfort.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&auto=format', tag: 'Favorite' },
  { id: 6, category: 'Mains', name: 'Sweet Potato Fries', price: 'Side', desc: 'Crispy sweet potato fries served hot and golden.', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&q=80&auto=format', tag: 'Side' },
  { id: 7, category: 'Desserts', name: 'Lemon Meringue Pie', price: 'Classic', desc: 'Zesty lemon filling topped with soft meringue.', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&q=80&auto=format', tag: 'Classic' },
  { id: 8, category: 'Breakfast', name: 'Hash Brown Halloumi Stack', price: 'Brunch', desc: 'A hearty stack with crisp hash browns and halloumi.', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80&auto=format', tag: 'Brunch' },
  { id: 9, category: 'Mains', name: 'Ham and Cheese Toastie', price: 'Classic', desc: 'Golden toasted ham and cheese crowd-pleaser.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&auto=format', tag: 'Classic' },
  { id: 10, category: 'Mains', name: 'Spaghetti Bolognese', price: 'All Day', desc: 'Comforting spaghetti in rich bolognese sauce.', image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=600&q=80&auto=format', tag: 'All Day' },
  { id: 11, category: 'Mains', name: 'Vego Burger', price: 'Popular', desc: 'Flavor-packed vegetarian burger served fresh.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80&auto=format', tag: 'Popular' },
  { id: 12, category: 'Mains', name: 'Rustic Roll', price: 'Fresh', desc: 'A satisfying rustic roll for a quick savory bite.', image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=600&q=80&auto=format', tag: 'Fresh' },
  { id: 13, category: 'Breakfast', name: 'Scrambled Eggs with Hash Brown', price: 'Breakfast', desc: 'Fluffy scrambled eggs paired with crispy hash brown.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80&auto=format', tag: 'Breakfast' },
  { id: 14, category: 'Breakfast', name: 'Smashed Avo with Poached Eggs', price: 'Bestseller', desc: 'Smashed avocado topped with perfectly poached eggs.', image: 'https://images.unsplash.com/photo-1603046891744-76e6481f6f80?w=600&q=80&auto=format', tag: 'Bestseller' },
  { id: 15, category: 'Desserts', name: 'Homemade Monte Carlo & Jam Drops', price: 'House Made', desc: 'Traditional homemade biscuits baked with care.', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format', tag: 'House Made' },
  { id: 16, category: 'Breakfast', name: 'Canadian Breakfast', price: 'Hearty', desc: 'A full breakfast plate made for big appetites.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80&auto=format', tag: 'Hearty' },
  { id: 17, category: 'Mains', name: 'Fish Burger', price: 'Popular', desc: 'Crispy fish burger layered with fresh toppings.', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80&auto=format', tag: 'Popular' },
  { id: 18, category: 'Desserts', name: 'Waffles with Gelato', price: 'Sweet', desc: 'Warm waffles served with creamy gelato.', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80&auto=format', tag: 'Sweet' },
  { id: 19, category: 'Desserts', name: 'Pancakes with Banana', price: 'Brunch', desc: 'Soft pancakes topped with banana and sweetness.', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&q=80&auto=format', tag: 'Brunch' },
];

// Tilt on hover
function TiltCard({ children, style }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const cardRef = useRef(null);

  const handleMove = (e) => {
    if (isMobile) return; // Disable tilt on mobile
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        ...style,
        transform: !isMobile && (tilt.x !== 0 || tilt.y !== 0) 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'none',
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease' : 'transform 0.1s linear',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sectionRef, inView] = useScrollAnimation(0.1);

  const filtered = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(i => i.category === activeCategory);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="menu" style={{ background: '#0f0a07', padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)' }}>
      <div ref={sectionRef} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.35em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 16 }}>
            Crafted with Intention
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, color: '#f5ead8', lineHeight: 1 }}>
            Our Menu
          </h2>
          <div style={{ width: 40, height: 1, background: '#c9a96e', margin: '24px auto 0' }} />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '8px 20px', border: 'none', cursor: 'none',
                background: activeCategory === cat ? '#c9a96e' : 'transparent',
                color: activeCategory === cat ? '#0f0a07' : 'rgba(201,169,110,0.6)',
                borderBottom: activeCategory !== cat ? '1px solid rgba(201,169,110,0.2)' : 'none',
                transition: 'all 0.3s',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(12px, 3vw, 24px)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {filtered.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <TiltCard style={{ height: '100%' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(201,169,110,0.1)',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.3s, box-shadow 0.4s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'; e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1 / 0.8', flex: '0 0 auto' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(10,6,3,0.7) 100%)',
                    }} />
                    {/* Tag */}
                    <span style={{
                      position: 'absolute', top: 16, right: 16,
                      fontFamily: "'Jost', sans-serif", fontSize: '8px',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      padding: '5px 10px', background: 'rgba(201,169,110,0.9)',
                      color: '#0f0a07',
                    }}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: 'clamp(16px, 4vw, 32px) clamp(16px, 4vw, 28px)', flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 500, color: '#f5ead8', lineHeight: 1.2 }}>
                        {item.name}
                      </h3>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px, 4vw, 20px)', color: '#c9a96e', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                        {item.price}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 'clamp(12px, 3vw, 13px)', fontWeight: 300, color: 'rgba(232,213,183,0.55)', lineHeight: 1.7, letterSpacing: '0.02em' }}>
                      {item.desc}
                    </p>
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 20, height: 1, background: '#c9a96e' }} />
                      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase' }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
