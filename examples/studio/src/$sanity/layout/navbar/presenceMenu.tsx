import {Avatar, AvatarStack, Box, Button, Flex, Menu, MenuButton, MenuItem, Text} from '@sanity/ui'
import React from 'react'

export function PresenceMenu() {
  return (
    <MenuButton
      button={
        <Button aria-label="Open list of online users" mode="bleed" padding={3}>
          <Box aria-hidden>
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
            <Box paddingX={3} paddingY={2}>
              <Flex align="center">
                <Box marginRight={3}>
                  <Avatar color="cyan" initials="ir" size={1} />
                </Box>
                <Text>Ida Vikan Rise</Text>
              </Flex>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box paddingX={3} paddingY={2}>
              <Flex align="center">
                <Box marginRight={3}>
                  <Avatar color="blue" initials="ss" size={1} />
                </Box>
                <Text>Simen Svale Skogsrud</Text>
              </Flex>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box paddingX={3} paddingY={2}>
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
  )
}
