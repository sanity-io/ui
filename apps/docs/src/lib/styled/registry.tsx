'use client'

import {useServerInsertedHTML} from 'next/navigation'
import {cloneElement, useEffect, useRef, useState} from 'react'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'

/**
 * Move SSR style tags that streamed into `<body>` up into `<head>`, before
 * styled-components' active client tag.
 *
 * With cacheComponents/PPR the page carries several full copies of the SSR
 * sheet; copies flushed after the static shell land inline in `<body>`,
 * after the active client tag in document order. Such a copy permanently
 * overrides equal-specificity rules that client-side navigations later
 * inject for classes the copy doesn't contain — e.g. Box's reset `margin: 0`
 * beats Container's `margin: 0 auto` for containers first rendered on
 * another route, so content renders squeezed to the left. Hoisting the
 * copies above the active tag restores styled-components' intended cascade
 * (client-injected rules win).
 */
function hoistSsrStyleTags(): void {
  const bodyTags = document.body.querySelectorAll('style[data-styled]')
  if (bodyTags.length === 0) return
  const active = document.head.querySelector('style[data-styled="active"]')
  for (const el of Array.from(bodyTags)) {
    if (el.getAttribute('data-styled') === 'active') continue
    if (active) document.head.insertBefore(el, active)
    else document.head.appendChild(el)
  }
}

export function StyledComponentsRegistry({children}: {children: React.ReactNode}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
  // Only insert styles once
  // https://github.com/vercel/next.js/blob/303f7ffd4a0db19948a71eba73cd85f366625a65/test/production/app-dir/ppr-use-server-inserted-html/app/partial-resume/client.tsx#L9
  // https://github.com/vercel/next.js/discussions/49354
  const insertRef = useRef(false)

  useEffect(() => {
    hoistSsrStyleTags()
    // Late-resumed boundaries can stream more SSR sheet copies into <body>
    // after hydration — watch for them and hoist those too.
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === 'STYLE') {
            hoistSsrStyleTags()
            return
          }
        }
      }
    })
    observer.observe(document.body, {childList: true, subtree: true})
    return () => observer.disconnect()
  }, [])

  useServerInsertedHTML(() => {
    if (insertRef.current) {
      return undefined
    }
    insertRef.current = true
    // Strip data-styled-version so the client never *adopts* (rehydrates)
    // these tags — they still apply as plain stylesheets. With
    // cacheComponents/PPR the page carries multiple full copies of the sheet
    // (static-shell prerender + per-request resume), and the build and
    // runtime processes assign different styled-components group numbers to
    // the same components. Adopting copies with conflicting numbering
    // corrupts the client group<->componentId registry, after which the
    // dynamic GlobalStyle's clearRules() deletes *other* components' CSS
    // from the CSSOM while their names stay registered — styles then stay
    // broken until a full page reload.
    const styles = styledComponentsStyleSheet
      .getStyleElement()
      .map((el) => cloneElement(el, {'data-styled-version': undefined}))
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  )
}
