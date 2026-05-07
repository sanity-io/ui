import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Divider} from '../../../../packages/ui/src/components/divider/Divider'
import {dividerProps} from '../../../../packages/ui/src/components/divider/divider.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(dividerProps)

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes,
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
  render: (props) => {
    return (
      <>
        <p>Content above</p>
        <Divider {...props} />
        <p>Content below</p>
      </>
    )
  },
  play: async ({canvas}) => {
    const hr = canvas.getByRole('separator')
    await expect(hr.classList).toContain('sui-Divider')
    await expect(hr.classList).toContain('sui-border-none')
    await expect(hr.classList).toContain('sui-border-top')
  },
}
