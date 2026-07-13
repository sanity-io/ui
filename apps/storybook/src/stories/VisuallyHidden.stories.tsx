import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {VisuallyHidden} from '../../../../packages/ui/src/components/visually-hidden/VisuallyHidden'
import {visuallyHiddenProps} from '../../../../packages/ui/src/components/visually-hidden/visuallyHidden.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(visuallyHiddenProps)

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/VisuallyHidden',
  args: {
    children: 'Screen reader only text',
  },
  argTypes,
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="VisuallyHidden"]',
    },
  },
}

export default meta
type Story = StoryObj<typeof VisuallyHidden>

export const Default: Story = {
  render: (props) => {
    return <VisuallyHidden {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Screen reader only text')).dataset.ui).toBe(
      'VisuallyHidden',
    )
  },
}
