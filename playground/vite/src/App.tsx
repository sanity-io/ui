import {Root, usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'
import {startTransition, useEffect, useRef, useState} from 'react'

import {AppRouter} from './AppRouter'

export function App() {
  const prefersDark = usePrefersDark()
  const prefersDarkRef = useRef(prefersDark)
  const [scheme, setScheme] = useState<ColorScheme>(() => (prefersDark ? 'dark' : 'light'))

  useEffect(() => {
    if (prefersDarkRef.current === prefersDark) return

    prefersDarkRef.current = prefersDark

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setScheme(prefersDark ? 'dark' : 'light')
      })
      return
    }

    startTransition(() => setScheme(prefersDark ? 'dark' : 'light'))
  }, [prefersDark])

  return (
    <Root lang="en" scheme={scheme}>
      <AppRouter />
    </Root>
  )
}
