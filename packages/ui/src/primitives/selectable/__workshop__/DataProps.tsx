import {Selectable, Stack, Text} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  return (
    <CardWrapper>
      <Stack gap={4}>
        <Selectable data-enabled="" padding={3}>
          <Text size={1}>Selectable {`[data-enabled]`}</Text>
        </Selectable>
        <Selectable data-hovered="" padding={3}>
          <Text size={1}>Selectable {`[data-hovered]`}</Text>
        </Selectable>
        <Selectable data-pressed="" padding={3}>
          <Text size={1}>Selectable {`[data-pressed]`}</Text>
        </Selectable>
        <Selectable data-selected="" padding={3}>
          <Text size={1}>Selectable {`[data-selected]`}</Text>
        </Selectable>
      </Stack>
    </CardWrapper>
  )
}
