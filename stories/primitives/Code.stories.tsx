import type {Meta, StoryObj} from '@storybook/react'
import {Card, Code} from '../../src/primitives'
import {FONT_SIZE_CONTROLS} from '../constants'

const meta: Meta<typeof Code> = {
  args: {
    children: `console.log('Hello, world')`,
    language: 'javascript',
  },
  argTypes: {
    size: FONT_SIZE_CONTROLS,
  },
  component: Code,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Code>

export const Docs: Story = {
  render: (props) => {
    return (
      <Card padding={3}>
        <Code {...props} />
      </Card>
    )
  },
}
