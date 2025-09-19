import {Menu, MenuItem, Text} from '@sanity/ui'
import type {ElementTone} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_BUTTON_TONE_OPTIONS} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_BUTTON_TONE_OPTIONS, 'default') as ElementTone | undefined

  return (
    <Menu gap={4} padding={4}>
      <MenuItem data-enabled="" padding={3} tone={tone}>
        <Text>MenuItem</Text>
      </MenuItem>
      <MenuItem data-hovered="" padding={3} tone={tone}>
        <Text>MenuItem</Text>
      </MenuItem>
      <MenuItem data-pressed="" padding={3} tone={tone}>
        <Text>MenuItem</Text>
      </MenuItem>
      <MenuItem data-selected="" padding={3} tone={tone}>
        <Text>MenuItem</Text>
      </MenuItem>
    </Menu>
  )
}
