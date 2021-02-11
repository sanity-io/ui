import {AddIcon, ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import {
  Avatar,
  Button,
  Card,
  Inline,
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
import {withCentered} from '$storybook/decorators'

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
          icon={AddIcon}
          id="menu-item-1"
          onClick={preventMouseEvent}
          text="Foo"
        />
        <MenuItem icon={AddIcon} id="menu-item-2" text="Bar" />
        <MenuDivider />
        <MenuItem icon={AddIcon} iconRight="checkmark" id="menu-item-1" text="Baz" />
      </Menu>
    </Card>
  </LayerProvider>
)

export const menuButton = () => (
  <LayerProvider>
    <Inline space={2}>
      <Button id="prev-button" text="Prev" />

      <MenuButton
        button={<Button tone="primary" text="Open" />}
        id="menu-button"
        menu={
          <Menu>
            <MenuItem icon={SearchIcon} id="menu-item-1" onClick={action('Search')} text="Search" />
            <MenuItem icon={ClockIcon} id="menu-item-2" onClick={action('Clock')} text="Clock" />
            <MenuItem
              disabled
              icon={CommentIcon}
              id="menu-item-3"
              onClick={action('Comment')}
              text="Comment"
            />
            <MenuDivider />
            <MenuItem icon={ExpandIcon} id="menu-item-4" onClick={action('Expand')} text="Expand" />
          </Menu>
        }
      />

      <Button id="next-button" text="Next" />
    </Inline>
  </LayerProvider>
)

export const menuButtonWithGroup = () => (
  <LayerProvider>
    <MenuButton
      button={<Avatar as="button" color="magenta" size={2} />}
      id="example"
      menu={
        <Menu>
          <MenuItem icon={SearchIcon} onClick={action('Search')} text="Search" />
          <MenuItem icon={ClockIcon} onClick={action('Clock')} text="Clock" />
          <MenuItem disabled icon={CommentIcon} onClick={action('Comment')} text="Comment" />
          <MenuGroup title="test">
            <MenuItem icon={SearchIcon} onClick={action('Search')} text="Search" />
            <MenuItem icon={ClockIcon} onClick={action('Clock')} text="Clock" />
            <MenuItem disabled icon={CommentIcon} onClick={action('Comment')} text="Comment" />
            <MenuDivider />
            <MenuItem icon={ExpandIcon} onClick={action('Expand')} text="Expand" />
          </MenuGroup>
          <MenuDivider />
          <MenuItem icon={ExpandIcon} onClick={action('Expand')} text="Expand" />
        </Menu>
      }
    />
  </LayerProvider>
)

export const menuItemTones = () => (
  <LayerProvider>
    <Card radius={3} shadow={3}>
      <Menu>
        <MenuItem icon={SearchIcon} text="Default" tone="default" />
        <MenuItem icon={SearchIcon} text="Transparent" tone="transparent" />
        <MenuItem icon={SearchIcon} text="Primary" tone="primary" />
        <MenuItem icon={SearchIcon} text="Positive" tone="positive" />
        <MenuItem icon={SearchIcon} text="Caution" tone="caution" />
        <MenuItem icon={SearchIcon} text="Critical" tone="critical" />
      </Menu>
    </Card>
  </LayerProvider>
)
