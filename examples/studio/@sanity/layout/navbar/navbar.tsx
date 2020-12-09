import {useLocation} from '@sanity/base'
import {BellIcon, ComposeIcon, LeaveIcon, MenuIcon, PackageIcon, SearchIcon} from '@sanity/icons'
import {
  Avatar,
  AvatarStack,
  Box,
  Button,
  Card,
  ElementQuery,
  Flex,
  LayerProvider,
  Menu,
  MenuButton,
  MenuItem,
  Text,
  useLayer,
} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import styled, {css} from 'styled-components'
import {ComposeDialog} from './composeDialog'
import {DatasetSelect} from './datasetSelect'
import {NavDrawer} from './navDrawer'
import {Search} from './search'
import {ToolMenu} from './toolMenu'

const Root = styled(Card)`
  position: relative;
  /* border-bottom: 1px solid var(--card-hairline-soft-color); */
  white-space: nowrap;
`

const ToggleMenuButtonBox = styled(Box)<{visible: boolean}>(({visible}) => {
  const display = visible ? 'none' : 'block'

  return css`
    /* .sanity-navbar[data-eq-min~='1'] & {
    } */

    @media (min-width: ${640 - 1}px) {
      display: ${display};
    }
  `
})

const BrandingBox = styled(Box)`
  overflow: hidden;

  .sanity-navbar[data-eq-max~='1'] & {
    flex: 1;
    min-width: 0;
    text-align: center;
  }
`

const SearchBox = styled(Box)`
  .sanity-navbar[data-eq-max~='1'] & {
    display: none;
  }
`

const ToolMenuBox = styled(Box)`
  .sanity-navbar[data-eq-max~='1'] & {
    display: none;
  }
`

const MembersMenuBox = styled(Box)`
  @media (max-width: ${640 - 1}px) {
    display: none;
  }
`

const UserMenuBox = styled(Box)`
  @media (max-width: ${640 - 1}px) {
    display: none;
  }
`

const NarrowComposeBox = styled(Box)`
  @media (min-width: ${640}px) {
    display: none;
  }
`

const WideComposeBox = styled(Box)`
  @media (max-width: ${640 - 1}px) {
    display: none;
  }
`

const NotificationsButtonBox = styled(Box)`
  /* @media (max-width: ${640 - 1}px) {
    display: none;
  } */
`

const SearchButtonBox = styled(Box)`
  @media (min-width: ${640}px) {
    display: none;
  }
`

export function Navbar({projectName}: {projectName: string}) {
  const {handleLinkClick} = useLocation()
  const layer = useLayer()

  const [toolMenuVisible, setToolMenuVisible] = useState(false)
  const handleToolMenuHide = useCallback(() => setToolMenuVisible(false), [])
  const handleToolMenuShow = useCallback(() => setToolMenuVisible(true), [])

  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleMenuShow = () => setDrawerOpen(true)
  const handleMenuHide = () => setDrawerOpen(false)

  const [composeDialogOpen, setComposeDialogOpen] = useState(false)
  const handleComposeDialogOpen = () => setComposeDialogOpen(true)
  const handleComposeDialogClose = () => setComposeDialogOpen(false)

  return (
    <>
      <ElementQuery className="sanity-navbar">
        <Root borderBottom padding={1} scheme="dark" style={{zIndex: layer.zIndex}}>
          <Flex align="center">
            <ToggleMenuButtonBox padding={1} visible={toolMenuVisible}>
              <Button icon={MenuIcon} mode="bleed" onClick={handleMenuShow} />
            </ToggleMenuButtonBox>

            <NarrowComposeBox padding={1}>
              <Button
                aria-label="Create new document"
                icon={ComposeIcon}
                mode="bleed"
                onClick={handleComposeDialogOpen}
              />
            </NarrowComposeBox>

            <BrandingBox padding={1}>
              <Button
                as="a"
                href="/"
                mode="bleed"
                onClick={handleLinkClick}
                text={<strong style={{color: 'var(--card-fg-color)'}}>{projectName}</strong>}
              />
            </BrandingBox>

            <Box padding={1}>
              <DatasetSelect />
            </Box>

            <WideComposeBox padding={1}>
              <Button
                aria-label="Create new document"
                icon={ComposeIcon}
                mode="bleed"
                onClick={handleComposeDialogOpen}
              />
            </WideComposeBox>

            <SearchBox padding={1}>
              <Search />
            </SearchBox>

            <ToolMenuBox flex={1} padding={1}>
              <ToolMenu onHide={handleToolMenuHide} onShow={handleToolMenuShow} />
            </ToolMenuBox>

            <NotificationsButtonBox padding={1}>
              <MenuButton
                button={<Button aria-label="Open notifications" icon={BellIcon} mode="bleed" />}
                id="notification-menu"
                menu={
                  <Menu>
                    <MenuItem icon={PackageIcon} text="10 updates" />
                  </Menu>
                }
                popoverScheme="light"
              ></MenuButton>
            </NotificationsButtonBox>

            <MembersMenuBox padding={1}>
              <MenuButton
                button={
                  <Button aria-label="Open list of online users" mode="bleed">
                    <Box padding={3} aria-hidden>
                      <AvatarStack style={{margin: -6}}>
                        <Avatar color="purple" initials="eh" />
                        <Avatar color="blue" initials="ss" />
                        <Avatar color="cyan" initials="ir" />
                      </AvatarStack>
                    </Box>
                  </Button>
                }
                id="members-menu"
                menu={
                  <Menu>
                    <MenuItem>
                      <Box paddingX={4} paddingY={3}>
                        <Flex align="center">
                          <Box marginRight={3}>
                            <Avatar color="cyan" initials="ir" size={1} />
                          </Box>
                          <Text>Ida Vikan Rise</Text>
                        </Flex>
                      </Box>
                    </MenuItem>
                    <MenuItem>
                      <Box paddingX={4} paddingY={3}>
                        <Flex align="center">
                          <Box marginRight={3}>
                            <Avatar color="blue" initials="ss" size={1} />
                          </Box>
                          <Text>Simen Svale Skogsrud</Text>
                        </Flex>
                      </Box>
                    </MenuItem>
                    <MenuItem>
                      <Box paddingX={4} paddingY={3}>
                        <Flex align="center">
                          <Box marginRight={3}>
                            <Avatar color="purple" initials="eh" size={1} />
                          </Box>
                          <Text>Espen Hovlandsdal</Text>
                        </Flex>
                      </Box>
                    </MenuItem>
                  </Menu>
                }
                popoverScheme="light"
              />
            </MembersMenuBox>

            <UserMenuBox padding={1} paddingRight={3}>
              <MenuButton
                button={<Avatar as="button" color="magenta" initials="ml" size={1} />}
                id="user-menu"
                menu={
                  <Menu>
                    <MenuItem icon={LeaveIcon} text="Sign out" />
                  </Menu>
                }
                popoverScheme="light"
              />
            </UserMenuBox>

            <SearchButtonBox padding={1}>
              <Button icon={SearchIcon} mode="bleed" />
            </SearchButtonBox>
          </Flex>
        </Root>
      </ElementQuery>

      {composeDialogOpen && <ComposeDialog onClose={handleComposeDialogClose} />}

      <LayerProvider zOffset={1000}>
        <NavDrawer onHide={handleMenuHide} open={drawerOpen} />
      </LayerProvider>
    </>
  )
}
