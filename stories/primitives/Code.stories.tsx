import type {Meta, StoryObj} from '@storybook/react'
import {Code, Stack} from '../../src/primitives'
import {getFontSizeControls} from '../controls'

const meta: Meta<typeof Code> = {
  args: {
    children: `console.log('Hello, world')`,
    language: 'javascript',
  },
  argTypes: {
    size: getFontSizeControls('code'),
  },
  component: Code,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Code>

export const Default: Story = {
  render: (props) => {
    return <Code {...props} />
  },
}

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ['weight'],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Code {...props} size={4} />
        <Code {...props} size={3} />
        <Code {...props} size={2} />
        <Code {...props} size={1} />
        <Code {...props} size={0} />
      </Stack>
    )
  },
}

export const Weights: Story = {
  parameters: {
    controls: {
      include: ['size'],
    },
  },
  render: (props) => {
    return (
      <Stack space={3}>
        <Code {...props} />
        <Code {...props} weight="medium" />
        <Code {...props} weight="semibold" />
        <Code {...props} weight="bold" />
      </Stack>
    )
  },
}
