import {Box, Card, Container, Grid, Stack, Text, useElementSize} from '@sanity/ui'
import {Code} from '@sanity/ui/code'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

function ExampleStory() {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const elementSize = useElementSize(element)
  const size = {
    width: elementSize?.border.width || 0,
    height: elementSize?.border.height || 0,
  }

  return (
    <Box padding={[3, 4, 5]}>
      <Container width={1}>
        <Stack gap={4}>
          <Grid gridTemplateColumns={[1, 2, 3]}>
            <Card ref={setElement} tone="transparent">
              <Text>rect</Text>
            </Card>
          </Grid>

          <div style={{height: 11}}>
            <Card scheme="dark" style={{position: 'absolute', ...size}} />
          </div>

          <Code language="json" size={1}>
            {JSON.stringify(size)}
          </Code>
        </Stack>
      </Container>
    </Box>
  )
}

export const Default: Story = {
  render: () => <ExampleStory />,
}
