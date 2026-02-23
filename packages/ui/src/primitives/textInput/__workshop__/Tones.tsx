import {Box, Card, Text, TextInput} from '@sanity/ui'
import {CARD_TONES} from '@sanity/ui/theme'
import {useBoolean} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function TonesStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)

  return (
    <CardWrapper>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap={2}
        height="fill"
        justifyContent="center"
      >
        {CARD_TONES.map((tone) => (
          <Card key={tone} padding={3} radius={5} tone={tone}>
            <TextInput
              disabled={disabled}
              placeholder="default"
              prefix={
                <Box padding={3}>
                  <Text>prefix</Text>
                </Box>
              }
              suffix={
                <Box padding={3}>
                  <Text>suffix</Text>
                </Box>
              }
            />
          </Card>
        ))}
      </Box>
    </CardWrapper>
  )
}
