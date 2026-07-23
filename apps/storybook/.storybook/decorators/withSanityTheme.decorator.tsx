import {Card, studioTheme, ThemeProvider} from '@sanity/ui'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {DecoratorHelpers} from '@storybook/addon-themes'
import {Decorator} from '@storybook/react-vite'
import {useLayoutEffect, useRef} from 'react'
import {createGlobalStyle} from 'styled-components'

const {initializeThemeState, pluckThemeFromContext} = DecoratorHelpers

/** Class present on <html> while a scheme switch is in progress (see <SchemeTransition>) */
const SCHEME_TRANSITION_CLASS = 'scheme-transition'
const SCHEME_TRANSITION_DURATION_MS = 250
/** Keep the class on slightly longer than the transitions run, so they are not cut short */
const SCHEME_TRANSITION_WINDOW_MS = SCHEME_TRANSITION_DURATION_MS + 150

const GlobalStyle = createGlobalStyle`
  body,
  .docs-story {
    background-color: ${
      // oxlint-disable-next-line no-deprecated
      ({theme}) => theme.sanity.color.base.bg
    };
  }

  /* Crossfade all color properties while a light/dark switch is in progress. The class is only
     present during the switch (see <SchemeTransition>), so these transitions do not affect
     anything else. */
  @media (prefers-reduced-motion: no-preference) {
    html.${SCHEME_TRANSITION_CLASS} body,
    html.${SCHEME_TRANSITION_CLASS} body *,
    html.${SCHEME_TRANSITION_CLASS} body *::before,
    html.${SCHEME_TRANSITION_CLASS} body *::after {
      transition:
        background-color ${SCHEME_TRANSITION_DURATION_MS}ms ease,
        border-color ${SCHEME_TRANSITION_DURATION_MS}ms ease,
        box-shadow ${SCHEME_TRANSITION_DURATION_MS}ms ease,
        color ${SCHEME_TRANSITION_DURATION_MS}ms ease,
        fill ${SCHEME_TRANSITION_DURATION_MS}ms ease,
        outline-color ${SCHEME_TRANSITION_DURATION_MS}ms ease,
        stroke ${SCHEME_TRANSITION_DURATION_MS}ms ease;
    }
  }
`

let schemeTransitionTimeout: ReturnType<typeof setTimeout> | undefined

/**
 * Renders nothing, but opens a "transition window" whenever the color scheme changes: while the
 * window is open, a class on the root element enables transitions on all color properties (see
 * GlobalStyle above), so the canvas crossfades between light and dark instead of flipping
 * abruptly.
 *
 * The window is shared by all story instances on the page (docs pages render many), so concurrent
 * scheme changes simply extend it.
 */
function SchemeTransition({scheme}: {scheme: ThemeColorSchemeKey}) {
  const previousScheme = useRef(scheme)

  // useLayoutEffect so the class is added in the same frame as the color changes it animates
  useLayoutEffect(() => {
    if (previousScheme.current === scheme) return
    previousScheme.current = scheme

    document.documentElement.classList.add(SCHEME_TRANSITION_CLASS)
    clearTimeout(schemeTransitionTimeout)
    schemeTransitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove(SCHEME_TRANSITION_CLASS)
    }, SCHEME_TRANSITION_WINDOW_MS)
  }, [scheme])

  return null
}

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
        <SchemeTransition scheme={selected} />
        <Card padding={padding}>
          <Story />
        </Card>
      </ThemeProvider>
    )
  }
}
