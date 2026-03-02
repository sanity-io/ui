import {Card, Text} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  return (
    <CardWrapper gap={1}>
      <Card as="button" data-enabled="" padding={3} radius={4}>
        <Text size={1}>Card</Text>
      </Card>
      <Card as="button" data-hovered="" padding={3} radius={4}>
        <Text size={1}>Card</Text>
      </Card>
      <Card as="button" data-pressed="" padding={3} radius={4}>
        <Text size={1}>Card</Text>
      </Card>
      <Card as="button" data-selected="" padding={3} radius={4}>
        <Text size={1}>Card</Text>
      </Card>
      <Card as="button" data-disabled="" padding={3} radius={4}>
        <Text size={1}>Card</Text>
      </Card>
    </CardWrapper>
  )
}
