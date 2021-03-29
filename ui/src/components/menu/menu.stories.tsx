import {AddIcon, ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import {
  Avatar,
  Button,
  Card,
  Code,
  Inline,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Stack,
} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs'
import React, {useRef, useState} from 'react'
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

export const selectedItem = () => {
  return (
    <LayerProvider>
      <SelectedItemExample />
    </LayerProvider>
  )
}

function SelectedItemExample() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Stack space={4}>
      <Code>selectedIndex={selectedIndex}</Code>

      <MenuButton
        button={<Button text="Open menu" />}
        id="selected-item-example"
        menu={
          <Menu>
            <MenuItem
              icon={SearchIcon}
              onClick={() => setSelectedIndex(0)}
              selected={selectedIndex === 0}
              text="Search"
            />
            <MenuItem
              icon={ClockIcon}
              onClick={() => setSelectedIndex(1)}
              selected={selectedIndex === 1}
              text="Clock"
            />
            <MenuDivider />
            <MenuItem
              icon={ExpandIcon}
              onClick={() => setSelectedIndex(2)}
              selected={selectedIndex === 2}
              text="Expand"
            />
          </Menu>
        }
      />
    </Stack>
  )
}

export const closeableMenuButton = () => {
  return <ClosableMenuButtonExample />
}

function ClosableMenuButtonExample() {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Stack>
      <MenuButton
        button={<Button text="Open" />}
        id="closable-menu-button-example"
        menu={
          <Menu padding={0} space={0}>
            <Stack padding={1} space={1}>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
              <MenuItem text="Item 3" />
              <MenuItem text="Item 4" />
            </Stack>
            <Stack padding={1} style={{borderTop: '1px solid var(--card-border-color)'}}>
              <Button
                icon={AddIcon}
                onClick={() => ref.current?.focus()}
                mode="bleed"
                text="Add item"
                tone="primary"
              />
            </Stack>
          </Menu>
        }
        ref={ref}
      />
    </Stack>
  )
}

export const menuButtonWithoutArrow = () => {
  return (
    <MenuButton
      button={<Button text="Open menu" />}
      id="menu-button-without-arrow-example"
      menu={
        <Menu>
          <MenuItem text="Item 1" />
        </Menu>
      }
      popover={{arrow: false}}
    />
  )
}
