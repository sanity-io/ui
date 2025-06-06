import {Root, usePrefersDark} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'
import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {AppRouter} from './AppRouter'

export function App() {
  const prefersDark = usePrefersDark()
  const prefersDarkRef = useRef(prefersDark)
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(() => (prefersDark ? 'dark' : 'light'))

  useEffect(() => {
    if (prefersDarkRef.current === prefersDark) return

    prefersDarkRef.current = prefersDark

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setScheme(prefersDark ? 'dark' : 'light')
      })
      return
    }

    setScheme(prefersDark ? 'dark' : 'light')
  }, [prefersDark])

  return (
    <Root lang="en" scheme={scheme}>
      <AppRouter />
    </Root>
  )
}
