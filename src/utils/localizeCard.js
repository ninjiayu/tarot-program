import tarotZh from '../data/tarotDataZh'

/**
 * Localize a card object based on the current language.
 * Returns a new card object with translated name, keywords, upright, reversed.
 */
export function localizeCard(card, lang) {
  if (lang !== 'zh') return card

  const zh = tarotZh[card.id]
  if (!zh) return card

  return {
    ...card,
    name: zh.name,
    keywords: zh.keywords,
    upright: zh.upright,
    reversed: zh.reversed,
  }
}

/**
 * Localize an array of cards.
 */
export function localizeCards(cards, lang) {
  if (lang !== 'zh') return cards
  return cards.map(card => localizeCard(card, lang))
}
