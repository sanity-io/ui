import {Button, Flex} from '@sanity/ui'
import {useText} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function TextOverflowStory(): React.JSX.Element {
  const text = useText('Text', 'Long text that should overflow')

  return (
    <CardWrapper gap={3} width={0}>
      <Flex gap={2}>
        <Button text={text} />
        <Button flex="none" mode="bleed" text="Cancel" />
      </Flex>
    </CardWrapper>
  )
}
