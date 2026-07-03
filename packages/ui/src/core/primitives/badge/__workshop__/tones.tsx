import {Badge, Flex, Inline} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {WORKSHOP_BADGE_MODE_OPTIONS} from '../../../__workshop__/constants'

export default function Tones() {
  const mode = useSelect('Mode (deprecated)', WORKSHOP_BADGE_MODE_OPTIONS, 'default', 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      {/* oxlint-disable-next-line no-deprecated */}
      <Inline space={2}>
        {THEME_COLOR_STATE_TONES.map((tone) => (
          // oxlint-disable-next-line no-deprecated
          <Badge key={tone} mode={mode} tone={tone}>
            {tone}
          </Badge>
        ))}
      </Inline>
    </Flex>
  )
}
