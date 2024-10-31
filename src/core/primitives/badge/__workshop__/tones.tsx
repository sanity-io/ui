import {Badge, Flex} from '@sanity/ui'
import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

export default function Tones() {
  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Flex align="center" direction="column" gap={2}>
        {THEME_COLOR_STATE_TONES.map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </Flex>
    </Flex>
  )
}
