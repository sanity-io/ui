import {Badge, Flex} from '@sanity/ui'
import {RADIUS} from '@sanity/ui-tokens/system'
import {useAction, useSelect, useText} from '@sanity/ui-workshop'

import {WORKSHOP_ELEMENT_TONE_OPTIONS, WORKSHOP_SPACE_OPTIONS} from '$workshop'

export default function PropsStory() {
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS)
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS)
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS)
  const radius = useSelect('Radius', [undefined, ...RADIUS])
  const tone = useSelect('Tone', WORKSHOP_ELEMENT_TONE_OPTIONS, 'default')
  const textProp = useText('Text', 'Label')

  return (
    <Flex align="center" height="fill" justify="center">
      <Badge
        padding={padding}
        paddingX={paddingX}
        paddingY={paddingY}
        radius={radius}
        tone={tone}
        onClick={useAction('onClick')}
      >
        {textProp}
      </Badge>
    </Flex>
  )
}
