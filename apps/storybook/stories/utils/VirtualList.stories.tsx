import {Box, Card, Container, Text, VirtualList, VirtualListChangeOpts} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useRef, useState} from 'react'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

const data = Array.from(new Array(1000)).map((_, key) => ({key}))

function WindowScrollStory() {
  const renderItem = useCallback((item: {key: number}) => {
    return (
      <Card padding={3} radius={2} shadow={1}>
        <Text>Item #{item.key}</Text>
      </Card>
    )
  }, [])

  return (
    <Box padding={4}>
      <Container width={1}>
        <VirtualList gap={2} items={data} renderItem={renderItem} />
      </Container>
    </Box>
  )
}

export const WindowScroll: Story = {
  render: () => <WindowScrollStory />,
}

function ElementScrollStory() {
  const renderItem = useCallback((item: {key: number}) => {
    return (
      <Card padding={3} radius={2} shadow={1}>
        <Text>Item #{item.key}</Text>
      </Card>
    )
  }, [])

  return (
    <Box height="fill" padding={4} sizing="border" style={{height: '100vh'}}>
      <Card height="fill" overflow="auto" padding={4} shadow={1} sizing="border">
        <Container width={1}>
          <VirtualList gap={2} items={data} renderItem={renderItem} />
        </Container>
      </Card>
    </Box>
  )
}

export const ElementScroll: Story = {
  parameters: {padding: 0},
  render: () => <ElementScrollStory />,
}

interface InfiniteItem {
  key: string
}

function getInfiniteData(len: number, offsetIndex = 0): InfiniteItem[] {
  return Array.from(new Array(len)).map((_, index) => ({key: String(offsetIndex + index)}))
}

const ITEMS_PER_PAGE = 1000

function InfiniteListStory() {
  const [data, setData] = useState<InfiniteItem[]>(() => getInfiniteData(ITEMS_PER_PAGE))
  const offsetRef = useRef(0)

  const getItemKey = useCallback((item: InfiniteItem) => `item-${item.key}`, [])

  const handleChange = useCallback((opts: VirtualListChangeOpts) => {
    const maxIndex = (offsetRef.current + 1) * ITEMS_PER_PAGE

    if (opts.toIndex >= maxIndex - 50) {
      offsetRef.current += 1
      setData((d) => d.concat(getInfiniteData(ITEMS_PER_PAGE, offsetRef.current * ITEMS_PER_PAGE)))
    }
  }, [])

  const renderItem = useCallback((item: InfiniteItem) => {
    return (
      <Card padding={3} shadow={1}>
        <Text align="center">Item #{item.key}</Text>
      </Card>
    )
  }, [])

  return (
    <Box padding={4}>
      <VirtualList
        gap={3}
        getItemKey={getItemKey}
        items={data}
        onChange={handleChange}
        renderItem={renderItem}
      />
    </Box>
  )
}

export const InfiniteList: Story = {
  render: () => <InfiniteListStory />,
}

function ChangingPropsStory() {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = useCallback(() => setExpanded((v) => !v), [])

  const renderItem = useCallback(
    (item: {key: number}) => (
      <Card
        as="button"
        onClick={toggleExpand}
        paddingX={4}
        paddingY={expanded ? 5 : 4}
        radius={2}
        tone="primary"
      >
        <Text>Item #{item.key}</Text>
      </Card>
    ),
    [expanded, toggleExpand],
  )

  return (
    <Box padding={4}>
      <Box marginBottom={5}>
        <Text size={1}>Click any item to toggle expanded view</Text>
      </Box>

      <VirtualList gap={expanded ? 4 : 2} items={data} renderItem={renderItem} />
    </Box>
  )
}

export const ChangingProps: Story = {
  render: () => <ChangingPropsStory />,
}
