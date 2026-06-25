import '@sanity-labs/ui-poc/styles.css'

import {AddIcon, EditIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Code,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Indicator,
  IndicatorStack,
  Inline,
  Label,
  Link,
  List,
  PressArea,
  Radio,
  SkipToContent,
  Spinner,
  Switch,
  Text,
  Tooltip,
  TooltipGroup,
  VisuallyHidden,
  VStack,
} from '@sanity-labs/ui-poc'
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

      <h2>{count} HStacks</h2>
      <Profiler id="HStack" onRender={handleOnRender}>
        {iterator.map((i) => (
          <HStack key={i} gap={3}>
            <span>HStack content</span>
            <span>HStack content</span>
          </HStack>
        ))}
      </Profiler>

      <h2>{count} VStacks</h2>
      <Profiler id="VStack" onRender={handleOnRender}>
        {iterator.map((i) => (
          <VStack key={i} gap={3}>
            <span>VStack content</span>
            <span>VStack content</span>
          </VStack>
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

      <h2>{count} Containers</h2>
      <Profiler id="Container" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Container key={i} contentSize={1}>
            <span>Container content</span>
          </Container>
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

      <h2>{count} Dividers</h2>
      <Profiler id="Divider" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Divider key={i} />
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

      <h2>{count} IconButtons</h2>
      <Profiler id="IconButton" onRender={handleOnRender}>
        {iterator.map((i) => (
          <IconButton key={i} aria-label="Edit" icon={EditIcon} />
        ))}
      </Profiler>

      <h2>{count} Checkboxes</h2>
      <Profiler id="Checkbox" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Checkbox key={i} label="Checkbox" />
        ))}
      </Profiler>

      <h2>{count} Switches</h2>
      <Profiler id="Switch" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Switch key={i} label="Switch" />
        ))}
      </Profiler>

      <h2>{count} Radios</h2>
      <Profiler id="Radio" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Radio key={i} name="radio" label="Radio" />
        ))}
      </Profiler>

      <h2>{count} Links</h2>
      <Profiler id="Link" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Link key={i} href="https://www.sanity.io">
            Sanity
          </Link>
        ))}
      </Profiler>

      <h2>{count} PressAreas</h2>
      <Profiler id="PressArea" onRender={handleOnRender}>
        {iterator.map((i) => (
          <PressArea key={i}>
            <Card tone="neutral">Press area content</Card>
          </PressArea>
        ))}
      </Profiler>

      <h2>{count} Spinners</h2>
      <Profiler id="Spinner" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Spinner key={i} />
        ))}
      </Profiler>

      <h2>{count} Indicators</h2>
      <Profiler id="Indicator" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Indicator key={i} tone="critical" label="Indicator" />
        ))}
      </Profiler>

      <h2>{count} IndicatorStacks</h2>
      <Profiler id="IndicatorStack" onRender={handleOnRender}>
        {iterator.map((i) => (
          <IndicatorStack key={i}>
            <Indicator tone="critical" label="Critical" />
            <Indicator tone="positive" label="Positive" />
          </IndicatorStack>
        ))}
      </Profiler>

      <h2>{count} Tooltips</h2>
      <Profiler id="Tooltip" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Tooltip key={i} text="Tooltip">
            <Button text="Open tooltip" />
          </Tooltip>
        ))}
      </Profiler>

      <h2>{count} TooltipGroups</h2>
      <Profiler id="TooltipGroup" onRender={handleOnRender}>
        {iterator.map((i) => (
          <TooltipGroup key={i} as={HStack} gap={2}>
            <Tooltip text="Tooltip 1">
              <Button text="Open 1" />
            </Tooltip>
            <Tooltip text="Tooltip 2">
              <Button text="Open 2" />
            </Tooltip>
          </TooltipGroup>
        ))}
      </Profiler>

      <h2>{count} Icons</h2>
      <Profiler id="Icon" onRender={handleOnRender}>
        {iterator.map((i) => (
          <Icon key={i} icon={AddIcon} />
        ))}
      </Profiler>

      <h2>{count} Lists</h2>
      <Profiler id="List" onRender={handleOnRender}>
        {iterator.map((i) => (
          <List key={i}>
            <List.Item trailing={<Icon size={1} icon={EditIcon} />}>
              <List.ItemText title="Item title" subtitle="Item subtitle" />
            </List.Item>
          </List>
        ))}
      </Profiler>

      <h2>{count} SkipToContents</h2>
      <Profiler id="SkipToContent" onRender={handleOnRender}>
        {iterator.map((i) => (
          <SkipToContent key={i} hash="#main" target="_self" label="Skip to content" />
        ))}
      </Profiler>

      <h2>{count} VisuallyHiddens</h2>
      <Profiler id="VisuallyHidden" onRender={handleOnRender}>
        {iterator.map((i) => (
          <VisuallyHidden key={i}>Hidden content</VisuallyHidden>
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
