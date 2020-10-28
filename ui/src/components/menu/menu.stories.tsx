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
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  decorators: [withCentered],
  title: 'Components/Menu',
}

export const menu = () => (
  <LayerProvider>
    <Card>
      <Menu>
        <MenuItem icon="add" text="Foo" />
        <MenuItem icon="add" text="Bar" />
        <MenuDivider />
        <MenuItem icon="add" iconRight="checkmark" text="Baz" />
      </Menu>
    </Card>
  </LayerProvider>
)

export const menuButton = () => (
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
