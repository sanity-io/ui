import {
  render as _testRender,
  RenderOptions as _TestRenderOptions,
  RenderResult,
} from '@testing-library/react'
import {Fragment, ReactNode, StrictMode} from 'react'

import {Card} from '../src/core/primitives/card/card'
import {ThemeProvider} from '../src/core/theme/themeProvider'
import {buildTheme} from '../src/theme/build/buildTheme'
import {ThemeColorSchemeKey} from '../src/theme/system/color/_system'

export interface TestRenderOptions extends _TestRenderOptions {
  scheme?: ThemeColorSchemeKey
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
    const Strictness = strict ? StrictMode : Fragment

    return (
      <Strictness>
        <InnerWrapper>
          <ThemeProvider theme={theme}>
            <Card padding={4} scheme={scheme}>
              {children}
            </Card>
          </ThemeProvider>
        </InnerWrapper>
      </Strictness>
    )
  }

  return _testRender(rootElement, {
    baseElement,
    wrapper: TestWrapper,
  })
}
