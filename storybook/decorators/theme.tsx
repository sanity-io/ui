import {studioTheme} from '@sanity/ui'
import React from 'react'
import {ThemeProvider} from 'styled-components'

export const withTheme = (storyFn: () => JSX.Element) => (
  <ThemeProvider theme={studioTheme}>{storyFn()}</ThemeProvider>
)
