import {GroqMonogram} from '@sanity/logos'
import type {Meta, StoryObj} from '@storybook/react-vite'

const meta: Meta<typeof GroqMonogram> = {
  component: GroqMonogram,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof GroqMonogram>

export const Default: Story = {
  render: (props) => <GroqMonogram style={{fontSize: 64}} {...props} />,
}
