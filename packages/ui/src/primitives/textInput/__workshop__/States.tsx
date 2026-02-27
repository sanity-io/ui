import {Stack, Text, TextInput} from '@sanity/ui'
import {useAction, useBoolean} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function StatesStory(): React.JSX.Element {
  const invalid = useBoolean('Invalid', false)
  const onChange = useAction('onChange')

  return (
    <CardWrapper>
      <Stack gap={5}>
        <Stack gap={3}>
          <Text size={1} weight="medium">
            <label htmlFor="enabled-example">Enabled (default)</label>
          </Text>
          <TextInput
            customValidity={invalid ? 'invalid' : undefined}
            id="enabled-example"
            value="This is some text"
            onChange={onChange}
          />
        </Stack>

        <Stack gap={3}>
          <Text size={1} weight="medium">
            <label htmlFor="disabled-example">Disabled</label>
          </Text>
          <TextInput
            customValidity={invalid ? 'invalid' : undefined}
            disabled
            id="disabled-example"
            value="This is some text"
            onChange={onChange}
          />
        </Stack>

        <Stack gap={3}>
          <Text size={1} weight="medium">
            <label htmlFor="read-only-example">Read-only</label>
          </Text>
          <TextInput
            customValidity={invalid ? 'invalid' : undefined}
            id="read-only-example"
            readOnly
            value="This is some text"
            onChange={onChange}
          />
        </Stack>
      </Stack>
    </CardWrapper>
  )
}
