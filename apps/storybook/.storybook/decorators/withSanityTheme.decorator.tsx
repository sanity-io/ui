import {Card, studioTheme, ThemeProvider} from '@sanity/ui'
import {DecoratorHelpers} from '@storybook/addon-themes'
import {StoryFn} from '@storybook/react'
import {createGlobalStyle} from 'styled-components'

const {initializeThemeState, pluckThemeFromContext} = DecoratorHelpers

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
 * Stories are also wrapped in a <Card> for layout. Set the `padding` parameter to change (or
 * remove, with `padding: 0`) the default padding – e.g. for stories that depend on exact
 * viewport dimensions.
 */

export const withSanityTheme = ({themes, defaultTheme}) => {
  initializeThemeState(Object.keys(themes), defaultTheme)

  return (Story: StoryFn, context) => {
    const selectedTheme = pluckThemeFromContext(context)
    const {themeOverride} = context.parameters.themes ?? {}
    const {padding = 4} = context.parameters

    const selected = themeOverride || selectedTheme || defaultTheme

    return (
      <ThemeProvider scheme={selected} theme={studioTheme}>
        <GlobalStyle />
        <Card padding={padding}>
          <Story />
        </Card>
      </ThemeProvider>
    )
  }
}
