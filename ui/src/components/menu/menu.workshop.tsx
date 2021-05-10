import {AddIcon, ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import {
  Avatar,
  Box,
  Button,
  Card,
  Code,
  Grid,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Stack,
} from '@sanity/ui'
import {defineScope, useAction} from '@sanity/ui-workshop'
import React, {useRef, useState} from 'react'

export default defineScope('components/menu', 'Menu', [
  {name: 'props', title: 'Props', component: MenuStory},
  {name: 'menu-button', title: 'MenuButton', component: MenuButtonStory},
  {name: 'with-group', title: 'With group', component: WithGroupStory},
  {name: 'tones', title: 'Tones', component: MenuItemTonesStory},
  {name: 'selected-item', title: 'Selected item', component: SelectedItemStory},
  {name: 'closable', title: 'Closeable', component: ClosableMenuButtonStory},
  {name: 'without-arrow', title: 'Without arrow', component: WithoutArrowStory},
])

function MenuStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <MenuButton
        button={<Button text="Menu" />}
        id="example-menu"
        menu={
          <Menu>
            <MenuItem selected text="A" />
            <MenuItem selected text="B" />
          </Menu>
        }
      />
    </Box>
  )
}

function MenuButtonStory() {
  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Grid columns={3} gap={2}>
          <Button id="prev-button" mode="ghost" text="Prev" />

          <MenuButton
            button={<Button tone="primary" text="Open" />}
            id="menu-button"
            menu={
              <Menu>
                <MenuItem
                  icon={SearchIcon}
                  id="menu-item-1"
                  onClick={useAction('Search')}
                  text="Search"
                />
                <MenuItem
                  icon={ClockIcon}
                  id="menu-item-2"
                  onClick={useAction('Clock')}
                  text="Clock"
                />
                <MenuItem
                  disabled
                  icon={CommentIcon}
                  id="menu-item-3"
                  onClick={useAction('Comment')}
                  text="Comment"
                />
                <MenuDivider />
                <MenuItem
                  icon={ExpandIcon}
                  id="menu-item-4"
                  onClick={useAction('Expand')}
                  text="Expand"
                />
              </Menu>
            }
            popover={{constrainSize: true}}
          />

          <Button mode="ghost" id="next-button" text="Next" />
        </Grid>
      </Box>
    </LayerProvider>
  )
}

function WithGroupStory() {
  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <MenuButton
          button={<Avatar as="button" color="magenta" size={2} />}
          id="example"
          menu={
            <Menu>
              <MenuItem icon={SearchIcon} onClick={useAction('Search')} text="Search" />
              <MenuItem icon={ClockIcon} onClick={useAction('Clock')} text="Clock" />
              <MenuItem disabled icon={CommentIcon} onClick={useAction('Comment')} text="Comment" />
              <MenuGroup title="test">
                <MenuItem icon={SearchIcon} onClick={useAction('Search')} text="Search" />
                <MenuItem icon={ClockIcon} onClick={useAction('Clock')} text="Clock" />
                <MenuItem
                  disabled
                  icon={CommentIcon}
                  onClick={useAction('Comment')}
                  text="Comment"
                />
                <MenuDivider />
                <MenuItem icon={ExpandIcon} onClick={useAction('Expand')} text="Expand" />
              </MenuGroup>
              <MenuDivider />
              <MenuItem icon={ExpandIcon} onClick={useAction('Expand')} text="Expand" />
            </Menu>
          }
          popover={{constrainSize: true, preventOverflow: true}}
        />
      </Box>
    </LayerProvider>
  )
}

function MenuItemTonesStory() {
  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
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
      </Box>
    </LayerProvider>
  )
}

function SelectedItemStory() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Box padding={[4, 5, 6]}>
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
    </Box>
  )
}

function ClosableMenuButtonStory() {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Box padding={[4, 5, 6]}>
      <Stack>
        <MenuButton
          button={<Button text="Open" />}
          id="closable-example"
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
                  onClick={() => {
                    ref.current?.click()
                    ref.current?.focus()
                  }}
                  mode="bleed"
                  text="Add item"
                  tone="primary"
                />
              </Stack>
            </Menu>
          }
          popover={{constrainSize: true}}
          ref={ref}
        />
      </Stack>
    </Box>
  )
}

function WithoutArrowStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack>
        <MenuButton
          button={<Button mode="ghost" text="Open menu" />}
          id="without-arrow-example"
          menu={
            <Menu>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
              <MenuItem text="Item 3" />
            </Menu>
          }
          popover={{
            __unstable_margins: [1, 1, 1, 1],
            arrow: false,
            constrainSize: true,
            fallbackPlacements: ['top-start'],
            matchReferenceWidth: true,
            radius: 0,
            placement: 'bottom-start',
          }}
        />
      </Stack>
    </Box>
  )
}
