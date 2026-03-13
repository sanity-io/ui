import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Flex} from './Flex'

describe('primitives/flex', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Flex gap={2}>
        <div>Item A</div>
        <div>Item B</div>
      </Flex>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Flex gap={2}>
        <div>Item A</div>
        <div>Item B</div>
      </Flex>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(
      <Flex>
        <span>Child A</span>
        <span>Child B</span>
      </Flex>,
    )
    const view = within(container)

    expect(view.getByText('Child A')).toBeInTheDocument()
    expect(view.getByText('Child B')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Flex data-testid="flex">content</Flex>)
    const view = within(container)

    expect(view.getByTestId('flex')).toHaveAttribute('data-ui', 'Flex')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Flex as="nav" data-testid="flex">
        content
      </Flex>,
    )
    const view = within(container)

    expect(view.getByTestId('flex').tagName).toBe('NAV')
  })
})
