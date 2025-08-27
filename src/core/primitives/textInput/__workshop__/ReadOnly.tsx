import {Flex, TextInput} from '@sanity/ui'

export default function ReadOnlyStory(): React.JSX.Element {
  return (
    <Flex padding={4}>
      <TextInput id="text-input-example" readOnly />
    </Flex>
  )
}
