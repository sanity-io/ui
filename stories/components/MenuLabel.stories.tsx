import type {Meta, StoryFn, StoryObj} from '@storybook/react'

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuLabel,
} from '../../src/core/components'
import {Button, Card, Container} from '../../src/core/primitives'
import {LayerProvider} from '../../src/core/utils'
import {getSpaceControls} from '../controls'

const meta: Meta<typeof MenuLabel> = {
  args: {
    text: 'Menu label',
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
  },
  component: MenuLabel,
  decorators: [
    (Story): React.JSX.Element => (
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
type Story = StoryObj<typeof MenuLabel>

export const Default: Story = {
  render: (props) => {
    return <MenuLabel {...props} />
  },
}

export const WithMultipleItems: Story = {
  render: (props) => {
    return (
      <>
        <MenuItem text="Item 1" />
        <MenuItem text="Item 2" />
        <MenuLabel {...props} />
        <MenuItem text="Item 3" />
        <MenuItem text="Item 4" />
        <MenuDivider />
        <MenuItem text="Item 5" />
        <MenuItem text="Item 6" />
      </>
    )
  },
}

export const WithNestedMenu: Story = {
  render: (props) => {
    return (
      <>
        <MenuItem text="Item 1" />
        <MenuItem text="Item 2" />
        <MenuLabel {...props} />
        <MenuGroup text="Nested menu">
          <MenuItem text="Item 3" />
          <MenuItem text="Item 4" />
        </MenuGroup>
      </>
    )
  },
}

export const WithMenuButton: Story = {
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            {/* @ts-expect-error fix later */}
            <Story />
          </LayerProvider>
        </Card>
      </Container>
    ),
  ],
  render: (props) => {
    return (
      <>
        <MenuButton
          id="menu"
          menu={
            <Menu>
              <MenuLabel text="Label 1" {...props} />
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
              <MenuLabel text="Item 3" {...props} />
              <MenuItem text="Item 4" />
            </Menu>
          }
          button={<Button text="Open menu" />}
        />
      </>
    )
  },
}
