import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Grid} from '../../../../packages/ui/src/components/grid/Grid'
import {gridProps} from '../../../../packages/ui/src/components/grid/grid.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {Square} from '../components/Square'
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
      context: '.sui-Grid',
    },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: (props) => {
    return (
      <Grid {...props}>
        <Square>
          <Text>1</Text>
        </Square>
        <Square>
          <Text>2</Text>
        </Square>
        <Square>
          <Text>3</Text>
        </Square>
      </Grid>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('1')).parentElement?.closest('.sui-Grid')?.classList,
    ).toContain('sui-display-grid')
  },
}

export const Columns: Story = {
  args: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  render: (props) => {
    return (
      <Grid {...props}>
        <Square>
          <Text>1</Text>
        </Square>
        <Square>
          <Text>2</Text>
        </Square>
        <Square>
          <Text>3</Text>
        </Square>
      </Grid>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('1')).parentElement?.closest('.sui-Grid')?.classList,
    ).toContain('sui-grid-template-columns')
  },
}
