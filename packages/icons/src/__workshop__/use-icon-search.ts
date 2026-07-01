import {icons} from '@sanity/icons'
import {useEffect, useState} from 'react'

import {searchClient} from './sanity-client'

// Hybrid ranking: exact filename, then prefix, then keyword matches across
// filename/namedExport/tags/description, and finally semantic similarity.
// Keyword boosts are weighted high so exact/partial matches always rank above
// fuzzy ones. The icon key is recovered from `_id` ("icon.<key>").
const SEARCH_QUERY = `*[_type == "icon"] | score(
  boost(filename == $qExact, 12),
  boost(filename match $qPrefix, 8),
  boost([filename, namedExport, tags] match $qWords, 4),
  boost(description match $qWords, 2),
  text::semanticSimilarity($q)
) | order(_score desc) [0...80] { "id": _id }`

const allIconKeys = Object.keys(icons)

function localFilter(query: string): string[] {
  const q = query.toLowerCase()

  return allIconKeys.filter((key) => key.includes(q))
}

interface RemoteResult {
  query: string
  names: string[]
  semantic: boolean
}

export interface IconSearchState {
  results: string[]
  loading: boolean
  /** True when results came from the semantic index, false for the offline fallback. */
  semantic: boolean
}

export function useIconSearch(query: string): IconSearchState {
  const trimmed = query.trim()

  const [remote, setRemote] = useState<RemoteResult | null>(null)

  useEffect(() => {
    if (trimmed === '') return undefined

    let cancelled = false

    const timeout = setTimeout(async () => {
      try {
        const rows = await searchClient.fetch<{id: string}[]>(SEARCH_QUERY, {
          q: trimmed,
          qExact: `${trimmed.toLowerCase()}.svg`,
          qPrefix: `${trimmed}*`,
          qWords: `${trimmed}*`,
        })

        if (cancelled) return

        // Recover the icon key from `_id` and keep only icons in the shipped set.
        const names = rows
          .map((row) => row.id.replace(/^icon\./, ''))
          .filter((name) => name in icons)

        setRemote({query: trimmed, names, semantic: true})
      } catch {
        if (cancelled) return

        setRemote({query: trimmed, names: localFilter(trimmed), semantic: false})
      }
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [trimmed])

  if (trimmed === '') {
    return {results: allIconKeys, loading: false, semantic: false}
  }

  // Results for the current query have arrived from Sanity.
  if (remote && remote.query === trimmed) {
    return {results: remote.names, loading: false, semantic: remote.semantic}
  }

  // Awaiting the semantic query: show instant local substring matches meanwhile.
  return {results: localFilter(trimmed), loading: true, semantic: false}
}
