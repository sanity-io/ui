import type {Meta, StoryObj} from '@storybook/react'
import {Button, Flex} from '../../src/primitives'
import {
  BUTTON_MODE_CONTROLS,
  BUTTON_TONE_CONTROLS,
  FONT_SIZE_CONTROLS,
  RADIUS_CONTROLS,
  SPACE_CONTROLS,
} from '../constants'

const meta: Meta<typeof Button> = {
  args: {
    text: 'Label',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    mode: BUTTON_MODE_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
    text: {control: 'text'},
    tone: BUTTON_TONE_CONTROLS,
  },
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Docs: Story = {
  render: (props) => <Button {...props} />,
}

export const Default: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'loading', 'mode', 'padding', 'text', 'tone'],
    },
  },
  render: (props) => <Button {...props} />,
}

export const Tones: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'loading', 'mode', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Button {...props} text="Default" />
      <Button {...props} text="Primary" tone="primary" />
      <Button {...props} text="Positive" tone="positive" />
      <Button {...props} text="Caution" tone="caution" />
      <Button {...props} text="Critical" tone="critical" />
    </Flex>
  ),
}
