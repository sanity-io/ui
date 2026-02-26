import {Card, Stack, Text} from '@sanity/ui'
import type {CardTone} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_CARD_TONE_OPTIONS} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS, 'default') as CardTone | undefined

  return (
    <Stack gap={1} padding={4}>
      <Card as="button" data-enabled="" padding={3} tone={tone}>
        <Text>Card</Text>
      </Card>
      <Card as="button" data-hovered="" padding={3} tone={tone}>
        <Text>Card</Text>
      </Card>
      <Card as="button" data-pressed="" padding={3} tone={tone}>
        <Text>Card</Text>
      </Card>
      <Card as="button" data-selected="" padding={3} tone={tone}>
        <Text>Card</Text>
      </Card>
      <Card as="button" data-disabled="" padding={3} tone={tone}>
        <Text>Card</Text>
      </Card>
    </Stack>
  )
}
