import {CardProvider, studioTheme} from '@sanity/ui'
import {select} from '@storybook/addon-knobs'
import React from 'react'
import {ThemeProvider} from 'styled-components'

export const withTheme = (storyFn: () => JSX.Element) => {
  const scheme = select('Color sheme', {Light: 'light', Dark: 'dark'}, 'light', 'Theme')

  return (
    <ThemeProvider theme={studioTheme}>
      <CardProvider scheme={scheme}>{storyFn()}</CardProvider>
    </ThemeProvider>
  )
}
