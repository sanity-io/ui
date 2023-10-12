import type {Meta, StoryObj} from '@storybook/react'
import {Card, Stack, Text} from '../../src/primitives'
import {
  getHeightControls,
  getOverflowControls,
  getSpaceControls,
  getWrapControls,
} from '../controls'

const meta: Meta<typeof Stack> = {
  component: Stack,
  args: {
    space: 0,
    children: [
      Array.from({length: 4}, (_, index) => (
        <Card key={`card${index}`} padding={[2, 3, 4]} shadow={1}>
          <Text align="center" muted>
            {`Stak item ${index}`}
          </Text>
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
    space: getSpaceControls(),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  render: (props) => <Stack {...props} />,
}
