import {Card, ThemeProvider} from '@sanity/ui'
import {defaultTheme, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {
  render as _testRender,
  RenderOptions as _TestRenderOptions,
  RenderResult,
} from '@testing-library/react'
import {StrictMode, Fragment, ReactElement, ReactNode} from 'react'

export interface TestRenderOptions extends _TestRenderOptions {
  scheme?: ThemeColorSchemeKey
  strict?: boolean
}

function DefaultWrapper({children}: {children?: ReactNode}) {
  return <main>{children}</main>
}

export function render(rootElement: ReactElement, options: TestRenderOptions = {}): RenderResult {
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
          <ThemeProvider theme={defaultTheme}>
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
