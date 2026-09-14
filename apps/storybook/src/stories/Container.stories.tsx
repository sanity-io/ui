import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'
import {Container as ContainerV3} from 'ui3'

import {Container} from '../../../../packages/ui/src/components/container/Container'
import {containerProps} from '../../../../packages/ui/src/components/container/container.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {CONTAINER_SIZE} from '../../../../packages/ui/src/types/Container'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(containerProps)

const meta: Meta<typeof Text> = {
  title: 'Layout/Container',
  args: {
    as: 'div',
    size: 0,
  },
  argTypes,
  component: Container,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Container"]',
    },
    performance: {
      component: Container,
      compareComponent: ContainerV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  render: (props) => {
    return (
      <Container {...props}>
        <Text as="p">Container Component</Text>
      </Container>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Container Component')).parentElement?.closest(
        '[data-ui="Container"]',
      )?.classList,
    ).toContain('sui-mx-auto')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {CONTAINER_SIZE.map((size) => (
          <Container {...props} key={size} size={size} padding={3} marginY={2} tone="neutral">
            <Text>
              Container Size {size} (
              {['320px', '640px', '960px', '1280px', '1600px', '1920px'][size]})
            </Text>
          </Container>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Container Size 3 (1280px)')).parentElement?.closest(
        '[data-ui="Container"]',
      )?.classList,
    ).toContain('sui-container3')
  },
}
