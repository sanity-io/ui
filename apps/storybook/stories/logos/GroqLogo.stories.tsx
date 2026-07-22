import {GroqLogo} from '@sanity/logos'
import type {Meta, StoryObj} from '@storybook/react-vite'

const meta: Meta<typeof GroqLogo> = {
  component: GroqLogo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof GroqLogo>

export const Default: Story = {
  render: (props) => <GroqLogo style={{fontSize: 64}} {...props} />,
}
