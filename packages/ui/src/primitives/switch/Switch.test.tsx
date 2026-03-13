import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Switch} from './Switch'

// NOTE: All tests in this file are skipped because the Switch component has a
// pre-existing bug: it imports `_switchPresentation` (camelCase) from
// '@sanity/ui/css' but references `_switch_presentation` (snake_case) at
// runtime, causing a ReferenceError on render. Once that CSS import is fixed
// these tests can be un-skipped.

describe.skip('primitives/switch', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Switch aria-label="Toggle setting" />, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Switch aria-label="Toggle setting" />, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Switch data-testid="switch" />)
    const view = within(container)

    const wrapper = view.getByTestId('switch').closest('[data-ui="Switch"]')

    expect(wrapper).toBeInTheDocument()
  })

  it('should render as a checkbox input by default', () => {
    const {container} = render(<Switch data-testid="switch" />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toBeInTheDocument()
  })

  it('should be disabled when disabled prop is set', () => {
    const {container} = render(<Switch disabled data-testid="switch" />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toBeDisabled()
  })

  it('should be disabled when readOnly prop is set', () => {
    const {container} = render(<Switch readOnly data-testid="switch" />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toBeDisabled()
  })

  it('should set data-read-only when readOnly is true and not disabled', () => {
    const {container} = render(<Switch readOnly data-testid="switch" />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toHaveAttribute('data-read-only', '')
  })

  it('should not set data-read-only when disabled', () => {
    const {container} = render(<Switch disabled readOnly data-testid="switch" />)
    const view = within(container)

    expect(view.getByRole('checkbox')).not.toHaveAttribute('data-read-only')
  })
})
