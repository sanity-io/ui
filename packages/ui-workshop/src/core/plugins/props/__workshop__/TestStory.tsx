import {Flex, Stack, Text} from '@sanity/ui'
import {useBoolean, useNumber, useSelect, useString, useText} from '@sanity/ui-workshop'

const options = {
  None: undefined,
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const

export default function TestStory() {
  const boolean = useBoolean('Boolean')
  const number = useNumber('Number')
  const option = useSelect('Select', options)
  const string = useString('String', 'String')
  const text = useText('Text', 'Text')

  return (
    <Flex align="center" height="fill" justify="center">
      <Stack gap={4} maxWidth={1} padding={4} width="fill">
        <Text muted>Boolean: {boolean ? 'true' : 'false'}</Text>
        <Text muted>Number: {number}</Text>
        <Text muted>Select: {option ?? <>&ndash;</>}</Text>
        <Text muted>String: {string}</Text>
        <Text muted>Text: {text}</Text>
      </Stack>
    </Flex>
  )
}
