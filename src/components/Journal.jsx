import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Plus, Trash2, Calendar, ChevronRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext.jsx'

const STORAGE_KEY = 'aura_journal'

function getJournalEntries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveJournalEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

const moodOptions = [
  { emoji: '✨', label: 'Inspired', color: 'bg-mystic-500/20 text-mystic-300' },
  { emoji: '🌟', label: 'Hopeful', color: 'bg-cosmic-500/20 text-cosmic-300' },
  { emoji: '🌊', label: 'Calm', color: 'bg-blue-500/20 text-blue-300' },
  { emoji: '🔥', label: 'Energetic', color: 'bg-orange-500/20 text-orange-300' },
  { emoji: '🌙', label: 'Reflective', color: 'bg-purple-500/20 text-purple-300' },
  { emoji: '💫', label: 'Uncertain', color: 'bg-white/10 text-white/40' },
]

function Journal() {
  const [entries, setEntries] = useState(getJournalEntries())
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [newEntry, setNewEntry] = useState({ mood: null, text: '', title: '' })
  const { t, lang } = useLanguage()

  const handleSave = () => {
    if (!newEntry.text.trim()) return

    const entry = {
      id: Date.now().toString(),
      title: newEntry.title || t('untitledReflection'),
      text: newEntry.text,
      mood: newEntry.mood,
      date: new Date().toISOString(),
    }

    const updated = [entry, ...entries].slice(0, 50)
    saveJournalEntries(updated)
    setEntries(updated)
    setNewEntry({ mood: null, text: '', title: '' })
    setShowNewEntry(false)
  }

  const handleDelete = (id) => {
    const updated = entries.filter(e => e.id !== id)
    saveJournalEntries(updated)
    setEntries(updated)
  }

  const formatDate = (iso) => {
    const date = new Date(iso)
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-mystic-500/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-mystic-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cream">{t('journal')}</h3>
            <p className="text-white/40 text-xs">{t('privateReflections')}</p>
          </div>
        </div>

        <motion.button
          onClick={() => setShowNewEntry(true)}
          className="w-10 h-10 rounded-full bg-mystic-500/20 flex items-center justify-center
                     hover:bg-mystic-500/30 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5 text-mystic-400" />
        </motion.button>
      </div>

      {/* New entry modal */}
      <AnimatePresence>
        {showNewEntry && (
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
              <h4 className="text-lg font-semibold text-cream mb-4">{t('newEntry')}</h4>

              {/* Mood selector */}
              <div className="mb-4">
                <label className="text-white/50 text-sm mb-2 block">{t('howAreYouFeeling')}</label>
                <div className="flex gap-2 flex-wrap">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => setNewEntry(prev => ({ ...prev, mood }))}
                      className={`px-3 py-2 rounded-full text-sm transition-all
                                 ${newEntry.mood?.label === mood.label
                                   ? `${mood.color} ring-1 ring-white/20`
                                   : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                      <span className="mr-1">{mood.emoji}</span>
                      {t(mood.label.toLowerCase())}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                placeholder={t('titleOptional')}
                className="input-mystical w-full px-4 py-3 mb-3 text-sm"
              />

              {/* Content */}
              <textarea
                value={newEntry.text}
                onChange={(e) => setNewEntry(prev => ({ ...prev, text: e.target.value }))}
                placeholder={t('whatsOnYourMind')}
                className="input-mystical w-full px-4 py-3 mb-4 text-sm resize-none h-32"
              />

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowNewEntry(false); setNewEntry({ mood: null, text: '', title: '' }) }}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/50
                             hover:bg-white/5 transition-colors text-sm"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!newEntry.text.trim()}
                  className="flex-1 px-4 py-3 rounded-xl btn-mystical text-sm
                             disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('saveEntry')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries list */}
      {entries.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 text-sm">{t('noEntriesYet')}</p>
          <p className="text-white/30 text-xs mt-1">{t('startWriting')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              className="glass-panel p-4 hover:bg-white/[0.02] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {entry.mood && (
                      <span className="text-sm">{entry.mood.emoji}</span>
                    )}
                    <h5 className="text-cream font-medium text-sm truncate">{entry.title}</h5>
                  </div>
                  <p className="text-white/40 text-xs mb-2">{formatDate(entry.date)}</p>
                  <p className="text-white/60 text-sm line-clamp-2">{entry.text}</p>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-white/20 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Journal