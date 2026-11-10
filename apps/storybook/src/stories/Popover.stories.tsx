import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, screen, userEvent, waitFor} from 'storybook/test'
import {Popover as PopoverV3} from 'ui3'

import {Box} from '../../../../packages/ui/src/components/box/Box'
import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {Grid} from '../../../../packages/ui/src/components/grid/Grid'
import {Popover} from '../../../../packages/ui/src/components/popover/Popover'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {Tooltip} from '../../../../packages/ui/src/components/tooltip/Tooltip'
import {PLACEMENT} from '../../../../packages/ui/src/types/Placement'

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
      {timeout: 500},
    )

    await userEvent.click(trigger)
    trigger.blur()
  },
}

export const FullBleed: Story = {
  render: (props) => {
    return (
      <Popover
        {...props}
        content={
          <Box padding={1}>
            <Text size={1} trim>
              Popover Content
            </Text>
          </Box>
        }
        fullBleed
      >
        <Button text="Open Popover" />
      </Popover>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Popover'})

    await userEvent.click(trigger)

    await waitFor(
      async () => {
        await expect(
          (await canvas.findByText('Popover Content')).parentElement?.parentElement?.classList,
        ).toContain('sui-p0')
      },
      {timeout: 500},
    )

    await userEvent.click(trigger)
    trigger.blur()
  },
}

export const Placements: Story = {
  render: (props) => {
    return (
      <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3} paddingX={3} paddingY={4}>
        {PLACEMENT.map((placement) => (
          <div key={placement}>
            {/* The overflow: hidden prevents an axe scrollable-region-focusable false positive */}
            <Popover
              {...props}
              placement={placement}
              content={`${placement[0].toUpperCase() + placement.slice(1)} Popover Content`}
              style={{overflow: 'hidden'}}
            >
              <Button
                text={`${placement[0].toUpperCase() + placement.slice(1)} Popover`}
                density="loose"
                fullWidth
              />
            </Popover>
          </div>
        ))}
      </Grid>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Top-end Popover'})

    await userEvent.click(trigger)

    await waitFor(
      async () => {
        await expect(await canvas.findByText('Top-end Popover Content')).toBeVisible()
      },
      {timeout: 750},
    )

    trigger.blur()
  },
}

export const WithPortal: Story = {
  render: (props) => (
    <Popover {...props} content="Popover Content" portal>
      <Button text="Open Popover" />
    </Popover>
  ),
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Popover'})

    await userEvent.click(trigger)

    await waitFor(
      async () => {
        await expect(await screen.findByText('Popover Content')).toBeVisible()
      },
      {timeout: 500},
    )

    await userEvent.click(trigger)
    trigger.blur()
  },
}

export const WithTooltip: Story = {
  render: (props) => (
    <Popover {...props} anchorName="popover-tooltip" content="Popover Content">
      <Tooltip anchorName="popover-tooltip" content="Tooltip Content">
        <Button text="Open Tooltip or Popover" />
      </Tooltip>
    </Popover>
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

export const WithCustomContent: Story = {
  render: (props) => {
    return (
      <Popover
        {...props}
        placement="bottom-start"
        content={
          <Flex flexDirection="column" gap={2} minWidth="150px">
            <Text trim size={1}>
              Title
            </Text>
            <Text trim muted size={0}>
              Subtitle
            </Text>
          </Flex>
        }
      >
        <Button text="Open Popover" />
      </Popover>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.findByRole('button', {name: 'Open Popover'})
    const title = await canvas.findByText('Title')
    const subtitle = await canvas.findByText('Subtitle')

    await userEvent.click(trigger)

    await waitFor(
      async () => {
        await expect(title).toBeVisible()
        await expect(subtitle).toBeVisible()
      },
      {timeout: 750},
    )

    trigger.blur()
  },
}
