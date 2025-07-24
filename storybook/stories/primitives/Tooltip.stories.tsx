import {Button, Card, Text, Tooltip, TooltipDelayGroupProvider} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'
import {userEvent, within} from 'storybook/test'

import {PLACEMENT_OPTIONS} from '../constants'
import {SHADOW_CONTROLS, SPACE_CONTROLS} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Tooltip> = {
  args: {
    children: <Button mode="bleed" text="Hover me" />,
    content: <Text size={1}>Content</Text>,
  },
  argTypes: {
    padding: SPACE_CONTROLS,
    shadow: SHADOW_CONTROLS,
  },
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Card padding={6}>
        {/* @ts-expect-error fix later */}
        <Story />
      </Card>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['allowedAutoPlacements', 'children', 'content'],
    },
  },
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (props) => {
    return <Tooltip {...props} />
  },
}

export const Animated: Story = {
  args: {animate: true},
  render: (props) => {
    return <Tooltip {...props} />
  },
}

export const Placements: Story = {
  args: {animate: true},
  render: (props) => {
    return (
      <>
        {rowBuilder({
          gap: 4,
          renderItem: ({value}) => (
            <Tooltip {...props} key={value} placement={value}>
              <Button mode="bleed" text={value} />
            </Tooltip>
          ),
          rows: PLACEMENT_OPTIONS,
        })}
      </>
    )
  },
}

export const WithOpenDelay: Story = {
  args: {
    animate: true,
    delay: {open: 200},
  },
  parameters: {
    controls: {
      include: ['content', 'delay'],
    },
  },
  render: (props) => {
    return <Tooltip {...props} />
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    const button = canvas.getByText('Hover me')

    await userEvent.hover(button)
    await canvas.findByText('Content', undefined, {timeout: 300})
  },
}

export const WithDelayGroup: Story = {
  args: {
    animate: true,
    delay: {open: 200},
  },
  parameters: {
    controls: {
      include: ['content', 'delay', 'animate'],
    },
  },
  render: (props) => {
    return (
      <TooltipDelayGroupProvider delay={{open: 200}}>
        <Tooltip {...props} />
        <Tooltip {...props} />
        <Tooltip {...props} />
        <Tooltip {...props} />
      </TooltipDelayGroupProvider>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    const buttons = canvas.getAllByText('Hover me')
    const lastButton = buttons[buttons.length - 1]

    await userEvent.hover(lastButton)
    await canvas.findByText('Content', undefined, {timeout: 300})
  },
}
