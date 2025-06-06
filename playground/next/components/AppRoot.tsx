'use client'

import '@sanity/ui/css/index.css'

import {Root, usePrefersDark} from '@sanity/ui'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {ReactNode, useEffect, useRef, useState} from 'react'

export function AppRoot(props: {children: ReactNode; initialPrefersDark: boolean}) {
  const {children, initialPrefersDark} = props

  const prefersDark = usePrefersDark(() => initialPrefersDark)
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
      {children}
    </Root>
  )
}
