import {Text} from '@sanity/ui'
import {FONT_TEXT_SIZE} from '@sanity/ui/tokens'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  CardWrapper,
  WORKSHOP_TEXT_ALIGN_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
  WORKSHOP_TEXT_WEIGHT_OPTIONS,
} from '$workshop'

export default function TextStory(): React.JSX.Element {
  const align = useSelect('Align', WORKSHOP_TEXT_ALIGN_OPTIONS)
  const muted = useBoolean('Muted', false)
  const size = useSelect('Size', FONT_TEXT_SIZE, 2)
  const text = useText('Text', 'Hello, world')
  const textOverflow = useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS)
  const weight = useSelect('Weight', WORKSHOP_TEXT_WEIGHT_OPTIONS)

  return (
    <CardWrapper>
      <Text align={align} muted={muted} size={size} textOverflow={textOverflow} weight={weight}>
        {text}
      </Text>
    </CardWrapper>
  )
}
