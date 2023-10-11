import type {Meta, StoryObj} from '@storybook/react'
import {Breadcrumbs} from '../../src/components'
import {Text} from '../../src/primitives'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof Breadcrumbs> = {
  args: {
    separator: (
      <Text muted size={1}>
        /
      </Text>
    ),
    maxLength: 6,
    space: 2,
    children: [
      <Text key="root" size={1}>
        <a href="#">Root</a>
      </Text>,
      <Text key="catA" size={1}>
        <a href="#">Category A</a>
      </Text>,
      <Text key="catB" size={1}>
        <a href="#">Category B</a>
      </Text>,
      <Text key="catC" size={1}>
        <a href="#">Category C</a>
      </Text>,
      <Text key="catD" size={1}>
        <a href="#">Category D</a>
      </Text>,
      <Text key="catE" size={1}>
        <a href="#">Category E</a>
      </Text>,
      <Text key="catF" size={1}>
        <a href="#">Category F</a>
      </Text>,
      <Text key="item" size={1}>
        Item
      </Text>,
    ],
  },
  argTypes: {space: getSpaceControls()},
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
