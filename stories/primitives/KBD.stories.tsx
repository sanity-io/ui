import type {Meta, StoryObj} from '@storybook/react'
import {Flex, KBD} from '../../src/primitives'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof KBD> = {
  args: {
    children: 'Ctrl',
  },
  argTypes: {
    fontSize: getFontSizeControls('code'),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
  },
  component: KBD,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KBD>

export const Default: Story = {
  render: (props) => {
    return <KBD {...props} />
  },
}

export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <KBD {...props} radius={radius}>
            {radius}
          </KBD>
        ),
      })}
    </Flex>
  ),
}
