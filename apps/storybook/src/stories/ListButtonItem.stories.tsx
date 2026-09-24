import {EditIcon} from '@sanity/icons/Edit'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {List} from '../../../../packages/ui/src/components/list/List'
import {listItemProps} from '../../../../packages/ui/src/components/list/list.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(listItemProps)

const meta: Meta<typeof List.ButtonItem> = {
  title: 'Components/List/ButtonItem',
  argTypes,
  component: List.ButtonItem,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="ListButtonItem"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof List.ButtonItem>

export const Default: Story = {
  render: (props) => {
    return (
      <List>
        <List.ButtonItem {...props} end={<Icon size={1} icon={EditIcon} />}>
          <List.ItemImage src="https://placehold.co/600x400" alt="Image" />
          <List.ItemText title="Title" subtitle="Subtitle" />
        </List.ButtonItem>
      </List>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Title')).parentElement?.closest('[data-ui="ListButtonItem"]')
        ?.tagName,
    ).toBe('BUTTON')
  },
}
