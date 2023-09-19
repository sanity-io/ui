import type {Meta, StoryObj} from '@storybook/react'
import {Badge, Flex} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: {
    children: 'Label',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Docs: Story = {
  render: (props) => <Badge {...props} />,
}

export const Basic: Story = {
  parameters: {
    controls: {
      include: ['children', 'fontSize', 'mode', 'padding', 'radius', 'tone'],
    },
  },
  render: (props) => <Badge {...props} />,
}

export const Tones: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'mode', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Badge {...props}>Default</Badge>
      <Badge {...props} tone="primary">
        Primary
      </Badge>
      <Badge {...props} tone="positive">
        Positive
      </Badge>
      <Badge {...props} tone="caution">
        Caution
      </Badge>
      <Badge {...props} tone="critical">
        Critical
      </Badge>
    </Flex>
  ),
}
