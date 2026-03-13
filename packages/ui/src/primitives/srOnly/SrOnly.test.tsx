import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {SrOnly} from './SrOnly'

describe('primitives/srOnly', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<SrOnly>Screen reader text</SrOnly>, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<SrOnly>Screen reader text</SrOnly>, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(<SrOnly>Hidden text for screen readers</SrOnly>)
    const view = within(container)

    expect(view.getByText('Hidden text for screen readers')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<SrOnly data-testid="sr-only">content</SrOnly>)
    const view = within(container)

    expect(view.getByTestId('sr-only')).toHaveAttribute('data-ui', 'SrOnly')
  })

  it('should render as a span by default', () => {
    const {container} = render(<SrOnly data-testid="sr-only">content</SrOnly>)
    const view = within(container)

    expect(view.getByTestId('sr-only').tagName).toBe('SPAN')
  })

  it('should set aria-hidden attribute', () => {
    const {container} = render(<SrOnly data-testid="sr-only">content</SrOnly>)
    const view = within(container)

    expect(view.getByTestId('sr-only')).toHaveAttribute('aria-hidden')
  })
})
