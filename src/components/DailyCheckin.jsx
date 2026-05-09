import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Gift, Sparkles } from 'lucide-react'
import { getCheckinData, doCheckin } from '../utils/storage'

function DailyCheckin() {
  const [checkinData, setCheckinData] = useState(getCheckinData())
  const [showReward, setShowReward] = useState(false)

  const handleCheckin = () => {
    const result = doCheckin()
    setCheckinData(result)
    if (result.earnedReward) {
      setShowReward(true)
    }
  }

  const todayChecked = checkinData.alreadyChecked
  const progress = (checkinData.streak % 7) / 7 * 100

  return (
    <motion.div
      className="glass-panel p-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-mystic-500/10 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-mystic-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-cream">Daily Check-in</h3>
          <p className="text-white/30 text-xs">Build your practice, one day at a time</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-semibold text-mystic-400">{checkinData.streak}</div>
          <div className="text-white/30 text-xs">Day streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-cream">{checkinData.totalDays}</div>
          <div className="text-white/30 text-xs">Total days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-cosmic-400">{checkinData.coupons}</div>
          <div className="text-white/30 text-xs">Reading passes</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-white/25 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-mystic-500 to-cosmic-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-white/20 text-xs mt-2 text-center">
          Check in 7 days in a row to earn a Deep Reading Pass
        </p>
      </div>

      {/* Checkin button */}
      <AnimatePresence mode="wait">
        {todayChecked ? (
          <motion.div
            key="checked"
            className="flex items-center justify-center gap-2 py-3.5 text-mystic-400/60 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles className="w-4 h-4" />
            Checked in today. See you tomorrow ✨
          </motion.div>
        ) : (
          <motion.button
            key="checkin"
            onClick={handleCheckin}
            className="w-full py-3.5 bg-gradient-mystic text-white rounded-xl font-semibold text-sm
                       hover:opacity-90 transition-opacity active:scale-[0.98]"
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4 inline-block mr-1.5" />
            Check In Today
          </motion.button>
        )}
      </AnimatePresence>

      {/* Reward animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            className="mt-4 p-4 bg-cosmic-500/10 border border-cosmic-500/20 rounded-xl text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Gift className="w-6 h-6 text-cosmic-400 mx-auto mb-1.5" />
            <p className="text-cosmic-400 font-semibold text-sm">Reward earned!</p>
            <p className="text-white/40 text-xs">Deep Reading Pass × 1 added to your account</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default DailyCheckin
