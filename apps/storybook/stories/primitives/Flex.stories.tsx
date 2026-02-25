import {Card, Flex, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {
  FLEX_ALIGN_CONTROLS,
  FLEX_DIRECTION_CONTROLS,
  HEIGHT_CONTROLS,
  OVERFLOW_CONTROLS,
  SPACE_CONTROLS,
} from '../controls'

type FontTextSize = 0 | 1 | 2 | 3 | 4

const meta: Meta<typeof Flex> = {
  component: Flex,
  args: {
    children: [
      Array.from({length: 5}, (_, index) => (
        <Card key={`card${index}`} padding={3}>
          <Text size={index as FontTextSize}>{`Card ${index}`} </Text>
        </Card>
      )),
    ],
  },
  argTypes: {
    align: FLEX_ALIGN_CONTROLS,
    direction: FLEX_DIRECTION_CONTROLS,
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
    gap: SPACE_CONTROLS,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  render: (props) => <Flex {...props} />,
}
