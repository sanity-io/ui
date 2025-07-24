import {Container, Flex, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_TEXT_ALIGN_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
  WORKSHOP_TEXT_WEIGHT_OPTIONS,
} from '$workshop'

export default function TextStory(): React.JSX.Element {
  const align = useSelect('Align', WORKSHOP_TEXT_ALIGN_OPTIONS)
  const muted = useBoolean('Muted', false)
  const size = useSelect('Size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 1)
  const text = useText('Text', 'Hello, world')
  const textOverflow = useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS)
  const weight = useSelect('Weight', WORKSHOP_TEXT_WEIGHT_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container width={0}>
        <Text align={align} muted={muted} size={size} textOverflow={textOverflow} weight={weight}>
          {text}
        </Text>
      </Container>
    </Flex>
  )
}
