// Spread configurations
export const spreadLibrary = {
  single: {
    id: "single",
    name: "Daily Card",
    cardCount: 1,
    icon: "✦",
    description: "Draw one card for today's core guidance and energy.",
    positions: [
      { name: "Today's Energy", meaning: "The core energy and universal guidance to focus on today." }
    ]
  },
  three: {
    id: "three",
    name: "Past · Present · Future",
    cardCount: 3,
    icon: "◈",
    description: "A three-card spread revealing the flow of energy across time.",
    positions: [
      { name: "Past", meaning: "Past influences shaping your current situation." },
      { name: "Present", meaning: "The energy and circumstances you're navigating right now." },
      { name: "Future", meaning: "The direction things are heading based on current trends." }
    ]
  },
  holyTrinity: {
    id: "holyTrinity",
    name: "Holy Trinity",
    cardCount: 3,
    icon: "△",
    description: "Explore the deeper connections between past, present, and future.",
    positions: [
      { name: "Root Cause", meaning: "The underlying cause behind your current situation." },
      { name: "Current State", meaning: "The core energy you're experiencing right now." },
      { name: "Guidance", meaning: "The universe's guidance and advice moving forward." }
    ]
  },
  choice: {
    id: "choice",
    name: "Crossroads",
    cardCount: 5,
    icon: "⚖",
    description: "When facing a decision, this spread helps you see the path each choice may take.",
    positions: [
      { name: "Current Situation", meaning: "The core crossroads you're facing." },
      { name: "Path A", meaning: "What you'll experience if you choose the first option." },
      { name: "Outcome A", meaning: "The likely result of choosing Path A." },
      { name: "Path B", meaning: "What you'll experience if you choose the second option." },
      { name: "Outcome B", meaning: "The likely result of choosing Path B." }
    ]
  },
  relationship: {
    id: "relationship",
    name: "Connection",
    cardCount: 6,
    icon: "♡",
    description: "Explore the dynamics and trajectory of a relationship.",
    positions: [
      { name: "Your Feelings", meaning: "Your true feelings about this connection." },
      { name: "Their Feelings", meaning: "The other person's true feelings about this connection." },
      { name: "Current Dynamic", meaning: "The core state of the relationship right now." },
      { name: "Your Block", meaning: "The inner obstacle you need to work through." },
      { name: "Their Block", meaning: "The obstacle the other person needs to work through." },
      { name: "Trajectory", meaning: "Where this relationship is heading." }
    ]
  },
  celticCross: {
    id: "celticCross",
    name: "Celtic Cross",
    cardCount: 10,
    icon: "✧",
    description: "The most comprehensive tarot spread — a deep dive into every dimension of your question.",
    positions: [
      { name: "The Present", meaning: "The heart of the matter and your current situation." },
      { name: "The Challenge", meaning: "What's crossing you — the immediate obstacle." },
      { name: "The Foundation", meaning: "What's beneath — your subconscious drivers." },
      { name: "The Past", meaning: "What's behind you — influences that are fading." },
      { name: "The Crown", meaning: "What's above — your highest potential or goal." },
      { name: "The Near Future", meaning: "What's ahead — events coming soon." },
      { name: "Self", meaning: "How you see yourself in this situation." },
      { name: "Environment", meaning: "How others see you and external influences." },
      { name: "Hopes & Fears", meaning: "Your deepest hopes or underlying fears." },
      { name: "Outcome", meaning: "The likely resolution based on all current energies." }
    ]
  }
};

export function getSpreadConfig(spreadId) {
  return spreadLibrary[spreadId] || spreadLibrary.single;
}

export function getAllSpreads() {
  return Object.values(spreadLibrary);
}

// Feature configuration
export const featureConfig = {
  freeSpreads: ["single", "three", "holyTrinity", "choice", "relationship", "celticCross"],
  premiumSpreads: [],
  freeDailyReadings: 1,
  checkinReward: {
    days: 7,
    reward: "Deep Reading Pass × 1"
  }
};
