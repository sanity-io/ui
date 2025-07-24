import {Button, Flex} from '@sanity/ui'
import {useText} from '@sanity/ui-workshop'

export default function TextOverflowStory(): React.JSX.Element {
  const text = useText('Text', 'Long text that should overflow')

  return (
    <Flex gap={1} padding={4}>
      <Button flex={1} text={text} />
      <Button mode="bleed" text="Cancel" />
    </Flex>
  )
}
