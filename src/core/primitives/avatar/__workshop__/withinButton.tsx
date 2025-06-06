import {Avatar, AvatarStack, Box, Button, Container, Flex, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

export default function WithinButtonStory() {
  const disabled = useBoolean('Disabled', false)

  return (
    <Container width={1}>
      <Stack gap={1} paddingX={4} paddingY={[5, 6, 7]}>
        <Button disabled={disabled} padding={1}>
          <Flex align="center" flex={1} gap={3} padding={2}>
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
          <Flex align="center" flex={1} gap={3} padding={2}>
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
          <Flex align="center" flex={1} gap={3} padding={2}>
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
