import {Card, Container, Text, VirtualList} from '@sanity/ui'
import {useRef, useState} from 'react'

interface Item {
  key: string
}

function getData(len: number, offsetIndex = 0): Item[] {
  return Array.from(new Array(len)).map((_, index) => ({key: String(offsetIndex + index)}))
}

const ITEMS_PER_PAGE = 1000

export default function InfiniteListStory(): React.JSX.Element {
  const [data, setData] = useState(() => getData(ITEMS_PER_PAGE))
  const offsetRef = useRef(0)

  return (
    <Container padding={4} width={1}>
      <VirtualList
        gap={2}
        getItemKey={(item) => `item-${item.key}`}
        items={data}
        renderItem={(item) => (
          <Card padding={3} radius={4} shadow={1}>
            <Text size={1}>Item #{item.key}</Text>
          </Card>
        )}
        onChange={({toIndex}) => {
          const maxIndex = (offsetRef.current + 1) * ITEMS_PER_PAGE

          if (toIndex >= maxIndex - 50) {
            offsetRef.current += 1
            setData((d) => d.concat(getData(ITEMS_PER_PAGE, offsetRef.current * ITEMS_PER_PAGE)))
          }
        }}
      />
    </Container>
  )
}
