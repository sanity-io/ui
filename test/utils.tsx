import {
  render as tlRender,
  RenderOptions as TLRenderOptions,
  RenderResult,
} from '@testing-library/react'
import React from 'react'
import {Card, studioTheme, ThemeColorSchemeKey, ThemeProvider} from '../src'

interface RenderOptions extends TLRenderOptions {
  scheme?: ThemeColorSchemeKey
  strict?: boolean
}

const DefaultWrapper: React.FC = ({children}: any) => <main>{children}</main>

export function render(
  element: React.ReactElement<any>,
  options: RenderOptions = {}
): RenderResult {
  const {
    baseElement,
    scheme = 'light',
    strict = false,
    wrapper: InnerWrapper = DefaultWrapper,
  } = options
  const Mode = strict ? React.StrictMode : React.Fragment

  const Wrapper: React.FC = ({children}: any) => {
    return (
      <Mode>
        <InnerWrapper>
          <ThemeProvider theme={studioTheme}>
            <Card padding={4} scheme={scheme}>
              {children}
            </Card>
          </ThemeProvider>
        </InnerWrapper>
      </Mode>
    )
  }

  const result = tlRender(element, {
    baseElement,
    wrapper: Wrapper,
  })

  return result
}
