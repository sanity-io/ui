'use client'

import {LayerProvider, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {ToastProvider} from '@sanity/ui/toast'
import {ReactNode} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import json from 'refractor/json'
import tsx from 'refractor/tsx'

import {useColorScheme} from '#context/color-scheme'

import {GlobalStyle} from './GlobalStyle'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

const theme = buildTheme()

/**
 * Global providers shared by every route (the website and the arcade frame).
 */
export function AppProviders(props: {children?: ReactNode}) {
  const {children} = props

  const scheme = useColorScheme()

  return (
    <ThemeProvider scheme={scheme} theme={theme}>
      <GlobalStyle />
      <LayerProvider>
        <ToastProvider>{children}</ToastProvider>
      </LayerProvider>
    </ThemeProvider>
  )
}
