import {_compilePalette, _compileSystem, _compileTheme} from '@sanity/ui/css'
import {buildTheme_v3, RootTheme, Theme_v3} from '@sanity/ui/theme'
import {ReactNode} from 'react'

/** @beta */
export function StyleTags(props: {theme?: Theme_v3}): ReactNode {
  const {theme: themeProp} = props

  const theme = themeProp ?? buildTheme_v3()

  return (
    <>
      <style href="sanity-palette" precedence="palette">
        {_compilePalette()}
      </style>
      <style href="sanity-theme" precedence="theme">
        {_compileTheme({v3: theme} as RootTheme)}
      </style>
      <style href="sanity-system" precedence="system">
        {_compileSystem()}
      </style>
    </>
  )
}

StyleTags.displayName = 'StyleTags'
