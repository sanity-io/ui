import {Card, Flex, Inline, Text} from '@sanity/ui'
import {useAction, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_SPACE_OPTIONS} from '$workshop'

export default function PlainStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Inline
        // @ts-expect-error - TODO: fix this
        gap={useSelect('Gap', WORKSHOP_SPACE_OPTIONS, 0)}
        onClick={useAction('onClick')}
      >
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
