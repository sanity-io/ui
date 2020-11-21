import {
  Avatar,
  Card,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  decorators: [withCentered, withKnobs],
  title: 'Components/Menu',
}

const preventMouseEvent = (event: React.MouseEvent) => event.preventDefault()

export const menu = () => (
  <LayerProvider>
    <Card>
      <Menu>
        <MenuItem
          as="a"
          href="#"
          icon="add"
          id="menu-item-1"
          onClick={preventMouseEvent}
          text="Foo"
        />
        <MenuItem icon="add" id="menu-item-2" text="Bar" />
        <MenuDivider />
        <MenuItem icon="add" iconRight="checkmark" id="menu-item-1" text="Baz" />
      </Menu>
    </Card>
  </LayerProvider>
)

export const menuButton = () => (
  <LayerProvider>
    <MenuButton
      button={<Avatar as="button" color="magenta" size={2} />}
      id="menu-button"
      menu={
        <Menu>
          <MenuItem icon="search" id="menu-item-1" onClick={action('Search')} text="Search" />
          <MenuItem icon="clock" id="menu-item-2" onClick={action('Clock')} text="Clock" />
          <MenuItem
            disabled
            icon="comment"
            id="menu-item-3"
            onClick={action('Comment')}
            text="Comment"
          />
          <MenuDivider />
          <MenuItem icon="expand" id="menu-item-4" onClick={action('Expand')} text="Expand" />
        </Menu>
      }
    />
  </LayerProvider>
)

export const menuButtonWithGroup = () => (
  <LayerProvider>
    <MenuButton
      button={<Avatar as="button" color="magenta" size={2} />}
      id="example"
      menu={
        <Menu>
          <MenuItem icon="search" onClick={action('Search')} text="Search" />
          <MenuItem icon="clock" onClick={action('Clock')} text="Clock" />
          <MenuItem disabled icon="comment" onClick={action('Comment')} text="Comment" />
          <MenuGroup title="test">
            <MenuItem icon="search" onClick={action('Search')} text="Search" />
            <MenuItem icon="clock" onClick={action('Clock')} text="Clock" />
            <MenuItem disabled icon="comment" onClick={action('Comment')} text="Comment" />
            <MenuDivider />
            <MenuItem icon="expand" onClick={action('Expand')} text="Expand" />
          </MenuGroup>
          <MenuDivider />
          <MenuItem icon="expand" onClick={action('Expand')} text="Expand" />
        </Menu>
      }
    />
  </LayerProvider>
)
