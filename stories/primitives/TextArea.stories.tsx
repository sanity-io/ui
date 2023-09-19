import type {Meta, StoryObj} from '@storybook/react'
import {Card, TextArea} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof TextArea> = {
  args: {
    placeholder: 'Enter text...',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
  },
  component: TextArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Docs: Story = {
  render: (props) => {
    return (
      <Card padding={3}>
        <TextArea {...props} />
      </Card>
    )
  },
}
