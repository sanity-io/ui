import {Tooltip as TooltipV3, TooltipDelayGroupProvider} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {ComponentProps} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {TooltipGroup} from '../../../../packages/ui/src/components/tooltip-group/TooltipGroup'
import {tooltipGroupProps} from '../../../../packages/ui/src/components/tooltip-group/tooltipGroup.props'
import {Tooltip} from '../../../../packages/ui/src/components/tooltip/Tooltip'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(tooltipGroupProps)

const PerformanceTooltipGroup = (props: ComponentProps<typeof TooltipGroup>) => {
  return (
    <TooltipGroup {...props}>
      <Tooltip content="Tooltip 1 Text">
        <button>Open Tooltip 1</button>
      </Tooltip>

      <Tooltip content="Tooltip 2 Text">
        <button>Open Tooltip 2</button>
      </Tooltip>
    </TooltipGroup>
  )
}

const PerformanceTooltipGroupV3 = (props: ComponentProps<typeof TooltipDelayGroupProvider>) => {
  return (
    <TooltipDelayGroupProvider {...props}>
      <TooltipV3 content="Tooltip 1 Text">
        <button>Open Tooltip 1</button>
      </TooltipV3>

      <TooltipV3 content="Tooltip 2 Text">
        <button>Open Tooltip 2</button>
      </TooltipV3>
    </TooltipDelayGroupProvider>
  )
}

const meta: Meta<typeof TooltipGroup> = {
  title: 'Components/TooltipGroup',
  argTypes,
  component: TooltipGroup,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="TooltipGroup"]',
    },
    performance: {
      component: PerformanceTooltipGroup,
      compareComponent: PerformanceTooltipGroupV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof TooltipGroup>

export const Default: Story = {
  render: (props) => {
    return (
      <TooltipGroup as={HStack} gap={2} {...props}>
        <Tooltip content="Tooltip 1 Text">
          <Button text="Open Tooltip 1" />
        </Tooltip>

        <Tooltip content="Tooltip 2 Text">
          <Button text="Open Tooltip 2" />
        </Tooltip>

        <Tooltip content="Tooltip 3 Text">
          <Button text="Open Tooltip 3" />
        </Tooltip>
      </TooltipGroup>
    )
  },
  play: async ({canvas, canvasElement}) => {
    const group = canvasElement.querySelector('[data-ui="TooltipGroup"]') as HTMLElement

    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Tooltip 1 Text')).toBeVisible()
      },
      {timeout: 750},
    )

    await waitFor(() => {
      expect(group.style.getPropertyValue('--tooltip-group-delay')).toBe('0ms')
    })

    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Tooltip 2 Text')).toBeVisible()
      },
      {timeout: 200},
    )

    await userEvent.tab()

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Tooltip 3 Text')).toBeVisible()
      },
      {timeout: 200},
    )
  },
}
