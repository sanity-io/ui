import {Container, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {useAction, useBoolean} from '@sanity/ui-workshop'

export default function StatesStory() {
  const invalid = useBoolean('Invalid', false, 'Props')
  const onChange = useAction('onChange')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={1}>
        <Stack space={5}>
          <Stack space={3}>
            <Text size={1} weight="medium">
              <label htmlFor="enabled-example">Enabled (default)</label>
            </Text>
            <TextInput
              customValidity={invalid ? 'invalid' : undefined}
              id="enabled-example"
              onChange={onChange}
              value="This is some text"
            />
          </Stack>

          <Stack space={3}>
            <Text size={1} weight="medium">
              <label htmlFor="disabled-example">Disabled</label>
            </Text>
            <TextInput
              customValidity={invalid ? 'invalid' : undefined}
              disabled
              id="disabled-example"
              onChange={onChange}
              value="This is some text"
            />
          </Stack>

          <Stack space={3}>
            <Text size={1} weight="medium">
              <label htmlFor="read-only-example">Read-only</label>
            </Text>
            <TextInput
              customValidity={invalid ? 'invalid' : undefined}
              id="read-only-example"
              readOnly
              onChange={onChange}
              value="This is some text"
            />
          </Stack>
        </Stack>
      </Container>
    </Flex>
  )
}
