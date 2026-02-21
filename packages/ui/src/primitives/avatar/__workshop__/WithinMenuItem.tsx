import {Avatar, AvatarStack, Box, Card, Menu, MenuItem, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function WithinMenuItemStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)

  return (
    <CardWrapper>
      <Card radius={4} shadow={3}>
        <Menu gap={1}>
          <MenuItem disabled={disabled} padding={0}>
            <Box flex={1} padding={3}>
              <Text size={1}>Menu item 1</Text>
            </Box>
            <Box flex="none" padding={2}>
              <AvatarStack size={0} style={{margin: -1}}>
                <Avatar color="purple" initials="AB" />
                <Avatar color="magenta" initials="CD" />
                <Avatar color="orange" initials="EF" />
              </AvatarStack>
            </Box>
          </MenuItem>

          <MenuItem disabled={disabled} padding={0}>
            <Box flex={1} padding={3}>
              <Text size={1}>Menu item 1</Text>
            </Box>
            <Box flex="none" padding={2}>
              <AvatarStack size={0} style={{margin: -1}}>
                <Avatar color="magenta" initials="CD" />
                <Avatar color="orange" initials="EF" />
              </AvatarStack>
            </Box>
          </MenuItem>

          <MenuItem disabled={disabled} padding={0}>
            <Box flex={1} padding={3}>
              <Text size={1}>Menu item 1</Text>
            </Box>
            <Box flex="none" padding={2}>
              <AvatarStack size={0} style={{margin: -1}}>
                <Avatar color="purple" initials="AB" />
              </AvatarStack>
            </Box>
          </MenuItem>
        </Menu>
      </Card>
    </CardWrapper>
  )
}
