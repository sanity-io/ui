import {studioTheme, ThemeProvider} from '@sanity/ui'
import {select} from '@storybook/addon-knobs'
import React from 'react'

export const withTheme = (storyFn: () => JSX.Element) => {
  const scheme = select('Color sheme', {Light: 'light', Dark: 'dark'}, 'light', 'Theme')
  const tone = select(
    'Color tone',
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
    <ThemeProvider theme={studioTheme} scheme={scheme} tone={tone}>
      {storyFn()}
    </ThemeProvider>
  )
}
