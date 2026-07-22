import {SanityMonogram} from '@sanity/logos'
import type {Meta, StoryObj} from '@storybook/react-vite'

const meta: Meta<typeof SanityMonogram> = {
  args: {scheme: 'default'},
  argTypes: {
    scheme: {control: 'select', options: ['default', 'light', 'dark']},
  },
  component: SanityMonogram,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SanityMonogram>

export const Default: Story = {
  render: (props) => <SanityMonogram style={{fontSize: 64}} {...props} />,
}
