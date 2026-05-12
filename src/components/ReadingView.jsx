import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, RefreshCw, BookOpen, Sparkles } from 'lucide-react'
import TarotCard from './TarotCard'
import AIInterpreter from './AIInterpreter'
import ShufflingAnimation from './ShufflingAnimation'
import { getSpreadConfig } from '../data/spreadData'
import { saveToHistory } from '../utils/storage'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import { localizeCards } from '../utils/localizeCard'

function ReadingView({ readingData, onBack }) {
  const [phase, setPhase] = useState('shuffling') // shuffling | dealing | ready | interpreting
  const [revealedCards, setRevealedCards] = useState(new Set())
  const [showInterpretation, setShowInterpretation] = useState(false)
  const { t, lang } = useLanguage()

  const { type, cards: rawCards, userQuestion } = readingData
  const cards = useMemo(() => localizeCards(rawCards, lang), [rawCards, lang])
  const config = getSpreadConfig(type)

  // Phase transitions
  useEffect(() => {
    if (phase === 'dealing') {
      const timer = setTimeout(() => setPhase('ready'), cards.length * 300 + 1500)
      return () => clearTimeout(timer)
    }
  }, [phase, cards.length])

  const handleShuffleComplete = () => {
    setPhase('dealing')
  }

  // Save to history when all revealed
  useEffect(() => {
    if (revealedCards.size >= cards.length && cards.length > 0 && phase === 'ready') {
      saveToHistory({
        spreadType: type,
        cards,
        userQuestion,
        positions: config.positions.map(p => p.name)
      })
    }
  }, [revealedCards.size, cards.length])

  const handleReveal = (index) => {
    setRevealedCards(prev => new Set([...prev, index]))
    if (revealedCards.size + 1 >= cards.length) {
      setPhase('interpreting')
      setTimeout(() => setShowInterpretation(true), 600)
    }
  }

  const handleReset = () => {
    setPhase('shuffling')
    setRevealedCards(new Set())
    setShowInterpretation(false)
    setTimeout(onBack, 100)
  }

  const allRevealed = revealedCards.size >= cards.length

  const spreadKeyMap = {
    single: 'singleSpread',
    three: 'threeSpread',
    holyTrinity: 'holyTrinity',
    choice: 'crossroads',
    relationship: 'connection',
    celticCross: 'celticCross',
  }

  const getSpreadName = () => {
    const key = spreadKeyMap[type]
    return key ? t(key) : config.name
  }

  const translatePositionName = (name) => {
    const map = {
      'Past': 'past', 'Present': 'present', 'Future': 'future',
      "Today's Energy": 'todayEnergy',
      'Root Cause': 'rootCause', 'Current State': 'currentState', 'Guidance': 'guidance',
      'Current Situation': 'situation', 'Path A': 'pathA', 'Outcome A': 'outcomeA',
      'Path B': 'pathB', 'Outcome B': 'outcomeB',
      'Your Feelings': 'you', 'Their Feelings': 'partner', 'Current Dynamic': 'dynamic',
      'Your Block': 'yourBlock', 'Their Block': 'theirBlock', 'Trajectory': 'trajectory',
      'The Present': 'present', 'The Challenge': 'challenge', 'The Foundation': 'foundation',
      'The Past': 'past', 'The Crown': 'bestOutcome', 'The Near Future': 'recentPast',
      'Self': 'self', 'Environment': 'environment', 'Hopes & Fears': 'hopes', 'Outcome': 'outcome',
    }
    return t(map[name] || name)
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="w-full max-w-4xl mb-6 md:mb-8 flex items-center justify-between">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-cream transition-colors
                     px-3 py-2 rounded-xl hover:bg-white/5"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t('back')}</span>
        </motion.button>

        <div className="text-center">
          <h2 className="text-lg md:text-xl font-semibold text-cream"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
            {getSpreadName()}
          </h2>
          <p className="text-white/30 text-xs">{config.cardCount} {t('cardReading')}</p>
        </div>

        <motion.button
          onClick={handleReset}
          className="flex items-center gap-2 text-white/50 hover:text-cream transition-colors
                     px-3 py-2 rounded-xl hover:bg-white/5"
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Shuffling phase */}
      {phase === 'shuffling' && (
        <ShufflingAnimation
          cardCount={cards.length}
          onComplete={handleShuffleComplete}
        />
      )}

      {/* Dealing phase overlay */}
      {phase === 'dealing' && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-void/80 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-8 h-8 text-mystic-400/60" />
            </motion.div>
            <motion.p
              className="text-white/40 text-sm tracking-wide"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t('theCardsAreAligning')}
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Cards */}
      {phase !== 'shuffling' && (
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10 md:mb-14 w-full max-w-5xl">
        {cards.map((card, index) => (
          <div key={card.id} className="flex flex-col items-center gap-3">
            <motion.span
              className="text-white/30 text-[10px] font-medium uppercase tracking-[0.15em] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'dealing' ? 0 : 1 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              {translatePositionName(config.positions[index]?.name || `Card ${index + 1}`)}
            </motion.span>
            <TarotCard
              card={card}
              index={index}
              isRevealed={revealedCards.has(index)}
              onReveal={handleReveal}
              size={type === 'single' ? 'large' : 'normal'}
              isDealing={phase === 'dealing'}
            />
          </div>
        ))}
      </div>
      )}

      {/* Instruction */}
      {!allRevealed && phase === 'ready' && (
        <motion.p
          className="text-white/25 text-xs tracking-wide mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {t('tapCardToReveal')}
        </motion.p>
      )}

      {/* Interpretation */}
      <AnimatePresence>
        {showInterpretation && allRevealed && (
          <motion.div
            className="w-full max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-5 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-mystic-400" />
                <h3 className="text-lg font-semibold text-cream">{t('cardMeanings')}</h3>
              </div>

              <div className="space-y-5">
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="pl-4 border-l border-mystic-500/30"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.12 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-mystic-400 font-medium text-sm">
                        {translatePositionName(config.positions[index]?.name)}
                      </h4>
                      <span className="text-white/15">\u00b7</span>
                      <h5 className="text-cream font-medium text-sm">{card.name}</h5>
                      {card.isReversed && (
                        <span className="text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {t('rev')}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {card.keywords.slice(0, 3).map((keyword, kidx) => (
                        <span key={kidx} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <p className="text-white/60 leading-relaxed text-sm">
                      {card.isReversed ? card.reversed : card.upright}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Single card insight */}
              {type === 'single' && (
                <motion.div
                  className="mt-6 pt-5 border-t border-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-cosmic-400" />
                    <h4 className="text-cream font-medium text-sm">{t('todayInsight')}</h4>
                  </div>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {cards[0].isReversed
                      ? t('todayReversed', { name: cards[0].name, meaning: cards[0].reversed })
                      : t('todayUpright', { name: cards[0].name, meaning: cards[0].upright })
                    }
                  </p>
                </motion.div>
              )}
            </div>

            {/* AI Interpreter */}
            <AIInterpreter
              spreadType={type}
              cards={cards}
              userQuestion={userQuestion}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ReadingView