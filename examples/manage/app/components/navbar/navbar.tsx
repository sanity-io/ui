import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  Switch,
  Text,
} from '@sanity/ui'
import React from 'react'
import {useLocation} from '../../../lib/location'
import {useApp} from '../../hooks'
import {Search} from './search'

export function Navbar() {
  const {setThemeMode, themeMode} = useApp()
  const {handleLinkClick} = useLocation()

  return (
    <Card shadow={1} style={{position: 'sticky', zIndex: 2, top: 0}}>
      <Container width={3}>
        <Box paddingX={2} paddingY={4}>
          <Flex align="center">
            <Box padding={3}>
              <Button
                as="a"
                href="/"
                mode="bleed"
                onClick={handleLinkClick}
                text={<strong>Manage</strong>}
              />
            </Box>
            <Box flex={1}>
              <MenuButton
                button={
                  <Button icon="users" iconRight="chevron-down" mode="ghost" text="Sanity.io" />
                }
                id="select-org"
                menu={
                  <Menu>
                    <MenuItem icon="users" iconRight="checkmark" text="Sanity.io" />
                    <MenuItem icon="users" text="GROQ" />
                    <MenuItem icon="users" text="Portable Text" />
                  </Menu>
                }
              />
            </Box>
            <Box>
              <Search />
            </Box>
            <Box paddingX={4} paddingY={2}>
              <Flex align="center">
                <Text>
                  <Icon symbol="sun" />
                </Text>
                <Box paddingX={3}>
                  <Switch
                    checked={themeMode === 'dark'}
                    onChange={(event) =>
                      setThemeMode(event.currentTarget.checked ? 'dark' : 'light')
                    }
                    style={{verticalAlign: 'top'}}
                  />
                </Box>
                <Text>
                  <Icon symbol="moon" />
                </Text>
              </Flex>
            </Box>
            <Box>
              <MenuButton
                button={<Avatar as="button" color="magenta" size={1} />}
                id="user-menu"
                menu={
                  <Menu>
                    <MenuItem text="Sign out" />
                  </Menu>
                }
              />
            </Box>
          </Flex>
        </Box>
      </Container>
    </Card>
  )
}
