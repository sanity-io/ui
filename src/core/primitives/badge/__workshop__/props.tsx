import {Badge, Flex} from '@sanity/ui'
import {useAction, useSelect, useText} from '@sanity/ui-workshop'

import {WORKSHOP_BADGE_TONE_OPTIONS, WORKSHOP_SPACE_OPTIONS} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 1)
  // @ts-expect-error - TODO: fix this
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS, 1)
  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_BADGE_TONE_OPTIONS, 'default')
  const textProp = useText('Text', 'Label')

  return (
    <Flex align="center" height="fill" justify="center">
      <Badge
        onClick={useAction('onClick')}
        // @ts-expect-error - TODO: fix this
        paddingX={paddingX}
        // @ts-expect-error - TODO: fix this
        paddingY={paddingY}
        // @ts-expect-error - TODO: fix this
        tone={tone}
      >
        {textProp}
      </Badge>
    </Flex>
  )
}
