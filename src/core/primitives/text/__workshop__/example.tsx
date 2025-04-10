import {Container, Flex, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_TEXT_ALIGN_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
  WORKSHOP_TEXT_WEIGHT_OPTIONS,
} from '../../../__workshop__/constants'

export default function TextStory() {
  const accent = useBoolean('Accent', false, 'Props')
  const align = useSelect('Align', WORKSHOP_TEXT_ALIGN_OPTIONS, '', 'Props') || undefined
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', WORKSHOP_TEXT_SIZE_OPTIONS, 1, 'Props')
  const text = useText('Text', 'Hello, world', 'Props')

  const textOverflow =
    useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS, undefined, 'Props') || undefined

  const weight = useSelect('Weight', WORKSHOP_TEXT_WEIGHT_OPTIONS, '', 'Props') || undefined

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container width={0}>
        <Text
          accent={accent}
          align={align}
          muted={muted}
          size={size}
          textOverflow={textOverflow}
          weight={weight}
        >
          {text}
        </Text>
      </Container>
    </Flex>
  )
}
