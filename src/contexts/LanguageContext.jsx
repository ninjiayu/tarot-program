import { createContext, useContext, useState, useCallback } from 'react'

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en')

  const setLang = useCallback((newLang) => {
    setLangState(newLang)
  }, [])

  const t = useCallback(
    (key, vars = {}) => {
      let text = translations[lang]?.[key] ?? translations['en']?.[key] ?? key
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{${k}}`, 'g'), v)
      })
      return text
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

const translations = {
  en: {
    // App / Header / Nav
    dailyTarotGuidance: 'Daily Tarot Guidance',
    readings: 'Readings',
    journal: 'Journal',
    mood: 'Mood',
    viewDisclaimer: 'View disclaimer',
    footerText: 'For entertainment and self-reflection purposes only. Not a substitute for professional advice.',

    // HomePage
    findClarity: 'Find clarity,',
    trustYourIntuition: 'trust your intuition',
    archetypalWisdom: 'Archetypal wisdom for mindful reflection. Begin your daily practice.',
    dailyCard: 'Daily Card',
    oneCardDailyInsight: 'One card, daily insight',
    pastPresentFuture: 'Past \u00b7 Present \u00b7 Future',
    timelineReading: 'Timeline reading',
    spreadLibrary: 'Spread Library',
    whatClarity: 'What would you like clarity on? (optional)',
    beginReading: 'Begin Reading',
    cancel: 'Cancel',

    // ReadingView
    back: 'Back',
    cardReading: 'card reading',
    theCardsAreAligning: 'The cards are aligning...',
    tapCardToReveal: 'Tap a card to reveal its message',
    cardMeanings: 'Card Meanings',
    todayInsight: "Today's Insight",
    todayReversed: 'Today, {name} (reversed) invites gentle self-reflection. {meaning} This is a moment to pause, breathe, and trust the process of inner growth.',
    todayUpright: 'Today, {name} (upright) brings supportive energy your way. {meaning} Embrace this guidance as you navigate your day with intention.',
    reversed: 'Reversed',
    rev: 'Rev',

    // ShufflingAnimation
    focusOnQuestion: 'Focus on your question...',
    breatheDeeply: 'Breathe deeply, let your mind settle',
    cardsAligningWithEnergy: 'The cards are aligning with your energy',
    yourReadingIsReady: 'Your reading is ready...',

    // AIInterpreter
    quickInsight: 'Quick Insight',
    deepReading: 'Deep Reading',
    generateReading: 'Generate Reading',
    readingComplete: 'Reading Complete',
    freeDailyQuota: 'Free daily quota: {count}/1',
    upgradeForUnlimited: 'Upgrade for unlimited readings',
    dearOne: 'Dear one,',
    drawnCard: 'Today the cards have drawn you **{name}** \u2014 and there\'s something beautiful waiting for you here.',
    aiPoweredInsight: 'AI-Powered Insight',
    personalizedReading: 'Personalized reading interpretation',
    yourQuestion: 'Your question',
    freeToday: 'Free today',
    comeBackTomorrow: 'Come back tomorrow',
    deepReadingDesc: '500+ words \u00b7 Guidance \u00b7 Action steps',
    craftingReading: 'Crafting your reading...',
    chooseAnother: 'Choose another reading type',
    somethingWrong: 'Something went wrong. Please try again.',
    aiDisclaimer: 'AI-generated readings are for self-reflection and entertainment. They don\'t replace professional guidance.',

    // Journal
    myReflections: 'My Reflections',
    newEntry: 'New Entry',
    title: 'Title',
    howAreYouFeeling: 'How are you feeling?',
    writeYourThoughts: 'Write your thoughts...',
    saveEntry: 'Save Entry',
    noEntriesYet: 'No entries yet.',
    startWriting: 'Start writing your first reflection.',
    delete: 'Delete',
    expand: 'Expand',

    // MoodTracker
    moodTracker: 'Mood Tracker',
    logTodaysMood: 'Log today\'s mood',
    inspired: 'Inspired',
    hopeful: 'Hopeful',
    calm: 'Calm',
    energetic: 'Energetic',
    reflective: 'Reflective',
    uncertain: 'Uncertain',
    averageMood: 'Average Mood',
    totalDays: 'Total Days',
    moodHistory: 'Mood History',
    noMoodData: 'No mood data yet.',

    // DailyCheckin
    streak: 'Streak',
    totalDaysCheckin: 'Total Days',
    readingPasses: 'Reading Passes',
    checkIn: 'Check In',
    checkedIn: 'Checked In',
    dayReward: 'Day {day} Reward',
    milestoneReached: 'Milestone reached',

    // HistoryJournal
    readingHistory: 'Reading History',
    noHistory: 'No readings yet.',
    wasAccurate: 'Was this accurate?',
    yes: 'Yes',
    notReally: 'Not really',
    clearAll: 'Clear All',
    confirmClear: 'Are you sure you want to clear all history?',

    // Disclaimer
    entertainmentReflection: 'Entertainment & Reflection',
    notProfessionalAdvice: 'Not Professional Advice',
    aiGenerated: 'AI-Generated Readings',
    privacy: 'Privacy',
    ageRequirement: 'Age Requirement',
    accept: 'I understand and accept',
    proceed: 'Proceed',

    // Spread names (from spreadData)
    singleSpread: 'Single Card',
    threeSpread: 'Past \u00b7 Present \u00b7 Future',
    holyTrinity: 'Holy Trinity',
    crossroads: 'Crossroads',
    connection: 'Connection',
    celticCross: 'Celtic Cross',

    // Spread descriptions
    singleDesc: 'One card for daily insight and guidance.',
    threeDesc: 'Timeline reading covering your past influences, present situation, and future possibilities.',
    holyTrinityDesc: 'Body, mind, and spirit alignment reading.',
    crossroadsDesc: 'Clarity for decision-making between two paths.',
    connectionDesc: 'Insight into relationship dynamics and growth.',
    celticCrossDesc: 'Comprehensive ten-card spread for deep exploration.',

    // Position names
    past: 'Past',
    present: 'Present',
    future: 'Future',
    body: 'Body',
    mind: 'Mind',
    spirit: 'Spirit',
    situation: 'Situation',
    challenge: 'Challenge',
    foundation: 'Foundation',
    recentPast: 'Recent Past',
    bestOutcome: 'Best Outcome',
    self: 'Self',
    environment: 'Environment',
    hopes: 'Hopes',
    outcome: 'Outcome',
    pathA: 'Path A',
    pathB: 'Path B',
    advice: 'Advice',
    you: 'You',
    partner: 'Partner',
    dynamic: 'Dynamic',
    todayEnergy: "Today's Energy",
    rootCause: 'Root Cause',
    currentState: 'Current State',
    guidance: 'Guidance',
    outcomeA: 'Outcome A',
    outcomeB: 'Outcome B',
    yourBlock: 'Your Block',
    theirBlock: 'Their Block',
    trajectory: 'Trajectory',
    privateReflections: 'Your private reflections',
    titleOptional: 'Title (optional)',
    whatsOnYourMind: "What's on your mind? What insights did today's reading bring?",
    trackEmotionalJourney: 'Track your emotional journey',
    daysLogged: 'Days Logged',
    outOf5: 'out of 5',
    last30Days: 'last 30 days',
    dailyCheckin: 'Daily Check-in',
    buildYourPractice: 'Build your practice, one day at a time',
    progress: 'Progress',
    checkin7Days: 'Check in 7 days in a row to earn a Deep Reading Pass',
    checkedInToday: 'Checked in today. See you tomorrow',
    deepReadingPassAdded: 'Deep Reading Pass \u00d7 1 added to your account',
    readingsWillAppear: 'Your readings will appear here once you start.',
    spreadReading: 'Spread Reading',
    aQuickNote: 'A Quick Note',
    pleaseRead: 'Please read before continuing',
    important: 'Important',
    auraDesignedFor: 'Loran Tarot is designed for entertainment and self-reflection. It does not provide medical, psychological, or legal advice.',
    maybeLater: 'Maybe later',
  },
  zh: {
    // App / Header / Nav
    dailyTarotGuidance: '每日塔罗指引',
    readings: '塔罗牌阵',
    journal: '日记',
    mood: '心情',
    viewDisclaimer: '查看免责声明',
    footerText: '仅供娱乐和自我反思之用，不能替代专业建议。',

    // HomePage
    findClarity: '找到清晰，',
    trustYourIntuition: '相信你的直觉',
    archetypalWisdom: '用原型智慧进行正念反思。开始你的日常练习。',
    dailyCard: '每日一牌',
    oneCardDailyInsight: '一张牌，每日洞见',
    pastPresentFuture: '过去 \u00b7 现在 \u00b7 未来',
    timelineReading: '时间线牌阵',
    spreadLibrary: '经典牌阵库',
    whatClarity: '你想在什么事情上获得清晰？（可选）',
    beginReading: '开始占卜',
    cancel: '取消',

    // ReadingView
    back: '返回',
    cardReading: '张牌',
    theCardsAreAligning: '塔罗牌正在排列中...',
    tapCardToReveal: '点击牌面揭示信息',
    cardMeanings: '牌意解读',
    todayInsight: '今日启示',
    todayReversed: '今天，{name}（逆位）邀请你进行温柔的自我反思。{meaning} 这是一个停下来、深呼吸、并相信内在成长过程的时刻。',
    todayUpright: '今天，{name}（正位）为你带来了支持性的能量。{meaning} 带着这份指引，有意识地度过你的一天。',
    reversed: '逆位',
    rev: '逆位',

    // ShufflingAnimation
    focusOnQuestion: '专注你的问题...',
    breatheDeeply: '深呼吸，让你的思绪平静下来',
    cardsAligningWithEnergy: '塔罗牌正在与你的能量对齐',
    yourReadingIsReady: '你的占卜已准备就绪...',

    // AIInterpreter
    quickInsight: '快速解读',
    deepReading: '深度解读',
    generateReading: '生成解读',
    readingComplete: '解读完成',
    freeDailyQuota: '今日免费次数：{count}/1',
    upgradeForUnlimited: '升级以获取无限次数',
    dearOne: '亲爱的，',
    drawnCard: '今天塔罗牌为你抽到了 **{name}** \u2014 这里有美好的事物在等待着你。',
    aiPoweredInsight: 'AI 智能解读',
    personalizedReading: '个性化占卜解读',
    yourQuestion: '你的问题',
    freeToday: '今日免费',
    comeBackTomorrow: '明日再来',
    deepReadingDesc: '500+ 字 \u00b7 指引 \u00b7 行动建议',
    craftingReading: '正在生成解读...',
    chooseAnother: '选择其他解读类型',
    somethingWrong: '出了点问题，请重试。',
    aiDisclaimer: 'AI 生成的解读仅供自我反思和娱乐之用，不能替代专业指导。',

    // Journal
    myReflections: '我的反思',
    newEntry: '新建日记',
    title: '标题',
    howAreYouFeeling: '你感觉如何？',
    writeYourThoughts: '写下你的想法...',
    saveEntry: '保存',
    noEntriesYet: '还没有日记。',
    startWriting: '写下你的第一篇反思。',
    delete: '删除',
    expand: '展开',

    // MoodTracker
    moodTracker: '心情追踪',
    logTodaysMood: '记录今天的心情',
    inspired: '受到启发',
    hopeful: '充满希望',
    calm: '平静',
    energetic: '精力充沛',
    reflective: '反思中',
    uncertain: '不确定',
    averageMood: '平均心情',
    totalDays: '总天数',
    moodHistory: '心情历史',
    noMoodData: '还没有心情数据。',

    // DailyCheckin
    streak: '连续签到',
    totalDaysCheckin: '总天数',
    readingPasses: '解读次数',
    checkIn: '签到',
    checkedIn: '已签到',
    dayReward: '第{day}天奖励',
    milestoneReached: '达成里程碑',

    // HistoryJournal
    readingHistory: '占卜历史',
    noHistory: '还没有占卜记录。',
    wasAccurate: '这次占卜准确吗？',
    yes: '是',
    notReally: '不太准',
    clearAll: '清空全部',
    confirmClear: '确定要清空所有历史记录吗？',

    // Disclaimer
    entertainmentReflection: '娱乐与反思',
    notProfessionalAdvice: '非专业建议',
    aiGenerated: 'AI 生成解读',
    privacy: '隐私',
    ageRequirement: '年龄要求',
    accept: '我理解并接受',
    proceed: '继续',

    // Spread names
    singleSpread: '单张牌',
    threeSpread: '过去 \u00b7 现在 \u00b7 未来',
    holyTrinity: '圣三角',
    crossroads: '二选一',
    connection: '关系发展',
    celticCross: '凯尔特十字',

    // Spread descriptions
    singleDesc: '一张牌，获取每日洞见与指引。',
    threeDesc: '涵盖过去影响、当下状况和未来可能性的时间线牌阵。',
    holyTrinityDesc: '身、心、灵对齐牌阵。',
    crossroadsDesc: '在两条路之间做出决定的清晰指引。',
    connectionDesc: '关系动态与成长的洞察。',
    celticCrossDesc: '十张牌综合牌阵，深度探索。',

    // Position names
    past: '过去',
    present: '现在',
    future: '未来',
    body: '身',
    mind: '心',
    spirit: '灵',
    situation: '现状',
    challenge: '挑战',
    foundation: '根基',
    recentPast: '近期过去',
    bestOutcome: '最佳结果',
    self: '自我',
    environment: '环境',
    hopes: '期望',
    outcome: '结果',
    pathA: '路径A',
    pathB: '路径B',
    advice: '建议',
    you: '你',
    partner: '对方',
    dynamic: '动态',
    todayEnergy: '今日能量',
    rootCause: '根本原因',
    currentState: '当前状态',
    guidance: '指引',
    outcomeA: '结果A',
    outcomeB: '结果B',
    yourBlock: '你的障碍',
    theirBlock: '对方的障碍',
    trajectory: '发展趋势',
    privateReflections: '你的私人反思',
    titleOptional: '标题（可选）',
    whatsOnYourMind: '你在想什么？今天的占卜给你带来了什么启示？',
    trackEmotionalJourney: '追踪你的情绪旅程',
    daysLogged: '已记录天数',
    outOf5: '满分 5 分',
    last30Days: '近 30 天',
    dailyCheckin: '每日签到',
    buildYourPractice: '每天练习，逐步积累',
    progress: '进度',
    checkin7Days: '连续签到 7 天可获得一次深度解读机会',
    checkedInToday: '今日已签到，明天见',
    deepReadingPassAdded: '深度解读次数 +1 已添加到你的账户',
    readingsWillAppear: '开始占卜后，你的记录将出现在这里。',
    spreadReading: '牌阵占卜',
    aQuickNote: '温馨提示',
    pleaseRead: '继续前请先阅读',
    important: '重要提示',
    auraDesignedFor: 'Loran Tarot 仅供娱乐和自我反思之用，不能提供医疗、心理或法律建议。',
    maybeLater: '稍后再说',
  },
}

export default LanguageContext
