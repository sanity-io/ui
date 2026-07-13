import {EditIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {List} from '../../../../packages/ui/src/components/list/List'
import {listItemProps} from '../../../../packages/ui/src/components/list/list.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(listItemProps)

const meta: Meta<typeof List.Item> = {
  title: 'Components/List/Item',
  argTypes,
  component: List.Item,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="ListItem"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof List.Item>

export const Default: Story = {
  render: (props) => {
    return (
      <List>
        <List.Item {...props} end={<Icon size={1} icon={EditIcon} />}>
          <List.ItemImage src="https://placehold.co/600x400" alt="Image" />
          <List.ItemText title="Title" subtitle="Subtitle" />
        </List.Item>
      </List>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Title')).parentElement?.closest('[data-ui="ListItem"]')?.tagName,
    ).toBe('LI')
  },
}
