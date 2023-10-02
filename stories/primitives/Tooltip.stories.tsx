import type {Meta, StoryObj} from '@storybook/react'
import {userEvent, within} from '@storybook/testing-library'
import {Button, Card, Text, Tooltip} from '../../src/primitives'
import {getShadowControls, getSpaceControls} from '../controls'

const meta: Meta<typeof Tooltip> = {
  args: {
    children: <Button mode="bleed" text="Hover me" />,
    content: "I'm a tooltip",
    padding: 2,
    shadow: 2,
  },
  argTypes: {
    content: {
      type: 'string',
    },
    padding: getSpaceControls(),
    shadow: getShadowControls(),
  },
  parameters: {
    controls: {
      exclude: ['children', 'allowedAutoPlacements'],
    },
  },
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Basic: Story = {
  render: (props) => {
    return (
      <Card padding={6}>
        <Tooltip
          {...props}
          content={
            <Text muted size={1}>
              {props.content}
            </Text>
          }
        />
      </Card>
    )
  },
}

export const WithOpenDelay: Story = {
  args: {
    delay: {open: 200},
    shadow: 2,
    padding: 2,
    content: 'Content',
  },
  parameters: {
    controls: {
      include: ['content', 'delay'],
    },
  },
  render: (props) => {
    return (
      <Card padding={6}>
        <Tooltip
          {...props}
          content={
            <Text muted size={1}>
              {props.content}
            </Text>
          }
        />
      </Card>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    const button = canvas.getByText('Hover me')

    await userEvent.hover(button)
    await canvas.findByText('Content', undefined, {timeout: 300})
  },
}
