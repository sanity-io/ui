import type {Meta, StoryObj} from '@storybook/react'
import {Button, Card, Popover, Text} from '../../src/primitives'
import {RADII} from '../constants'
import {getRadiusControls, getShadowControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Popover> = {
  args: {
    children: <Button text="This button is the popover reference" />,
    content: <Text size={1}>popover content</Text>,
    open: true,
    padding: 3,
  },
  argTypes: {
    radius: getRadiusControls(),
    shadow: getShadowControls(),
  },
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (props) => {
    return (
      <Card paddingY={6}>
        <Popover {...props} />
      </Card>
    )
  },
}

// @todo: understand why this story doesn't render in storybook docs
// (but renders correctly in the individual story preview)
export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <Card padding={6}>
      {rowBuilder({
        gap: 8,
        renderItem: ({value}) => (
          <Popover {...props} radius={value}>
            <Button text={String(value)} />
          </Popover>
        ),
        rows: RADII,
      })}
    </Card>
  ),
}
