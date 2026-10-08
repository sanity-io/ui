import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {KBD as KBDV3} from 'ui3'

import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {KBD} from '../../../../packages/ui/src/components/kbd/KBD'
import {kbdProps} from '../../../../packages/ui/src/components/kbd/kbd.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(kbdProps)

function KBDV3Comparison({text}: {text?: string}) {
  return <KBDV3>{text}</KBDV3>
}

const meta: Meta<typeof KBD> = {
  title: 'Components/KBD',
  args: {
    text: 'Ctrl',
  },
  argTypes,
  component: KBD,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="KBD"]',
    },
    performance: {
      component: KBD,
      compareComponent: KBDV3Comparison,
    },
  },
}

export default meta
type Story = StoryObj<typeof KBD>

export const Default: Story = {
  render: (props) => {
    return <KBD {...props} />
  },
  play: async ({canvas}) => {
    const kbd = (await canvas.findByText('Ctrl')).closest('[data-ui="KBD"]')

    await expect(kbd?.tagName).toBe('KBD')
  },
}

export const Shortcut: Story = {
  render: () => {
    return (
      <HStack gap={1}>
        <KBD text="Ctrl" />
        <KBD text="Alt" />
        <KBD text="P" />
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect(canvas.getAllByText(/^(Ctrl|Alt|P)$/)).toHaveLength(3)
  },
}
