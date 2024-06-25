import {useBoolean} from '@sanity/ui-workshop'
import {Box} from '../../box'
import {Button} from '../../button'
import {Container} from '../../container'
import {Flex} from '../../flex'
import {Stack} from '../../stack'
import {Text} from '../../text'
import {Avatar} from '../avatar'
import {AvatarStack} from '../avatarStack'

export default function WithinButtonStory() {
  const disabled = useBoolean('Disabled', false, 'Props')

  return (
    <Container width={1}>
      <Stack paddingX={4} paddingY={[5, 6, 7]} space={1}>
        <Button disabled={disabled} padding={1}>
          <Flex align="center" gap={3} padding={2}>
            <Box flex={1}>
              <Text size={1}>Default button</Text>
            </Box>
            <Box flex="none">
              <AvatarStack>
                <Avatar color="blue" initials="AB" />
                <Avatar color="magenta" initials="CD" />
                <Avatar color="purple" initials="EF" />
              </AvatarStack>
            </Box>
          </Flex>
        </Button>
        <Button disabled={disabled} mode="ghost" padding={1}>
          <Flex align="center" gap={3} padding={2}>
            <Box flex={1}>
              <Text size={1}>Ghost button</Text>
            </Box>
            <Box flex="none">
              <AvatarStack>
                <Avatar color="blue" initials="AB" />
                <Avatar color="magenta" initials="CD" />
                <Avatar color="purple" initials="EF" />
              </AvatarStack>
            </Box>
          </Flex>
        </Button>
        <Button disabled={disabled} mode="bleed" padding={1}>
          <Flex align="center" gap={3} padding={2}>
            <Box flex={1}>
              <Text size={1}>Bleed button</Text>
            </Box>
            <Box flex="none">
              <AvatarStack>
                <Avatar color="blue" initials="AB" />
                <Avatar color="magenta" initials="CD" />
                <Avatar color="purple" initials="EF" />
              </AvatarStack>
            </Box>
          </Flex>
        </Button>
      </Stack>
    </Container>
  )
}
