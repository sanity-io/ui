import {Card, studioTheme, ThemeProvider} from '@sanity/ui'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {DecoratorHelpers} from '@storybook/addon-themes'
import {Decorator} from '@storybook/react-vite'
import {createGlobalStyle} from 'styled-components'

const {initializeThemeState, pluckThemeFromContext} = DecoratorHelpers

const GlobalStyle = createGlobalStyle`
  body,
  .docs-story {
    background-color: ${
      // oxlint-disable-next-line no-deprecated
      ({theme}) => theme.sanity.color.base.bg
    };
  }
`

/**
 * Story decorator which wraps all stories in a Sanity <ThemeProvider> and passes the current theme
 * value defined in Story.
 *
 * Stories are also wrapped in a <Card> for layout. Set the `padding` parameter to change (or
 * remove, with `padding: 0`) the default padding – e.g. for stories that depend on exact
 * viewport dimensions.
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
    const {themeOverride} = context.parameters.themes ?? {}
    const {padding = 4} = context.parameters

    // oxlint-disable-next-line no-unsafe-type-assertion
    const selected = (themeOverride || selectedTheme || defaultTheme) as ThemeColorSchemeKey

    return (
      // oxlint-disable-next-line no-deprecated
      <ThemeProvider scheme={selected} theme={studioTheme}>
        <GlobalStyle />
        <Card padding={padding}>
          <Story />
        </Card>
      </ThemeProvider>
    )
  }
}
