import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, userEvent} from 'storybook/test'
import {Select as SelectV3} from 'ui3'

import {Select} from '../../../../packages/ui/src/components/select/Select'
import {selectProps} from '../../../../packages/ui/src/components/select/select.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(selectProps)

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  args: {},
  argTypes,
  component: Select,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Select"]',
    },
    performance: {
      component: Select,
      compareComponent: SelectV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const options = (
  <>
    <optgroup label="The first three">
      <option>First</option>
      <option>Second</option>
      <option>Third</option>
    </optgroup>
    <option>
      Everything else and the option is so long it should run into the dropdown icon when it’s
      selected!
    </option>
  </>
)

export const Default: Story = {
  render: (props) => (
    <Select {...props} id="default-select" aria-label="Choose an option">
      {options}
    </Select>
  ),
  play: async ({canvas}) => {
    // Renders a native select with an accessible name.
    const select = (await canvas.findByRole('combobox', {
      name: 'Choose an option',
    })) as HTMLSelectElement

    // Renders the options, including those inside an optgroup.
    await expect(canvas.getByRole('option', {name: 'First'})).toBeInTheDocument()

    // A user selection updates the value.
    await userEvent.selectOptions(select, 'Second')
    await expect(select.value).toBe('Second')

    // The default select is valid and enabled.
    await expect(select.getAttribute('aria-invalid')).toBeNull()
    await expect(select.disabled).toBe(false)
  },
}

export const Disabled: Story = {
  render: (props) => (
    <Select {...props} id="disabled-select" aria-label="Disabled select" disabled>
      {options}
    </Select>
  ),
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled select')) as HTMLSelectElement).disabled,
    ).toBe(true)
  },
}

export const Error: Story = {
  render: (props) => (
    <Select {...props} id="error-select" aria-label="Select with error" hasError>
      {options}
    </Select>
  ),
  play: async ({canvas}) => {
    // The error prop marks the element invalid and adds the error class.
    const select = await canvas.findByRole('combobox', {name: 'Select with error'})
    await expect(select.getAttribute('aria-invalid')).toBe('true')
    await expect(select.className).toContain('sui-error')
  },
}
