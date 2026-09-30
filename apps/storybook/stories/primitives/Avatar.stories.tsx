import {
  Avatar,
  AvatarStack,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Layer,
  Stack,
  Text,
} from '@sanity/ui'
import {Menu, MenuItem} from '@sanity/ui/menu'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Activity, ComponentProps, startTransition, useState, ViewTransition} from 'react'

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
    <Stack gap={3}>
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
      <Stack paddingX={4} paddingY={[5, 6, 7]} gap={1}>
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
            <Menu gap={1}>
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

function AnimatedAvatar({open, ...props}: ComponentProps<typeof Avatar> & {open: boolean}) {
  return (
    <Activity mode={open ? 'visible' : 'hidden'}>
      <ViewTransition>
        <Avatar {...props} />
      </ViewTransition>
    </Activity>
  )
}

// A unique query parameter makes the browser fetch the image again on every
// reveal, so the transition has something to wait for
function freshSrc(src: string): string {
  const url = new URL(src, location.href)

  url.searchParams.set('t', String(Date.now()))

  return url.href
}

function ViewTransitionStory(props: ComponentProps<typeof Avatar>) {
  const {src: srcProp, ...restProps} = props
  const [src, setSrc] = useState<string | undefined>(undefined)
  const open = src !== undefined

  return (
    <Flex align="center" gap={3}>
      <Button
        mode="ghost"
        onClick={() => {
          startTransition(() => {
            setSrc(open || !srcProp ? undefined : freshSrc(srcProp))
          })
        }}
        text={open ? 'Hide avatar' : 'Show avatar'}
      />
      <AnimatedAvatar {...restProps} open={open} src={src} />
    </Flex>
  )
}

/**
 * The image is a native `<img>`, so an `Avatar` inside a
 * [`<ViewTransition>`](https://react.dev/reference/react/ViewTransition) behaves like any other
 * image: when a transition reveals it, React
 * [waits for the image to load](https://react.dev/reference/react/Suspense#waiting-for-an-image-to-load)
 * (up to a timeout) before it commits, so the animation never starts from an empty circle that the
 * image later pops into. Here the avatar sits in an `<Activity>` that a `startTransition` update
 * toggles between `hidden` and `visible`; every reveal fetches the image afresh.
 */
export const WithViewTransition: Story = {
  parameters: {controls: {include: ['color', 'initials', 'size', 'src', 'status']}},
  render: (props) => <ViewTransitionStory {...props} />,
}
