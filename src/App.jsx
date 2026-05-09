import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage from './components/HomePage'
import ReadingView from './components/ReadingView'
import Disclaimer from './components/Disclaimer'
import Journal from './components/Journal'
import MoodTracker from './components/MoodTracker'
import { getSettings, resetDisclaimer } from './utils/storage'
import { useLanguage } from './contexts/LanguageContext.jsx'
import { Sparkles, BookOpen, Heart, Shield, Globe } from 'lucide-react'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [readingData, setReadingData] = useState(null)
  const [showDisclaimer, setShowDisclaimer] = useState(!getSettings().disclaimerAccepted)
  const [activeTab, setActiveTab] = useState('readings') // readings | journal | mood
  const { lang, setLang, t } = useLanguage()

  const handleStartReading = (type, cards, userQuestion) => {
    setReadingData({ type, cards, userQuestion })
    setCurrentView('reading')
  }

  const handleBack = () => {
    setCurrentView('home')
    setReadingData(null)
  }

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false)
  }

  return (
    <div className="min-h-screen bg-void relative overflow-hidden flex flex-col">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-mystic-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cosmic-900/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 px-4 py-4 md:px-6 md:py-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-mystic flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-cream tracking-tight">
            Loran Tarot
            </h1>
          </div>

          {/* Nav tabs + Language switch */}
          {currentView === 'home' && (
            <nav className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                <button
                  onClick={() => setActiveTab('readings')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all
                             ${activeTab === 'readings'
                               ? 'bg-mystic-500/20 text-mystic-300'
                               : 'text-white/40 hover:text-white/60'}`}
                >
                  {t('readings')}
                </button>
                <button
                  onClick={() => setActiveTab('journal')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all
                             ${activeTab === 'journal'
                               ? 'bg-mystic-500/20 text-mystic-300'
                               : 'text-white/40 hover:text-white/60'}`}
                  title={t('journal')}
                >
                  <BookOpen className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('mood')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all
                             ${activeTab === 'mood'
                               ? 'bg-mystic-500/20 text-mystic-300'
                               : 'text-white/40 hover:text-white/60'}`}
                  title={t('mood')}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { resetDisclaimer(); setShowDisclaimer(true); }}
                  className="px-2 py-1.5 rounded-full text-white/25 hover:text-white/50 transition-colors"
                  title={t('viewDisclaimer')}
                >
                  <Shield className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Language switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium
                           bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10
                           transition-all border border-white/10"
                title={lang === 'en' ? 'Switch to Chinese' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'EN' : '中'}</span>
              </button>
            </nav>
          )}
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative max-w-5xl mx-auto px-4 pb-20 flex-1 w-full">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <div key="home-container">
              {activeTab === 'readings' && (
                <HomePage 
                  key="home" 
                  onStartReading={handleStartReading}
                />
              )}
              {activeTab === 'journal' && (
                <motion.div
                  key="journal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <Journal />
                </motion.div>
              )}
              {activeTab === 'mood' && (
                <motion.div
                  key="mood"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <MoodTracker />
                </motion.div>
              )}
            </div>
          )}
          {currentView === 'reading' && (
            <ReadingView 
              key="reading" 
              readingData={readingData}
              onBack={handleBack}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Disclaimer modal */}
      <AnimatePresence>
        {showDisclaimer && (
          <Disclaimer 
            key="disclaimer"
            onAccept={handleAcceptDisclaimer}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center shrink-0">
        <p className="text-white/20 text-xs px-4">
          {t('footerText')}
        </p>
      </footer>
    </div>
  )
}

export default App
