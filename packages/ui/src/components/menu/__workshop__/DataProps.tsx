import {ELEMENT_TONES, Menu, MenuItem, Text} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  const tone = useSelect('Tone', ELEMENT_TONES, 'default')

  return (
    <CardWrapper width={0}>
      <Menu gap={1} padding={4}>
        <MenuItem data-enabled="" padding={3} tone={tone}>
          <Text size={1}>MenuItem</Text>
        </MenuItem>
        <MenuItem data-hovered="" padding={3} tone={tone}>
          <Text size={1}>MenuItem</Text>
        </MenuItem>
        <MenuItem data-pressed="" padding={3} tone={tone}>
          <Text size={1}>MenuItem</Text>
        </MenuItem>
        <MenuItem data-selected="" padding={3} tone={tone}>
          <Text size={1}>MenuItem</Text>
        </MenuItem>
      </Menu>
    </CardWrapper>
  )
}
