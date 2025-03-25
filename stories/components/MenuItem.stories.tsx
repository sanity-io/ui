import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import { Menu } from '../../src/core/components/menu/menu'
import { MenuItem } from '../../src/core/components/menu/menuItem'
import { Card } from '../../src/core/primitives/card/card'
import { Container } from '../../src/core/primitives/container/container'
import { LayerProvider } from '../../src/core/utils/layer/layerProvider'
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
    (Story: StoryFn): React.JSX.Element => (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Menu>
              {/* @ts-expect-error fix later */}
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
