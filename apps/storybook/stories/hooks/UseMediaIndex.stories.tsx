import {Card, Stack, Text, useMediaIndex} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

function ExampleStory() {
  const mediaIndex = useMediaIndex()

  return (
    <Card padding={[3, 4, 5]}>
      <Stack space={2}>
        <Text weight="medium">The current media index is {mediaIndex}.</Text>
        <Text muted>Try resizing the browser.</Text>
      </Stack>
    </Card>
  )
}

export const Default: Story = {
  render: () => <ExampleStory />,
}
