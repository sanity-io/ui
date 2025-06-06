import {Card, Flex, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

export default function InteractiveCardStory() {
  const pressed = useBoolean('Pressed', false)
  const selected = useBoolean('Selected', false)

  return (
    <Flex align="center" height="fill" justify="center">
      <div>
        <Card
          __unstable_focusRing
          as="button"
          padding={3}
          pressed={pressed}
          selected={selected}
          tabIndex={0}
        >
          <Stack gap={3}>
            <Text>
              Text <code>Code</code>
            </Text>
            <Text muted>Muted</Text>
          </Stack>
        </Card>
      </div>
    </Flex>
  )
}
