/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {Select} from '../../src/core/primitives'
import {RADII} from '../constants'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

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
    <>
      {rowBuilder({
        renderItem: ({value}) => (
          <Select {...props} key={value} radius={value}>
            <option>{value}</option>
          </Select>
        ),
        rows: RADII,
      })}
    </>
  ),
}
