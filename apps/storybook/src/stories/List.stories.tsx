import {ComposeIcon, EditIcon, ImageIcon, SparkleIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {List} from '../../../../packages/ui/src/components/list/List'
import {listProps} from '../../../../packages/ui/src/components/list/list.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(listProps)

const meta: Meta<typeof List> = {
  title: 'Components/List',
  argTypes,
  component: List,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="List"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  render: (props) => {
    return (
      <List {...props}>
        <List.Item end={<Icon size={1} icon={EditIcon} />}>
          <List.ItemImage src="https://placehold.co/600x400" alt="First item image" />
          <List.ItemText title="First Item Title" subtitle="First item subtitle" />
        </List.Item>

        <List.Item end={<Icon size={1} icon={EditIcon} />}>
          <List.ItemImage src="https://placehold.co/600x400" alt="Second item image" />
          <List.ItemText title="Second Item Title" subtitle="Second item subtitle" />
        </List.Item>

        <List.Item end={<Icon size={1} icon={EditIcon} />}>
          <List.ItemImage src="https://placehold.co/600x400" alt="Third item image" />
          <List.ItemText title="Third Item Title" subtitle="Third item subtitle" />
        </List.Item>
      </List>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('First Item Title')).parentElement?.closest('[data-ui="List"]')
        ?.tagName,
    ).toBe('UL')
  },
}

export const Menu: Story = {
  render: (props) => {
    return (
      <List {...props} gap={2}>
        <List.ButtonItem density="compact" start={<Icon size={1} icon={SparkleIcon} />}>
          <List.ItemText title="Content Agent" />
        </List.ButtonItem>

        <List.ButtonItem density="compact" start={<Icon size={1} icon={ComposeIcon} />}>
          <List.ItemText title="Canvas" />
        </List.ButtonItem>

        <List.ButtonItem density="compact" start={<Icon size={1} icon={ImageIcon} />} selected>
          <List.ItemText title="Media Library" />
        </List.ButtonItem>
      </List>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Content Agent')).parentElement?.closest('[data-ui="List"]')
        ?.tagName,
    ).toBe('UL')
  },
}
