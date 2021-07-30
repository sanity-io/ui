import {Card, Flex, Stack, Text} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {
  CARD_AS_OPTIONS,
  CARD_TONE_OPTIONS,
  RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  SPACE_OPTIONS,
} from './constants'

export function PropsStory() {
  const border = useBoolean('Border', false, 'Props')
  const as = useSelect('As', CARD_AS_OPTIONS, 'div', 'Props')
  const padding = useSelect('Padding', SPACE_OPTIONS, 0, 'Props')
  const radius = useSelect('Radius', RADIUS_OPTIONS, 0, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const shadow = useSelect('Shadow', SHADOW_OPTIONS, 0, 'Props')
  const tone = useSelect('Tone', CARD_TONE_OPTIONS, 'default', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Card
        as={as}
        border={border}
        onClick={useAction('onClick')}
        padding={padding}
        radius={radius}
        selected={selected}
        shadow={shadow}
        tone={tone}
      >
        <Stack space={3}>
          <Text>
            Card with <code>padding={padding}</code>, <code>tone={tone}</code>, and{' '}
            <code>shadow={shadow}</code>.
          </Text>
          <Text>
            Text with <a>link</a>.
          </Text>
          <Text accent>Accented text.</Text>
        </Stack>
      </Card>
    </Flex>
  )
}
