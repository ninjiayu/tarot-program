import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertCircle, Check, X } from 'lucide-react'
import { acceptDisclaimer } from '../utils/storage'
import { useLanguage } from '../contexts/LanguageContext.jsx'

function Disclaimer({ onAccept, onClose }) {
  const [hasRead, setHasRead] = useState(false)
  const { t } = useLanguage()

  const handleAccept = () => {
    acceptDisclaimer()
    onAccept?.()
  }

  const handleClose = () => {
    // If onClose is provided, use it; otherwise use onAccept to dismiss
    if (onClose) {
      onClose()
    } else {
      onAccept?.()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-panel max-w-lg w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto relative"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
                     text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-mystic-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-mystic-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-cream">{t('aQuickNote')}</h2>
            <p className="text-white/30 text-xs">{t('pleaseRead')}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-white/60 leading-relaxed mb-6 text-sm">
          <div className="p-4 bg-cosmic-500/5 rounded-2xl border border-cosmic-500/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cosmic-400 flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-cosmic-400">{t('important')}:</strong>
                {' '}{t('auraDesignedFor')}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p>
              <strong className="text-cream/80">{t('entertainmentReflection')}</strong><br />
              {t('disclaimerEntertainmentBody')}
            </p>

            <p>
              <strong className="text-cream/80">{t('notProfessionalAdvice')}</strong><br />
              {t('disclaimerProfessionalBody')}
            </p>

            <p>
              <strong className="text-cream/80">{t('aiGenerated')}</strong><br />
              {t('disclaimerAIBody')}
            </p>

            <p>
              <strong className="text-cream/80">{t('privacy')}</strong><br />
              {t('disclaimerPrivacyBody')}
            </p>

            <p>
              <strong className="text-cream/80">{t('ageRequirement')}</strong><br />
              {t('disclaimerAgeBody')}
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="mb-5">
          <label className="flex items-start gap-2.5 cursor-pointer text-white/50 text-sm">
            <input
              type="checkbox"
              checked={hasRead}
              onChange={() => setHasRead(!hasRead)}
              className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-mystic-400 focus:ring-mystic-400 focus:ring-offset-0"
            />
            {t('accept')}
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            disabled={!hasRead}
            className={`flex-1 px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2
                       transition-all ${hasRead
                         ? 'btn-mystical text-white'
                         : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
          >
            <Check className="w-4 h-4" />
            {t('proceed')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Disclaimer
