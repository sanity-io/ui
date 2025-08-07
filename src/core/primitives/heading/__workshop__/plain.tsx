import {Flex, Heading} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_HEADING_FONT_SIZE_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
} from '$workshop'

export default function PlainStory(): React.JSX.Element {
  const muted = useBoolean('Muted', false)
  // @ts-expect-error - TODO: fix this
  const size = useSelect('Size', WORKSHOP_HEADING_FONT_SIZE_OPTIONS, 2)
  const textChild = useText('Text', 'Hello, world')
  const textOverflow = useSelect(
    'Text overflow',
    // @ts-expect-error - TODO: fix this
    WORKSHOP_TEXT_OVERFLOW_OPTIONS,
    undefined,
    'Props',
  )
  // @ts-expect-error - TODO: fix this
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Heading
        muted={muted}
        // @ts-expect-error - TODO: fix this
        size={size}
        // @ts-expect-error - TODO: fix this
        textOverflow={textOverflow}
        // @ts-expect-error - TODO: fix this
        weight={weight}
      >
        {textChild}
      </Heading>
    </Flex>
  )
}
