import type {Meta, StoryObj} from '@storybook/react-vite'
import type {ComponentProps} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'
import {Tooltip as TooltipV3} from 'ui3'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Grid} from '../../../../packages/ui/src/components/grid/Grid'
import {Tooltip} from '../../../../packages/ui/src/components/tooltip/Tooltip'
import {tooltipProps} from '../../../../packages/ui/src/components/tooltip/tooltip.props'
import {PLACEMENT} from '../../../../packages/ui/src/types/Placement'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(tooltipProps)

const PerformanceTooltip = (props: ComponentProps<typeof Tooltip>) => {
  return (
    <Tooltip {...props}>
      <button>Open Tooltip</button>
    </Tooltip>
  )
}

const PerformanceTooltipV3 = (props: ComponentProps<typeof Tooltip>) => {
  return (
    <TooltipV3 {...props}>
      <button>Open Tooltip</button>
    </TooltipV3>
  )
}

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  args: {
    text: 'Tooltip text',
  },
  argTypes,
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
      <Tooltip {...props}>
        <Button text="Open Tooltip" />
      </Tooltip>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Tooltip'})
    const tooltip = await canvas.findByRole('tooltip', {hidden: true})

    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(tooltip).toBeVisible()
      },
      {timeout: 750},
    )

    await userEvent.keyboard('{Escape}')

    await waitFor(
      async () => {
        await expect(tooltip).not.toBeVisible()
      },
      {timeout: 350},
    )

    trigger.blur()
  },
}

export const Disabled: Story = {
  parameters: {
    a11y: {disable: true},
  },
  render: (props) => {
    return (
      <Tooltip {...props} disabled>
        <Button text="Open Disabled Tooltip" />
      </Tooltip>
    )
  },
  play: async ({canvas}) => {
    await (await canvas.findByRole('button', {name: 'Open Disabled Tooltip'})).focus()
    expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument()
    await new Promise((resolve) => setTimeout(resolve, 750))
    expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument()
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
              key={placement}
              placement={placement}
              text={`${placement[0].toUpperCase() + placement.slice(1)} Tooltip Text`}
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
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Top-end Tooltip Text')).toBeVisible()
      },
      {timeout: 750},
    )
  },
}
