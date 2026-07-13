import {
  AddIcon,
  CheckmarkIcon,
  CloseIcon,
  EditIcon,
  SearchIcon,
  WarningOutlineIcon,
} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {IconButton} from '../../../../packages/ui/src/components/icon-button/IconButton'
import {iconButtonProps} from '../../../../packages/ui/src/components/icon-button/iconButton.props'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {BUTTON_DENSITY, BUTTON_LEVEL, BUTTON_TONE} from '../../../../packages/ui/src/types/Button'
import {getArgTypes} from '../utils/getArgTypes'

const ICON_OPTIONS = {
  AddIcon,
  CheckmarkIcon,
  CloseIcon,
  EditIcon,
  SearchIcon,
  WarningOutlineIcon,
}

const argTypes = {
  ...getArgTypes(iconButtonProps),
  icon: {
    options: Object.keys(ICON_OPTIONS),
    control: {type: 'select'} as const,
    mapping: ICON_OPTIONS,
  },
}

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  args: {
    icon: AddIcon,
  },
  argTypes,
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="IconButton"]',
    },
    performance: {
      component: IconButton,
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  render: (props) => {
    return <IconButton {...props} aria-label="Icon Button" />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Icon Button')).dataset.ui).toBe('IconButton')
  },
}

export const Disabled: Story = {
  render: (props) => {
    return <IconButton {...props} aria-label="Disabled Icon Button" disabled />
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Disabled Icon Button')) as HTMLButtonElement)?.disabled,
    ).toBe(true)
  },
}

export const Loading: Story = {
  render: (props) => {
    return <IconButton {...props} aria-label="Loading Icon Button" loading />
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByLabelText('Loading Icon Button')) as HTMLButtonElement)?.ariaBusy,
    ).toBe('true')
  },
}

export const Density: Story = {
  render: (props) => {
    return (
      <HStack gap={3}>
        {BUTTON_DENSITY.map((density) => (
          <IconButton
            {...props}
            key={density}
            density={density}
            aria-label={`Icon Button Size ${density[0].toUpperCase() + density.slice(1)}`}
          />
        ))}
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Icon Button Size Regular')).classList).toContain(
      'sui-p2',
    )
  },
}

export const Tones: Story = {
  name: 'Tones & Levels',
  render: (props) => {
    return (
      <VStack gap={3}>
        {BUTTON_LEVEL.map((level) => (
          <HStack key={level} gap="inherit">
            {BUTTON_TONE.map((tone) => (
              <IconButton
                {...props}
                key={`${level}-${tone}`}
                level={level}
                tone={tone}
                aria-label={`Icon Button ${level[0].toUpperCase() + level.slice(1)} ${tone[0].toUpperCase() + tone.slice(1)}`}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByLabelText('Icon Button Primary Critical')).classList,
    ).toContain('sui-tone-critical')

    await expect(
      (await canvas.findByLabelText('Icon Button Primary Critical')).classList,
    ).toContain('sui-button-level-primary')
  },
}
