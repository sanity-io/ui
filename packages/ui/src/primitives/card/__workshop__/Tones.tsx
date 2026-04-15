import {Card, CARD_TONES, Container, Flex, Stack, Text} from '@sanity/ui'

export default function TonesStory(): React.JSX.Element {
  return (
    <Card height="fill" tone="transparent">
      <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
        <Container width={0}>
          <Stack gap={3}>
            {CARD_TONES.map((tone) => (
              <Card
                key={tone}
                padding={4}
                radius={3}
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
    </Card>
  )
}
