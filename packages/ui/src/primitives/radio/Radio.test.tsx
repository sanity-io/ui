import {within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Radio} from './Radio'

describe('primitives/radio', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Radio aria-label="Option" />, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Radio aria-label="Option" />, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Radio aria-label="Option" />)
    const view = within(container)

    expect(view.getByRole('radio').closest('[data-ui="Radio"]')).toBeInTheDocument()
  })

  it('should render as a radio input', () => {
    const {container} = render(<Radio aria-label="Option" />)
    const view = within(container)

    const input = view.getByRole('radio')

    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('should be unchecked by default', () => {
    const {container} = render(<Radio aria-label="Option" />)
    const view = within(container)

    expect(view.getByRole('radio')).not.toBeChecked()
  })

  it('should support checked state', () => {
    const {container} = render(<Radio aria-label="Option" checked readOnly />)
    const view = within(container)

    expect(view.getByRole('radio')).toBeChecked()
  })

  it('should support disabled state', () => {
    const {container} = render(<Radio aria-label="Option" disabled />)
    const view = within(container)

    expect(view.getByRole('radio')).toBeDisabled()
  })

  it('should be disabled when readOnly is set', () => {
    const {container} = render(<Radio aria-label="Option" readOnly />)
    const view = within(container)

    expect(view.getByRole('radio')).toBeDisabled()
  })

  it('should set data-read-only when readOnly is set without disabled', () => {
    const {container} = render(<Radio aria-label="Option" readOnly />)
    const view = within(container)

    expect(view.getByRole('radio')).toHaveAttribute('data-read-only', '')
  })

  it('should not set data-read-only when disabled and readOnly', () => {
    const {container} = render(<Radio aria-label="Option" disabled readOnly />)
    const view = within(container)

    expect(view.getByRole('radio')).not.toHaveAttribute('data-read-only')
  })

  it('should fire onChange when clicked', async () => {
    const handleChange = vi.fn()
    const {container} = render(<Radio aria-label="Option" onChange={handleChange} />)
    const view = within(container)

    await userEvent.click(view.getByRole('radio'))

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should not fire onChange when disabled', async () => {
    const handleChange = vi.fn()
    const {container} = render(<Radio aria-label="Option" disabled onChange={handleChange} />)
    const view = within(container)

    await userEvent.click(view.getByRole('radio'))

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('should set data-invalid when customValidity is set', () => {
    const {container} = render(
      <Radio aria-label="Option" customValidity="This field is required" />,
    )
    const view = within(container)

    expect(view.getByRole('radio')).toHaveAttribute('data-invalid', '')
  })

  it('should not set data-invalid when customValidity is not set', () => {
    const {container} = render(<Radio aria-label="Option" />)
    const view = within(container)

    expect(view.getByRole('radio')).not.toHaveAttribute('data-invalid')
  })

  it('should support a name attribute', () => {
    const {container} = render(<Radio aria-label="Option" name="my-radio-group" />)
    const view = within(container)

    expect(view.getByRole('radio')).toHaveAttribute('name', 'my-radio-group')
  })

  it('should support a value attribute', () => {
    const {container} = render(<Radio aria-label="Option" value="option-1" />)
    const view = within(container)

    expect(view.getByRole('radio')).toHaveAttribute('value', 'option-1')
  })
})
