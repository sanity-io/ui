import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Container} from '../../../../packages/ui/src/components/container/Container'
import {containerProps} from '../../../../packages/ui/src/components/container/container.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {CONTAINER_SIZE} from '../../../../packages/ui/src/types/Container'
import {Square} from '../components/Square'
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
      context: '.sui-Text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  render: (props) => {
    return (
      <Container {...props}>
        <Square style={{width: '100%'}}>
          <Text>Container Component</Text>
        </Square>
      </Container>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Container Component')).parentElement?.closest('.sui-Container')
        ?.classList,
    ).toContain('sui-mx-auto')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {CONTAINER_SIZE.map((size) => (
          <Container {...props} key={size} contentSize={size}>
            <Square style={{width: '100%'}}>
              <Text>
                Container Size {size} (
                {['320px', '640px', '960px', '1280px', '1600px', '1920px'][size]})
              </Text>
            </Square>
          </Container>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Container Size 3 (1280px)')).parentElement?.closest(
        '.sui-Container',
      )?.classList,
    ).toContain('sui-container3')
  },
}
