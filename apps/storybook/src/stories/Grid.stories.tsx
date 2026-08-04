import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Grid as GridV3} from 'ui3'

import {Grid} from '../../../../packages/ui/src/components/grid/Grid'
import {gridProps} from '../../../../packages/ui/src/components/grid/grid.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(gridProps)

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  args: {
    as: 'div',
    display: 'grid',
  },
  argTypes,
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Grid"]',
    },
    performance: {
      component: Grid,
      compareComponent: GridV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: (props) => {
    return (
      <Grid {...props}>
        <Text as="p">Child 1</Text>
        <Text as="p">Child 2</Text>
        <Text as="p">Child 3</Text>
      </Grid>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="Grid"]')?.classList,
    ).toContain('sui-display-grid')
  },
}

export const Columns: Story = {
  args: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    tone: 'neutral',
    padding: 3,
  },
  render: (props) => {
    return (
      <Grid {...props}>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
        <Text>Child 3</Text>
      </Grid>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Child 1')).parentElement?.closest('[data-ui="Grid"]')?.classList,
    ).toContain('sui-grid-template-columns')
  },
}
