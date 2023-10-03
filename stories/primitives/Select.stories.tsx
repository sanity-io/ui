/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {Flex, Select} from '../../src/primitives'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof Select> = {
  args: {
    children: (
      <>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
        <option value="d">Option D</option>
        <option value="e">Option E</option>
      </>
    ),
  },
  argTypes: {
    fontSize: getFontSizeControls('text'),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
    space: getSpaceControls(),
  },
  component: Select,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: (props) => <Select {...props} />,
}

export const ReadOnly: Story = {
  render: (props) => <Select {...props} readOnly />,
}

export const Disabled: Story = {
  render: (props) => <Select {...props} disabled />,
}

export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <Select {...props} radius={radius}>
            <option>{radius}</option>
          </Select>
        ),
      })}
    </Flex>
  ),
}
