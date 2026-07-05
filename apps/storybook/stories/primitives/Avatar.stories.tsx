import {
  Avatar,
  AvatarStack,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Layer,
  Menu,
  MenuItem,
  Stack,
  Text,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react'

import {AVATAR_SRC} from '../constants'
import {getAvatarSizeControls} from '../controls'

const meta: Meta<typeof Avatar> = {
  args: {
    initials: 'AB',
    src: AVATAR_SRC,
  },
  argTypes: {
    size: getAvatarSizeControls(),
  },
  component: Avatar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (props) => <Avatar {...props} />,
}

export const NoSrc: Story = {
  args: {
    src: undefined,
  },
  render: (props) => <Avatar {...props} />,
}

/**
 * Displays focus ring and receives focus events. Unlike `<Card>` components, no hover states are displayed.
 */
export const AsButton: Story = {
  render: (props) => (
    <Flex gap={3}>
      <Avatar {...props} as="button" />
      <Avatar {...props} as="button" />
      <Avatar {...props} as="button" />
    </Flex>
  ),
}

export const Colors: Story = {
  parameters: {
    controls: {
      exclude: ['color'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Avatar {...props} />
      <Avatar {...props} color="blue" />
      <Avatar {...props} color="cyan" />
      <Avatar {...props} color="gray" />
      <Avatar {...props} color="green" />
      <Avatar {...props} color="magenta" />
      <Avatar {...props} color="orange" />
      <Avatar {...props} color="purple" />
      <Avatar {...props} color="red" />
      <Avatar {...props} color="yellow" />
    </Flex>
  ),
}

export const Sizes: Story = {
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
  render: (props) => (
    <Stack space={3}>
      <Avatar {...props} size={0} />
      <Avatar {...props} size={1} />
      <Avatar {...props} size={2} />
      <Avatar {...props} size={0} src={undefined} />
      <Avatar {...props} size={1} src={undefined} />
      <Avatar {...props} size={2} src={undefined} />
    </Stack>
  ),
}

export const WithinButton: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Container width={1}>
      <Stack paddingX={4} paddingY={[5, 6, 7]} space={1}>
        <Button padding={1}>
          <Flex align="center" gap={3} padding={2}>
            <Box flex={1}>
              <Text size={1}>Default button</Text>
            </Box>
            <Box flex="none">
              <AvatarStack>
                <Avatar color="blue" initials="AB" />
                <Avatar color="magenta" initials="CD" />
                <Avatar color="purple" initials="EF" />
              </AvatarStack>
            </Box>
          </Flex>
        </Button>
        <Button mode="ghost" padding={1}>
          <Flex align="center" gap={3} padding={2}>
            <Box flex={1}>
              <Text size={1}>Ghost button</Text>
            </Box>
            <Box flex="none">
              <AvatarStack>
                <Avatar color="blue" initials="AB" />
                <Avatar color="magenta" initials="CD" />
                <Avatar color="purple" initials="EF" />
              </AvatarStack>
            </Box>
          </Flex>
        </Button>
        <Button mode="bleed" padding={1}>
          <Flex align="center" gap={3} padding={2}>
            <Box flex={1}>
              <Text size={1}>Bleed button</Text>
            </Box>
            <Box flex="none">
              <AvatarStack>
                <Avatar color="blue" initials="AB" />
                <Avatar color="magenta" initials="CD" />
                <Avatar color="purple" initials="EF" />
              </AvatarStack>
            </Box>
          </Flex>
        </Button>
      </Stack>
    </Container>
  ),
}

export const WithinMenuItem: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Container width={1}>
      <Layer>
        <Box paddingX={4} paddingY={[5, 6, 7]}>
          <Card radius={3} shadow={3}>
            <Menu space={1}>
              {[1, 2, 3].map((index) => (
                <MenuItem key={index} padding={0}>
                  <Flex align="center" gap={2} padding={2}>
                    <Box flex={1}>
                      <Text size={1}>Menu item {index}</Text>
                    </Box>
                    <Box flex="none">
                      <AvatarStack>
                        <Avatar color="blue" initials="AB" />
                        <Avatar color="magenta" initials="CD" />
                        <Avatar color="purple" initials="EF" />
                      </AvatarStack>
                    </Box>
                  </Flex>
                </MenuItem>
              ))}
            </Menu>
          </Card>
        </Box>
      </Layer>
    </Container>
  ),
}
