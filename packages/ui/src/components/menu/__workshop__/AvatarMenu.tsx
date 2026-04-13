import {UsersIcon} from '@sanity/icons'
import {Avatar, Badge, Box, Button, Flex, Menu, MenuButton, MenuItem, Text} from '@sanity/ui'

export default function AvatarMenuStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center">
      <MenuButton
        button={<Button icon={UsersIcon} />}
        id="avatar-menu"
        menu={
          <Menu>
            <MenuItem hotkeys={['Cmd', '1']} padding={1}>
              <Box flex="none">
                <Avatar color="purple" initials="JS" />
              </Box>
              <Box flex={1} padding={2}>
                <Text size={1}>Jane Smith</Text>
              </Box>
              <Box padding={1}>
                <Badge>Me</Badge>
              </Box>
            </MenuItem>
            <MenuItem hotkeys={['Cmd', '2']} padding={1}>
              <Box flex="none">
                <Avatar color="magenta" initials="JS" />
              </Box>
              <Box flex={1} padding={2}>
                <Text size={1}>John Doe</Text>
              </Box>
            </MenuItem>
          </Menu>
        }
      />
    </Flex>
  )
}
