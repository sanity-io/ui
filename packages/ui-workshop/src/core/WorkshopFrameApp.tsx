import {studioTheme, ThemeProvider, usePrefersDark, type ThemeColorSchemeKey} from '@sanity/ui'
import {useState} from 'react'
import type {WorkshopConfig} from './config/types'
import {WorkshopFrame} from './frame/WorkshopFrame'
import {GlobalStyle} from './GlobalStyle'

export function WorkshopFrameApp(props: {config: WorkshopConfig}) {
  const {config} = props
  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(prefersDark ? 'dark' : 'light')

  return (
    <ThemeProvider scheme={scheme} theme={config.theme || studioTheme}>
      <GlobalStyle />
      <WorkshopFrame config={config} setScheme={setScheme} />
    </ThemeProvider>
  )
}
