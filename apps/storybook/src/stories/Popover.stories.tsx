import {Popover as PopoverV3} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {ComponentProps} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Popover} from '../../../../packages/ui/src/components/popover/Popover'
// import {popoverProps} from '../../../../packages/ui/src/components/popover/popover.props'
import {Tooltip} from '../../../../packages/ui/src/components/tooltip/Tooltip'

// const argTypes = getArgTypes(popoverProps)

const PerformancePopover = () => {
  return (
    <Popover>
      <Popover.Trigger>Open Popover</Popover.Trigger>
      <Popover.Content>Popover content</Popover.Content>
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
  args: {},
  // argTypes,
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Popover',
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

// Popover.Trigger renders whatever `as` is given to it, so nesting Tooltip.Trigger
// there lands both sets of trigger attributes (popoverTarget + interestfor) on the
// same DOM node. Sharing the `id` between Popover and Tooltip makes both compute the
// same CSS anchor name, so neither's `style.anchorName` clobbers the other's.
function CombinedTrigger(props: ComponentProps<typeof Button>) {
  return <Tooltip.Trigger {...props} as={Button} />
}

export const WithTooltip: Story = {
  render: (props) => {
    return (
      <Popover {...props} id="combined-trigger">
        <Tooltip id="combined-trigger">
          <Popover.Trigger as={CombinedTrigger} text="Open Popover" />
          <Tooltip.Content text="Tooltip text" />
        </Tooltip>

        <Popover.Content>Popover Content</Popover.Content>
      </Popover>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Popover'})
    const tooltip = await canvas.findByRole('tooltip', {hidden: true})

    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(tooltip).toBeVisible()
      },
      {timeout: 750},
    )

    await userEvent.click(trigger)

    await waitFor(
      async () => {
        await expect(tooltip).not.toBeVisible()
      },
      {timeout: 350},
    )

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Popover Content')).toBeVisible()
      },
      {timeout: 750},
    )
  },
}
