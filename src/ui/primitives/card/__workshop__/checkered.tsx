import {Card, Flex, Stack, Text} from '@sanity/ui'
import {THEME_COLOR_CARD_TONES} from '@sanity/ui/theme'

export default function CheckeredStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack space={1}>
        {THEME_COLOR_CARD_TONES.map((tone) => (
          <Card
            __unstable_checkered
            border
            key={tone}
            padding={3}
            sizing="border"
            style={{width: 120, height: 60}}
            tone={tone}
          >
            <Text muted size={1}>
              {tone}
            </Text>
          </Card>
        ))}
      </Stack>
    </Flex>
  )
}
