import type { Meta, StoryObj} from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {Text} from '../../../../packages/ui/src/components/Text'
import { getArgTypes } from '../utils/getArgTypes'
import { textProps } from '../../../../packages/ui/src/components/text.props'
import { Box } from '../../../../packages/ui/src/components/Box'

const argTypes = getArgTypes(textProps)

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  args: {
    children: 'This is a Text component.',
    as: 'p',
    size: 2,
    margin: 0,
  },
  argTypes,
  component: Text,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Text'
    }
  }
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: (props) => {
    return <Text {...props} />
  },
  play: async ({ canvas }) => {
    await expect(
      (await canvas.findByText('This is a Text component.')).classList
    ).toContain('sui-display-block')
  }
}

export const TestTrim: Story = {
  render: (props) => {
    return (
      <Box style={{ border: '20px solid lightgreen' }}>
        <Text trim {...props}>
          cap alphabetic
        </Text>
      </Box>
    )
  },
  play: async ({ canvas }) => {
    await expect(
      (await canvas.findByText('This is a Text component.')).classList
    ).toContain('sui-display-block')
  }
}

export const TestEllipsis: Story = {
  render: (props) => {
    return (
      <Box style={{ border: '20px solid lightgreen' }}>
        <Text lineClamp={1} {...props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        </Text>
      </Box>
    )
  },
  play: async ({ canvas }) => {
    await expect(
      (await canvas.findByText('This is a Text component.')).classList
    ).toContain('sui-display-block')
  }
}
