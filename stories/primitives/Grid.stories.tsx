import type {Meta, StoryObj} from '@storybook/react'
import {Card, Code, Grid} from '../../src/core/primitives'
import {getHeightControls, getOverflowControls, getSpaceControls} from '../controls'

const meta: Meta<typeof Grid> = {
  component: Grid,
  args: {
    children: [
      Array.from({length: 12}, (_, index) => (
        <Card key={`grid${index + 1}`} padding={2}>
          <Code>{index + 1}</Code>
        </Card>
      )),
    ],
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingX: getSpaceControls(),
    margin: getSpaceControls(),
    marginBottom: getSpaceControls(),
    marginLeft: getSpaceControls(),
    marginRight: getSpaceControls(),
    marginTop: getSpaceControls(),
    marginY: getSpaceControls(),
    marginX: getSpaceControls(),
    height: getHeightControls(),
    overflow: getOverflowControls(),
    gap: getSpaceControls(),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: (props) => <Grid {...props} />,
}

export const Columns: Story = {
  args: {columns: [1, 2, 3, 4, 5, 6, 7]},
  render: (props) => <Grid {...props} />,
}
