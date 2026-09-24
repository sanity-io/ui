import {AddIcon} from '@sanity/icons/Add'
import {Profiler} from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Code,
  Container,
  Flex,
  Grid,
  Heading,
  Inline,
  Label,
  Radio,
  Spinner,
  Stack,
  Switch,
  Text,
  ThemeProvider,
  Tooltip,
} from 'ui3'
import {buildTheme} from 'ui3/theme'

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

const theme = buildTheme()

export default function Ui3() {
  return (
    <ThemeProvider theme={theme}>
      <h1>UI v3</h1>

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
          <Flex key={i} direction="column" gap={3}>
            <span>Flex content</span>
            <span>Flex content</span>
            <span>Flex content</span>
          </Flex>
        ))}
      </Profiler>

      <h2>{count} Grids</h2>
      <Profiler id="Grid" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Grid key={i} gridTemplateColumns={2} gap={3}>
            <span>Grid content</span>
            <span>Grid content</span>
            <span>Grid content</span>
            <span>Grid content</span>
          </Grid>
        ))}
      </Profiler>

      <h2>{count} Inlines</h2>
      <Profiler id="Inline" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Inline key={i} gap={3}>
            <span>Inline content</span>
            <span>Inline content</span>
          </Inline>
        ))}
      </Profiler>

      <h2>{count} Stacks</h2>
      <Profiler id="Stack" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Stack key={i} gap={3}>
            <span>Stack content</span>
            <span>Stack content</span>
            <span>Stack content</span>
          </Stack>
        ))}
      </Profiler>

      <h2>{count} Containers</h2>
      <Profiler id="Container" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Container key={i} width={1}>
            <span>Container content</span>
          </Container>
        ))}
      </Profiler>

      <h2>{count} Cards</h2>
      <Profiler id="Card" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Card key={i} padding={[3, 4]} radius={[2, 3]} marginBottom={2}>
            <span>Card content</span>
          </Card>
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

      <h2>{count} Texts</h2>
      <Profiler id="Text" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Text key={i} size={2} muted>
            Text
          </Text>
        ))}
      </Profiler>

      <h2>{count} Labels</h2>
      <Profiler id="Label" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Label key={i}>Label</Label>
        ))}
      </Profiler>

      <h2>{count} Codes</h2>
      <Profiler id="Code" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Code key={i}>const code = true</Code>
        ))}
      </Profiler>

      <h2>{count} Buttons</h2>
      <Profiler id="Button" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Button key={i} text="Button" />
        ))}
      </Profiler>

      <h2>{count} Checkboxes</h2>
      <Profiler id="Checkbox" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Inline key={i}>
            <Checkbox />
            <Text as="label">Checkbox</Text>
          </Inline>
        ))}
      </Profiler>

      <h2>{count} Switches</h2>
      <Profiler id="Switch" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Inline key={i}>
            <Switch />
            <Text as="label">Switch</Text>
          </Inline>
        ))}
      </Profiler>

      <h2>{count} Radios</h2>
      <Profiler id="Radio" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Inline key={i}>
            <Radio name="radio" />
            <Text as="label">Radio</Text>
          </Inline>
        ))}
      </Profiler>

      <h2>{count} Spinners</h2>
      <Profiler id="Spinner" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Spinner key={i} />
        ))}
      </Profiler>

      <h2>{count} Tooltips</h2>
      <Profiler id="Tooltip" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Tooltip key={i} content={<Text size={1}>Tooltip</Text>}>
            <Button text="Open tooltip" />
          </Tooltip>
        ))}
      </Profiler>

      <h2>{count} Icons</h2>
      <Profiler id="Icon" onRender={handleOnRender}>
        {iterator.map((i) => (
          <AddIcon key={i} />
        ))}
      </Profiler>

      <h2>{count} Badges</h2>
      <Profiler id="Badge" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Badge key={i}>Badge</Badge>
        ))}
      </Profiler>

      <h2>{count} Compositions</h2>
      <Profiler id="Composition" onRender={handleOnRender}>
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
