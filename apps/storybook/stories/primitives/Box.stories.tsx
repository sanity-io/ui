import type {Meta, StoryObj} from '@storybook/react-vite'

import {Box, Text} from '../../../../packages/ui/src/core/primitives'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof Box> = {
  args: {
    children: <Text>Box with a custom outline</Text>,
    padding: 4,
    style: {border: '1px solid red'},
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
  },
  component: Box,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: (props) => {
    return <Box {...props} />
  },
}

export const Responsive: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      <Box
        id="responsive-box"
        display={['none', 'block', 'none', 'block', 'none', 'block', 'none']}
        flex={[1, 2, 3, 4, 5, 6, 7]}
        padding={3}
        sizing={['content', 'border', 'content', 'border', 'content', 'border', 'content']}
        style={{outline: '1px solid var(--card-border-color)'}}
      >
        <Text align="center" muted>
          This is a box with responsive props
        </Text>
      </Box>
    </Box>
  ),
}
