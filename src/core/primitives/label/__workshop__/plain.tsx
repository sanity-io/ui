import {Container, Flex, Label} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_LABEL_FONT_SIZE_OPTIONS,
  WORKSHOP_TEXT_ALIGN_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
} from '../../../../../workshop/constants'

export default function PlainStory() {
  const accent = useBoolean('Accent', false, 'Props')
  const align = useSelect('Align', WORKSHOP_TEXT_ALIGN_OPTIONS, undefined, 'Props') || undefined
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', WORKSHOP_LABEL_FONT_SIZE_OPTIONS, undefined, 'Props')
  const textChild = useText('Text', 'Label text', 'Props')
  const textOverflow =
    useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS, '', 'Props') || undefined
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS, '', 'Props') || undefined

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Label
          accent={accent}
          align={align}
          muted={muted}
          size={size}
          textOverflow={textOverflow}
          weight={weight}
        >
          {textChild}
        </Label>
      </Container>
    </Flex>
  )
}
