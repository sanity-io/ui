import {Card, Stack, Text, useMediaIndex} from '@sanity/ui'

export default function TestStory(): React.JSX.Element {
  const mediaIndex = useMediaIndex()

  return (
    <Card padding={5}>
      <Stack gap={3}>
        <Text weight="medium">The current media index is {mediaIndex}.</Text>
        <Text muted>Try resizing the browser.</Text>
      </Stack>
    </Card>
  )
}
