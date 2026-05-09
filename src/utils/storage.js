// Local storage management — history, check-in, settings
const STORAGE_KEYS = {
  HISTORY: 'aura_history',
  CHECKIN: 'aura_checkin',
  SETTINGS: 'aura_settings',
  DAILY_READINGS: 'aura_daily_readings',
  JOURNAL: 'aura_journal',
  MOODS: 'aura_moods'
};

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

// History
export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(record) {
  const history = getHistory();
  const newRecord = {
    ...record,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    feedback: null
  };
  history.unshift(newRecord);
  const trimmed = history.slice(0, 100);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
  return newRecord;
}

export function updateFeedback(recordId, feedback) {
  const history = getHistory();
  const index = history.findIndex(r => r.id === recordId);
  if (index !== -1) {
    history[index].feedback = { ...feedback, timestamp: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }
}

export function deleteFromHistory(recordId) {
  const history = getHistory().filter(r => r.id !== recordId);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

// Check-in
export function getCheckinData() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECKIN);
    return data ? JSON.parse(data) : { streak: 0, lastDate: null, totalDays: 0, coupons: 0 };
  } catch {
    return { streak: 0, lastDate: null, totalDays: 0, coupons: 0 };
  }
}

export function doCheckin() {
  const checkin = getCheckinData();
  const today = getTodayStr();
  
  if (checkin.lastDate === today) {
    return { ...checkin, alreadyChecked: true };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const newStreak = checkin.lastDate === yesterdayStr ? checkin.streak + 1 : 1;
  const newTotal = checkin.totalDays + 1;
  
  let newCoupons = checkin.coupons;
  let earnedReward = false;
  if (newStreak % 7 === 0) {
    newCoupons += 1;
    earnedReward = true;
  }

  const updated = {
    streak: newStreak,
    lastDate: today,
    totalDays: newTotal,
    coupons: newCoupons,
    alreadyChecked: false,
    earnedReward
  };

  localStorage.setItem(STORAGE_KEYS.CHECKIN, JSON.stringify(updated));
  return updated;
}

export function resetCheckin() {
  localStorage.removeItem(STORAGE_KEYS.CHECKIN);
}

// Daily AI reading quota
export function getDailyReadingCount() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_READINGS);
    const parsed = data ? JSON.parse(data) : { date: getTodayStr(), count: 0 };
    if (parsed.date !== getTodayStr()) {
      return { date: getTodayStr(), count: 0 };
    }
    return parsed;
  } catch {
    return { date: getTodayStr(), count: 0 };
  }
}

export function useDailyReading() {
  const current = getDailyReadingCount();
  const updated = { ...current, count: current.count + 1 };
  localStorage.setItem(STORAGE_KEYS.DAILY_READINGS, JSON.stringify(updated));
  return updated;
}

// Settings
export function getSettings() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : { disclaimerAccepted: false };
  } catch {
    return { disclaimerAccepted: false };
  }
}

export function updateSettings(updates) {
  const settings = getSettings();
  const updated = { ...settings, ...updates };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
}

export function acceptDisclaimer() {
  return updateSettings({ disclaimerAccepted: true, acceptedAt: new Date().toISOString() });
}

export function resetDisclaimer() {
  return updateSettings({ disclaimerAccepted: false });
}

// Clear all app data
export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}

// Migration utility — for future WeChat Mini Program support
// Replace localStorage calls with wx.setStorageSync when migrating
export async function migrateToWxStorage() {
  const keys = Object.values(STORAGE_KEYS);
  const data = {};
  for (const key of keys) {
    data[key] = localStorage.getItem(key);
  }
  return data;
}
