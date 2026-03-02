import {Container, Flex, Text} from '@sanity/ui'
import {CONTAINER_SCALE} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

export default function PlainStory(): React.JSX.Element {
  const width = useSelect('Width', [undefined, ...CONTAINER_SCALE])

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container padding={3} radius={4} shadow={1} width={width}>
        <Text size={1}>
          Container with <code>max-width={width}</code>
        </Text>
      </Container>
    </Flex>
  )
}
