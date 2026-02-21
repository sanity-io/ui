import {Badge, Box, Button, Text} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function WithinButtonStory(): React.JSX.Element {
  return (
    <CardWrapper gap={4} width={0}>
      <Box display="flex" justifyContent="center">
        <Button mode="default" padding={2}>
          <Box flex={1} padding={1}>
            <Text size={1}>Button</Text>
          </Box>
          <Badge tone="suggest">Badge</Badge>
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button mode="ghost" padding={2}>
          <Box flex={1} padding={1}>
            <Text size={1}>Button</Text>
          </Box>
          <Badge tone="suggest">Badge</Badge>
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button mode="bleed" padding={2}>
          <Box flex={1} padding={1}>
            <Text size={1}>Button</Text>
          </Box>
          <Badge tone="suggest">Badge</Badge>
        </Button>
      </Box>
    </CardWrapper>
  )
}
