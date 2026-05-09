import { motion } from 'framer-motion'

function TarotCard({ card, index, isRevealed, onReveal, size = "normal", isDealing = false }) {
  const sizeClasses = {
    small: "w-20 h-32 md:w-24 md:h-40",
    normal: "w-28 h-44 md:w-36 md:h-56",
    large: "w-36 h-56 md:w-48 md:h-72"
  }

  const handleClick = () => {
    if (!isRevealed) {
      onReveal?.(index)
    }
  }

  return (
    <motion.div
      className="perspective-1000"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ 
        opacity: isDealing ? [0, 0, 1] : 1, 
        y: isDealing ? [40, -10, 0] : 0,
        scale: isDealing ? [0.9, 1.02, 1] : 1
      }}
      transition={{ 
        delay: isDealing ? index * 0.3 + 0.5 : index * 0.12, 
        duration: isDealing ? 1.2 : 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <motion.div
        className={`relative ${sizeClasses[size]} cursor-pointer group`}
        onClick={handleClick}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={!isRevealed ? { scale: 1.03, y: -4 } : {}}
      >
        {/* ===== CARD BACK — Clow Card Style ===== */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(160deg, #1a0a3e 0%, #0d0520 40%, #1a0a3e 100%)'
          }}
        >
          {/* Outer ornate border */}
          <div className="absolute inset-[6px] rounded-xl border border-cosmic-400/25" />
          <div className="absolute inset-[10px] rounded-lg border border-mystic-400/15" />
          
          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-cosmic-400/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-cosmic-400/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-cosmic-400/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-cosmic-400/40" />

          {/* Center mystical design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div 
                className="absolute inset-[-20px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)'
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Rotating star ring */}
              <motion.div
                className="relative w-16 h-16 md:w-20 md:h-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 80 80" className="w-full h-full opacity-30">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#a78bfa" strokeWidth="0.5" />
                  {/* Star points */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <line
                      key={i}
                      x1="40" y1="5"
                      x2="40" y2="12"
                      stroke="#fbbf24"
                      strokeWidth="0.5"
                      transform={`rotate(${angle} 40 40)`}
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Center seal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cosmic-400/30 flex items-center justify-center"
                     style={{
                       background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)'
                     }}>
                  <span className="text-cosmic-400/70 text-xl md:text-2xl" 
                        style={{ fontFamily: "'DM Serif Display', serif" }}>
                    ✦
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle shimmer overlay */}
          <div className="absolute inset-0 opacity-20"
               style={{
                 background: 'linear-gradient(105deg, transparent 40%, rgba(251,191,36,0.1) 45%, rgba(167,139,250,0.1) 50%, transparent 55%)',
                 backgroundSize: '200% 100%'
               }}
          />

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{
                 boxShadow: 'inset 0 0 30px rgba(139,92,246,0.2), inset 0 0 60px rgba(251,191,36,0.1)'
               }}
          />
        </div>

        {/* ===== CARD FRONT ===== */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(160deg, #1a0a3e 0%, #0d0520 100%)'
          }}
        >
          {/* Ornate front border */}
          <div className="absolute inset-[4px] rounded-xl border border-cosmic-400/20 pointer-events-none z-10" />
          <div className="absolute inset-[8px] rounded-lg border border-mystic-400/10 pointer-events-none z-10" />

          {/* Corner ornaments front */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cosmic-400/30 z-10" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cosmic-400/30 z-10" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cosmic-400/30 z-10" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cosmic-400/30 z-10" />

          {/* Mist-to-clear reveal effect */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            animate={isRevealed ? { 
              opacity: [1, 1, 0],
              backdropFilter: ['blur(20px)', 'blur(10px)', 'blur(0px)'],
            } : { opacity: 1, backdropFilter: 'blur(20px)' }}
            transition={{ 
              duration: 1.5, 
              delay: 0,
              ease: [0.23, 1, 0.32, 1],
              times: [0, 0.6, 1]
            }}
            style={{
              background: isRevealed 
                ? 'linear-gradient(180deg, rgba(139,92,246,0.3) 0%, rgba(251,191,36,0.1) 50%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(139,92,246,0.4) 0%, rgba(13,5,32,0.8) 100%)'
            }}
          />

          {/* Golden light sweep on reveal */}
          <motion.div
            className="absolute inset-0 z-15 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.3) 45%, rgba(251,191,36,0.1) 50%, transparent 65%)',
              backgroundSize: '200% 100%'
            }}
          />

          {/* Image */}
          <div className="relative w-full h-[68%] overflow-hidden">
            {/* Mist layer behind image */}
            <div className="absolute inset-0 bg-void/50" />
            
            <motion.img 
              src={card.image} 
              alt={card.name}
              className="w-full h-full object-cover relative z-[1]"
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none' }}
              initial={{ filter: 'blur(12px) brightness(0.6)', scale: 1.1 }}
              animate={isRevealed ? { 
                filter: ['blur(12px) brightness(0.6)', 'blur(6px) brightness(0.8)', 'blur(0px) brightness(1)'],
                scale: [1.1, 1.05, 1]
              } : { filter: 'blur(12px) brightness(0.6)', scale: 1.1 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 1] }}
            />
            
            {/* Fallback */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-mystic-900/90 to-void -z-10">
              <span className="text-cosmic-400 text-3xl mb-1" 
                    style={{ fontFamily: "'DM Serif Display', serif" }}>
                {typeof card.number === 'number' ? card.number : 
                 card.number === 'ace' ? 'A' : 
                 card.number === 'page' ? 'P' :
                 card.number === 'knight' ? 'N' :
                 card.number === 'queen' ? 'Q' :
                 card.number === 'king' ? 'K' : '?'}
              </span>
              <span className="text-white/25 text-[10px] uppercase tracking-[0.2em]">{card.suit?.[0] || 'Major'}</span>
            </div>

            {/* Reversed indicator */}
            {card.isReversed && (
              <motion.div 
                className="absolute top-2 right-2 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <div className="bg-mystic-500/20 backdrop-blur-sm border border-mystic-400/20 text-mystic-300 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Reversed
                </div>
              </motion.div>
            )}
          </div>

          {/* Card name area */}
          <div className="absolute bottom-0 left-0 right-0 p-3 z-10" 
               style={{ background: 'linear-gradient(to top, rgba(10,10,20,0.95) 0%, rgba(10,10,20,0.7) 60%, transparent 100%)' }}>
            <motion.h4 
              className={`text-center text-xs md:text-sm font-medium truncate
                         ${card.isReversed ? 'text-mystic-300' : 'text-cream'}`}
              style={{ fontFamily: "'DM Serif Display', serif" }}
              initial={{ opacity: 0, y: 5 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {card.name}
            </motion.h4>
            {/* Decorative line under name */}
            <motion.div 
              className="mx-auto mt-1.5 h-px w-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)' }}
              initial={{ scaleX: 0 }}
              animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TarotCard
