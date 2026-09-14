import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, userEvent, waitFor} from 'storybook/test'
import {Tooltip as TooltipV3} from 'ui3'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Grid} from '../../../../packages/ui/src/components/grid/Grid'
import {Popover} from '../../../../packages/ui/src/components/popover/Popover'
import {Tooltip} from '../../../../packages/ui/src/components/tooltip/Tooltip'
import {PLACEMENT} from '../../../../packages/ui/src/types/Placement'

const PerformanceTooltip = () => {
  return (
    <Tooltip content="Tooltip content">
      <button>Open Tooltip</button>
    </Tooltip>
  )
}

const PerformanceTooltipV3 = () => {
  return (
    <TooltipV3 content="Tooltip content">
      <button>Open Tooltip</button>
    </TooltipV3>
  )
}

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Tooltip"]',
    },
    performance: {
      component: PerformanceTooltip,
      compareComponent: PerformanceTooltipV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (props) => {
    return (
      <Tooltip {...props} content="Tooltip Content">
        <Button text="Open Tooltip" />
      </Tooltip>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Tooltip'})
    const tooltip = await canvas.findByText('Tooltip Content')

    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(tooltip).toBeVisible()
      },
      {timeout: 750},
    )

    trigger.blur()
  },
}

export const Placements: Story = {
  render: (props) => {
    return (
      <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3} paddingX={3} paddingY={4}>
        {PLACEMENT.map((placement) => (
          <div key={placement}>
            <Tooltip
              {...props}
              placement={placement}
              content={`${placement[0].toUpperCase() + placement.slice(1)} Tooltip Content`}
            >
              <Button
                text={`${placement[0].toUpperCase() + placement.slice(1)} Tooltip`}
                density="loose"
                fullWidth
              />
            </Tooltip>
          </div>
        ))}
      </Grid>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Top-end Tooltip'})

    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Top-end Tooltip Content')).toBeVisible()
      },
      {timeout: 750},
    )

    trigger.blur()
  },
}

export const WithPopover: Story = {
  render: (props) => (
    <Tooltip {...props} anchorName="tooltip-popover" content="Tooltip Content">
      <Popover anchorName="tooltip-popover" content="Popover Content">
        <Button text="Open Tooltip or Popover" />
      </Popover>
    </Tooltip>
  ),
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Tooltip or Popover'})
    const tooltip = await canvas.findByText('Tooltip Content')
    const popover = await canvas.findByText('Popover Content')

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
      {timeout: 250},
    )

    await waitFor(
      async () => {
        await expect(popover).toBeVisible()
      },
      {timeout: 500},
    )

    await userEvent.click(trigger)
    trigger.blur()
  },
}
