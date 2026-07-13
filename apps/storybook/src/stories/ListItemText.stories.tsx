import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {List} from '../../../../packages/ui/src/components/list/List'
import {listItemTextProps} from '../../../../packages/ui/src/components/list/list.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(listItemTextProps)

const meta: Meta<typeof List.ItemText> = {
  title: 'Components/List/ItemText',
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
  },
  argTypes,
  component: List.ItemText,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="ListItemText"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof List.ItemText>

export const Default: Story = {
  render: (props) => {
    return <List.ItemText {...props} />
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Title')).parentElement?.closest('[data-ui="ListItemText"]')
        ?.tagName,
    ).toBe('DIV')
  },
}
