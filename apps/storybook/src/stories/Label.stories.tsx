import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Label} from '../../../../packages/ui/src/components/label/Label'
import {labelProps} from '../../../../packages/ui/src/components/label/label.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(labelProps)

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  args: {
    children: 'Label',
  },
  argTypes,
  component: Label,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Label',
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: (props) => {
    return <Label {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Label')).classList).toContain('sui-Label')
  },
}

export const Disabled: Story = {
  render: (props) => {
    return <Label {...props} disabled />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Label')).classList).toContain('sui-text-muted')
  },
}
