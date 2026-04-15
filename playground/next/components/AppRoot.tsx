'use client'

import '@sanity/ui/index.css'

import {Root, usePrefersDark} from '@sanity/ui'
import {ColorScheme} from '@sanity/ui'
import {ReactNode, startTransition, useEffect, useRef, useState} from 'react'

export function AppRoot(props: {children: ReactNode; initialPrefersDark: boolean}) {
  const {children, initialPrefersDark} = props

  const prefersDark = usePrefersDark(() => initialPrefersDark)
  const prefersDarkRef = useRef(prefersDark)
  const [scheme, setScheme] = useState<ColorScheme>(() => (prefersDark ? 'dark' : 'light'))

  useEffect(() => {
    if (prefersDarkRef.current === prefersDark) return

    prefersDarkRef.current = prefersDark

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        startTransition(() => {
          setScheme(prefersDark ? 'dark' : 'light')
        })
      })
      return
    }

    startTransition(() => {
      setScheme(prefersDark ? 'dark' : 'light')
    })
  }, [prefersDark])

  return (
    <Root lang="en" scheme={scheme}>
      {children}
    </Root>
  )
}
