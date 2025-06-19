import {Box, Card, Code, Container, Grid, Stack, Text, useElementRect} from '@sanity/ui'
import {useState} from 'react'

export default function ExampleStory(): React.JSX.Element {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const rect = useElementRect(element)
  const size = {width: rect?.width || 0, height: rect?.height || 0}

  return (
    <Box padding={[3, 4, 5]}>
      <Container width={1}>
        <Stack gap={4}>
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
