import {AddCircleIcon} from '@sanity/icons'
import {Card, Flex, Stack, Text, ThemeProps} from '@sanity/ui'
import {getTheme_v2, ThemeColorAvatarColorKey, ThemeColorSpotKey} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'
import {css, styled} from 'styled-components'

import {getAlignControls, getFontSizeControls, getTextOverflowControls} from '../controls'
import {SPOT_COLOR_OPTIONS} from '../options'

const meta: Meta<typeof Text> = {
  args: {
    children: 'Jackdaws love my big sphinx of quartz',
  },
  argTypes: {
    align: getAlignControls(),
    size: getFontSizeControls('text'),
    textOverflow: getTextOverflowControls(),
  },
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: (props) => {
    return <Text {...props} />
  },
}

export const Accent: Story = {
  args: {
    accent: true,
  },
  parameters: {
    controls: {
      include: ['accent', 'size'],
    },
  },
  render: (props) => {
    return <Text {...props} />
  },
}

export const Muted: Story = {
  args: {
    muted: true,
  },
  parameters: {
    controls: {
      include: ['muted', 'size'],
    },
  },
  render: (props) => {
    return <Text {...props} />
  },
}

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ['muted'],
    },
  },
  render: (props) => {
    return (
      // oxlint-disable-next-line no-deprecated
      <Stack space={3}>
        <Text {...props} size={4} />
        <Text {...props} size={3} />
        <Text {...props} size={2} />
        <Text {...props} size={1} />
        <Text {...props} size={0} />
      </Stack>
    )
  },
}

export const Weights: Story = {
  parameters: {
    controls: {
      include: ['muted'],
    },
  },
  render: (props) => {
    return (
      // oxlint-disable-next-line no-deprecated
      <Stack space={3}>
        <Text {...props} />
        <Text {...props} weight="medium" />
        <Text {...props} weight="semibold" />
        <Text {...props} weight="bold" />
      </Stack>
    )
  },
}

export const OpticalAlignment: Story = {
  parameters: {
    controls: {
      include: ['muted', 'weight'],
    },
  },
  render: (props) => {
    return (
      // oxlint-disable-next-line no-deprecated
      <Stack space={1}>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={4} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={3} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={2} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={1} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={0}>
            <Text {...props} size={0} />
          </Card>
        </Flex>
        <Flex>
          <Card padding={2}>
            <Text {...props}>
              <AddCircleIcon />
            </Text>
          </Card>
        </Flex>
      </Stack>
    )
  },
}

export const TextInCard: Story = {
  render: () => {
    return (
      <Flex>
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={4}>
          <Text>Text without card</Text>
          <Text muted>Text muted</Text>

          <Card padding={4} shadow={1}>
            {/* oxlint-disable-next-line no-deprecated */}
            <Stack space={4}>
              <Text>Text wrapped in card</Text>
              <Text muted>Text muted</Text>
            </Stack>
          </Card>
        </Stack>
      </Flex>
    )
  },
}

const ColoredText = styled(Text)<{$color?: ThemeColorSpotKey}>((
  props: {
    $color?: ThemeColorAvatarColorKey
  } & ThemeProps,
) => {
  const {color} = getTheme_v2(props.theme)

  return css`
    color: ${color.avatar[props.$color || 'gray'].bg};
  `
})

export const Colored: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack space={4}>
        {Object.values(SPOT_COLOR_OPTIONS).map((color) => (
          <ColoredText align="center" $color={color} key={color} size={4} weight="bold">
            {color}
          </ColoredText>
        ))}
      </Stack>
    </Flex>
  ),
}
