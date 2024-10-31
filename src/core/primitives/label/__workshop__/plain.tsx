import {Container, Flex, Label} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_LABEL_FONT_SIZE_OPTIONS,
  WORKSHOP_TEXT_ALIGN_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
} from '$workshop'

export default function PlainStory() {
  const align = useSelect('Align', WORKSHOP_TEXT_ALIGN_OPTIONS)
  const muted = useBoolean('Muted', false)
  const size = useSelect('Size', WORKSHOP_LABEL_FONT_SIZE_OPTIONS)
  const textChild = useText('Text', 'Label text')
  const textOverflow = useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS)
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Label align={align} muted={muted} size={size} textOverflow={textOverflow} weight={weight}>
          {textChild}
        </Label>
      </Container>
    </Flex>
  )
}
