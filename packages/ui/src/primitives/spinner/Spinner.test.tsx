import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Spinner} from './Spinner'

describe('primitives/spinner', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Spinner />, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Spinner />, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Spinner data-testid="spinner" />)
    const view = within(container)

    expect(view.getByTestId('spinner')).toHaveAttribute('data-ui', 'Spinner')
  })

  it('should render as a div by default', () => {
    const {container} = render(<Spinner data-testid="spinner" />)
    const view = within(container)

    expect(view.getByTestId('spinner').tagName).toBe('DIV')
  })

  it('should render as a custom element', () => {
    const {container} = render(<Spinner as="span" data-testid="spinner" />)
    const view = within(container)

    expect(view.getByTestId('spinner').tagName).toBe('SPAN')
  })
})
