import {AddIcon, ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Code,
  Grid,
  Inline,
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
  {name: 'groups', title: 'Groups', component: GroupsStory},
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
    <Box padding={[4, 5, 6]}>
      <Grid columns={3} gap={2}>
        <Button id="prev-button" mode="ghost" text="Prev" />
        <LayerProvider>
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
            popover={{constrainSize: true, portal: true}}
          />
        </LayerProvider>
        <Button mode="ghost" id="next-button" text="Next" />
      </Grid>
    </Box>
  )
}

function GroupsStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Card padding={1} radius={3} shadow={1}>
        <Inline space={1}>
          <LayerProvider>
            <MenuButton
              button={<Button fontSize={1} mode="bleed" padding={2} text="File" />}
              id="example"
              menu={
                <Menu>
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'T']}
                    onClick={useAction('New tab')}
                    padding={2}
                    text="New tab"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'N']}
                    onClick={useAction('New window')}
                    padding={2}
                    text="New window"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⇧', '⌘', 'T']}
                    onClick={useAction('Reopen closed tab')}
                    padding={2}
                    text="Reopen closed tab"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'O']}
                    onClick={useAction('Open file…')}
                    padding={2}
                    text="Open file…"
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'L']}
                    onClick={useAction('Open location…')}
                    padding={2}
                    text="Open location…"
                  />
                  <MenuDivider />
                  <MenuGroup
                    fontSize={1}
                    onClick={useAction('Share')}
                    padding={2}
                    popover={{placement: 'right-start', portal: true}}
                    text="Share"
                  >
                    <MenuItem
                      fontSize={1}
                      onClick={useAction('Share / Email link')}
                      padding={2}
                      text="Email link"
                    />
                    <MenuItem
                      fontSize={1}
                      onClick={useAction('Share / Messages')}
                      padding={2}
                      text="Messages"
                    />
                    <MenuItem
                      fontSize={1}
                      onClick={useAction('Share / Airdrop')}
                      padding={2}
                      text="Airdrop"
                    />
                    <MenuItem fontSize={1} onClick={useAction('Notes')} padding={2} text="Notes" />
                    <MenuGroup
                      fontSize={1}
                      onClick={useAction('Share / More')}
                      padding={2}
                      popover={{placement: 'right-start', portal: true}}
                      text="More"
                    >
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Email link')}
                        padding={2}
                        text="Email link"
                      />
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Messages')}
                        padding={2}
                        text="Messages"
                      />
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Airdrop')}
                        padding={2}
                        text="Airdrop"
                      />
                      <MenuItem
                        fontSize={1}
                        onClick={useAction('Share / More / Notes')}
                        padding={2}
                        text="Notes"
                      />
                    </MenuGroup>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'P']}
                    onClick={useAction('Print…')}
                    padding={2}
                    text="Print…"
                  />
                </Menu>
              }
              popover={{constrainSize: true, portal: true, preventOverflow: true}}
            />
          </LayerProvider>

          <Button disabled fontSize={1} mode="bleed" padding={2} text="Edit" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="View" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Window" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Help" />
        </Inline>
      </Card>
    </Box>
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
