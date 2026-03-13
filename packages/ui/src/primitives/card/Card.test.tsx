import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Card} from './Card'

describe('primitives/card', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Card padding={3} tone="positive">
        Card content
      </Card>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Card padding={3} tone="positive">
        Card content
      </Card>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(
      <Card data-testid="card">
        <span>Card content</span>
      </Card>,
    )
    const view = within(container)

    expect(view.getByTestId('card')).toHaveTextContent('Card content')
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Card data-testid="card">content</Card>)
    const view = within(container)

    expect(view.getByTestId('card')).toHaveAttribute('data-ui', 'Card')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Card as="section" data-testid="card">
        content
      </Card>,
    )
    const view = within(container)

    expect(view.getByTestId('card').tagName).toBe('SECTION')
  })

  it('should render as a button', () => {
    const {container} = render(
      <Card as="button" data-testid="card">
        Clickable card
      </Card>,
    )
    const view = within(container)

    expect(view.getByTestId('card').tagName).toBe('BUTTON')
  })

  it('should set data-disabled when disabled', () => {
    const {container} = render(
      <Card disabled data-testid="card">
        Disabled card
      </Card>,
    )
    const view = within(container)

    expect(view.getByTestId('card')).toHaveAttribute('data-disabled', '')
  })

  it('should set data-pressed when pressed', () => {
    const {container} = render(
      <Card pressed data-testid="card">
        Pressed card
      </Card>,
    )
    const view = within(container)

    expect(view.getByTestId('card')).toHaveAttribute('data-pressed', '')
  })

  it('should set data-selected when selected', () => {
    const {container} = render(
      <Card selected data-testid="card">
        Selected card
      </Card>,
    )
    const view = within(container)

    expect(view.getByTestId('card')).toHaveAttribute('data-selected', '')
  })

  it('should support nested cards with different tones', () => {
    const {container} = render(
      <Card tone="primary" data-testid="outer">
        <Card tone="positive" data-testid="inner">
          <span>Nested content</span>
        </Card>
      </Card>,
    )
    const view = within(container)

    expect(view.getByTestId('outer')).toBeInTheDocument()
    expect(view.getByTestId('inner')).toBeInTheDocument()
    expect(view.getByTestId('inner')).toHaveTextContent('Nested content')
  })
})
