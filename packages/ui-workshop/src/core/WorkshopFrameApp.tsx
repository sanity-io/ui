import {studioTheme, ThemeColorSchemeKey, ThemeProvider, usePrefersDark} from '@sanity/ui'
import {useState} from 'react'

import {WorkshopConfig} from './config'
import {WorkshopFrame} from './frame'
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
