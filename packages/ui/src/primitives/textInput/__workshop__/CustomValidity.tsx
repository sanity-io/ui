import {Button, Stack, TextInput} from '@sanity/ui'
import {useText} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function CustomValidityStory(): React.JSX.Element {
  const customValidity = useText('Custom validity', 'Invalid value') || undefined

  return (
    <CardWrapper>
      <Stack as="form" gap={3} onSubmit={(event) => event.preventDefault()}>
        <TextInput customValidity={customValidity} />
        <Button text="Submit" type="submit" />
      </Stack>
    </CardWrapper>
  )
}
