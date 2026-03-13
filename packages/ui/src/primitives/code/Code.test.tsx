import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Code} from './Code'

describe('primitives/code', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Code>{'const x = 1'}</Code>, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Code>{'const x = 1'}</Code>, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render code content', () => {
    const {container} = render(<Code>{'const x = 1'}</Code>)
    const view = within(container)

    expect(view.getByText('const x = 1')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Code data-testid="code">{'hello'}</Code>)
    const view = within(container)

    expect(view.getByTestId('code')).toHaveAttribute('data-ui', 'Code')
  })

  it('should default to a pre element', () => {
    const {container} = render(<Code data-testid="code">{'snippet'}</Code>)
    const view = within(container)

    expect(view.getByTestId('code').tagName).toBe('PRE')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Code as="div" data-testid="code">
        {'snippet'}
      </Code>,
    )
    const view = within(container)

    expect(view.getByTestId('code').tagName).toBe('DIV')
  })
})
