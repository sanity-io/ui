import {Card, Flex, Stack, Text} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'

import {
  WORKSHOP_CARD_AS_OPTIONS,
  WORKSHOP_CARD_TONE_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SHADOW_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const as = useSelect('As', WORKSHOP_CARD_AS_OPTIONS, 'div')
  const border = useBoolean('Border', false)
  const checkered = useBoolean('Checkered', false)
  const muted = useBoolean('Muted', false)
  // @ts-expect-error - TODO: fix this
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3)
  const pressed = useBoolean('Pressed', false)
  // @ts-expect-error - TODO: fix this
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS, 0)
  const selected = useBoolean('Selected', false)
  // @ts-expect-error - TODO: fix this
  const shadow = useSelect('Shadow', WORKSHOP_SHADOW_OPTIONS, 0)
  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS, 'default')

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Card
        __unstable_checkered={checkered}
        // @ts-expect-error - TODO: fix this
        as={as}
        border={border}
        muted={muted}
        onClick={useAction('onClick')}
        // @ts-expect-error - TODO: fix this
        padding={padding}
        pressed={pressed}
        // @ts-expect-error - TODO: fix this
        radius={radius}
        selected={selected}
        // @ts-expect-error - TODO: fix this
        shadow={shadow}
        // @ts-expect-error - TODO: fix this
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
