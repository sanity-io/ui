import {Box, Card, CardProvider, RootClassNames, StyleTags} from '@sanity/ui'
import {DecoratorHelpers} from '@storybook/addon-themes'
import {StoryFn} from '@storybook/react'

const {initializeThemeState, pluckThemeFromContext, useThemeParameters} = DecoratorHelpers

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
      <CardProvider scheme={selected} tone="default">
        <RootClassNames element={document.documentElement} />
        <StyleTags />
        <Card padding={4} tone="inherit">
          <Story />
        </Card>
      </CardProvider>
    )
  }
}
