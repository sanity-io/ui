import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {Menu, MenuItem} from '../../src/core/components'
import {Card, Container} from '../../src/core/primitives'
import {LayerProvider} from '../../src/core/utils'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof MenuItem> = {
  args: {
    text: 'Menu item',
  },
  argTypes: {
    disabled: {control: 'boolean'},
    padding: getSpaceControls(),
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    space: getSpaceControls(),
  },
  component: MenuItem,
  decorators: [
    (Story: StoryFn): JSX.Element => (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Menu>
              <Story />
            </Menu>
          </LayerProvider>
        </Card>
      </Container>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  render: (props) => {
    return <MenuItem {...props} />
  },
}
