'use client'

import {useServerInsertedHTML} from 'next/navigation'
import {useRef, useState} from 'react'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'

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
      return
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
