import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {flexProps} from '../../../../packages/ui/src/components/flex/flex.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {Square} from '../components/Square'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(flexProps)

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  args: {
    as: 'div',
    display: 'flex',
  },
  argTypes,
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-Flex',
    },
  },
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  render: (props) => {
    return (
      <Flex {...props}>
        <Square>
          <Text>1</Text>
        </Square>
        <Square>
          <Text>2</Text>
        </Square>
        <Square>
          <Text>3</Text>
        </Square>
      </Flex>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('1')).parentElement?.closest('.sui-Flex')?.classList,
    ).toContain('sui-display-flex')
  },
}
