import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Divider} from '../../../../packages/ui/src/components/divider/Divider'

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Divider',
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  render: () => {
    return (
      <div>
        <p>Content above</p>
        <Divider />
        <p>Content below</p>
      </div>
    )
  },
  play: async ({canvas}) => {
    const hr = canvas.getByRole('separator')
    await expect(hr.classList).toContain('sui-Divider')
    await expect(hr.classList).toContain('sui-border-bottom-none')
    await expect(hr.classList).toContain('sui-border-left-none')
    await expect(hr.classList).toContain('sui-border-right-none')
    await expect(hr.classList).toContain('sui-border-top')
  },
}
