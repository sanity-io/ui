import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Link} from '../../../../packages/ui/src/components/link/Link'
import {linkProps} from '../../../../packages/ui/src/components/link/link.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(linkProps)

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    href: 'https://www.sanity.io',
    children: 'Sanity',
  },
  argTypes,
  parameters: {
    a11y: {context: '.sui-Link'},
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  play: async ({canvas}) => {
    const link = await canvas.findByRole('link', {name: 'Sanity'})
    await expect(link.classList).toContain('sui-Link')
    await expect(link.classList).toContain('sui-Link-Underlined')
  },
}

export const NotUnderlined: Story = {
  args: {
    underlined: false,
  },
  play: async ({canvas}) => {
    const link = await canvas.findByRole('link', {name: 'Sanity'})
    await expect(link.classList).not.toContain('sui-Link-Underlined')
  },
}

export const NewTab: Story = {
  args: {
    openInNewTab: true,
  },
  play: async ({canvas}) => {
    const link = await canvas.findByRole('link', {name: 'Sanity'})
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  },
}
