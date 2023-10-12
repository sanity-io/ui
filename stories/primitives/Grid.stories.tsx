import type {Meta, StoryObj} from '@storybook/react'
import {Card, Code, Grid} from '../../src/primitives'
import {
  getHeightControls,
  getOverflowControls,
  getSpaceControls,
  getWrapControls,
} from '../controls'

const meta: Meta<typeof Grid> = {
  component: Grid,
  args: {
    columns: [1, 2, 3, 4, 5, 6, 7],
    gap: [0, 1, 2, 3, 4, 5, 6],
    children: [
      Array.from({length: 12}, (_, index) => (
        <Card key={`grid${index + 1}`} padding={[1, 2, 3]} tone="transparent">
          <Code>{index + 1}</Code>
        </Card>
      )),
    ],
  },
  argTypes: {
    wrap: getWrapControls(),
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
