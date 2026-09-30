'use client'

import {useServerInsertedHTML} from 'next/navigation'
import {useRef, useState} from 'react'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'

/**
 * The standard styled-components App Router registry: flush the SSR sheet
 * once per document and let the client runtime *adopt* (rehydrate) it.
 * Adoption runs synchronously before hydration: it imports the SSR rules
 * into the client sheet (preserving group numbers) and registers their class
 * names, so hydration re-injects nothing — without it, the client rebuilds
 * the sheet incrementally across several paints while the SSR copy still
 * applies, and equal-specificity rules swap winners mid-hydration (e.g.
 * Box's reset `margin: 0` transiently beats Container's `margin: 0 auto`,
 * shifting the whole page left and back).
 *
 * Adoption is safe because the site is fully static: nothing reads request
 * data, so every page is prerendered in full at build time and the document
 * carries identically-numbered copies of the sheet from that one build
 * process. If a request-time hole (`headers()`, `cookies()`, etc.) is ever
 * reintroduced, the runtime resume flushes its own copies with *different*
 * group numbering, and adopting those corrupts the client
 * group<->componentId registry — see the git history of this file for the
 * workarounds that were needed then.
 */
export function StyledComponentsRegistry({children}: {children: React.ReactNode}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
  // Only insert styles once
  // https://github.com/vercel/next.js/blob/303f7ffd4a0db19948a71eba73cd85f366625a65/test/production/app-dir/ppr-use-server-inserted-html/app/partial-resume/client.tsx#L9
  // https://github.com/vercel/next.js/discussions/49354
  const insertRef = useRef(false)

  useServerInsertedHTML(() => {
    if (insertRef.current) {
      return undefined
    }
    insertRef.current = true
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  )
}
