import {Card, Container, Text, VirtualList} from '@sanity/ui'

type Item = {
  key: number
}

const data: Item[] = Array.from(new Array(1000)).map((_, key) => ({key}))

export default function ElementScrollStory(): React.JSX.Element {
  return (
    <Card
      __unstable_pattern="halftone"
      height="fill"
      padding={4}
      sizing="border"
      tone="transparent"
    >
      <Card
        height="fill"
        margin="auto"
        maxWidth={1}
        overflow="auto"
        padding={4}
        radius={5}
        shadow={1}
        sizing="border"
        tone="default"
      >
        <Container width={1}>
          <VirtualList
            gap={2}
            items={data}
            renderItem={(item) => (
              <Card padding={3} radius={4} shadow={1}>
                <Text size={1}>Item #{item.key}</Text>
              </Card>
            )}
          />
        </Container>
      </Card>
    </Card>
  )
}
