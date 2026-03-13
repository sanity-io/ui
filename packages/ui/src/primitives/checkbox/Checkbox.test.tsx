import {within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Checkbox} from './Checkbox'

describe('primitives/checkbox', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <label>
        <Checkbox /> Accept terms
      </label>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <label>
        <Checkbox /> Accept terms
      </label>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Checkbox data-testid="checkbox" />)
    const view = within(container)

    expect(view.getByTestId('checkbox').closest('[data-ui="Checkbox"]')).toBeInTheDocument()
  })

  it('should render as a checkbox input', () => {
    const {container} = render(<Checkbox />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toBeInTheDocument()
  })

  it('should be unchecked by default', () => {
    const {container} = render(<Checkbox />)
    const view = within(container)

    expect(view.getByRole('checkbox')).not.toBeChecked()
  })

  it('should support being checked', () => {
    const {container} = render(<Checkbox defaultChecked />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toBeChecked()
  })

  it('should toggle when clicked', async () => {
    const user = userEvent.setup()
    const {container} = render(<Checkbox />)
    const view = within(container)

    const checkbox = view.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('should be disabled when disabled prop is set', () => {
    const {container} = render(<Checkbox disabled />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toBeDisabled()
  })

  it('should be disabled when readOnly prop is set', () => {
    const {container} = render(<Checkbox readOnly />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toBeDisabled()
  })

  it('should set data-read-only when readOnly and not disabled', () => {
    const {container} = render(<Checkbox readOnly />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toHaveAttribute('data-read-only', '')
  })

  it('should not set data-read-only when disabled', () => {
    const {container} = render(<Checkbox disabled readOnly />)
    const view = within(container)

    expect(view.getByRole('checkbox')).not.toHaveAttribute('data-read-only')
  })

  it('should set data-invalid when customValidity is provided', () => {
    const {container} = render(<Checkbox customValidity="This field is required" />)
    const view = within(container)

    expect(view.getByRole('checkbox')).toHaveAttribute('data-invalid', '')
  })

  it('should not set data-invalid when customValidity is not provided', () => {
    const {container} = render(<Checkbox />)
    const view = within(container)

    expect(view.getByRole('checkbox')).not.toHaveAttribute('data-invalid')
  })
})
