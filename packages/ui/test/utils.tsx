import {
  render as _testRender,
  RenderOptions as _TestRenderOptions,
  RenderResult,
} from '@testing-library/react'
import {ReactNode} from 'react'

import {Card} from '../src/core/primitives/card/card'
import {ThemeProvider} from '../src/core/theme/themeProvider'
import {buildTheme} from '../src/theme/build/buildTheme'
import {ThemeColorSchemeKey} from '../src/theme/system/color/_system'

export interface TestRenderOptions extends _TestRenderOptions {
  scheme?: ThemeColorSchemeKey
  /**
   * Render under `<StrictMode>` (the default). React double-invokes renders and, on mount, runs
   * every effect's cleanup and setup again; opt out with `false` for tests that count effect runs.
   */
  strict?: boolean
}

const theme = buildTheme()

function DefaultWrapper({children}: {children?: ReactNode}) {
  return <main>{children}</main>
}

export function render(
  rootElement: React.JSX.Element,
  options: TestRenderOptions = {},
): RenderResult {
  const {
    baseElement,
    scheme = 'light',
    strict = true,
    wrapper: InnerWrapper = DefaultWrapper,
  } = options

  function TestWrapper({children}: {children?: React.ReactNode}) {
    return (
      <InnerWrapper>
        <ThemeProvider theme={theme}>
          <Card padding={4} scheme={scheme}>
            {children}
          </Card>
        </ThemeProvider>
      </InnerWrapper>
    )
  }

  // `reactStrictMode` makes React Testing Library render `<StrictMode>` around the wrapper, so it
  // is the outermost element. React only re-runs the mount effects of a newly placed subtree when
  // `StrictMode` sits at (or above) its top (`recursivelyTraverseAndDoubleInvokeEffectsInDEV`): a
  // `<StrictMode>` rendered *inside* the wrapper component doubles renders but never the effects.
  return _testRender(rootElement, {
    baseElement,
    reactStrictMode: strict,
    wrapper: TestWrapper,
  })
}
