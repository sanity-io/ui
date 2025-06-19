import {Card, Checkbox, Flex, Stack, Text} from '@sanity/ui'
import {CARD_TONES} from '@sanity/ui/theme'

export default function MultipleTonesStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack gap={1}>
        {CARD_TONES.map((tone) => (
          <Card
            alignItems="center"
            as="label"
            display="flex"
            gap={2}
            padding={3}
            radius={3}
            tone={tone}
          >
            <Checkbox />
            <Text muted size={1}>
              {tone}
            </Text>
          </Card>
        ))}
      </Stack>
    </Flex>
  )
}
