import {within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {TextArea} from './TextArea'

describe('primitives/textArea', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<TextArea aria-label="Description" />, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<TextArea aria-label="Description" />, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<TextArea data-testid="textarea" />)
    const view = within(container)

    expect(view.getByTestId('textarea').closest('[data-ui="TextArea"]')).toBeInTheDocument()
  })

  it('should render as a textarea element', () => {
    const {container} = render(<TextArea data-testid="textarea" />)
    const view = within(container)

    expect(view.getByRole('textbox').tagName).toBe('TEXTAREA')
  })

  it('should support placeholder text', () => {
    const {container} = render(<TextArea placeholder="Write something…" />)
    const view = within(container)

    expect(view.getByPlaceholderText('Write something…')).toBeInTheDocument()
  })

  it('should accept user input', async () => {
    const user = userEvent.setup()

    const {container} = render(<TextArea data-testid="textarea" />)
    const view = within(container)

    const textarea = view.getByRole('textbox')

    await user.type(textarea, 'Hello world')

    expect(textarea).toHaveValue('Hello world')
  })

  it('should support rows prop', () => {
    const {container} = render(<TextArea rows={6} data-testid="textarea" />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveAttribute('rows', '6')
  })

  it('should be disabled when disabled prop is set', () => {
    const {container} = render(<TextArea disabled />)
    const view = within(container)

    expect(view.getByRole('textbox')).toBeDisabled()
  })

  it('should be read-only when readOnly prop is set', () => {
    const {container} = render(<TextArea readOnly />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveAttribute('readonly')
  })

  it('should set data-read-only when readOnly is set without disabled', () => {
    const {container} = render(<TextArea readOnly />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveAttribute('data-read-only', '')
  })

  it('should not set data-read-only when disabled and readOnly', () => {
    const {container} = render(<TextArea disabled readOnly />)
    const view = within(container)

    expect(view.getByRole('textbox')).not.toHaveAttribute('data-read-only')
  })

  it('should set data-invalid when customValidity is provided', () => {
    const {container} = render(<TextArea customValidity="This field is required" />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveAttribute('data-invalid', '')
  })

  it('should not set data-invalid when customValidity is not provided', () => {
    const {container} = render(<TextArea />)
    const view = within(container)

    expect(view.getByRole('textbox')).not.toHaveAttribute('data-invalid')
  })

  it('should fire onChange when typing', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    const {container} = render(<TextArea onChange={handleChange} />)
    const view = within(container)

    await user.type(view.getByRole('textbox'), 'a')

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
