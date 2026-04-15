import {
  BG_PATTERNS,
  BORDER_WIDTH,
  Card,
  CARD_TONES,
  Flex,
  RADIUS,
  SHADOW,
  SPACE,
  Stack,
  Text,
} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_CARD_AS_OPTIONS} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const as = useSelect('As', WORKSHOP_CARD_AS_OPTIONS, 'div')
  const border = useBoolean('Border', false)
  const borderWidth = useSelect('Border Width', BORDER_WIDTH, 0)
  const muted = useBoolean('Muted', false)
  const padding = useSelect('Padding', SPACE, 3)
  const pattern = useSelect('Pattern', BG_PATTERNS, undefined)
  const pressed = useBoolean('Pressed', false)
  const radius = useSelect('Radius', RADIUS, 0)
  const selected = useBoolean('Selected', false)
  const shadow = useSelect('Shadow', SHADOW, 0)
  const tone = useSelect('Tone', CARD_TONES, 'default')

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Card
        __unstable_pattern={pattern}
        as={as}
        border={border}
        borderWidth={borderWidth}
        muted={muted}
        padding={padding}
        pressed={pressed}
        radius={radius}
        selected={selected}
        shadow={shadow}
        tone={tone}
        onClick={useAction('onClick')}
      >
        <Stack gap={3}>
          <Text size={1}>
            Card with <code>padding={padding}</code>, <code>tone={tone}</code>, and{' '}
            <code>shadow={shadow}</code>.
          </Text>
          <Text size={1}>
            Text with {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">link</a>.
          </Text>
        </Stack>
      </Card>
    </Flex>
  )
}
