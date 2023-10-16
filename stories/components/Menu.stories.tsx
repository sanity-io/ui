import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {Menu, MenuItem, MenuDivider} from '../../src/components'
import {Box, Card, Stack, Text} from '../../src/primitives'
import {LayerProvider} from '../../src/utils'

const meta: Meta<typeof Menu> = {
  args: {
    children: [
      <MenuItem key="item1" text="First option" />,
      <MenuItem key="item2" text="Second option" />,
      <MenuItem key="item3" text="Third option" />,
    ],
  },
  component: Menu,
  decorators: [
    (Story: StoryFn): JSX.Element => (
      <Box padding={4}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Story />
          </LayerProvider>
        </Card>
      </Box>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  render: (props) => {
    return <Menu {...props} />
  },
}

export const CustomMenuItem: Story = {
  render: (props) => {
    return (
      <Menu {...props}>
        <MenuItem>
          <Box padding={3}>
            <Stack space={3}>
              <Text weight="semibold">First option</Text>
              <Text muted size={1}>
                Description
              </Text>
            </Stack>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box padding={3}>
            <Stack space={3}>
              <Text weight="semibold">Second option</Text>
              <Text muted size={1}>
                Description
              </Text>
            </Stack>
          </Box>
        </MenuItem>
        <MenuDivider />
        <MenuItem tone="critical">
          <Box padding={3}>
            <Stack space={3}>
              <Text weight="semibold">Dangerous option</Text>
              <Text muted size={1}>
                Description
              </Text>
            </Stack>
          </Box>
        </MenuItem>
      </Menu>
    )
  },
}
