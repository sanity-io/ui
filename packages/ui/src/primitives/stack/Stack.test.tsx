import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Stack} from './Stack'

describe('primitives/stack', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Stack gap={3}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Stack gap={3}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(
      <Stack>
        <div>First child</div>
        <div>Second child</div>
      </Stack>,
    )
    const view = within(container)

    expect(view.getByText('First child')).toBeInTheDocument()
    expect(view.getByText('Second child')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Stack data-testid="stack">content</Stack>)
    const view = within(container)

    expect(view.getByTestId('stack')).toHaveAttribute('data-ui', 'Stack')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Stack as="ul" data-testid="stack">
        <li>Item</li>
      </Stack>,
    )
    const view = within(container)

    expect(view.getByTestId('stack').tagName).toBe('UL')
  })
})
