import {ComposeIcon} from '@sanity/icons/Compose'
import {EditIcon} from '@sanity/icons/Edit'
import {ImageIcon} from '@sanity/icons/Image'
import {SparkleIcon} from '@sanity/icons/Sparkle'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {ComponentProps} from 'react'
import {expect} from 'storybook/test'

import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {List} from '../../../../packages/ui/src/components/list/List'
import {listProps} from '../../../../packages/ui/src/components/list/list.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(listProps)

const PerformanceList = (props: ComponentProps<typeof List>) => {
  return (
    <List {...props}>
      <List.Item>
        <List.ItemButton text="Title" subtext="Subtitle" />
      </List.Item>
    </List>
  )
}

const meta: Meta<typeof List> = {
  title: 'Components/List',
  argTypes,
  component: List,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="List"]',
    },
    performance: {
      component: PerformanceList,
    },
  },
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  render: (props) => {
    return (
      <List {...props}>
        <List.Item>First Item</List.Item>
        <List.Item>Second Item</List.Item>
        <List.Item>Third Item</List.Item>
      </List>
    )
  },
  play: async ({canvas}) => {
    const firstItem = await canvas.findByText('First Item')
    await expect(firstItem.tagName).toBe('LI')
    await expect(firstItem.parentElement?.tagName).toBe('UL')
  },
}

export const WithButtons: Story = {
  render: (props) => {
    return (
      <List {...props}>
        <List.Item>
          <List.ItemButton
            start={<List.ItemImage src="https://placehold.co/600x400" alt="First item image" />}
            end={<Icon size={1} icon={EditIcon} />}
            text="First Item Title"
            subtext="Second item title"
          ></List.ItemButton>
        </List.Item>

        <List.Item>
          <List.ItemButton
            start={<List.ItemImage src="https://placehold.co/600x400" alt="Second item image" />}
            end={<Icon size={1} icon={EditIcon} />}
            text="Second Item Title"
            subtext="Second item subtitle"
          />
        </List.Item>

        <List.Item>
          <List.ItemButton
            start={<List.ItemImage src="https://placehold.co/600x400" alt="Third item image" />}
            end={<Icon size={1} icon={EditIcon} />}
            text="Third Item Title"
            subtext="Third item subtitle"
            disabled
          />
        </List.Item>

        <List.Item>
          <List.ItemButton
            start={<List.ItemImage src="https://placehold.co/600x400" alt="Fourth item image" />}
            end={<Icon size={1} icon={EditIcon} />}
            text="Fourth Item Title"
            subtext="Fourth item subtitle"
            selected
          />
        </List.Item>
      </List>
    )
  },
  play: async ({canvas}) => {
    const thirdItem = (await canvas.findByText('Third Item Title')).parentElement?.closest(
      '[data-ui="ListItemButton"]',
    )
    const fourthItem = (await canvas.findByText('Fourth Item Title')).parentElement?.closest(
      '[data-ui="ListItemButton"]',
    )
    await expect((thirdItem as HTMLButtonElement).disabled).toBe(true)
    await expect((fourthItem as HTMLButtonElement).getAttribute('aria-pressed')).toBe('true')
  },
}

export const AsMenu: Story = {
  render: (props) => {
    return (
      <List {...props} gap={2}>
        <List.Item>
          <List.ItemButton
            density="compact"
            start={<Icon size={1} icon={SparkleIcon} />}
            text="Content Agent"
            selected
          />
        </List.Item>

        <List.Item>
          <List.ItemButton
            density="compact"
            start={<Icon size={1} icon={ComposeIcon} />}
            text="Canvas"
          />
        </List.Item>

        <List.Item>
          <List.ItemButton
            density="compact"
            start={<Icon size={1} icon={ImageIcon} />}
            text="Media Library"
          />
        </List.Item>
      </List>
    )
  },
  play: async ({canvas}) => {
    const firstItem = (await canvas.findByText('Content Agent')).parentElement?.closest(
      '[data-ui="ListItemButton"]',
    )
    await expect((firstItem as HTMLButtonElement).getAttribute('aria-pressed')).toBe('true')
  },
}
