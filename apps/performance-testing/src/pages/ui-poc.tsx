import '@sanity-labs/ui-poc/styles.css'

import {Box, Card, Divider, Flex, Grid, Heading, Text} from '@sanity-labs/ui-poc'
import {Profiler} from 'react'

const count = 5000
const iterator = [...Array(count).keys()]

function handleOnRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
) {
  const value = {id, phase, actualDuration, baseDuration, startTime, commitTime}
  const perComponent = actualDuration / count
  /* eslint-disable-next-line no-console */
  console.log(JSON.stringify(value, null, 2))
  /* eslint-disable-next-line no-console */
  console.log(`per ${id} component: ${perComponent}`)
}

export default function UiPoc() {
  return (
    <div>
      <h1>UI POC</h1>
      <h2>{count} Boxes</h2>
      <Profiler id="Box" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Box key={i} padding={3} marginBottom={2}>
            <span>Box content</span>
          </Box>
        ))}
      </Profiler>

      <h2>{count} Flexes</h2>
      <Profiler id="Flex" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Flex key={i} flexDirection="column" gap={3}>
            <span>Flex content</span>
            <span>Flex content</span>
            <span>Flex content</span>
          </Flex>
        ))}
      </Profiler>

      <h2>{count} Grids</h2>
      <Profiler id="Grid" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Grid key={i} gridAutoFlow="column" gap={3}>
            <span>Grid content</span>
            <span>Grid content</span>
            <span>Grid content</span>
            <span>Grid content</span>
          </Grid>
        ))}
      </Profiler>

      <h2>{count} Texts</h2>
      <Profiler id="Text" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Text key={i} size={2} muted>
            Text
          </Text>
        ))}
      </Profiler>

      <h2>{count} Headings</h2>
      <Profiler id="Heading" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Heading key={i} size={2} muted>
            Heading
          </Heading>
        ))}
      </Profiler>

      <h2>{count} Dividers</h2>
      <Profiler id="Divider" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Divider key={i} />
        ))}
      </Profiler>

      <h2>{count} Cards</h2>
      <Profiler id="Card" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Card key={i} density={['regular', 'loose']} marginBottom={2}>
            <span>Card content</span>
          </Card>
        ))}
      </Profiler>

      <h2>{count} Compositions</h2>
      <Profiler id="Composition" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Card key={i} density={['regular', 'loose']} marginBottom={2}>
            <Flex flexDirection="column" gap={3}>
              <Heading size={3} muted>
                Card content
              </Heading>
              <Box padding={3}>
                <Text size={1} muted>
                  This is a card{' '}
                </Text>
              </Box>
            </Flex>
          </Card>
        ))}
      </Profiler>
    </div>
  )
}
