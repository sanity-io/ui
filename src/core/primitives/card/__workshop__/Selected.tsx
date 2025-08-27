import {EditIcon, PublishIcon} from '@sanity/icons'
import {Box, Card, Container, Flex, Inline, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

export default function SelectedStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)
  const selected = useBoolean('Selected', false)

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container width={0}>
        <Stack gap={1}>
          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
          >
            <Preview selected={selected} />
          </Card>

          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
            tone="critical"
          >
            <Preview selected={selected} />
          </Card>
        </Stack>
      </Container>
    </Flex>
  )
}

function Preview({selected}: {selected: boolean | undefined}) {
  return (
    <Flex>
      <Box flex={1}>
        <Text size={1}>Title</Text>
      </Box>
      <Inline gap={3}>
        <Text data-selected={selected ? '' : undefined} muted size={1} weight="medium">
          <EditIcon />
        </Text>
        <Text
          data-selected={selected ? '' : undefined}
          muted
          size={1}
          // $tone={rootTheme.tone === 'default' ? 'positive' : 'default'}
        >
          <PublishIcon />
        </Text>
      </Inline>
    </Flex>
  )
}
