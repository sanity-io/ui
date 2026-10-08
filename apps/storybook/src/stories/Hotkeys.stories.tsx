import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Hotkeys as HotkeysV3} from 'ui3'

import {Hotkeys} from '../../../../packages/ui/src/components/hotkeys/Hotkeys'
import {hotkeysProps} from '../../../../packages/ui/src/components/hotkeys/hotkeys.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(hotkeysProps)

function HotkeysV3Comparison({keys}: {keys?: string[]}) {
  return <HotkeysV3 keys={keys} />
}

const meta: Meta<typeof Hotkeys> = {
  title: 'Components/Hotkeys',
  args: {
    keys: ['Ctrl', 'Alt', 'P'],
  },
  argTypes,
  component: Hotkeys,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Hotkeys"]',
    },
    performance: {
      component: Hotkeys,
      compareComponent: HotkeysV3Comparison,
    },
  },
}

export default meta
type Story = StoryObj<typeof Hotkeys>

export const Default: Story = {
  render: (props) => {
    return <Hotkeys {...props} />
  },
  play: async ({canvasElement}) => {
    const hotkeys = canvasElement.querySelector('[data-ui="Hotkeys"]')

    await expect(hotkeys?.tagName).toBe('KBD')
    await expect(hotkeys?.querySelectorAll('[data-ui="KBD"]')).toHaveLength(3)
  },
}

export const SingleKey: Story = {
  args: {
    keys: ['Alt'],
  },
  render: (props) => {
    return <Hotkeys {...props} />
  },
  play: async ({canvasElement}) => {
    await expect(canvasElement.querySelectorAll('[data-ui="KBD"]')).toHaveLength(1)
  },
}
