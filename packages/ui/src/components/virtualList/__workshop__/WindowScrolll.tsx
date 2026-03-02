import {Card, Container, Text, VirtualList} from '@sanity/ui'

type Item = {
  key: number
}

const data: Item[] = Array.from(new Array(1000)).map((_, key) => ({key}))

export default function WindowScrollStory(): React.JSX.Element {
  return (
    <Container paddingX={[4, 5, 6]} paddingY={[5, 6, 7]} width={1}>
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
  )
}
