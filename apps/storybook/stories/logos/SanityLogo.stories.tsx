import {SanityLogo} from '@sanity/logos'
import type {Meta, StoryObj} from '@storybook/react-vite'

const meta: Meta<typeof SanityLogo> = {
  args: {dark: true},
  component: SanityLogo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SanityLogo>

export const Default: Story = {
  render: (props) => <SanityLogo style={{fontSize: 64}} {...props} />,
}
