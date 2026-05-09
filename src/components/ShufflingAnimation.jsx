import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ShufflingAnimation({ cardCount, onComplete }) {
  const [shufflePhase, setShufflePhase] = useState('gather') // gather | fan | shuffle | settle | done
  const [particles, setParticles] = useState([])
  const [cardPositions] = useState(() => {
    // Pre-compute random positions for stability across re-renders
    return Array.from({ length: Math.max(cardCount, 5) }, (_, i) => ({
      gatherScatter: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 300,
        rotate: (Math.random() - 0.5) * 90,
      },
      shuffle: {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 150,
        rotate: (Math.random() - 0.5) * 60,
      },
    }))
  })

  // Phase timing
  useEffect(() => {
    // gather: cards come together from scattered positions (1s)
    const t1 = setTimeout(() => setShufflePhase('fan'), 1000)
    // fan: cards spread in a fan arc (1.2s)
    const t2 = setTimeout(() => setShufflePhase('shuffle'), 2200)
    // shuffle: cards interleave and mix (2s)
    const t3 = setTimeout(() => setShufflePhase('settle'), 4200)
    // settle: cards stack neatly, then fade (1s)
    const t4 = setTimeout(() => {
      setShufflePhase('done')
      onComplete?.()
    }, 5400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      size: 2 + Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  // Create card elements for the shuffle animation
  const cardElements = Array.from({ length: Math.max(cardCount, 5) }, (_, i) => i)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(26,10,62,0.95) 0%, rgba(10,10,20,0.98) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: '-10px',
            background: `radial-gradient(circle, rgba(251,191,36,${0.3 + Math.random() * 0.4}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [-20, -window.innerHeight - 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Mystical circle / ritual ring */}
      <motion.div
        className="absolute"
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: '1px solid rgba(167,139,246,0.15)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute"
        style={{
          width: 280,
          height: 280,
          borderRadius: '50%',
          border: '1px dashed rgba(251,191,36,0.1)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* ===== CARD SHUFFLE ANIMATION ===== */}
      <div className="relative w-48 h-72 md:w-56 md:h-80" style={{ perspective: '1200px' }}>
        <AnimatePresence>
          {cardElements.map((cardIndex) => {
            const pos = cardPositions[cardIndex]

            // Gather phase: cards scattered → come to center stack
            const gatherVariant = {
              initial: {
                x: pos.gatherScatter.x,
                y: pos.gatherScatter.y,
                rotate: pos.gatherScatter.rotate,
                opacity: 0,
                scale: 0.5,
              },
              animate: {
                x: (cardIndex - cardElements.length / 2) * 1.5,
                y: -(cardIndex * 0.5),
                rotate: (cardIndex - cardElements.length / 2) * 0.5,
                opacity: 1,
                scale: 1,
              },
            }

            // Fan phase: cards spread in arc
            const fanAngle = ((cardIndex / (cardElements.length - 1)) - 0.5) * 40
            const fanVariant = {
              x: Math.sin((fanAngle * Math.PI) / 180) * 120,
              y: -Math.abs(fanAngle) * 1.5,
              rotate: fanAngle,
              zIndex: cardIndex,
            }

            // Shuffle phase: cards interleave chaotically
            const shuffleVariant = {
              x: pos.shuffle.x,
              y: pos.shuffle.y,
              rotate: pos.shuffle.rotate,
              zIndex: cardIndex,
            }

            // Settle phase: neat stack
            const settleVariant = {
              x: (cardIndex - cardElements.length / 2) * 0.5,
              y: -(cardIndex * 0.3),
              rotate: 0,
              opacity: 1,
              scale: 1,
              zIndex: cardIndex,
            }

            return (
              <motion.div
                key={cardIndex}
                className="absolute inset-0 rounded-2xl shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  background: 'linear-gradient(160deg, #1a0a3e 0%, #0d0520 40%, #1a0a3e 100%)',
                  border: '1px solid rgba(251,191,36,0.15)',
                }}
                initial={gatherVariant.initial}
                animate={
                  shufflePhase === 'gather'
                    ? gatherVariant.animate
                    : shufflePhase === 'fan'
                    ? fanVariant
                    : shufflePhase === 'shuffle'
                    ? shuffleVariant
                    : settleVariant
                }
                transition={
                  shufflePhase === 'gather'
                    ? { duration: 0.8, delay: cardIndex * 0.05, ease: [0.23, 1, 0.32, 1] }
                    : shufflePhase === 'fan'
                    ? { duration: 1, delay: cardIndex * 0.03, ease: [0.23, 1, 0.32, 1] }
                    : shufflePhase === 'shuffle'
                    ? { duration: 0.4, ease: 'easeInOut' }
                    : { duration: 0.8, delay: cardIndex * 0.04, ease: [0.23, 1, 0.32, 1] }
                }
              >
                {/* Card back design (mini) */}
                <div className="absolute inset-[6px] rounded-xl border border-cosmic-400/20" />
                <div className="absolute inset-[10px] rounded-lg border border-mystic-400/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-cosmic-400/25 flex items-center justify-center"
                       style={{
                         background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
                       }}>
                    <span className="text-cosmic-400/50 text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      ✦
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Shuffle phase-specific visual effects */}
      {shufflePhase === 'shuffle' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0, 0.15, 0] }}
          transition={{ duration: 2, repeat: 2, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle at center, rgba(139,92,246,0.3) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Golden energy burst on settle */}
      {shufflePhase === 'settle' && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.5, 1], opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      )}

      {/* Guidance text */}
      <motion.div
        className="absolute bottom-24 md:bottom-32 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="text-white/60 text-base md:text-lg tracking-wide"
          style={{ fontFamily: "'DM Serif Display', serif" }}
          key={shufflePhase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {shufflePhase === 'gather' && 'Focus on your question...'}
          {shufflePhase === 'fan' && 'Breathe deeply, let your mind settle'}
          {shufflePhase === 'shuffle' && 'The cards are aligning with your energy'}
          {shufflePhase === 'settle' && 'Your reading is ready...'}
        </motion.p>

        {/* Subtle breathing indicator */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-mystic-400/40"
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ShufflingAnimation
