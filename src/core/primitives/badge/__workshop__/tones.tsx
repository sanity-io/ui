import {Badge, Flex} from '@sanity/ui'
import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_BADGE_MODE_OPTIONS} from '../../../../../workshop/constants'

export default function Tones() {
  const mode = useSelect('Mode (deprecated)', WORKSHOP_BADGE_MODE_OPTIONS, 'default', 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Flex align="center" direction="column" gap={2}>
        {THEME_COLOR_STATE_TONES.map((tone) => (
          <Badge key={tone} mode={mode} tone={tone}>
            {tone}
          </Badge>
        ))}
      </Flex>
    </Flex>
  )
}
