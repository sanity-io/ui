import {Box, Card, Code, Container, Grid, Stack, Text, useElementRect} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

function ExampleStory() {
  const [element, setElement] = useState<HTMLElement | null>(null)
  // oxlint-disable-next-line no-deprecated
  const rect = useElementRect(element)
  const size = {width: rect?.width || 0, height: rect?.height || 0}

  return (
    <Box padding={[3, 4, 5]}>
      <Container width={1}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={4}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Grid columns={[1, 2, 3]}>
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
