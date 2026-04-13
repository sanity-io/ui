import {Avatar, AvatarStack, Box, Button, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function WithinButtonStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)

  return (
    <CardWrapper gap={3}>
      <Button disabled={disabled} padding={0}>
        <Box flex={1} padding={3}>
          <Text size={1}>Default button</Text>
        </Box>
        <Box flex="none" padding={2}>
          <AvatarStack size={0}>
            <Avatar color="blue" initials="AB" />
            <Avatar color="magenta" initials="CD" />
            <Avatar color="purple" initials="EF" />
          </AvatarStack>
        </Box>
      </Button>

      <Button disabled={disabled} mode="ghost" padding={0}>
        <Box flex={1} padding={3}>
          <Text size={1}>Ghost button</Text>
        </Box>
        <Box flex="none" padding={2}>
          <AvatarStack size={0} style={{margin: -1}}>
            <Avatar color="blue" initials="AB" />
            <Avatar color="magenta" initials="CD" />
            <Avatar color="purple" initials="EF" />
          </AvatarStack>
        </Box>
      </Button>

      <Button disabled={disabled} mode="bleed" padding={0}>
        <Box flex={1} padding={3}>
          <Text size={1}>Bleed button</Text>
        </Box>
        <Box flex="none" padding={2}>
          <AvatarStack size={0} style={{margin: -1}}>
            <Avatar color="blue" initials="AB" />
            <Avatar color="magenta" initials="CD" />
            <Avatar color="purple" initials="EF" />
          </AvatarStack>
        </Box>
      </Button>
    </CardWrapper>
  )
}
