import {render as tlRender, RenderOptions as TLRenderOptions} from '@testing-library/react'
import React from 'react'
import {studioTheme, ThemeProvider} from '../src/theme'

interface RenderOptions extends TLRenderOptions {
  strict?: boolean
}

const DefaultWrapper: React.FC = ({children}: any) => <main>{children}</main>

export function render(element: React.ReactElement<any>, options: RenderOptions = {}) {
  const {baseElement, strict = false, wrapper: InnerWrapper = DefaultWrapper} = options
  const Mode = strict ? React.StrictMode : React.Fragment

  const Wrapper: React.FC = ({children}: any) => {
    return (
      <Mode>
        <InnerWrapper>
          <ThemeProvider theme={studioTheme}>{children}</ThemeProvider>
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
