import {Badge, BadgeMode, BadgeTone, Flex} from '@sanity/ui'
import {defineScope, useAction, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('primitives/badge', 'Badge', [
  {name: 'props', title: 'Props', component: BadgeStory},
])

const BADGE_MODE_OPTIONS: {[key: string]: BadgeMode} = {
  Default: 'default',
  Outline: 'outline',
}

const BADGE_TONE_OPTIONS: {[key: string]: BadgeTone} = {
  Default: 'default',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

function BadgeStory() {
  const mode = useSelect('Mode', BADGE_MODE_OPTIONS, 'default', 'Props')
  const paddingX = useSelect('Padding X', SPACE_OPTIONS, 1, 'Props')
  const paddingY = useSelect('Padding Y', SPACE_OPTIONS, 1, 'Props')
  const tone = useSelect('Tone', BADGE_TONE_OPTIONS, 'default', 'Props')
  const textProp = useText('Text', 'Label', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Badge
        mode={mode}
        onClick={useAction('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        tone={tone}
      >
        {textProp}
      </Badge>
    </Flex>
  )
}
