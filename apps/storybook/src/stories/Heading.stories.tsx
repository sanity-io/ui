import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Heading} from '../../../../packages/ui/src/components/heading/Heading'
import {headingProps} from '../../../../packages/ui/src/components/heading/heading.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(headingProps)

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  args: {
    children: 'This is a Heading component.',
    as: 'h1',
    size: 2,
  },
  argTypes,
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Heading',
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
    await expect((await canvas.findByText('This is a Heading component.')).tagName).toBe('H1')
  },
}

export const TrimLineClamp: Story = {
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
