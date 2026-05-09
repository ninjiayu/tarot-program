import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react'
import { getHistory, updateFeedback, deleteFromHistory } from '../utils/storage'
import { useLanguage } from '../contexts/LanguageContext.jsx'

function HistoryJournal() {
  const [history, setHistory] = useState(getHistory())
  const [expandedId, setExpandedId] = useState(null)
  const { t } = useLanguage()

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleFeedback = (recordId, accuracy) => {
    updateFeedback(recordId, { accuracy })
    setHistory(getHistory())
  }

  const handleDelete = (recordId) => {
    deleteFromHistory(recordId)
    setHistory(getHistory())
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getAccuracyIcon = (accuracy) => {
    return accuracy === 'accurate' ? '✓' : accuracy === 'inaccurate' ? '✗' : '·'
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-cream font-medium mb-1">{t('noHistory')}</h3>
        <p className="text-white/30 text-sm">{t('readingsWillAppear')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-mystic-500/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-mystic-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cream">{t('readingHistory')}</h3>
            <p className="text-white/30 text-xs">{history.length} {t('cardReading')}</p>
          </div>
        </div>
      </div>

      {/* History list */}
      {history.map((record, index) => (
        <motion.div
          key={record.id}
          className="glass-panel overflow-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
        >
          {/* Record header */}
          <button
            onClick={() => toggleExpand(record.id)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{record.spreadType === 'single' ? '✦' : '◈'}</span>
              <div>
                <div className="text-cream font-medium text-sm">
                  {record.spreadType === 'single' ? t('dailyCard') : t('spreadReading')}
                  {record.cards?.length > 1 && ` · ${record.cards.length} ${t('cardReading')}`}
                </div>
                <div className="text-white/30 text-xs">{formatDate(record.createdAt)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {record.feedback && (
                <span className={`text-xs ${record.feedback.accuracy === 'accurate' ? 'text-green-400' : 'text-red-400'}`}>
                  {getAccuracyIcon(record.feedback.accuracy)}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${expandedId === record.id ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {expandedId === record.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/5"
              >
                <div className="p-4 space-y-3">
                  {/* User question */}
                  {record.userQuestion && (
                    <div className="p-3 bg-white/[0.02] rounded-xl">
                      <p className="text-white/30 text-xs mb-1">{t('yourQuestion')}</p>
                      <p className="text-cream/70 text-sm italic">"{record.userQuestion}"</p>
                    </div>
                  )}

                  {/* Cards */}
                  <div className="flex flex-wrap gap-3">
                    {record.cards?.map((card, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-sm">
                        <span className={`font-medium ${card.isReversed ? 'text-mystic-400' : 'text-cream'}`}>
                          {card.name}
                        </span>
                        {card.isReversed && (
                          <span className="text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            {t('rev')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Feedback */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <span className="text-white/30 text-xs">{t('wasAccurate')}</span>
                    <button
                      onClick={() => handleFeedback(record.id, 'accurate')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors
                                 ${record.feedback?.accuracy === 'accurate'
                                   ? 'bg-green-500/15 text-green-400'
                                   : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      {t('yes')}
                    </button>
                    <button
                      onClick={() => handleFeedback(record.id, 'inaccurate')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-colors
                                 ${record.feedback?.accuracy === 'inaccurate'
                                   ? 'bg-red-500/15 text-red-400'
                                   : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                      {t('notReally')}
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="ml-auto flex items-center gap-1 px-3 py-1 rounded-full text-xs
                                 text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Clear all */}
      {history.length > 3 && (
        <button
          onClick={() => {
            if (window.confirm(t('confirmClear'))) {
              localStorage.removeItem('tarot_history')
              setHistory([])
            }
          }}
          className="w-full py-3 text-white/20 text-xs hover:text-red-400 transition-colors"
        >
          {t('clearAll')}
        </button>
      )}
    </div>
  )
}

export default HistoryJournal