import {UsersIcon} from '@sanity/icons'
import {Avatar, Badge, Box, Button, Flex, Text} from '../../../primitives'
import {Hotkeys} from '../../hotkeys'
import {Menu} from '../menu'
import {MenuButton} from '../menuButton'
import {MenuItem} from '../menuItem'

export default function AvatarMenuStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <MenuButton
        button={<Button icon={UsersIcon} />}
        id="avatar-menu"
        menu={
          <Menu>
            <MenuItem padding={0}>
              <Flex align="center" padding={1}>
                <Box flex="none">
                  <Avatar color="purple" initials="JS" />
                </Box>
                <Box flex={1} padding={2}>
                  <Text size={1}>Jane Smith</Text>
                </Box>
                <Box padding={1}>
                  <Badge>Me</Badge>
                </Box>
                <Box padding={1}>
                  <Hotkeys keys={['Cmd', '1']} />
                </Box>
              </Flex>
            </MenuItem>
            <MenuItem padding={0}>
              <Flex align="center" padding={1}>
                <Box flex="none">
                  <Avatar color="magenta" initials="JS" />
                </Box>
                <Box flex={1} padding={2}>
                  <Text size={1}>John Doe</Text>
                </Box>
                <Box padding={1}>
                  <Hotkeys keys={['Cmd', '2']} />
                </Box>
              </Flex>
            </MenuItem>
          </Menu>
        }
      />
    </Flex>
  )
}
