import {render as tlRender, RenderOptions as TLRenderOptions} from '@testing-library/react'
import React from 'react'
import {CardProvider} from '../src/atoms/card'
import {ColorSchemeKey, studioTheme, ThemeProvider} from '../src/theme'

interface RenderOptions extends TLRenderOptions {
  scheme?: ColorSchemeKey
  strict?: boolean
}

const DefaultWrapper: React.FC = ({children}: any) => <main>{children}</main>

export function render(element: React.ReactElement<any>, options: RenderOptions = {}) {
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
            <CardProvider scheme={scheme}>{children}</CardProvider>
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
