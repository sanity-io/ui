import {FaceHappyIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Badge as BadgeV3} from 'ui3'

import {Badge} from '../../../../packages/ui/src/components/badge/Badge'
import {badgeProps} from '../../../../packages/ui/src/components/badge/badge.props'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(badgeProps)

function BadgeV3Comparison({text}: {text?: string}) {
  return <BadgeV3>{text}</BadgeV3>
}

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  args: {
    text: 'Badge',
  },
  argTypes,
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Badge"]',
    },
    performance: {
      component: Badge,
      compareComponent: BadgeV3Comparison,
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (props) => {
    return <Badge {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Badge')).parentElement?.dataset.ui).toBe('Badge')
  },
}

export const IconStart: Story = {
  render: (props) => {
    return <Badge {...props} iconStart={FaceHappyIcon} text="Success" />
  },
  play: async ({canvas}) => {
    const badge = (await canvas.findByText('Success')).parentElement

    await expect(badge?.querySelector('svg')?.dataset.ui).toBe('Icon')
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <HStack gap={3}>
        {TONE.map((tone) => (
          <Badge {...props} key={tone} tone={tone} text={`Badge ${tone} tone`} />
        ))}
      </HStack>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Badge positive tone')).parentElement?.classList,
    ).toContain('sui-tone-positive')
  },
}
