import {SearchIcon} from '@sanity/icons'
import {within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {TextInput} from './TextInput'

describe('primitives/textInput', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<TextInput aria-label="Search" placeholder="Search…" />, {
      scheme: 'light',
    })

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<TextInput aria-label="Search" placeholder="Search…" />, {
      scheme: 'dark',
    })

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<TextInput aria-label="Name" />)
    const view = within(container)

    expect(view.getByRole('textbox').closest('[data-ui="TextInput"]')).toBeInTheDocument()
  })

  it('should render as an input element by default', () => {
    const {container} = render(<TextInput aria-label="Name" />)
    const view = within(container)

    const input = view.getByRole('textbox')

    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('should render with placeholder text', () => {
    const {container} = render(<TextInput aria-label="Email" placeholder="Enter email" />)
    const view = within(container)

    expect(view.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('should accept user input', async () => {
    const user = userEvent.setup()

    const {container} = render(<TextInput aria-label="Name" />)
    const view = within(container)

    const input = view.getByRole('textbox')

    await user.type(input, 'Hello world')

    expect(input).toHaveValue('Hello world')
  })

  it('should fire onChange when typing', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    const {container} = render(<TextInput aria-label="Name" onChange={handleChange} />)
    const view = within(container)

    await user.type(view.getByRole('textbox'), 'a')

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is set', () => {
    const {container} = render(<TextInput aria-label="Name" disabled />)
    const view = within(container)

    expect(view.getByRole('textbox')).toBeDisabled()
  })

  it('should be disabled when readOnly prop is set', () => {
    const {container} = render(<TextInput aria-label="Name" readOnly />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveAttribute('data-read-only', '')
  })

  it('should set data-invalid when customValidity is provided', () => {
    const {container} = render(<TextInput aria-label="Name" customValidity="This field is required" />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveAttribute('data-invalid', '')
  })

  it('should not set data-invalid when customValidity is not provided', () => {
    const {container} = render(<TextInput aria-label="Name" />)
    const view = within(container)

    expect(view.getByRole('textbox')).not.toHaveAttribute('data-invalid')
  })

  it('should render an icon when icon prop is set', () => {
    const {container} = render(<TextInput aria-label="Search" icon={SearchIcon} />)
    const view = within(container)

    const wrapper = view.getByRole('textbox').closest('[data-ui="TextInput"]')

    expect(wrapper).toHaveAttribute('data-icon-left', '')
  })

  it('should render an icon right when iconRight prop is set', () => {
    const {container} = render(<TextInput aria-label="Search" iconRight={SearchIcon} />)
    const view = within(container)

    const wrapper = view.getByRole('textbox').closest('[data-ui="TextInput"]')

    expect(wrapper).toHaveAttribute('data-icon-right', '')
  })

  it('should render a prefix when prefix prop is set', () => {
    const {container} = render(<TextInput aria-label="URL" prefix={<span>https://</span>} />)
    const view = within(container)

    expect(view.getByText('https://')).toBeInTheDocument()

    const wrapper = view.getByRole('textbox').closest('[data-ui="TextInput"]')

    expect(wrapper).toHaveAttribute('data-prefix', '')
  })

  it('should render a suffix when suffix prop is set', () => {
    const {container} = render(<TextInput aria-label="Domain" suffix={<span>.com</span>} />)
    const view = within(container)

    expect(view.getByText('.com')).toBeInTheDocument()

    const wrapper = view.getByRole('textbox').closest('[data-ui="TextInput"]')

    expect(wrapper).toHaveAttribute('data-suffix', '')
  })

  it('should render a clear button when clearButton is true', () => {
    const {container} = render(<TextInput aria-label="Search" clearButton />)
    const view = within(container)

    expect(view.getByRole('button', {name: 'Clear'})).toBeInTheDocument()
  })

  it('should not render a clear button when disabled', () => {
    const {container} = render(<TextInput aria-label="Search" clearButton disabled />)
    const view = within(container)

    expect(view.queryByRole('button', {name: 'Clear'})).not.toBeInTheDocument()
  })

  it('should not render a clear button when readOnly', () => {
    const {container} = render(<TextInput aria-label="Search" clearButton readOnly />)
    const view = within(container)

    expect(view.queryByRole('button', {name: 'Clear'})).not.toBeInTheDocument()
  })

  it('should fire onClear when clear button is clicked', async () => {
    const handleClear = vi.fn()
    const user = userEvent.setup()

    const {container} = render(<TextInput aria-label="Search" clearButton onClear={handleClear} />)
    const view = within(container)

    await user.click(view.getByRole('button', {name: 'Clear'}))

    expect(handleClear).toHaveBeenCalledTimes(1)
  })

  it('should default to type text', () => {
    const {container} = render(<TextInput aria-label="Name" />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveAttribute('type', 'text')
  })

  it('should support a value prop', () => {
    const {container} = render(<TextInput aria-label="Name" value="Existing value" readOnly />)
    const view = within(container)

    expect(view.getByRole('textbox')).toHaveValue('Existing value')
  })
})
