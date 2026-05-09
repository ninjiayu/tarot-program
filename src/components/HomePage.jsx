import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Sparkles, ChevronRight } from 'lucide-react'
import { drawCards } from '../data/tarotData'
import { getAllSpreads } from '../data/spreadData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

function HomePage({ onStartReading }) {
  const [showQuestionInput, setShowQuestionInput] = useState(false)
  const [selectedSpread, setSelectedSpread] = useState(null)
  const [userQuestion, setUserQuestion] = useState('')

  const spreads = getAllSpreads()

  const handleQuickDraw = (spreadId, cardCount) => {
    const cards = drawCards(cardCount)
    onStartReading(spreadId, cards, '')
  }

  const handleDrawWithQuestion = () => {
    if (selectedSpread) {
      const cards = drawCards(selectedSpread.cardCount)
      onStartReading(selectedSpread.id, cards, userQuestion)
    }
  }

  const handleSpreadClick = (spread) => {
    setSelectedSpread(spread)
    setShowQuestionInput(true)
  }

  return (
    <motion.div
      className="flex flex-col items-center pt-8 md:pt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero */}
      <motion.div variants={itemVariants} className="text-center mb-10 md:mb-14">
        <p className="text-mystic-400 text-sm font-medium mb-3 tracking-wide uppercase">
          Daily Tarot Guidance
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-cream mb-4" 
            style={{ fontFamily: "'DM Serif Display', serif" }}>
          Find clarity,<br />
          <span className="text-gradient">trust your intuition</span>
        </h2>
        <p className="text-white/40 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Archetypal wisdom for mindful reflection. Begin your daily practice.
        </p>
      </motion.div>

      {/* Quick actions */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-lg mb-10"
      >
        {/* Daily Card */}
        <motion.button
          onClick={() => handleQuickDraw('single', 1)}
          className="glass-panel p-5 md:p-6 flex flex-col items-center gap-3
                     hover:bg-white/[0.04] transition-all group"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-mystic-500/10 flex items-center justify-center
                          group-hover:bg-mystic-500/20 transition-colors">
            <Sun className="w-6 h-6 md:w-7 md:h-7 text-mystic-400" />
          </div>
          <div className="text-center">
            <h3 className="text-cream font-semibold text-sm md:text-base">Daily Card</h3>
            <p className="text-white/40 text-xs mt-0.5">One card, daily insight</p>
          </div>
        </motion.button>

        {/* Three Card */}
        <motion.button
          onClick={() => handleQuickDraw('three', 3)}
          className="glass-panel p-5 md:p-6 flex flex-col items-center gap-3
                     hover:bg-white/[0.04] transition-all group"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cosmic-500/10 flex items-center justify-center
                          group-hover:bg-cosmic-500/20 transition-colors">
            <Moon className="w-6 h-6 md:w-7 md:h-7 text-cosmic-400" />
          </div>
          <div className="text-center">
            <h3 className="text-cream font-semibold text-sm md:text-base">Past · Present · Future</h3>
            <p className="text-white/40 text-xs mt-0.5">Timeline reading</p>
          </div>
        </motion.button>
      </motion.div>

      {/* Spread library */}
      <motion.div variants={itemVariants} className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-mystic-400" />
          <h3 className="text-white/60 font-medium text-sm">Spread Library</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {spreads.filter(s => !['single', 'three'].includes(s.id)).map((spread) => (
            <button
              key={spread.id}
              onClick={() => handleSpreadClick(spread)}
              className="glass-panel p-4 flex items-center gap-3 hover:bg-white/[0.04] 
                         transition-all text-left"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">{spread.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-cream font-medium text-sm">{spread.name}</div>
                <div className="text-white/30 text-xs">{spread.cardCount} cards</div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Question modal */}
      <AnimatePresence>
        {showQuestionInput && selectedSpread && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-void/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-panel w-full max-w-lg p-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="text-center mb-6">
                <span className="text-3xl">{selectedSpread.icon}</span>
                <h3 className="text-xl font-semibold text-cream mt-2" 
                    style={{ fontFamily: "'DM Serif Display', serif" }}>
                  {selectedSpread.name}
                </h3>
                <p className="text-white/40 text-sm mt-1">{selectedSpread.description}</p>
              </div>

              {/* Position info */}
              <div className="mb-6 space-y-2">
                {selectedSpread.positions.map((pos, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-mystic-400 font-medium w-24 flex-shrink-0">{pos.name}</span>
                    <span className="text-white/40">{pos.meaning}</span>
                  </div>
                ))}
              </div>

              {/* Question input */}
              <div className="mb-6">
                <label className="text-white/40 text-sm mb-2 block">
                  What would you like clarity on? (optional)
                </label>
                <textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="e.g., What do I need to focus on in my career right now?"
                  className="input-mystical w-full px-4 py-3 text-sm resize-none h-24"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowQuestionInput(false); setUserQuestion('') }}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/50 
                             hover:bg-white/5 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDrawWithQuestion}
                  className="flex-1 px-4 py-3 rounded-xl btn-mystical text-sm"
                >
                  Begin Reading
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default HomePage
