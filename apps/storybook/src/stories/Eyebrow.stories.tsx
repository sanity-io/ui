import {Label as EyebrowV3} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Eyebrow} from '../../../../packages/ui/src/components/eyebrow/Eyebrow'
import {eyebrowProps} from '../../../../packages/ui/src/components/eyebrow/eyebrow.props'
import {EYEBROW_SIZE} from '../../../../packages/ui/src/types/Eyebrow'
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(eyebrowProps)

const meta: Meta<typeof Eyebrow> = {
  title: 'Typography/Eyebrow',
  args: {
    children: 'Eyebrow Component',
    as: 'p',
    size: 2,
  },
  argTypes,
  component: Eyebrow,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Eyebrow"]',
    },
    performance: {
      component: Eyebrow,
      compareComponent: EyebrowV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Eyebrow>

export const Default: Story = {
  render: (props) => {
    return <Eyebrow {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Eyebrow Component')).classList).toContain(
      'sui-text-eyebrow2',
    )
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {EYEBROW_SIZE.map((size) => (
          <Eyebrow {...props} key={size} size={size}>
            Eyebrow Size {size} ({['8.1px', '9.5px', '10.8', '12.25px', '13.6px'][size]})
          </Eyebrow>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Eyebrow Size 3 (12.25px)')).classList).toContain(
      'sui-text-eyebrow3',
    )
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <>
        {TONE.map((tone) => (
          <Eyebrow {...props} key={tone} tone={tone}>
            Eyebrow Tone {tone[0].toUpperCase() + tone.slice(1)}
          </Eyebrow>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Eyebrow Tone Positive')).classList).toContain(
      'sui-tone-positive',
    )
  },
}

export const TrimLineClamp: Story = {
  name: 'Trim & Line Clamp',
  render: (props) => {
    return (
      <Eyebrow trim lineClamp={1} {...props}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Eyebrow>
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
