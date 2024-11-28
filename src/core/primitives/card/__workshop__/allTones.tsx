import {Card, Container, Flex, Stack, Text} from '@sanity/ui'
import {THEME_COLOR_CARD_TONES} from '@sanity/ui/theme'

export default function AllTonesStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={3}>
          {THEME_COLOR_CARD_TONES.map((tone) => (
            <Card
              key={tone}
              padding={3}
              radius={2}
              shadow={2}
              style={{textAlign: 'center'}}
              tone={tone}
            >
              <Text size={1}>{tone}</Text>
            </Card>
          ))}
        </Stack>
      </Container>
    </Flex>
  )
}
