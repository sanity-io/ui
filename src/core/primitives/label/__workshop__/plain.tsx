import {Container, Flex, Label} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_LABEL_FONT_SIZE_OPTIONS,
  WORKSHOP_TEXT_ALIGN_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
} from '$workshop'

export default function PlainStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const align = useSelect('Align', WORKSHOP_TEXT_ALIGN_OPTIONS)
  const muted = useBoolean('Muted', false)
  // @ts-expect-error - TODO: fix this
  const size = useSelect('Size', WORKSHOP_LABEL_FONT_SIZE_OPTIONS)
  const textChild = useText('Text', 'Label text')
  // @ts-expect-error - TODO: fix this
  const textOverflow = useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const weight = useSelect('Weight', WORKSHOP_FONT_WEIGHT_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Label
          // @ts-expect-error - TODO: fix this
          align={align}
          muted={muted}
          // @ts-expect-error - TODO: fix this
          size={size}
          // @ts-expect-error - TODO: fix this
          textOverflow={textOverflow}
          // @ts-expect-error - TODO: fix this
          weight={weight}
        >
          {textChild}
        </Label>
      </Container>
    </Flex>
  )
}
