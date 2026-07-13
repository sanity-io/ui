import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Heading} from '../../../../packages/ui/src/components/heading/Heading'
import {headingProps} from '../../../../packages/ui/src/components/heading/heading.props'
import {HEADING_SIZE} from '../../../../packages/ui/src/types/Heading'
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(headingProps)

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  args: {
    children: 'Heading Component',
    as: 'h1',
    size: 2,
  },
  argTypes,
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Heading"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Default: Story = {
  render: (props) => {
    return <Heading {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Heading Component')).tagName).toBe('H1')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {HEADING_SIZE.map((size) => (
          <Heading {...props} key={size} size={size}>
            Heading Size {size} (
            {
              ['13px', '16px', '21px', '27px', '33px', '38px', '48px', '63px', '84px', '112px'][
                size
              ]
            }
            )
          </Heading>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Heading Size 3 (27px)')).classList).toContain(
      'sui-text-heading3',
    )
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <>
        {TONE.map((tone) => (
          <Heading {...props} key={tone} tone={tone}>
            Heading Tone {tone[0].toUpperCase() + tone.slice(1)}
          </Heading>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Heading Tone Positive')).classList).toContain(
      'sui-tone-positive',
    )
  },
}

export const TrimLineClamp: Story = {
  name: 'Trim & Line Clamp',
  render: (props) => {
    return (
      <Heading trim lineClamp={1} {...props}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Heading>
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
