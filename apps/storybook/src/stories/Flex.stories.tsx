import type { Meta, StoryObj} from '@storybook/react-vite'

import {Flex} from '../../../../packages/ui/src/components/Flex'
import { getArgTypes } from '../utils/getArgTypes'
import { flexProps } from '../../../../packages/ui/src/components/flex.props'

const argTypes = getArgTypes(flexProps)

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  args: {
    children: 'This is a Flex component.',
    as: 'div',
    display: 'flex',
  },
  argTypes,
  component: Flex,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  render: (props) => {
    return <Flex {...props} />
  },
}
