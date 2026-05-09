import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, TrendingUp, Calendar } from 'lucide-react'

const STORAGE_KEY = 'aura_moods'

function getMoodHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveMoodHistory(moods) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(moods))
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0]
}

const moodOptions = [
  { emoji: '✨', label: 'Inspired', value: 5, color: 'from-mystic-500 to-mystic-600' },
  { emoji: '🌟', label: 'Hopeful', value: 4, color: 'from-cosmic-500 to-cosmic-600' },
  { emoji: '🌊', label: 'Calm', value: 3, color: 'from-blue-500 to-blue-600' },
  { emoji: '🔥', label: 'Energetic', value: 4, color: 'from-orange-500 to-orange-600' },
  { emoji: '🌙', label: 'Reflective', value: 3, color: 'from-purple-500 to-purple-600' },
  { emoji: '💫', label: 'Uncertain', value: 2, color: 'from-white/20 to-white/30' },
]

function MoodTracker() {
  const [moods, setMoods] = useState(getMoodHistory())
  const todayMood = moods.find(m => m.date === getTodayKey())

  const handleLogMood = (mood) => {
    const existing = moods.filter(m => m.date !== getTodayKey())
    const updated = [{ date: getTodayKey(), mood, timestamp: Date.now() }, ...existing].slice(0, 30)
    saveMoodHistory(updated)
    setMoods(updated)
  }

  // Last 7 days visualization
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const key = date.toISOString().split('T')[0]
    const entry = moods.find(m => m.date === key)
    return { date: key, day: date.toLocaleDateString('en-US', { weekday: 'short' }), mood: entry?.mood }
  })

  // Average mood
  const avgMood = moods.length > 0 
    ? (moods.reduce((sum, m) => sum + m.mood.value, 0) / moods.length).toFixed(1)
    : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-mystic-500/10 flex items-center justify-center">
          <Heart className="w-5 h-5 text-mystic-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-cream">Mood Tracker</h3>
          <p className="text-white/40 text-xs">Track your emotional journey</p>
        </div>
      </div>

      {/* Today's mood */}
      <div className="glass-panel p-5">
        <p className="text-white/50 text-sm mb-3">How are you feeling today?</p>
        <div className="flex gap-2 flex-wrap">
          {moodOptions.map((mood) => {
            const isSelected = todayMood?.mood.label === mood.label
            return (
              <motion.button
                key={mood.label}
                onClick={() => handleLogMood(mood)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all
                           ${isSelected 
                             ? `bg-gradient-to-r ${mood.color} text-white shadow-lg` 
                             : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'}`}
                whileTap={{ scale: 0.95 }}
                disabled={isSelected}
              >
                <span className="text-lg">{mood.emoji}</span>
                <span className="font-medium">{mood.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      {moods.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-mystic-400" />
              <span className="text-white/50 text-xs">Average Mood</span>
            </div>
            <p className="text-2xl font-semibold text-cream">{avgMood}</p>
            <p className="text-white/30 text-xs">out of 5</p>
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-cosmic-400" />
              <span className="text-white/50 text-xs">Days Logged</span>
            </div>
            <p className="text-2xl font-semibold text-cream">{moods.length}</p>
            <p className="text-white/30 text-xs">last 30 days</p>
          </div>
        </div>
      )}

      {/* Weekly view */}
      <div className="glass-panel p-5">
        <p className="text-white/50 text-sm mb-4">Last 7 Days</p>
        <div className="flex justify-between">
          {last7Days.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
                             ${day.mood 
                               ? `bg-gradient-to-br ${day.mood.color} shadow-md` 
                               : 'bg-white/5'}`}>
                {day.mood ? day.mood.emoji : '·'}
              </div>
              <span className="text-white/30 text-xs">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MoodTracker
