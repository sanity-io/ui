import {Card, Flex, Stack, Text} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'

import {
  WORKSHOP_CARD_AS_OPTIONS,
  WORKSHOP_CARD_TONE_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SHADOW_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '$workshop'

export default function PropsStory() {
  const as = useSelect('As', WORKSHOP_CARD_AS_OPTIONS, 'div')
  const border = useBoolean('Border', false)
  const checkered = useBoolean('Checkered', false)
  const muted = useBoolean('Muted', false)
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3)
  const pressed = useBoolean('Pressed', false)
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 0)
  const selected = useBoolean('Selected', false)
  const shadow = useSelect('Shadow', WORKSHOP_SHADOW_OPTIONS, 0)
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS, 'default')

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Card
        __unstable_checkered={checkered}
        as={as}
        border={border}
        muted={muted}
        onClick={useAction('onClick')}
        padding={padding}
        pressed={pressed}
        radius={radius}
        selected={selected}
        shadow={shadow}
        tone={tone}
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
