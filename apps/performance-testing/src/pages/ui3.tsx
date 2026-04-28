import {Box, Card, Flex, Grid, Text, Heading, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
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
  console.log({perComponent})
  navigator.clipboard.writeText(String(perComponent))
}

const theme = buildTheme()

export default function Ui3() {
  return (
    <ThemeProvider theme={theme}>
      <h1>UI v3</h1>
      <h2>{count} Boxes</h2>
      <Profiler id="Boxes" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Box key={i} padding={3} marginBottom={2}>
            <span>Box content</span>
          </Box>
        ))}
      </Profiler>

      <h2>{count} Flexes</h2>
      <Profiler id="Flexes" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Flex key={i} direction="column" gap={3}>
            <span>Flex content</span>
            <span>Flex content</span>
            <span>Flex content</span>
          </Flex>
        ))}
      </Profiler>

      <h2>{count} Grids</h2>
      <Profiler id="Flexes" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Grid key={i} columns={2} gap={3}>
            <span>Flex content</span>
            <span>Flex content</span>
            <span>Flex content</span>
            <span>Grid content</span>
          </Grid>
        ))}
      </Profiler>

      <h2>{count} Texts</h2>
      <Profiler id="Texts" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Text key={i} size={2} muted>
            Text
          </Text>
        ))}
      </Profiler>

      <h2>{count} Headings</h2>
      <Profiler id="Headings" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Heading key={i} size={2} muted>
            Heading
          </Heading>
        ))}
      </Profiler>

      <h2>{count} Cards</h2>
      <Profiler id="Cards" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Card key={i} padding={[3, 4]} radius={[2, 3]} marginBottom={2}>
            <span>Card content</span>
          </Card>
        ))}
      </Profiler>

      <h2>{count} Compositions</h2>
      <Profiler id="Compositions" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Card key={i} padding={[3, 4]} radius={[2, 3]} marginBottom={2}>
            <Flex direction="column" gap={3}>
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
    </ThemeProvider>
  )
}
