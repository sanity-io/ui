import {Card, Inline, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {HEIGHT_CONTROLS, OVERFLOW_CONTROLS, SPACE_CONTROLS} from '../controls'

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
    gap: SPACE_CONTROLS,
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
    margin: SPACE_CONTROLS,
    marginBottom: SPACE_CONTROLS,
    marginLeft: SPACE_CONTROLS,
    marginRight: SPACE_CONTROLS,
    marginTop: SPACE_CONTROLS,
    marginY: SPACE_CONTROLS,
    marginX: SPACE_CONTROLS,
    height: HEIGHT_CONTROLS,
    overflow: OVERFLOW_CONTROLS,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Inline>

export const Default: Story = {
  render: (props) => <Inline {...props} />,
}
