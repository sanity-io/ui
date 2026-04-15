import {Card, Flex, Inline, SPACE, Text} from '@sanity/ui'
import {useAction, useSelect} from '@sanity/ui-workshop'

export default function PlainStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Inline gap={useSelect('Gap', SPACE, 0)} onClick={useAction('onClick')}>
        <Card padding={1} shadow={1}>
          <Text size={1}>Inline item</Text>
        </Card>

        <Card padding={2} shadow={1}>
          <Text size={1}>Inline item</Text>
        </Card>

        <Card padding={3} shadow={1}>
          <Text size={1}>Inline item</Text>
        </Card>
      </Inline>
    </Flex>
  )
}
