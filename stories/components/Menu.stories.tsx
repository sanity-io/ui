import {BinaryDocumentIcon, RestoreIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Menu, MenuDivider, MenuGroup, MenuItem} from '../../src/components'
import {Card, Container} from '../../src/primitives'
import {LayerProvider} from '../../src/utils'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof Menu> = {
  args: {
    padding: 1,
    space: 1,
  },
  argTypes: {
    padding: getSpaceControls(),
    space: getSpaceControls(),
    disabled: {control: 'boolean'},
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
  },
  component: Menu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  render: (props) => {
    return (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Menu {...props}>
              <MenuItem icon={RestoreIcon} id="menu-item-1" text="Review changes" />
              <MenuItem icon={BinaryDocumentIcon} id="menu-item-2" text="Inspect" />
              <MenuDivider />
              <MenuGroup
                id="menu-item-2"
                text="Menu item with submenu"
                popover={{placement: 'right'}}
              >
                <MenuItem id="menu-item-2-1" text="Menu item" />
                <MenuItem id="menu-item-2-2" text="Menu item" />
              </MenuGroup>
            </Menu>
          </LayerProvider>
        </Card>
      </Container>
    )
  },
}
