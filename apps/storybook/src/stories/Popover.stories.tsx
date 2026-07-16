import {Popover as PopoverV3} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, userEvent, waitFor} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Popover} from '../../../../packages/ui/src/components/popover/Popover'

const PerformancePopover = () => {
  return (
    <Popover content="Popover content">
      <button>Open Popover</button>
    </Popover>
  )
}

const PerformancePopoverV3 = () => {
  return (
    <PopoverV3 content="Popover content">
      <button>Open Popover</button>
    </PopoverV3>
  )
}

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Popover"]',
    },
    performance: {
      component: PerformancePopover,
      compareComponent: PerformancePopoverV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (props) => {
    return (
      <Popover {...props} content="Popover Content">
        <Button text="Open Popover" />
      </Popover>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Popover'})

    await userEvent.click(trigger)

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Popover Content')).toBeVisible()
      },
      {timeout: 750},
    )

    await userEvent.keyboard('{Escape}')

    await waitFor(
      async () => {
        await expect(canvas.queryByText('Popover Content')).not.toBeVisible()
      },
      {timeout: 350},
    )
  },
}
