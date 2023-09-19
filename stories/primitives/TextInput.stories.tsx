import type {Meta, StoryObj} from '@storybook/react'
import {Card, TextInput} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, ICON_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof TextInput> = {
  args: {
    placeholder: 'Enter text...',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    icon: ICON_CONTROLS,
    iconRight: ICON_CONTROLS,
    radius: RADIUS_CONTROLS,
    space: SPACE_CONTROLS,
  },
  component: TextInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Docs: Story = {
  render: (props) => {
    return (
      <Card padding={3}>
        <TextInput {...props} />
      </Card>
    )
  },
}

export const CustomValidity: Story = {
  args: {
    customValidity: 'Invalid input',
  },
  parameters: {
    controls: {
      include: ['customValidity'],
    },
  },
  render: (props) => {
    return (
      <Card padding={3}>
        <TextInput {...props} />
      </Card>
    )
  },
}
