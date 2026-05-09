import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, Clock, AlertCircle, Crown } from 'lucide-react'
import { getDailyReadingCount, useDailyReading } from '../utils/storage'

// AI Reading Generator — replace simulateAIReading with real API when ready
async function simulateAIReading(spreadType, cards, userQuestion) {
  // TODO: Replace with real AI API (OpenAI / Claude / Qwen)
  // Example:
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
  //   body: JSON.stringify({ spreadType, cards, userQuestion, tone: 'empathetic' })
  // });
  // return await response.json();

  await new Promise(resolve => setTimeout(resolve, 1800))

  const card = cards[0]
  const cardKeywords = card.keywords.slice(0, 2).join(' and ')

  const interpretations = {
    single: {
      basic: `Your card today is **${card.name}** ${card.isReversed ? '(reversed)' : '(upright)'}.

This card carries the energy of ${cardKeywords}. ${card.isReversed 
  ? 'When reversed, it gently asks you to look inward — where might you be resisting growth? This isn\'t a warning, just an invitation to pause and reflect.' 
  : 'Upright, this energy is actively supporting you. Lean into it today.'}

Take a quiet moment to notice where this theme shows up in your day.`,

      deep: `Dear one,

Today the cards have drawn you **${card.name}** — and there's something beautiful waiting for you here.

${card.description}

${card.isReversed 
  ? `When ${card.name} appears reversed, it's not something to fear. Think of it as the universe tapping you gently on the shoulder, saying: *"Hey, let's look at this together."*

${card.reversed}

Here's what I'd gently suggest: find five minutes of stillness today. Breathe. Ask yourself — *"What am I holding onto that I'm ready to release?"* The answer that comes first is usually the truest one.

You don't need to have everything figured out. You just need to be honest with yourself.` 
  : `${card.name} upright is a warm, affirming presence. ${card.upright}

The universe is essentially saying: *You're on the right path.* Keep going. Let ${card.keywords[0]} be your compass today — when things feel uncertain, come back to that word. What would it look like to embody it, even in a small way?

You carry more strength than you realize.`}

**A gentle practice for today:**
${generateActionAdvice(card)}

You are exactly where you need to be. Trust the process. ✨`
    },

    three: {
      basic: `Your three-card reading reveals a meaningful flow of energy:

**Past — ${cards[0].name}** ${cards[0].isReversed ? '(reversed)' : '(upright)'}: The energy of ${cards[0].keywords[0]} has shaped where you are today.
**Present — ${cards[1].name}** ${cards[1].isReversed ? '(reversed)' : '(upright)'}: Right now, you're navigating ${cards[1].keywords[0]}.
**Future — ${cards[2].name}** ${cards[2].isReversed ? '(reversed)' : '(upright)'}: Ahead lies the energy of ${cards[2].keywords[0]}.

The arc from ${cards[0].keywords[0]} → ${cards[1].keywords[0]} → ${cards[2].keywords[0]} tells a story of growth. Pay attention to how these themes connect in your life.`,

      deep: `Dear one,

Let me walk you through this reading, card by card. Each position holds a piece of your story.

---

**The Past — ${cards[0].name}** ${cards[0].isReversed ? '(reversed)' : '(upright)'}

${cards[0].description}

This card in the past position tells us that ${cards[0].keywords[0]} has been a defining theme in your journey. ${cards[0].isReversed 
  ? 'The reversed position suggests there may still be something here asking for your attention — something you haven\'t fully processed yet. That\'s okay. Some lessons take time.' 
  : 'It laid the foundation for where you are now, and its gifts are still with you.'}

**The Present — ${cards[1].name}** ${cards[1].isReversed ? '(reversed)' : '(upright)'}

${cards[1].description}

This is where you stand right now: in the energy of ${cards[1].keywords[0]}. ${cards[1].isReversed 
  ? 'You might feel a bit untethered or unsure — but uncertainty is often the doorway to deeper clarity. Trust that feeling.' 
  : 'This is powerful energy to be in. Embrace it fully.'}

**The Future — ${cards[2].name}** ${cards[2].isReversed ? '(reversed)' : '(upright)'}

${cards[2].description}

Looking ahead, the energy of ${cards[2].keywords[0]} is moving toward you. ${cards[2].isReversed 
  ? 'A reversed future card isn\'t a bad omen — it\'s an invitation. If you want a different outcome, the power to shift things is already in your hands.' 
  : 'Something beautiful is unfolding. Move toward it with an open heart.'}

---

**Putting it together:**

${generateTimelineInsight(cards)}

**What to carry with you:**

${generateTimelineAdvice(cards)}

Remember — the cards don't predict your future. They reflect the energies surrounding you right now. *You* always hold the power of choice. ✨`
    }
  }

  const cardData = interpretations[spreadType] || interpretations.single
  
  return {
    basic: userQuestion ? `Regarding your question — *"${userQuestion}"*\n\n${cardData.basic}` : cardData.basic,
    deep: userQuestion ? `I hear you. Let's explore *"${userQuestion}"* together through these cards.\n\n${cardData.deep}` : cardData.deep
  }
}

// Action advice generator — gentle, practical, grounded
function generateActionAdvice(card) {
  const advices = [
    `Take 5 minutes to sit quietly. Breathe, and ask yourself: "Where is ${card.keywords[0]} showing up in my life right now?" Don't force an answer — just notice what arises.`,
    `Today, try one small act that embodies ${card.keywords[0]}. It doesn't need to be grand — even a moment of awareness counts.`,
    `Keep your eyes open for signs or synchronicities related to ${card.keywords[0]} today. The universe speaks in whispers.`,
    `Write a few sentences about what ${card.keywords[0]} means to you personally. Revisit it in a week and notice how your perspective shifts.`,
    `Share today's reading with someone you trust. Sometimes speaking our insights aloud gives them even more power.`
  ]
  return advices[Math.floor(Math.random() * advices.length)]
}

function generateTimelineInsight(cards) {
  const hasReversed = cards.some(c => c.isReversed)
  return `The journey from ${cards[0].keywords[0]} through ${cards[1].keywords[0]} toward ${cards[2].keywords[0]} is a story of transformation. ${hasReversed 
    ? 'The reversed cards suggest there are gentle lessons woven in — moments asking you to slow down and look a little deeper. These aren\'t obstacles, they\'re invitations.' 
    : 'The energy flows naturally and positively. Things are aligning in your favor.'}`
}

function generateTimelineAdvice(cards) {
  const reversedCount = cards.filter(c => c.isReversed).length
  if (reversedCount === 0) return 'The energy around you is supportive and clear. Trust your instincts and move forward with confidence.'
  if (reversedCount <= 2) return 'Notice where the reversed cards point — they\'re highlighting areas worth gentle reflection. Adjust, don\'t force.'
  return 'This is a reading that asks you to slow down. There\'s no rush. The cards are inviting deep reflection — honor that.'
}

function AIInterpreter({ spreadType, cards, userQuestion }) {
  const [mode, setMode] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dailyCount = getDailyReadingCount()
  const hasFreeQuota = dailyCount.count < 1

  const handleInterpret = async (interpretMode) => {
    setLoading(true)
    setError(null)
    setMode(interpretMode)

    try {
      useDailyReading()
      const aiResult = await simulateAIReading(spreadType, cards, userQuestion)
      setResult(aiResult[interpretMode])
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-mystic-500/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-mystic-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-cream">AI-Powered Insight</h3>
          <p className="text-white/30 text-xs">Personalized reading interpretation</p>
        </div>
      </div>

      {/* User question */}
      {userQuestion && (
        <div className="mb-6 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
          <p className="text-white/40 text-xs mb-1">Your question</p>
          <p className="text-cream/80 text-sm italic">"{userQuestion}"</p>
        </div>
      )}

      {/* Mode selection */}
      {!mode && !loading && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleInterpret('basic')}
            disabled={!hasFreeQuota}
            className={`p-4 rounded-2xl border text-left transition-all
                       ${hasFreeQuota 
                         ? 'border-white/10 hover:bg-white/[0.03]' 
                         : 'border-white/5 opacity-40 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-mystic-400" />
              <span className="text-cream font-medium text-sm">Quick Insight</span>
            </div>
            <p className="text-white/30 text-xs">
              {hasFreeQuota ? 'Free today' : 'Come back tomorrow'}
            </p>
          </button>

          <button
            onClick={() => handleInterpret('deep')}
            className="p-4 rounded-2xl border border-cosmic-500/20 hover:bg-cosmic-500/5 text-left transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-cosmic-400" />
              <span className="text-cosmic-400 font-medium text-sm">Deep Reading</span>
            </div>
            <p className="text-white/30 text-xs">500+ words · Guidance · Action steps</p>
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <motion.div
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-mystic-400/60" />
          </motion.div>
          <p className="text-white/40 text-sm mt-4">Crafting your reading...</p>
        </motion.div>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            className="glass-panel p-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              {mode === 'deep' ? (
                <Crown className="w-4 h-4 text-cosmic-400" />
              ) : (
                <Clock className="w-4 h-4 text-mystic-400" />
              )}
              <span className={`font-medium text-sm ${mode === 'deep' ? 'text-cosmic-400' : 'text-mystic-400'}`}>
                {mode === 'deep' ? 'Deep Reading' : 'Quick Insight'}
              </span>
            </div>

            <div className="text-white/70 leading-relaxed whitespace-pre-wrap text-sm">
              {result}
            </div>

            <button
              onClick={() => { setMode(null); setResult(null) }}
              className="mt-4 text-white/30 text-sm hover:text-white/50 transition-colors"
            >
              Choose another reading type
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-400/80 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-4 flex items-start gap-2 text-white/20 text-xs">
        <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
        <p>AI-generated readings are for self-reflection and entertainment. They don't replace professional guidance.</p>
      </div>
    </div>
  )
}

export default AIInterpreter
