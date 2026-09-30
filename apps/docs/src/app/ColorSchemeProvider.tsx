'use client'

import {usePrefersDark} from '@sanity/ui'
import {useDeferredValue} from 'react'

import {ColorSchemeContext} from '#context/color-scheme'

/**
 * Resolves the color scheme on the client only. The site is fully static, so
 * the prerendered shell is always the light scheme; `usePrefersDark` flips to
 * dark right after hydration when the browser prefers it.
 *
 * This used to read the `Sec-CH-Prefers-Color-Scheme` client hint with
 * `headers()`, a leftover from when the site was server-rendered per request.
 * Under cacheComponents that read became a request-time Suspense boundary
 * around the entire page, so every initial load swapped the whole static
 * shell for a server-resumed copy — a visible flash and layout shift — while
 * the resumed copy was cached by the CDN without varying on the hint, so it
 * never actually matched the visitor's scheme.
 */
export function ColorSchemeProvider({children}: {children: React.ReactNode}) {
  // The deferred value keeps hydration consistent with the prerendered light
  // shell and makes the potential flip to dark a non-blocking transition.
  const prefersDark = useDeferredValue(usePrefersDark(), false)

  return <ColorSchemeContext value={prefersDark ? 'dark' : 'light'}>{children}</ColorSchemeContext>
}
