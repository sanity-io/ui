import {Card, Flex, Text} from '@sanity/ui'

export default function GapStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" gap={[1, 2, 3, 4]} justify="center" wrap="wrap">
        <Card padding={3} shadow={1}>
          <Text size={0}>Card 0</Text>
        </Card>
        <Card padding={3} shadow={1}>
          <Text size={1}>Card 1</Text>
        </Card>
        <Card padding={3} shadow={1}>
          <Text size={2}>Card 2</Text>
        </Card>
        <Card padding={3} shadow={1}>
          <Text size={3}>Card 3</Text>
        </Card>
        <Card padding={3} shadow={1}>
          <Text size={4}>Card 4</Text>
        </Card>
      </Flex>
    </Flex>
  )
}
