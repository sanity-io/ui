/* eslint-disable react-refresh/only-export-components */

import {Root} from '@sanity/ui'
import {type ColorScheme} from '@sanity/ui/theme'
import {
  render as _testRender,
  type RenderOptions as _TestRenderOptions,
  type RenderResult,
} from '@testing-library/react'
import {Fragment, type ReactNode, StrictMode} from 'react'

export interface TestRenderOptions extends _TestRenderOptions {
  scheme?: ColorScheme
  strict?: boolean
}

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
          <Root as="div" padding={4} scheme={scheme}>
            {children}
          </Root>
        </InnerWrapper>
      </Strictness>
    )
  }

  return _testRender(rootElement, {
    baseElement,
    wrapper: TestWrapper,
  })
}
