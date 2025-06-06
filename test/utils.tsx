/* eslint-disable react-refresh/only-export-components */

import {Card, ThemeProvider} from '@sanity/ui'
import {buildTheme, type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {
  render as _testRender,
  type RenderOptions as _TestRenderOptions,
  type RenderResult,
} from '@testing-library/react'
import {Fragment, type ReactNode, StrictMode} from 'react'

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
