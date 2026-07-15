import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Popover} from '../../../../packages/ui/src/components/popover/Popover'
// import {popoverProps} from '../../../../packages/ui/src/components/popover/popover.props'
import {getArgTypes} from '../utils/getArgTypes'

// const argTypes = getArgTypes(popoverProps)

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  args: {},
  // argTypes,
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Popover',
    },
    performance: {
      component: Popover,
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (props) => {
    return (
      <Popover {...props}>
        <Popover.Trigger as={Button} text="Open Popover" />

        <Popover.Content>Popover Content</Popover.Content>
      </Popover>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}
