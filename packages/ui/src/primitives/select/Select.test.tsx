import {within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Select} from './Select'

describe('primitives/select', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Select aria-label="Choose option">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Select aria-label="Choose option">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(
      <Select data-testid="select">
        <option>Option</option>
      </Select>,
    )
    const view = within(container)

    expect(view.getByTestId('select').closest('[data-ui="Select"]')).toBeInTheDocument()
  })

  it('should render as a select element', () => {
    const {container} = render(
      <Select aria-label="Pick one">
        <option value="a">Option A</option>
      </Select>,
    )
    const view = within(container)

    expect(view.getByRole('combobox')).toBeInTheDocument()
  })

  it('should render options', () => {
    const {container} = render(
      <Select aria-label="Pick one">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </Select>,
    )
    const view = within(container)

    const options = view.getAllByRole('option')

    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('Option A')
    expect(options[1]).toHaveTextContent('Option B')
    expect(options[2]).toHaveTextContent('Option C')
  })

  it('should select the first option by default', () => {
    const {container} = render(
      <Select aria-label="Pick one">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
    )
    const view = within(container)

    expect(view.getByRole('combobox')).toHaveValue('a')
  })

  it('should support a default value', () => {
    const {container} = render(
      <Select aria-label="Pick one" defaultValue="b">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
    )
    const view = within(container)

    expect(view.getByRole('combobox')).toHaveValue('b')
  })

  it('should fire onChange when selection changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    const {container} = render(
      <Select aria-label="Pick one" onChange={handleChange}>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
    )
    const view = within(container)

    await user.selectOptions(view.getByRole('combobox'), 'b')

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is set', () => {
    const {container} = render(
      <Select aria-label="Pick one" disabled>
        <option value="a">Option A</option>
      </Select>,
    )
    const view = within(container)

    expect(view.getByRole('combobox')).toBeDisabled()
  })

  it('should be disabled when readOnly prop is set', () => {
    const {container} = render(
      <Select aria-label="Pick one" readOnly>
        <option value="a">Option A</option>
      </Select>,
    )
    const view = within(container)

    expect(view.getByRole('combobox')).toBeDisabled()
  })
})
