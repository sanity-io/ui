import {
  ArrowUpIcon,
  CheckmarkIcon,
  CloseIcon,
  ErrorOutlineIcon,
  SearchIcon,
  WarningOutlineIcon,
} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Button, Flex, Stack} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, ICON_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'

const meta: Meta<typeof Button> = {
  args: {
    text: 'Label',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    icon: ICON_CONTROLS,
    iconRight: ICON_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
    space: SPACE_CONTROLS,
    text: {control: 'text'},
  },
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (props) => <Button {...props} />,
}

export const Loading: Story = {
  args: {loading: true},
  render: (props) => <Button {...props} />,
}

export const WithIcons: Story = {
  args: {
    icon: SearchIcon,
    iconRight: CloseIcon,
  },
  parameters: {
    controls: {
      include: ['icon', 'iconRight', 'mode', 'space', 'tone'],
    },
  },
  render: (props) => <Button {...props} />,
}

export const Modes: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Button {...props} text="Default" />
      <Button {...props} mode="bleed" text="Bleed" />
      <Button {...props} mode="ghost" text="Default" />
    </Flex>
  ),
}

export const Tones: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'mode', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Button {...props} text="Default" />
      <Button {...props} text="Primary" tone="primary" />
      <Button {...props} text="Positive" tone="positive" />
      <Button {...props} text="Caution" tone="caution" />
      <Button {...props} text="Critical" tone="critical" />
    </Flex>
  ),
}

export const MultipleStyles: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Stack space={3}>
      <Flex gap={2}>
        <Button {...props} icon={SearchIcon} text="Default" />
        <Button {...props} icon={ArrowUpIcon} text="Primary" tone="primary" />
        <Button {...props} icon={CheckmarkIcon} text="Positive" tone="positive" />
        <Button {...props} icon={WarningOutlineIcon} text="Caution" tone="caution" />
        <Button {...props} icon={ErrorOutlineIcon} text="Critical" tone="critical" />
      </Flex>
      <Flex gap={2}>
        <Button {...props} icon={SearchIcon} mode="bleed" text="Default" />
        <Button {...props} icon={ArrowUpIcon} mode="bleed" text="Primary" tone="primary" />
        <Button {...props} icon={CheckmarkIcon} mode="bleed" text="Positive" tone="positive" />
        <Button {...props} icon={WarningOutlineIcon} mode="bleed" text="Caution" tone="caution" />
        <Button {...props} icon={ErrorOutlineIcon} mode="bleed" text="Critical" tone="critical" />
      </Flex>
      <Flex gap={2}>
        <Button {...props} icon={SearchIcon} mode="ghost" text="Default" />
        <Button {...props} icon={ArrowUpIcon} mode="ghost" text="Primary" tone="primary" />
        <Button {...props} icon={CheckmarkIcon} mode="ghost" text="Positive" tone="positive" />
        <Button {...props} icon={WarningOutlineIcon} mode="ghost" text="Caution" tone="caution" />
        <Button {...props} icon={ErrorOutlineIcon} mode="ghost" text="Critical" tone="critical" />
      </Flex>
    </Stack>
  ),
}
