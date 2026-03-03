import {Stack, Text, TextArea} from '@sanity/ui'
import {FONT_TEXT_SIZE, RADIUS, SPACE} from '@sanity/ui/theme'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useState} from 'react'

import {CardWrapper, WORKSHOP_FONT_WEIGHT_OPTIONS} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const border = useBoolean('Border', true)
  const customValidity = useText('Custom validity')
  const disableFocusRing = useBoolean('Disable focus ring (unstable)', false)
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', FONT_TEXT_SIZE)
  const fontWeight = useSelect('Font weight', WORKSHOP_FONT_WEIGHT_OPTIONS)
  const padding = useSelect('Padding', SPACE)
  const placeholder = useText('Placeholder', 'Placeholder')
  const radius = useSelect('Radius', RADIUS)
  const readOnly = useBoolean('Read only', false)

  const [value, setValue] = useState('')

  return (
    <CardWrapper pattern="halftone">
      <Stack gap={3}>
        <Text as="label" hidden htmlFor="text-area-example" size={1} weight="medium">
          TextArea
        </Text>
        <TextArea
          __unstable_disableFocusRing={disableFocusRing}
          border={border}
          customValidity={customValidity}
          disabled={disabled}
          fontSize={fontSize}
          fontWeight={fontWeight}
          id="text-area-example"
          padding={padding}
          placeholder={placeholder}
          radius={radius}
          readOnly={readOnly}
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Stack>
    </CardWrapper>
  )
}
