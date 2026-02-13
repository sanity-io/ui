import {
  Avatar,
  AvatarStack,
  Box,
  Card,
  Container,
  Flex,
  Layer,
  Menu,
  MenuItem,
  Text,
} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

export default function WithinMenuItemStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)

  return (
    <Container width={1}>
      <Layer>
        <Box paddingX={4} paddingY={[5, 6, 7]}>
          <Card radius={3} shadow={3}>
            <Menu gap={1}>
              <MenuItem disabled={disabled} padding={0}>
                <Flex align="center" gap={2} padding={1}>
                  <Box flex={1} padding={2}>
                    <Text size={1}>Menu item 1</Text>
                  </Box>
                  <Box flex="none">
                    <AvatarStack>
                      <Avatar color="purple" initials="AB" />
                      <Avatar color="magenta" initials="CD" />
                      <Avatar color="orange" initials="EF" />
                    </AvatarStack>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuItem disabled={disabled} padding={0}>
                <Flex align="center" gap={2} padding={1}>
                  <Box flex={1} padding={2}>
                    <Text size={1}>Menu item 1</Text>
                  </Box>
                  <Box flex="none">
                    <AvatarStack>
                      {/* <Avatar color="purple" initials="AB" /> */}
                      <Avatar color="magenta" initials="CD" />
                      <Avatar color="orange" initials="EF" />
                    </AvatarStack>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuItem disabled={disabled} padding={0}>
                <Flex align="center" gap={2} padding={1}>
                  <Box flex={1} padding={2}>
                    <Text size={1}>Menu item 1</Text>
                  </Box>
                  <Box flex="none">
                    <AvatarStack>
                      <Avatar color="purple" initials="AB" />
                      {/* <Avatar color="magenta" initials="CD" /> */}
                      {/* <Avatar color="orange" initials="EF" /> */}
                    </AvatarStack>
                  </Box>
                </Flex>
              </MenuItem>
            </Menu>
          </Card>
        </Box>
      </Layer>
    </Container>
  )
}
