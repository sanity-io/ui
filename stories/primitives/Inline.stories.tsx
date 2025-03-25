import type {Meta, StoryObj} from '@storybook/react'
import { Card } from '../../src/core/primitives/card/card'
import { Inline } from '../../src/core/primitives/inline/inline'
import { Text } from '../../src/core/primitives/text/text'
import {getHeightControls, getOverflowControls, getSpaceControls} from '../controls'

const meta: Meta<typeof Inline> = {
  component: Inline,
  args: {
    children: [
      <Card key="Card1" padding={2}>
        <Text>Inline item</Text>
      </Card>,
      <Card key="Card2" padding={2}>
        <Text>Inline item</Text>
      </Card>,
      <Card key="Card3" padding={2}>
        <Text>Inline item</Text>
      </Card>,
    ],
  },
  argTypes: {
    space: getSpaceControls(),
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
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Inline>

export const Default: Story = {
  render: (props) => <Inline {...props} />,
}
