import {Card, Flex, Stack, Text} from '@sanity/ui'
import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function CheckeredStory() {
  const tones = Object.entries(WORKSHOP_CARD_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack space={1}>
        {tones.map(([title, tone]) => (
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
              {title}
            </Text>
          </Card>
        ))}
        {/* <Card __unstable_checkered border style={{width: 120, height: 60}} />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="transparent" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="primary" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="positive" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="caution" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="critical" /> */}
      </Stack>
    </Flex>
  )
}
