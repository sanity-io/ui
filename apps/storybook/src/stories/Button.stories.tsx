import {EditIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {buttonProps} from '../../../../packages/ui/src/components/button/button.props'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {VStack} from '../../../../packages/ui/src/components/v-stack/VStack'
import {BUTTON_DENSITY, BUTTON_LEVEL, BUTTON_TONE} from '../../../../packages/ui/src/types/Button'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(buttonProps)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  args: {
    text: 'Button',
  },
  argTypes,
  component: Button,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Button',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (props) => {
    return <Button {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Button')).parentElement?.classList).toContain(
      'sui-Button',
    )
  },
}

export const Disabled: Story = {
  render: (props) => {
    return <Button {...props} disabled text="Disabled Button" />
  },
  play: async ({canvas}) => {
    await expect(
      ((await canvas.findByText('Disabled Button')).parentElement as HTMLButtonElement)?.disabled,
    ).toBe(true)
  },
}

export const FullWidth: Story = {
  render: (props) => {
    return <Button {...props} fullWidth />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Button')).parentElement?.classList).toContain(
      'sui-width-full',
    )
  },
}

export const Density: Story = {
  render: (props) => {
    return (
      <HStack gap={3}>
        {BUTTON_DENSITY.map((density) => (
          <Button
            {...props}
            key={density}
            density={density}
            iconStart={EditIcon}
            text={`Button Size ${density[0].toUpperCase() + density.slice(1)}`}
          />
        ))}
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Button Size Regular')).parentElement?.classList,
    ).toContain('sui-p2')
  },
}

export const Tones: Story = {
  name: 'Tones & Levels',
  render: (props) => {
    return (
      <VStack gap={3}>
        {BUTTON_LEVEL.map((level) => (
          <HStack gap="inherit">
            {BUTTON_TONE.map((tone) => (
              <Button
                {...props}
                key={`${level}-${tone}`}
                level={level}
                tone={tone}
                text={`Button ${level[0].toUpperCase() + level.slice(1)} ${tone[0].toUpperCase() + tone.slice(1)}`}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Button Primary Critical')).parentElement?.classList,
    ).toContain('sui-tone-critical')

    await expect(
      (await canvas.findByText('Button Primary Critical')).parentElement?.classList,
    ).toContain('sui-button-level-primary')
  },
}
