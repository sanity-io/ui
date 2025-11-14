/**
 * Fuzzy search utility for menu item filtering
 * @internal
 */

/**
 * Score a string against a query using fuzzy matching
 * Returns a score where higher is better, or -1 for no match
 */
export function fuzzyScore(str: string, query: string): number {
  const strLower = str.toLowerCase()
  const queryLower = query.toLowerCase()

  // Empty query matches everything with max score
  if (queryLower.length === 0) return Infinity

  // Exact match (highest score)
  if (strLower === queryLower) return 1000

  // Starts with query (high score)
  if (strLower.startsWith(queryLower)) return 500

  // Check for all characters present in order
  let strIndex = 0
  let queryIndex = 0
  let consecutiveMatches = 0
  let maxConsecutive = 0
  let totalMatches = 0

  while (strIndex < strLower.length && queryIndex < queryLower.length) {
    if (strLower[strIndex] === queryLower[queryIndex]) {
      queryIndex++
      consecutiveMatches++
      totalMatches++
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches)
    } else {
      consecutiveMatches = 0
    }
    strIndex++
  }

  // All query characters must be found
  if (queryIndex < queryLower.length) return -1

  // Score based on consecutive matches and total matches
  // More consecutive = better score
  const consecutiveScore = maxConsecutive * 10
  const matchScore = totalMatches * 5
  const lengthPenalty = strLower.length - queryLower.length

  return consecutiveScore + matchScore - lengthPenalty
}

/**
 * Filter and sort items based on fuzzy search query
 */
export function fuzzyFilter<T>(
  items: T[],
  query: string,
  getText: (item: T) => string,
): T[] {
  const trimmedQuery = query.trim()

  if (!trimmedQuery || trimmedQuery.length === 0) {
    return items
  }

  const scored = items
    .map((item) => ({
      item,
      score: fuzzyScore(getText(item), trimmedQuery),
    }))
    .filter((x) => x.score > -1)

  // Sort by score (descending)
  scored.sort((a, b) => b.score - a.score)

  return scored.map((x) => x.item)
}
