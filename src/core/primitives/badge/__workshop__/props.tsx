import {Badge, Flex} from '@sanity/ui'
import {useAction, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_BADGE_TONE_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../../../workshop/constants'

export default function PropsStory() {
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 1, 'Props')
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS, 1, 'Props')
  const tone = useSelect('Tone', WORKSHOP_BADGE_TONE_OPTIONS, 'default', 'Props')
  const textProp = useText('Text', 'Label', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Badge onClick={useAction('onClick')} paddingX={paddingX} paddingY={paddingY} tone={tone}>
        {textProp}
      </Badge>
    </Flex>
  )
}
