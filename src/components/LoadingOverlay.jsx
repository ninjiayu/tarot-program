import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext.jsx'

function LoadingOverlay({ text }) {
  const { t } = useLanguage()
  const displayText = text || t('connectingToIntuition')
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated circles */}
      <div className="relative mb-8">
        <motion.div
          className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full border border-mystic-500/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 md:inset-3 w-16 h-16 md:w-18 md:h-18 rounded-full border border-mystic-400/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-mystic flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Loading text */}
      <motion.p
        className="text-cream/60 text-sm font-light tracking-wide"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {displayText}
      </motion.p>
    </motion.div>
  )
}

export default LoadingOverlay
