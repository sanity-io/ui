import {Spinner as SpinnerV3} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {Spinner} from '../../../../packages/ui/src/components/spinner/Spinner'
import {spinnerProps} from '../../../../packages/ui/src/components/spinner/spinner.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {ICON_SIZE} from '../../../../packages/ui/src/types/Icon'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(spinnerProps)

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  argTypes,
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Spinner"]',
    },
    performance: {
      component: Spinner,
      compareComponent: SpinnerV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: (props) => {
    return <Spinner {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Loading...')).dataset.ui).toBe('Spinner')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {ICON_SIZE.map((size) => (
          <Flex key={size} alignItems="center">
            <Spinner {...props} size={size} aria-label={`Spinner Size ${size}`} />
            <Text size={size}>({['17px', '21px', '25px', '29px', '33px'][size]})</Text>
          </Flex>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Spinner Size 3')).classList).toContain(
      'sui-icon-body3',
    )
  },
}
