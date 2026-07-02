import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, waitFor} from 'storybook/test'

import {Checkbox} from '../../../../packages/ui/src/components/checkbox/Checkbox'
import {checkboxProps} from '../../../../packages/ui/src/components/checkbox/checkbox.props'
import {VisuallyHidden} from '../../../../packages/ui/src/components/visually-hidden/VisuallyHidden'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(checkboxProps)

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  args: {
    label: 'Checkbox',
  },
  argTypes,
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Checkbox"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (props) => {
    return <Checkbox {...props} />
  },
  play: async ({canvas}) => {
    await expect(((await canvas.findByLabelText('Checkbox')) as HTMLInputElement).type).toBe(
      'checkbox',
    )
  },
}

export const Indeterminate: Story = {
  render: (props) => {
    return <Checkbox {...props} label="Indeterminate checkbox" indeterminate />
  },
  play: async ({canvas}) => {
    await waitFor(async () => {
      await expect(
        ((await canvas.findByLabelText('Indeterminate checkbox')) as HTMLInputElement)
          .indeterminate,
      ).toBe(true)
    })
  },
}

export const Disabled: Story = {
  render: (props) => {
    return <Checkbox {...props} label="Disabled checkbox" disabled />
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled checkbox')) as HTMLInputElement).disabled,
    ).toBe(true)
  },
}

export const VisuallyHiddenLabel: Story = {
  render: (props) => {
    return (
      <Checkbox
        {...props}
        label={<VisuallyHidden>Visually hidden label checkbox</VisuallyHidden>}
      />
    )
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Visually hidden label checkbox')) as HTMLInputElement).type,
    ).toBe('checkbox')
  },
}
