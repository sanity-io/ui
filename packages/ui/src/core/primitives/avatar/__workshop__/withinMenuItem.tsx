import {useBoolean} from '@sanity/ui-workshop'

import {Menu, MenuItem} from '../../../components'
import {Layer} from '../../../utils'
import {Box} from '../../box'
import {Card} from '../../card'
import {Container} from '../../container'
import {Flex} from '../../flex'
import {Text} from '../../text'
import {Avatar} from '../avatar'
import {AvatarStack} from '../avatarStack'

export default function WithinMenuItemStory() {
  const disabled = useBoolean('Disabled', false, 'Props')

  return (
    <Container width={1}>
      <Layer>
        <Box paddingX={4} paddingY={[5, 6, 7]}>
          <Card radius={3} shadow={3}>
            <Menu space={1}>
              <MenuItem disabled={disabled} padding={0}>
                <Flex align="center" gap={2} padding={2}>
                  <Box flex={1}>
                    <Text size={1}>Menu item 1</Text>
                  </Box>
                  <Box flex="none">
                    <AvatarStack>
                      <Avatar color="blue" initials="AB" />
                      <Avatar color="magenta" initials="CD" />
                      <Avatar color="purple" initials="EF" />
                    </AvatarStack>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuItem disabled={disabled} padding={0}>
                <Flex align="center" gap={2} padding={2}>
                  <Box flex={1}>
                    <Text size={1}>Menu item 1</Text>
                  </Box>
                  <Box flex="none">
                    <AvatarStack>
                      <Avatar color="blue" initials="AB" />
                      <Avatar color="magenta" initials="CD" />
                      <Avatar color="purple" initials="EF" />
                    </AvatarStack>
                  </Box>
                </Flex>
              </MenuItem>
              <MenuItem disabled={disabled} padding={0}>
                <Flex align="center" gap={2} padding={2}>
                  <Box flex={1}>
                    <Text size={1}>Menu item 1</Text>
                  </Box>
                  <Box flex="none">
                    <AvatarStack>
                      <Avatar color="blue" initials="AB" />
                      <Avatar color="magenta" initials="CD" />
                      <Avatar color="purple" initials="EF" />
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
