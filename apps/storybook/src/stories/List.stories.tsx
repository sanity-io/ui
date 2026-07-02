import {EditIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {List} from '../../../../packages/ui/src/components/list/List'

const meta: Meta<typeof List> = {
  title: 'Components/List',
  args: {},
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
        <List.Item trailing={<Icon size={1} icon={EditIcon} />}>
          <List.ItemImage src="https://placehold.co/600x400" alt="First item image" />
          <List.ItemText title="First Item Title" subtitle="First item subtitle" />
        </List.Item>

        <List.Item trailing={<Icon size={1} icon={EditIcon} />}>
          <List.ItemImage src="https://placehold.co/600x400" alt="Second item image" />
          <List.ItemText title="Second Item Title" subtitle="Second item subtitle" />
        </List.Item>

        <List.Item trailing={<Icon size={1} icon={EditIcon} />}>
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
