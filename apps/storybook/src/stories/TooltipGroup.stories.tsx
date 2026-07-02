import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, waitFor} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {TooltipGroup} from '../../../../packages/ui/src/components/tooltip-group/TooltipGroup'
import {tooltipGroupProps} from '../../../../packages/ui/src/components/tooltip-group/tooltipGroup.props'
import {Tooltip} from '../../../../packages/ui/src/components/tooltip/Tooltip'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(tooltipGroupProps)

const meta: Meta<typeof TooltipGroup> = {
  title: 'Components/TooltipGroup',
  argTypes,
  component: TooltipGroup,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="TooltipGroup"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof TooltipGroup>

export const Default: Story = {
  render: (props) => {
    return (
      <TooltipGroup as={HStack} gap={2} {...props}>
        <Tooltip text="Tooltip 1 Text">
          <Button text="Open Tooltip 1" />
        </Tooltip>

        <Tooltip text="Tooltip 2 Text">
          <Button text="Open Tooltip 2" />
        </Tooltip>

        <Tooltip text="Tooltip 3 Text">
          <Button text="Open Tooltip 3" />
        </Tooltip>
      </TooltipGroup>
    )
  },
  play: async ({canvas}) => {
    await (await canvas.findByRole('button', {name: 'Open Tooltip 1'})).focus()
    await expect(await canvas.findByText('Tooltip 1 Text')).not.toBeVisible()

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Tooltip 1 Text')).toBeVisible()
      },
      {timeout: 750},
    )

    await (await canvas.findByRole('button', {name: 'Open Tooltip 2'})).focus()
    await expect(await canvas.findByText('Tooltip 2 Text')).toBeVisible()
    await (await canvas.findByRole('button', {name: 'Open Tooltip 1'})).focus()
    await expect(await canvas.findByText('Tooltip 1 Text')).toBeVisible()
  },
}
