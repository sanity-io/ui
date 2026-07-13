import {Text as TextV3} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Text} from '../../../../packages/ui/src/components/text/Text'
import {textProps} from '../../../../packages/ui/src/components/text/text.props'
import {TEXT_SIZE} from '../../../../packages/ui/src/types/Text'
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(textProps)

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  args: {
    children: 'Text Component',
    as: 'p',
    size: 2,
  },
  argTypes,
  component: Text,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Text"]',
    },
    performance: {
      component: Text,
      compareComponent: TextV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: (props) => {
    return <Text {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Text Component')).classList).toContain('sui-text-body2')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {TEXT_SIZE.map((size) => (
          <Text {...props} key={size} size={size}>
            Text Size {size} ({['10px', '13px', '16px', '18.75px', '21.5px'][size]})
          </Text>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Text Size 3 (18.75px)')).classList).toContain(
      'sui-text-body3',
    )
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <>
        {TONE.map((tone) => (
          <Text {...props} key={tone} tone={tone}>
            Text Tone {tone[0].toUpperCase() + tone.slice(1)}
          </Text>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Text Tone Positive')).classList).toContain(
      'sui-tone-positive',
    )
  },
}

export const TrimLineClamp: Story = {
  name: 'Trim & Line Clamp',
  render: (props) => {
    return (
      <Text trim lineClamp={1} {...props}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText(/Lorem ipsum dolor sit amet/)).classList).toContain(
      'sui-line-clamp',
    )

    await expect(
      (await canvas.findByText(/Lorem ipsum dolor sit amet/)).parentElement?.classList,
    ).toContain('sui-text-trim')
  },
}
