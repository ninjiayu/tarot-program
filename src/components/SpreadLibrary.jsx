import { motion } from 'framer-motion'
import { ArrowLeft, Info, Lock } from 'lucide-react'
import { getAllSpreads, featureConfig } from '../data/spreadData'
import { useLanguage } from '../contexts/LanguageContext.jsx'

const spreadKeyMap = {
  single: { nameKey: 'singleSpread', descKey: 'singleDesc' },
  three: { nameKey: 'threeSpread', descKey: 'threeDesc' },
  holyTrinity: { nameKey: 'holyTrinity', descKey: 'holyTrinityDesc' },
  choice: { nameKey: 'crossroads', descKey: 'crossroadsDesc' },
  relationship: { nameKey: 'connection', descKey: 'connectionDesc' },
  celticCross: { nameKey: 'celticCross', descKey: 'celticCrossDesc' },
}

function SpreadLibrary({ onSelect, onBack, isPremium = false }) {
  const spreads = getAllSpreads()
  const { t } = useLanguage()

  const getSpreadName = (spread) => {
    const key = spreadKeyMap[spread.id]?.nameKey
    return key ? t(key) : spread.name
  }

  const getSpreadDesc = (spread) => {
    const key = spreadKeyMap[spread.id]?.descKey
    return key ? t(key) : spread.description
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      {/* Header */}
      <div className="w-full max-w-4xl mb-8 flex items-center justify-between">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-cream transition-colors
                     px-4 py-2 rounded-xl hover:bg-white/5"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t('back')}</span>
        </motion.button>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-cream" style={{ fontFamily: "'DM Serif Display', serif" }}>
            {t('spreadLibrary')}
          </h2>
          <p className="text-white/30 text-xs">{t('chooseReadingStyle')}</p>
        </div>

        <div className="w-16" />
      </div>

      {/* Spread Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {spreads.map((spread, index) => {
          const isFree = featureConfig.freeSpreads.includes(spread.id)
          const canAccess = isFree || isPremium

          return (
            <motion.div
              key={spread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => canAccess && onSelect(spread.id, spread.cardCount)}
              className={`glass-panel p-5 cursor-pointer transition-all duration-200
                         ${canAccess ? 'hover:bg-white/[0.04]' : 'opacity-40 cursor-not-allowed'}`}
              whileHover={canAccess ? { y: -3 } : {}}
              whileTap={canAccess ? { scale: 0.98 } : {}}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{spread.icon}</span>
                {!isFree && (
                  <span className="flex items-center gap-1 text-[10px] bg-cosmic-500/10 text-cosmic-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Lock className="w-2.5 h-2.5" />
                    Pro
                  </span>
                )}
              </div>

              <h3 className="text-cream font-semibold text-sm mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {getSpreadName(spread)}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed mb-3">
                {getSpreadDesc(spread)}
              </p>

              <div className="flex items-center gap-2 text-[10px] text-white/25 uppercase tracking-wider">
                <Info className="w-3 h-3" />
                <span>{spread.cardCount} {t('cardReading')}</span>
              </div>

              {!canAccess && (
                <div className="absolute inset-0 bg-void/40 rounded-2xl flex items-center justify-center">
                  <span className="text-white/60 text-xs font-medium">{t('membersOnly')}</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Premium CTA */}
      {!isPremium && featureConfig.premiumSpreads.length > 0 && (
        <motion.div
          className="mt-8 glass-panel p-5 text-center max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-cosmic-400 font-semibold text-sm mb-1">{t('unlockAllSpreads')}</h4>
          <p className="text-white/30 text-xs mb-3">
            {t('unlockAllSpreadsDesc')}
          </p>
          <button className="px-5 py-2 bg-gradient-cosmic text-void rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity">
            {t('becomeMember')}
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SpreadLibrary
