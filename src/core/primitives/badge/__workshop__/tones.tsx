import {Badge, Flex} from '@sanity/ui'
import {ELEMENT_TONES} from '@sanity/ui/theme'

export default function Tones(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Flex align="center" direction="column" gap={2}>
        {ELEMENT_TONES.map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </Flex>
    </Flex>
  )
}
