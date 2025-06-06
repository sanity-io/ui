import {Card, Stack, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {HEIGHT_CONTROLS, OVERFLOW_CONTROLS, SPACE_CONTROLS} from '../controls'

const meta: Meta<typeof Stack> = {
  component: Stack,
  args: {
    gap: 0,
    children: [
      <Card key="card1" padding={2}>
        <Text align="center">Stack item 1</Text>
      </Card>,
      <Card key="card2" padding={2}>
        <Text align="center">Stack item 2</Text>
      </Card>,
      <Card key="card2" padding={2}>
        <Text align="center">Stack item 3</Text>
      </Card>,
    ],
  },
  argTypes: {
    gap: SPACE_CONTROLS,
    height: HEIGHT_CONTROLS,
    margin: SPACE_CONTROLS,
    marginBottom: SPACE_CONTROLS,
    marginLeft: SPACE_CONTROLS,
    marginRight: SPACE_CONTROLS,
    marginTop: SPACE_CONTROLS,
    marginY: SPACE_CONTROLS,
    marginX: SPACE_CONTROLS,
    overflow: OVERFLOW_CONTROLS,
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  render: (props) => <Stack {...props} />,
}
