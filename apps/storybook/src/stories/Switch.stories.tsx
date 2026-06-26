import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Switch} from '../../../../packages/ui/src/components/switch/Switch'
import {switchProps} from '../../../../packages/ui/src/components/switch/switch.props'
import {VisuallyHidden} from '../../../../packages/ui/src/components/visually-hidden/VisuallyHidden'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(switchProps)

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  args: {
    label: 'Switch',
  },
  argTypes,
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Switch',
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: (props) => {
    return <Switch {...props} />
  },
  play: async ({canvas}) => {
    await expect(((await canvas.findByLabelText('Switch')) as HTMLInputElement).role).toBe('switch')
  },
}

export const Disabled: Story = {
  render: (props) => {
    return <Switch {...props} label="Disabled switch" disabled />
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled switch')) as HTMLInputElement).disabled,
    ).toBe(true)
  },
}

export const VisuallyHiddenLabel: Story = {
  render: (props) => {
    return (
      <Switch {...props} label={<VisuallyHidden>Visually hidden label switch</VisuallyHidden>} />
    )
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Visually hidden label switch')) as HTMLInputElement).role,
    ).toBe('switch')
  },
}
