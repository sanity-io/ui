import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, waitFor} from 'storybook/test'
import {Checkbox as CheckboxV3} from 'ui3'

import {Checkbox} from '../../../../packages/ui/src/components/checkbox/Checkbox'
import {checkboxProps} from '../../../../packages/ui/src/components/checkbox/checkbox.props'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(checkboxProps)

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  argTypes,
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Checkbox"]',
    },
    performance: {
      component: Checkbox,
      compareComponent: CheckboxV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (props) => {
    return <Checkbox {...props} aria-label="Checkbox" />
  },
  play: async ({canvas}) => {
    await expect(((await canvas.findByLabelText('Checkbox')) as HTMLInputElement).type).toBe(
      'checkbox',
    )
  },
}

export const Indeterminate: Story = {
  render: (props) => {
    return <Checkbox {...props} aria-label="Indeterminate checkbox" indeterminate />
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
    return (
      <VStack gap={2}>
        <Checkbox {...props} aria-label="Disabled checkbox" disabled />
        <Checkbox {...props} checked aria-label="Disabled checked checkbox" disabled />
        <Checkbox
          {...props}
          checked
          aria-label="Disabled checked checkbox"
          disabled
          indeterminate
        />
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled checkbox')) as HTMLInputElement).disabled,
    ).toBe(true)
  },
}

export const Error: Story = {
  render: (props) => (
    <VStack gap={2}>
      <Checkbox {...props} aria-label="Errored checkbox" hasError />
      <Checkbox {...props} checked aria-label="Errored checked checkbox" hasError />
      <Checkbox {...props} checked aria-label="Errored checked checkbox" hasError indeterminate />
    </VStack>
  ),
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Errored checkbox')) as HTMLInputElement).getAttribute(
        'aria-invalid',
      ),
    ).toBe('true')
  },
}
