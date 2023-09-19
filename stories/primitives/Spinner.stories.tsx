/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {Card, Flex, Spinner} from '../../src/primitives'
import {FONT_SIZE_CONTROLS} from '../constants'

const meta: Meta<typeof Spinner> = {
  argTypes: {
    size: FONT_SIZE_CONTROLS,
  },
  component: Spinner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Docs: Story = {
  render: (props) => (
    <Card padding={3}>
      <Flex justify="center">
        <Spinner {...props} />
      </Flex>
    </Card>
  ),
}

export const Muted: Story = {
  args: {
    muted: true,
  },
  render: (props) => (
    <Card padding={3}>
      <Flex justify="center">
        <Spinner {...props} />
      </Flex>
    </Card>
  ),
}
