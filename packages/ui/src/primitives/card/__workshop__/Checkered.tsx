import {Card, CARD_TONES, Flex, Stack, Text} from '@sanity/ui'

export default function CheckeredStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack gap={1}>
        {CARD_TONES.map((tone) => (
          <Card
            key={tone}
            __unstable_checkered
            border
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
