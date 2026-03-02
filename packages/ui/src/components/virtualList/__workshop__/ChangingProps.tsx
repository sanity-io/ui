import {Box, Card, Container, Text, VirtualList} from '@sanity/ui'
import {useState} from 'react'

type Item = {
  key: number
}

const data: Item[] = Array.from(new Array(1000)).map((_, key) => ({key}))

export default function ChangingPropsStory(): React.JSX.Element {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => setExpanded((v) => !v)

  return (
    <Container paddingX={4} paddingY={5} width={1}>
      <Box marginBottom={5}>
        <Text muted size={1}>
          Click any item to toggle expanded view
        </Text>
      </Box>

      <VirtualList
        gap={expanded ? 4 : 2}
        items={data}
        renderItem={(item) => (
          <Card
            as="button"
            paddingX={3}
            paddingY={expanded ? 5 : 3}
            radius={4}
            shadow={1}
            onClick={toggleExpand}
          >
            <Text size={1}>Item #{item.key}</Text>
          </Card>
        )}
      />
    </Container>
  )
}
