import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {SearchInput} from '../../../../packages/ui/src/components/search-input/SearchInput'
import {searchInputProps} from '../../../../packages/ui/src/components/search-input/searchInput.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(searchInputProps)

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/SearchInput',
  args: {
    placeholder: 'Search for something…',
  },
  argTypes,
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="SearchInput"]',
    },
    performance: {
      component: SearchInput,
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: (props) => {
    return <SearchInput {...props} id="search-input" />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}
