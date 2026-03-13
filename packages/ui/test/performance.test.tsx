import {describe, expect, it} from 'vitest'

import {
  measureRender,
  MOUNT_THRESHOLD_MS,
  registerPerfReportHook,
  TEST_TIMEOUT_MS,
} from '$test/perf'

import {Badge} from '../src/primitives/badge/Badge'
import {Box} from '../src/primitives/box/Box'
import {Button} from '../src/primitives/button/Button'
import {Card} from '../src/primitives/card/Card'
import {Checkbox} from '../src/primitives/checkbox/Checkbox'
import {Flex} from '../src/primitives/flex/Flex'
import {Grid} from '../src/primitives/grid/Grid'
import {Heading} from '../src/primitives/heading/Heading'
import {Inline} from '../src/primitives/inline/Inline'
import {Label} from '../src/primitives/label/Label'
import {Stack} from '../src/primitives/stack/Stack'
import {Text} from '../src/primitives/text/Text'
import {TextArea} from '../src/primitives/textArea/TextArea'
import {TextInput} from '../src/primitives/textInput/TextInput'

registerPerfReportHook()

// ---------------------------------------------------------------------------
// Components that depend on useLayer() / global event listeners
// ---------------------------------------------------------------------------
// The tests below hang during afterEach cleanup when they run after the ~30
// primitive tests above. Root cause: `createGlobalScopedContext` persists
// React contexts on `globalThis[Symbol.for('@sanity/ui/v4/…')]` across tests
// in the same jsdom instance. Layer, card, and menu state accumulates, and
// when React 19 synchronously unmounts components that registered global
// listeners via useClickOutsideEvent (document mousedown) and
// useGlobalKeyDown (window keydown), the interleaving of effect cleanups
// and jsdom's setTimeout-based requestAnimationFrame polyfill creates an
// unbounded cascade that never resolves.
//
// These pass in isolation (`vitest run -t "Menu with many"`).
//
// Fix: make createGlobalScopedContext resettable between tests, or scope
// global event listeners so they don't accumulate across unmount cycles.
// ---------------------------------------------------------------------------
describe('Performance – Components (layer-dependent)', () => {
  it.todo('Popover should mount within threshold')
  it.todo('Tooltip should mount within threshold')
  it.todo('Autocomplete should mount within threshold')
  it.todo('Breadcrumbs should mount within threshold')
  it.todo('Dialog should mount within threshold')
  it.todo('Menu with items should mount within threshold')
  it.todo('Menu with many items should render efficiently')
  it.todo('MenuButton should mount within threshold')
  it.todo('MenuGroup should mount within threshold')
  it.todo('TabList with Tabs should mount within threshold')
  it.todo('ToastProvider should mount within threshold')
})

describe('Performance – Composite Layouts', {timeout: TEST_TIMEOUT_MS}, () => {
  it('a typical form layout should mount within threshold', () => {
    const metrics = measureRender(
      <Card padding={4} radius={2}>
        <Stack gap={4}>
          <Heading as="h2" size={2}>
            Settings
          </Heading>
          <Stack gap={3}>
            <Label size={1}>Name</Label>
            <TextInput placeholder="Enter name" />
          </Stack>
          <Stack gap={3}>
            <Label size={1}>Bio</Label>
            <TextArea rows={3} placeholder="Enter bio" />
          </Stack>
          <Inline gap={3}>
            <Checkbox />
            <Text size={1}>Accept terms</Text>
          </Inline>
          <Flex gap={2} justify="flex-end">
            <Button text="Cancel" mode="ghost" />
            <Button text="Save" tone="primary" />
          </Flex>
        </Stack>
      </Card>,
      'FormLayout',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS * 2)
  })

  it('a card grid layout should mount within threshold', () => {
    const cards = Array.from({length: 24}, (_, i) => (
      <Card key={i} padding={3} radius={2} border>
        <Stack gap={2}>
          <Heading as="h3" size={1}>{`Card ${i + 1}`}</Heading>
          <Text size={1} muted>
            Description text for this card.
          </Text>
          <Inline gap={2}>
            <Badge tone="primary">Tag</Badge>
            <Badge tone="positive">Active</Badge>
          </Inline>
        </Stack>
      </Card>
    ))
    const metrics = measureRender(
      <Grid gridTemplateColumns={[1, 2, 3]} gap={3}>
        {cards}
      </Grid>,
      'CardGrid-24-items',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS * 5)
  })

  it('a deeply nested layout should mount within threshold', () => {
    const metrics = measureRender(
      <Card padding={4}>
        <Stack gap={4}>
          <Flex gap={3}>
            <Box flex={1}>
              <Card padding={3} tone="primary">
                <Stack gap={2}>
                  <Heading size={1}>Section A</Heading>
                  <Flex gap={2}>
                    <Box flex={1}>
                      <Text>Left</Text>
                    </Box>
                    <Box flex={1}>
                      <Text>Right</Text>
                    </Box>
                  </Flex>
                </Stack>
              </Card>
            </Box>
            <Box flex={1}>
              <Card padding={3} tone="positive">
                <Stack gap={2}>
                  <Heading size={1}>Section B</Heading>
                  <Inline gap={2}>
                    <Badge>A</Badge>
                    <Badge>B</Badge>
                    <Badge>C</Badge>
                  </Inline>
                </Stack>
              </Card>
            </Box>
          </Flex>
        </Stack>
      </Card>,
      'DeepNested',
    )
    expect(metrics.actualDuration).toBeLessThan(MOUNT_THRESHOLD_MS * 2)
  })
})
