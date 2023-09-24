import type {Meta, StoryObj} from '@storybook/react'
import {userEvent, within} from '@storybook/testing-library'
import {Button, Card, Tooltip, Text} from '../../src/primitives'
import {SHADOW_CONTROLS, SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof Tooltip> = {
  argTypes: {
    content: {
      type: 'string',
    },
    padding: SPACE_CONTROLS,
    shadow: SHADOW_CONTROLS,
  },
  args: {
    content: "I'm a tooltip",
    delay: {
      open: 300,
      close: 500,
    },
    padding: 2,
    shadow: 2,
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

export const Docs: Story = {
  render: (props) => {
    return (
      <Card padding={6}>
        <Tooltip {...props} content={<Text>{props.content}</Text>}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
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
        <Tooltip {...props} content={<Text>{props.content}</Text>}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
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
