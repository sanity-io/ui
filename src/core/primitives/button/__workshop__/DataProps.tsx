import {Button, Stack} from '@sanity/ui'
import type {ButtonMode, ElementTone} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_BUTTON_MODE_OPTIONS, WORKSHOP_BUTTON_TONE_OPTIONS} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const mode = useSelect('Mode', WORKSHOP_BUTTON_MODE_OPTIONS, 'default') as ButtonMode | undefined

  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_BUTTON_TONE_OPTIONS, 'default') as ElementTone | undefined

  return (
    <Stack gap={4} padding={4}>
      <Button data-enabled="" mode={mode} text="Button" tone={tone} />
      <Button data-hovered="" mode={mode} text="Button" tone={tone} />
      <Button data-pressed="" mode={mode} text="Button" tone={tone} />
      <Button data-selected="" mode={mode} text="Button" tone={tone} />
    </Stack>
  )
}
