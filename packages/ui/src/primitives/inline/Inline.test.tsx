import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Inline} from './Inline'

describe('primitives/inline', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Inline gap={2}>
        <span>Tag A</span>
        <span>Tag B</span>
      </Inline>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Inline gap={2}>
        <span>Tag A</span>
        <span>Tag B</span>
      </Inline>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(
      <Inline gap={2}>
        <span>First</span>
        <span>Second</span>
        <span>Third</span>
      </Inline>,
    )
    const view = within(container)

    expect(view.getByText('First')).toBeInTheDocument()
    expect(view.getByText('Second')).toBeInTheDocument()
    expect(view.getByText('Third')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Inline data-testid="inline">content</Inline>)
    const view = within(container)

    expect(view.getByTestId('inline')).toHaveAttribute('data-ui', 'Inline')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Inline as="nav" data-testid="inline">
        <span>Link A</span>
        <span>Link B</span>
      </Inline>,
    )
    const view = within(container)

    expect(view.getByTestId('inline').tagName).toBe('NAV')
  })
})
