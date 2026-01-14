import {Flex, Heading, Stack, Text} from '@sanity/ui'
import {useBoolean, useNumber, useSelect, useString, useText} from '@sanity/ui-workshop'

const options = {
  None: '',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
}

export default function TestStory() {
  const text = useText('Text', 'Hello, world')
  const boolean = useBoolean('Boolean', true)
  const number = useNumber('Number', 1234)
  const string = useString('String', '...')
  const option = useSelect('Select option', options)

  return (
    <Flex align="center" height="fill" justify="center">
      <Stack gap={[3, 4, 5]}>
        <Heading size={[2, 3, 4]}>This is my first story.</Heading>
        <Text size={[2, 3, 4]}>Some text: {text}</Text>
        <Text size={[2, 3, 4]}>A boolean: {boolean ? 'true' : 'false'}</Text>
        <Text size={[2, 3, 4]}>A number: {number}</Text>
        <Text size={[2, 3, 4]}>A string: {string}</Text>
        <Text size={[2, 3, 4]}>An option: {option}</Text>
      </Stack>
    </Flex>
  )
}
