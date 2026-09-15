import type {Meta, StoryObj} from '@storybook/react-vite'
// import {expect} from 'storybook/test'

import {Select} from '../../../../packages/ui/src/components/select/Select'
import {selectProps} from '../../../../packages/ui/src/components/select/select.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(selectProps)

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  args: {},
  argTypes,
  component: Select,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Select',
    },
    performance: {
      component: Select,
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: (props) => {
    return (
      <Select {...props}>
        <optgroup label="The first three">
          <option>First</option>
          <option>Second</option>
          <option>Third</option>
        </optgroup>
        <option>
          Everything else and the option is so long it should run into the dropdown icon when it’s
          selected!
        </option>
      </Select>
    )
  },
  // play: async ({canvas}) => {
  //   await expect((await canvas.findByText('')).classList).toContain('')
  // },
}
