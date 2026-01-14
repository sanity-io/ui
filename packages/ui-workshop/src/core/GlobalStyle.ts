import {useRootTheme} from '@sanity/ui'
import {setElementVars} from '@vanilla-extract/dynamic'
import {bodyBackgroundColor} from '#styles'
import {useInsertionEffect} from 'react'

export function GlobalStyle(): null {
  const {scheme, theme} = useRootTheme()
  const bg = theme.v2!.color[scheme].default.bg!

  useInsertionEffect(() => {
    setElementVars(document.body, {
      [bodyBackgroundColor]: bg,
    })
  }, [bg])

  return null
}
