import {Card, Container, Stack, Text, TextArea} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useState} from 'react'

import {
  WORKSHOP_CARD_TONE_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
} from '$workshop'

export default function PlainStory() {
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS)

  const border = useBoolean('Border', true)
  const customValidity = useText('Custom validity')
  const disableFocusRing = useBoolean('Disable focus ring (unstable)', false)
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2)
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3)
  const placeholder = useText('Placeholder', 'Placeholder')
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 2)
  const readOnly = useBoolean('Read only', false)

  const [value, setValue] = useState('')

  return (
    <Card
      align="center"
      display="flex"
      height="fill"
      justify="center"
      padding={[4, 5, 6]}
      sizing="border"
      tone={tone}
    >
      <Container width={0}>
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
            id="text-area-example"
            onChange={(e) => setValue(e.target.value)}
            padding={padding}
            placeholder={placeholder}
            radius={radius}
            readOnly={readOnly}
            rows={10}
            value={value}
          />
        </Stack>
      </Container>
    </Card>
  )
}
