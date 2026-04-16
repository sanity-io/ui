import type { Meta, StoryObj} from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {Grid} from '../../../../packages/ui/src/components/grid/Grid'
import { getArgTypes } from '../utils/getArgTypes'
import { gridProps } from '../../../../packages/ui/src/components/grid/grid.props'

const argTypes = getArgTypes(gridProps)

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  args: {
    children: 'This is a Grid component.',
    as: 'div',
    display: 'grid',
  },
  argTypes,
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Grid'
    }
  }
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: (props) => {
    return <Grid {...props} />
  },
  play: async ({ canvas }) => {
    await expect(
      (await canvas.findByText('This is a Grid component.')).classList
    ).toContain('sui-display-grid')
  }
}
