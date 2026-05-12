import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, Clock, AlertCircle, Crown } from 'lucide-react'
import { getDailyReadingCount, useDailyReading } from '../utils/storage'
import { useLanguage } from '../contexts/LanguageContext.jsx'

// AI Reading Generator — replace with real API when ready
async function simulateAIReading(spreadType, cards, userQuestion, lang) {
  await new Promise(resolve => setTimeout(resolve, 1800))

  const card = cards[0]
  const cardKeywords = card.keywords.slice(0, 2).join(lang === 'zh' ? '和' : ' and ')

  if (lang === 'zh') {
    return generateChineseReading(spreadType, cards, userQuestion, card, cardKeywords)
  }
  return generateEnglishReading(spreadType, cards, userQuestion, card, cardKeywords)
}

function generateChineseReading(spreadType, cards, userQuestion, card, cardKeywords) {
  const interpretations = {
    single: {
      basic: `今天你抽到的牌是 **${card.name}** ${card.isReversed ? '（逆位）' : '（正位）'}。

这张牌携带着${cardKeywords}的能量。${card.isReversed
  ? '逆位时，它轻柔地邀请你向内审视——你在哪些方面可能正在抗拒成长？这不是警告，只是一个停下来反思的邀请。'
  : '正位时，这份能量正在积极地支持着你。今天好好感受它。'}

花一点时间静下来，留意今天这个主题在哪里出现。`,

      deep: `亲爱的，

今天塔罗为你抽到了 **${card.name}** —— 这里有美好的讯息等着你。

${card.isReversed
  ? `当${card.name}以逆位出现时，不必担心。把它想象成宇宙轻轻拍了拍你的肩膀，说："嘿，我们一起看看这个。"

${card.reversed}

我温柔地建议你：今天找五分钟静静地坐着，深呼吸。问自己："我准备好放下什么了？"第一个浮现的答案通常就是最真实的。

你不需要把一切都想明白。你只需要对自己诚实。`
  : `${card.name}正位是一个温暖而肯定的存在。${card.upright}

宇宙在告诉你：你走在正确的道路上。继续前进。让"${card.keywords[0]}"成为你今天的指南针——当事情感觉不确定时，回到这个词。如果要体现它，哪怕是一个小举动，会是什么样的？

你比自己以为的更有力量。`}

**今日小练习：**
${generateActionAdviceZh(card)}

你正处在你该在的地方。相信这个过程。✨`
    },

    three: {
      basic: `你的三张牌阵揭示了有意义的能量流动：

**过去 — ${cards[0].name}** ${cards[0].isReversed ? '（逆位）' : '（正位）'}：${cards[0].keywords[0]}的能量塑造了你如今的位置。
**现在 — ${cards[1].name}** ${cards[1].isReversed ? '（逆位）' : '（正位）'}：此刻，你正在经历${cards[1].keywords[0]}。
**未来 — ${cards[2].name}** ${cards[2].isReversed ? '（逆位）' : '（正位）'}：前方是${cards[2].keywords[0]}的能量。

从${cards[0].keywords[0]} → ${cards[1].keywords[0]} → ${cards[2].keywords[0]}的变化弧线讲述了一个成长的故事。留意这些主题在你的生活中如何相互关联。`,

      deep: `亲爱的，

让我一张一张带你走过这次解读。每个位置都承载着你故事的一部分。

---

**过去 — ${cards[0].name}** ${cards[0].isReversed ? '（逆位）' : '（正位）'}

这张牌在过去的位置告诉我们，${cards[0].keywords[0]}一直是你旅程中的重要主题。${cards[0].isReversed
  ? '逆位暗示这里可能仍有些什么在请求你的关注——一些你还没有完全消化的东西。没关系，有些功课需要时间。'
  : '它为你如今的位置打下了基础，它的馈赠仍与你同在。'}

**现在 — ${cards[1].name}** ${cards[1].isReversed ? '（逆位）' : '（正位）'}

这就是你此刻所处的位置：在${cards[1].keywords[0]}的能量中。${cards[1].isReversed
  ? '你可能感到有些飘忽或不确定——但不确定性往往是通往更深层清晰的大门。相信那种感觉。'
  : '这是强大的能量。全然拥抱它。'}

**未来 — ${cards[2].name}** ${cards[2].isReversed ? '（逆位）' : '（正位）'}

展望前方，${cards[2].keywords[0]}的能量正向你走来。${cards[2].isReversed
  ? '逆位的未来牌不是坏兆头——它是一个邀请。如果你想要不同的结果，改变的力量已在你手中。'
  : '某些美好的事物正在展开。带着开放的心去迎接它。'}

---

**综合解读：**

从${cards[0].keywords[0]}经过${cards[1].keywords[0]}走向${cards[2].keywords[0]}，这是一个转变的故事。${cards.some(c => c.isReversed)
  ? '逆位的牌暗示其中有温柔的功课——邀请你慢下来、看得更深一些。它们不是障碍，而是邀请。'
  : '能量自然而积极地流动，事情正在朝有利的方向发展。'}

**带在心中的话：**

${cards.filter(c => c.isReversed).length === 0
  ? '你周围的能量是支持而清晰的。相信你的直觉，自信地向前迈步。'
  : cards.filter(c => c.isReversed).length <= 2
    ? '留意逆位牌所指向的方向——它们正在点亮值得温柔反思的领域。调整，而不要强迫。'
    : '这是一次邀请你慢下来的解读。不必着急。牌在邀请深度反思——尊重这份邀请。'}

记住——牌不会预测你的未来。它们反映的是你此刻周围的能量。选择的力量始终在你手中。✨`
    }
  }

  const cardData = interpretations[spreadType] || interpretations.single
  return {
    basic: userQuestion ? `关于你的问题——"${userQuestion}"\n\n${cardData.basic}` : cardData.basic,
    deep: userQuestion ? `我听到了你的疑问。让我们一起通过这些牌来探索"${userQuestion}"。\n\n${cardData.deep}` : cardData.deep
  }
}

function generateEnglishReading(spreadType, cards, userQuestion, card, cardKeywords) {
  const interpretations = {
    single: {
      basic: `Your card today is **${card.name}** ${card.isReversed ? '(reversed)' : '(upright)'}.

This card carries the energy of ${cardKeywords}. ${card.isReversed
  ? 'When reversed, it gently asks you to look inward — where might you be resisting growth? This isn\'t a warning, just an invitation to pause and reflect.'
  : 'Upright, this energy is actively supporting you. Lean into it today.'}

Take a quiet moment to notice where this theme shows up in your day.`,

      deep: `Dear one,

Today the cards have drawn you **${card.name}** — and there's something beautiful waiting for you here.

${card.isReversed
  ? `When ${card.name} appears reversed, it's not something to fear. Think of it as the universe tapping you gently on the shoulder, saying: *"Hey, let's look at this together."*

${card.reversed}

Here's what I'd gently suggest: find five minutes of stillness today. Breathe. Ask yourself — *"What am I holding onto that I'm ready to release?"* The answer that comes first is usually the truest one.

You don't need to have everything figured out. You just need to be honest with yourself.`
  : `${card.name} upright is a warm, affirming presence. ${card.upright}

The universe is essentially saying: *You're on the right path.* Keep going. Let ${card.keywords[0]} be your compass today — when things feel uncertain, come back to that word. What would it look like to embody it, even in a small way?

You carry more strength than you realize.`}

**A gentle practice for today:**
${generateActionAdviceEn(card)}

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

This card in the past position tells us that ${cards[0].keywords[0]} has been a defining theme in your journey. ${cards[0].isReversed
  ? 'The reversed position suggests there may still be something here asking for your attention — something you haven\'t fully processed yet. That\'s okay. Some lessons take time.'
  : 'It laid the foundation for where you are now, and its gifts are still with you.'}

**The Present — ${cards[1].name}** ${cards[1].isReversed ? '(reversed)' : '(upright)'}

This is where you stand right now: in the energy of ${cards[1].keywords[0]}. ${cards[1].isReversed
  ? 'You might feel a bit untethered or unsure — but uncertainty is often the doorway to deeper clarity. Trust that feeling.'
  : 'This is powerful energy to be in. Embrace it fully.'}

**The Future — ${cards[2].name}** ${cards[2].isReversed ? '(reversed)' : '(upright)'}

Looking ahead, the energy of ${cards[2].keywords[0]} is moving toward you. ${cards[2].isReversed
  ? 'A reversed future card isn\'t a bad omen — it\'s an invitation. If you want a different outcome, the power to shift things is already in your hands.'
  : 'Something beautiful is unfolding. Move toward it with an open heart.'}

---

**Putting it together:**

The journey from ${cards[0].keywords[0]} through ${cards[1].keywords[0]} toward ${cards[2].keywords[0]} is a story of transformation. ${cards.some(c => c.isReversed)
  ? 'The reversed cards suggest there are gentle lessons woven in — moments asking you to slow down and look a little deeper. These aren\'t obstacles, they\'re invitations.'
  : 'The energy flows naturally and positively. Things are aligning in your favor.'}

**What to carry with you:**

${cards.filter(c => c.isReversed).length === 0
  ? 'The energy around you is supportive and clear. Trust your instincts and move forward with confidence.'
  : cards.filter(c => c.isReversed).length <= 2
    ? 'Notice where the reversed cards point — they\'re highlighting areas worth gentle reflection. Adjust, don\'t force.'
    : 'This is a reading that asks you to slow down. There\'s no rush. The cards are inviting deep reflection — honor that.'}

Remember — the cards don't predict your future. They reflect the energies surrounding you right now. *You* always hold the power of choice. ✨`
    }
  }

  const cardData = interpretations[spreadType] || interpretations.single
  return {
    basic: userQuestion ? `Regarding your question — *"${userQuestion}"*\n\n${cardData.basic}` : cardData.basic,
    deep: userQuestion ? `I hear you. Let's explore *"${userQuestion}"* together through these cards.\n\n${cardData.deep}` : cardData.deep
  }
}

function generateActionAdviceZh(card) {
  const advices = [
    `花5分钟静坐。深呼吸，问自己："${card.keywords[0]}现在在我生活的哪个角落显现？"不必强求答案——只是观察浮现的感受。`,
    `今天，试着做一件体现"${card.keywords[0]}"的小事。不必是什么大事——哪怕只是一个觉知的瞬间。`,
    `今天留意与"${card.keywords[0]}"相关的征兆或巧合。宇宙用低语说话。`,
    `写几句关于"${card.keywords[0]}"对你个人意味着什么的话。一周后重读，观察你的视角如何变化。`,
    `把今天的解读分享给你信任的人。有时候把领悟说出声，会赋予它们更大的力量。`
  ]
  return advices[Math.floor(Math.random() * advices.length)]
}

function generateActionAdviceEn(card) {
  const advices = [
    `Take 5 minutes to sit quietly. Breathe, and ask yourself: "Where is ${card.keywords[0]} showing up in my life right now?" Don't force an answer — just notice what arises.`,
    `Today, try one small act that embodies ${card.keywords[0]}. It doesn't need to be grand — even a moment of awareness counts.`,
    `Keep your eyes open for signs or synchronicities related to ${card.keywords[0]} today. The universe speaks in whispers.`,
    `Write a few sentences about what ${card.keywords[0]} means to you personally. Revisit it in a week and notice how your perspective shifts.`,
    `Share today's reading with someone you trust. Sometimes speaking our insights aloud gives them even more power.`
  ]
  return advices[Math.floor(Math.random() * advices.length)]
}

function AIInterpreter({ spreadType, cards, userQuestion }) {
  const [mode, setMode] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dailyCount = getDailyReadingCount()
  const hasFreeQuota = dailyCount.count < 1
  const { t, lang } = useLanguage()

  const handleInterpret = async (interpretMode) => {
    setLoading(true)
    setError(null)
    setMode(interpretMode)

    try {
      useDailyReading()
      const aiResult = await simulateAIReading(spreadType, cards, userQuestion, lang)
      setResult(aiResult[interpretMode])
    } catch (err) {
      setError(t('somethingWrong'))
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
          <h3 className="text-lg font-semibold text-cream">{t('aiPoweredInsight')}</h3>
          <p className="text-white/30 text-xs">{t('personalizedReading')}</p>
        </div>
      </div>

      {/* User question */}
      {userQuestion && (
        <div className="mb-6 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
          <p className="text-white/40 text-xs mb-1">{t('yourQuestion')}</p>
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
              <span className="text-cream font-medium text-sm">{t('quickInsight')}</span>
            </div>
            <p className="text-white/30 text-xs">
              {hasFreeQuota ? t('freeToday') : t('comeBackTomorrow')}
            </p>
          </button>

          <button
            onClick={() => handleInterpret('deep')}
            className="p-4 rounded-2xl border border-cosmic-500/20 hover:bg-cosmic-500/5 text-left transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-cosmic-400" />
              <span className="text-cosmic-400 font-medium text-sm">{t('deepReading')}</span>
            </div>
            <p className="text-white/30 text-xs">{t('deepReadingDesc')}</p>
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
          <p className="text-white/40 text-sm mt-4">{t('craftingReading')}</p>
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
                {mode === 'deep' ? t('deepReading') : t('quickInsight')}
              </span>
            </div>

            <div className="text-white/70 leading-relaxed whitespace-pre-wrap text-sm">
              {result}
            </div>

            <button
              onClick={() => { setMode(null); setResult(null) }}
              className="mt-4 text-white/30 text-sm hover:text-white/50 transition-colors"
            >
              {t('chooseAnother')}
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
        <p>{t('aiDisclaimer')}</p>
      </div>
    </div>
  )
}

export default AIInterpreter