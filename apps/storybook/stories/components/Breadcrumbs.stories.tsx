import {Breadcrumbs, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {SPACE_CONTROLS} from '../controls'

const meta: Meta<typeof Breadcrumbs> = {
  args: {
    separator: <Text>/</Text>,
    children: [
      <Text key="root">Root</Text>,
      <Text key="catA">Category A</Text>,
      <Text key="catB">Category B</Text>,
      <Text key="catC">Category C</Text>,
      <Text key="catD">Category D</Text>,
      <Text key="catE">Category E</Text>,
      <Text key="catF">Category F</Text>,
      <Text key="item">Item</Text>,
    ],
  },
  argTypes: {gap: SPACE_CONTROLS},
  component: Breadcrumbs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  render: (props) => {
    return <Breadcrumbs {...props} />
  },
}
