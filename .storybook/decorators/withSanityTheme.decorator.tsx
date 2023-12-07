import {DecoratorHelpers} from '@storybook/addon-themes'
import {StoryFn} from '@storybook/react'
import React from 'react'
import {createGlobalStyle} from 'styled-components'
import {Card, ThemeProvider, studioTheme} from '../../src/core'

const {initializeThemeState, pluckThemeFromContext, useThemeParameters} = DecoratorHelpers

export const GlobalStyle = createGlobalStyle`
  body,
  .docs-story {
    background-color: ${({theme}) => theme.sanity.color.base.bg};
  }
`

/**
 * Story decorator which wraps all stories in a Sanity <ThemeProvider> and passes the current theme
 * value defined in Story.
 *
 * Stories are also wrapped in a <Card> for layout.
 */

export const withSanityTheme = ({themes, defaultTheme}) => {
  initializeThemeState(Object.keys(themes), defaultTheme)

  return (Story: StoryFn, context) => {
    const selectedTheme = pluckThemeFromContext(context)
    const {themeOverride} = useThemeParameters()

    const selected = themeOverride || selectedTheme || defaultTheme

    return (
      <ThemeProvider scheme={selected} theme={studioTheme}>
        <GlobalStyle />
        <Card padding={4}>
          <Story />
        </Card>
      </ThemeProvider>
    )
  }
}
