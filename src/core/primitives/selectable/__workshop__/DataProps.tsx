import {Selectable, Stack, Text} from '@sanity/ui'
import type {ElementTone} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_BUTTON_TONE_OPTIONS} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_BUTTON_TONE_OPTIONS, 'default') as ElementTone | undefined

  return (
    <Stack gap={4} padding={4}>
      <Selectable data-enabled="" padding={3} tone={tone}>
        <Text>Selectable</Text>
      </Selectable>
      <Selectable data-hovered="" padding={3} tone={tone}>
        <Text>Selectable</Text>
      </Selectable>
      <Selectable data-pressed="" padding={3} tone={tone}>
        <Text>Selectable</Text>
      </Selectable>
      <Selectable data-selected="" padding={3} tone={tone}>
        <Text>Selectable</Text>
      </Selectable>
    </Stack>
  )
}
