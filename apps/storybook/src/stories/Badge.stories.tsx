import {FaceHappyIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Badge} from '../../../../packages/ui/src/components/badge/Badge'
import {badgeProps} from '../../../../packages/ui/src/components/badge/badge.props'
import {HStack} from '../../../../packages/ui/src/components/h-stack/HStack'
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(badgeProps)

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  args: {},
  argTypes,
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Badge',
    },
    performance: {
      component: Badge,
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (props) => {
    return <Badge {...props} text="Badge" />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}

export const IconStart: Story = {
  render: (props) => {
    return <Badge {...props} iconStart={FaceHappyIcon} text="Success" />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
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
    await expect((await canvas.findByText('Badge Tone Positive')).classList).toContain(
      'sui-tone-positive',
    )
  },
}
