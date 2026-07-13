import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {List} from '../../../../packages/ui/src/components/list/List'

const meta: Meta<typeof List.ItemImage> = {
  title: 'Components/List/ItemImage',
  args: {
    src: 'https://placehold.co/600x400',
    alt: 'Image',
  },
  component: List.ItemImage,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="ListItemImage"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof List.ItemImage>

export const Default: Story = {
  render: (props) => {
    return <List.ItemImage {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByAltText('Image'))?.tagName).toBe('IMG')
  },
}
