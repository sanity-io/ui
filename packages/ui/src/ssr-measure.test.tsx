/** @vitest-environment node */
import fs from 'node:fs'

import {renderToString} from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'
import {expect, it} from 'vitest'

import {
  Badge,
  Button,
  Card,
  Checkbox,
  Heading,
  Select,
  Stack,
  studioTheme,
  Text,
  TextInput,
  ThemeProvider,
} from './exports'

const TONES = ['default', 'primary', 'positive', 'caution', 'critical'] as const
const MODES = ['default', 'ghost', 'bleed'] as const

function App() {
  return (
    <ThemeProvider theme={studioTheme}>
      {Array.from({length: 20}, (_, i) => (
        <Card key={i} padding={(i % 4) + 1} radius={i % 5} shadow={i % 3} tone={TONES[i % 5]}>
          <Stack space={3}>
            <Heading size={i % 4}>Heading</Heading>
            <Text muted={i % 2 === 0} size={i % 4}>
              Text
            </Text>
            {MODES.flatMap((mode) =>
              TONES.map((tone) => (
                <Button key={mode + tone} mode={mode} radius={i % 4} text={tone} tone={tone} />
              )),
            )}
            <TextInput fontSize={i % 4} padding={i % 4} radius={i % 3} />
            <Select fontSize={i % 4}>
              <option>Option</option>
            </Select>
            <Checkbox />
            <Badge tone={TONES[i % 5]}>Badge</Badge>
            <Card as="button" padding={2} radius={2} tone={TONES[(i + 1) % 5]}>
              <Text>Clickable</Text>
            </Card>
          </Stack>
        </Card>
      ))}
    </ThemeProvider>
  )
}

it('measures the server-rendered HTML and CSS', () => {
  const times: number[] = []
  let html = ''
  let css = ''
  for (let i = 0; i < 21; i++) {
    const sheet = new ServerStyleSheet()
    const start = performance.now()
    html = renderToString(sheet.collectStyles(<App />))
    css = sheet.getStyleTags()
    times.push(performance.now() - start)
    sheet.seal()
  }
  const classes = [...html.matchAll(/class="([^"]*)"/g)].map(([, value]) => value)
  const result = {
    nodeEnv: process.env.NODE_ENV,
    elements: html.match(/<[a-z]/g)?.length,
    cssBytes: css.length,
    cssBlocks: css.match(/\{/g)?.length,
    htmlBytes: html.length,
    classBytes: classes.reduce((sum, value) => sum + value.length, 0),
    renderMs: Math.round(times.toSorted((a, b) => a - b)[10]),
  }
  fs.writeFileSync('ssr-measure.json', JSON.stringify(result))
  expect(result.elements).toBeGreaterThan(0)
}, 60_000)
