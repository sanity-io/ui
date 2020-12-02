import {studioTheme, ThemeProvider} from '@sanity/ui'
import {select} from '@storybook/addon-knobs'
import React from 'react'

export const withTheme = (storyFn: () => JSX.Element) => {
  const scheme = select('Color sheme', {Light: 'light', Dark: 'dark'}, 'light', 'Theme')
  const variant = select(
    'Color variant',
    {
      Transparent: 'transparent',
      Default: 'default',
      Primary: 'primary',
      Positive: 'positive',
      Caution: 'caution',
      Critical: 'critical',
    },
    'transparent',
    'Theme'
  )

  return (
    <ThemeProvider theme={studioTheme} scheme={scheme} variant={variant}>
      {storyFn()}
    </ThemeProvider>
  )
}
