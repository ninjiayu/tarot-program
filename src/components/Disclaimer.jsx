import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertCircle, Check } from 'lucide-react'
import { acceptDisclaimer } from '../utils/storage'
import { useLanguage } from '../contexts/LanguageContext.jsx'

function Disclaimer({ onAccept, onClose }) {
  const [hasRead, setHasRead] = useState(false)
  const { t } = useLanguage()

  const handleAccept = () => {
    acceptDisclaimer()
    onAccept?.()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-panel max-w-lg w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
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
              {t('footerText')}
            </p>

            <p>
              <strong className="text-cream/80">{t('notProfessionalAdvice')}</strong><br />
              If you're facing significant life decisions, we encourage consulting qualified professionals — therapists, counselors, or legal advisors.
            </p>

            <p>
              <strong className="text-cream/80">{t('aiGenerated')}</strong><br />
              Our AI interpretations are generated using large language models. While we aim for thoughtful, empathetic responses, they may not always be accurate or applicable to your situation.
            </p>

            <p>
              <strong className="text-cream/80">{t('privacy')}</strong><br />
              All your reading history, journal entries, and mood data are stored locally on your device. We don't collect, upload, or share any personal information.
            </p>

            <p>
              <strong className="text-cream/80">{t('ageRequirement')}</strong><br />
              Users under 18 should use this app with parental guidance. Please don't use Loran Tarot for any unlawful or harmful purposes.
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
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/40
                         hover:bg-white/5 transition-colors text-sm"
            >
              {t('maybeLater')}
            </button>
          )}
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