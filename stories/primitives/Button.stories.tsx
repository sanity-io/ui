import {CloseIcon, SearchIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {
  WORKSHOP_BUTTON_MODE_OPTIONS,
  WORKSHOP_BUTTON_TONE_OPTIONS,
} from '../../src/__workshop__/constants'
import {Button, Flex} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, ICON_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'
import {matrixBuilder} from '../helpers/matrixBuilder'
import {capitalize} from '../helpers/utils'

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

const buttonModes = Object.values(WORKSHOP_BUTTON_MODE_OPTIONS)
const buttonTones = Object.values(WORKSHOP_BUTTON_TONE_OPTIONS)

export const MultipleStyles: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'icon', 'iconRight'],
    },
  },
  render: (props) => (
    <Flex direction={'row'} wrap={'wrap'} gap={4} align={'center'}>
      {matrixBuilder({
        scheme: 'light',
        columns: buttonModes,
        rows: buttonTones,
        title: 'Tone / Mode',
        renderItem: ({row, column}) => (
          <Button {...props} tone={row} mode={column} text={capitalize(column)} />
        ),
      })}
      {matrixBuilder({
        scheme: 'dark',
        columns: buttonModes,
        rows: buttonTones,
        title: 'Tone / Mode',
        renderItem: ({row, column}) => (
          <Button {...props} tone={row} mode={column} text={capitalize(column)} />
        ),
      })}
    </Flex>
  ),
}
