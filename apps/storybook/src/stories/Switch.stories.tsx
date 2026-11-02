import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Switch as SwitchV3} from 'ui3'

import {Switch} from '../../../../packages/ui/src/components/switch/Switch'
import {switchProps} from '../../../../packages/ui/src/components/switch/switch.props'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {VisuallyHidden} from '../../../../packages/ui/src/components/visually-hidden/VisuallyHidden'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(switchProps)

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  argTypes,
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Switch"]',
    },
    performance: {
      component: Switch,
      compareComponent: SwitchV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: (props) => {
    return <Switch {...props} aria-label="Switch" />
  },
  play: async ({canvas}) => {
    await expect(((await canvas.findByLabelText('Switch')) as HTMLInputElement).role).toBe('switch')
  },
}

export const Disabled: Story = {
  render: (props) => {
    return (
      <VStack gap={2}>
        <Switch {...props} aria-label="Disabled switch" disabled />
        <Switch {...props} aria-label="Disabled checked switch" disabled defaultChecked />
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled switch')) as HTMLInputElement).disabled,
    ).toBe(true)
  },
}

export const Error: Story = {
  render: (props) => (
    <VStack gap={2}>
      <Switch {...props} aria-label="Errored switch" hasError />
      <Switch {...props} aria-label="Errored checked switch" hasError defaultChecked />
    </VStack>
  ),
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Errored switch')) as HTMLInputElement).getAttribute(
        'aria-invalid',
      ),
    ).toBe('true')
  },
}
