import {Box, Card, Code, Container, Stack, Text, useElementRect} from '@sanity/ui'
import {useState} from 'react'

import {Grid} from '../../../primitives'

export default function ExampleStory() {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const rect = useElementRect(element)
  const size = {width: rect?.width || 0, height: rect?.height || 0}

  return (
    <Box padding={[3, 4, 5]}>
      <Container width={1}>
        <Stack space={4}>
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
