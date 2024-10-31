import {Flex, Heading} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_HEADING_FONT_SIZE_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
} from '$workshop'

export default function PlainStory() {
  const muted = useBoolean('Muted', false)
  const size = useSelect('Size', WORKSHOP_HEADING_FONT_SIZE_OPTIONS, 2)
  const textChild = useText('Text', 'Hello, world')
  const textOverflow = useSelect(
    'Text overflow',
    WORKSHOP_TEXT_OVERFLOW_OPTIONS,
    undefined,
    'Props',
  )
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Heading muted={muted} size={size} textOverflow={textOverflow} weight={weight}>
        {textChild}
      </Heading>
    </Flex>
  )
}
