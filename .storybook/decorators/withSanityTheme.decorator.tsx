import {Card, StyleTags} from '@sanity/ui'
import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {DecoratorHelpers} from '@storybook/addon-themes'
import type {Decorator} from '@storybook/react'

const {initializeThemeState, pluckThemeFromContext} = DecoratorHelpers

/**
 * Story decorator which render global CSS and the root `Card` component, and passes the
 * current scheme value defined in `Story`.
 */
export const withSanityTheme = ({
  themes,
  defaultTheme,
}: {
  themes: Record<string, string>
  defaultTheme: string
}): Decorator => {
  initializeThemeState(Object.keys(themes), defaultTheme)

  return (Story, context) => {
    const selectedTheme = pluckThemeFromContext(context)
    const {themeOverride} = context.parameters['themes'] ?? {}
    const scheme = (themeOverride || selectedTheme || defaultTheme) as ThemeColorSchemeKey

    return (
      <>
        <StyleTags />

        <Card padding={[4, 4, 5, 6]} scheme={scheme} tone="default">
          <Story />
        </Card>
      </>
    )
  }
}
