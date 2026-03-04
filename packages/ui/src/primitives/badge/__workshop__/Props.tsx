import {Badge, Flex} from '@sanity/ui'
import {ELEMENT_TONES, RADIUS, SPACE} from '@sanity/ui/tokens'
import {useAction, useSelect, useText} from '@sanity/ui-workshop'

export default function PropsStory() {
  const padding = useSelect('Padding', SPACE)
  const paddingX = useSelect('Padding X', SPACE)
  const paddingY = useSelect('Padding Y', SPACE)
  const radius = useSelect('Radius', [undefined, ...RADIUS])
  const tone = useSelect('Tone', ELEMENT_TONES, 'default')
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
