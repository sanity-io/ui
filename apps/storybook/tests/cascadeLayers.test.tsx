import {SearchIcon} from '@sanity/icons/Search'
import {
  Avatar,
  AvatarCounter,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  Heading,
  Hotkeys,
  KBD,
  Label,
  LayerProvider,
  PortalProvider,
  Radio,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Tab,
  TabList,
  Text,
  TextArea,
  TextInput,
  TextSkeleton,
  ThemeProvider,
  Tree,
  TreeItem,
} from '@sanity/ui'
import {Breadcrumbs} from '@sanity/ui/breadcrumbs'
import {Code} from '@sanity/ui/code'
import {Menu, MenuDivider, MenuItem} from '@sanity/ui/menu'
import {buildTheme} from '@sanity/ui/theme'
import {Toast} from '@sanity/ui/toast'
import {useState} from 'react'
import {StyleSheetManager, styled} from 'styled-components'
import {describe, expect, onTestFinished, test} from 'vitest'
import {render} from 'vitest-browser-react'

const theme = buildTheme()

// A background change would otherwise start `Button`'s transition from the previous color
const NO_TRANSITION = {transition: 'none'}

const WrappingButton = styled(Button)`
  white-space: normal;
`

function KitchenSink() {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <ThemeProvider theme={theme}>
      <LayerProvider>
        <PortalProvider element={portalElement}>
          <Card id="kitchen-sink" padding={3}>
            <Button text="Default" />
            <Button icon={SearchIcon} mode="ghost" text="Ghost" tone="primary" />
            <Button mode="bleed" selected text="Bleed" tone="critical" />
            <Button disabled text="Disabled" width="fill" />
            <Card as="button" padding={2} radius={2} selected tone="primary">
              <Text>Card button</Text>
            </Card>
            <Avatar color="purple" initials="AB" size={2} status="online" />
            <AvatarCounter count={3} />
            <Badge tone="positive">Badge</Badge>
            <Switch checked readOnly />
            <Switch indeterminate readOnly />
            <Checkbox checked readOnly />
            <Radio checked readOnly />
            <TextInput
              clearButton
              icon={SearchIcon}
              prefix="https://"
              readOnly
              suffix=".com"
              value="v"
            />
            <TextArea readOnly value="Text area" />
            <Select defaultValue="a">
              <option value="a">A</option>
            </Select>
            <TabList gap={1}>
              <Tab aria-controls="panel" id="tab-1" label="Tab 1" selected />
              <Tab aria-controls="panel" id="tab-2" label="Tab 2" />
            </TabList>
            <Menu>
              <MenuItem hotkeys={['Ctrl', 'K']} icon={SearchIcon} text="Item" />
              <MenuDivider />
              <MenuItem selected text="Selected" />
            </Menu>
            <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
            <KBD>K</KBD>
            <Breadcrumbs maxLength={3}>
              <Text>A</Text>
              <Text>B</Text>
              <Text>C</Text>
              <Text>D</Text>
            </Breadcrumbs>
            <Toast description="Description" onClose={() => {}} status="success" title="Toast" />
            <Spinner />
            <Skeleton radius={2} style={{width: 40, height: 10}} />
            <TextSkeleton size={1} />
            <Tree>
              <TreeItem expanded text="Root">
                <TreeItem selected text="Child" />
              </TreeItem>
            </Tree>
            <Code>{'const a = 1'}</Code>
            <Heading>Heading</Heading>
            <Label>Label</Label>
            <Box padding={[1, 2, 3]}>
              <Text weight="bold">
                Text <a href="#a">link</a> <code>code</code> <strong>strong</strong>
              </Text>
            </Box>
            {/* Layer's static `position: relative` loses to Dialog's styled `position: fixed` */}
            <Dialog __unstable_autoFocus={false} header="Dialog" id="dialog">
              <Text>Dialog</Text>
            </Dialog>
            <div data-portal="" ref={setPortalElement} />
          </Card>
        </PortalProvider>
      </LayerProvider>
    </ThemeProvider>
  )
}

/** The properties that an element's `style` attribute sets, read in this document. */
function inlineProperties(element: Element): Set<string> {
  const probe = document.createElement('div')
  probe.setAttribute('style', element.getAttribute('style') ?? '')

  return new Set(probe.style)
}

/**
 * The computed styles of `root` and its descendants. Inline styles, which motion animates, take no
 * part in the layer order and are left out.
 */
function computedStyles(root: Element): Record<string, string>[] {
  const view = root.ownerDocument.defaultView!

  return [root, ...root.querySelectorAll('*')].map((element) => {
    const style = view.getComputedStyle(element)
    const inline = inlineProperties(element)

    return Object.fromEntries(
      [...style]
        .filter((property) => !inline.has(property))
        .map((property) => [property, style.getPropertyValue(property)]),
    )
  })
}

function addStyleSheet(css: string, position: 'first' | 'last' = 'last') {
  const style = document.createElement('style')
  style.textContent = css
  document.head[position === 'first' ? 'prepend' : 'append'](style)
  onTestFinished(() => style.remove())
}

/**
 * Which of two layers wins a conflict in `doc`, given where it has already declared them. A layer
 * that the document has not declared yet would be declared here, last.
 */
function higherLayer(a: string, b: string, doc: Document = document): string {
  const probe = doc.createElement('div')
  const style = doc.createElement('style')
  probe.id = 'layer-probe'
  style.textContent = `
    @layer ${a} { #layer-probe { --layer: ${a}; } }
    @layer ${b} { #layer-probe { --layer: ${b}; } }
  `
  doc.body.append(probe)
  doc.head.append(style)
  const winner = doc.defaultView!.getComputedStyle(probe).getPropertyValue('--layer')
  probe.remove()
  style.remove()

  return winner
}

type StyleLoad = 'order statement' | 'styles.css'

/** What a page loads, in the order it loads it. */
type Load = StyleLoad | 'styled-components'

/**
 * The CSS of `styles.css`: the `u-tokens` and `u-utilities` blocks of `.storybook/panda.css`, which
 * also declares the order and holds a `u-base` layer that the published stylesheet doesn't.
 */
function staticCss(): string {
  const panda = document.querySelector<HTMLStyleElement>('style[data-vite-dev-id$="panda.css"]')!

  return [...panda.sheet!.cssRules]
    .filter(
      (rule) =>
        rule instanceof CSSLayerBlockRule &&
        (rule.name === 'u-tokens' || rule.name === 'u-utilities'),
    )
    .map((rule) => rule.cssText)
    .join('\n')
}

function appendStyles(doc: Document, loads: Load[]) {
  for (const load of loads.filter((entry): entry is StyleLoad => entry !== 'styled-components')) {
    const style = doc.createElement('style')
    style.textContent = load === 'order statement' ? ORDER_STATEMENT : staticCss()
    doc.head.append(style)
  }
}

/**
 * Renders the kitchen sink in a new document that loads `order` in sequence. `order statement` and
 * `styles.css` append a `<style>` to its head. `styled-components` renders the kitchen sink, and
 * styled-components appends its `<style data-styled>` tag to the head at that point.
 */
async function loadInFrame(order: Load[]): Promise<Element> {
  const frame = document.createElement('iframe')
  frame.style.cssText = 'width: 1024px; height: 768px; border: 0;'
  frame.srcdoc = '<!doctype html><html><head></head><body></body></html>'
  const loaded = new Promise((resolve) => frame.addEventListener('load', resolve, {once: true}))
  document.body.append(frame)
  onTestFinished(() => frame.remove())
  await loaded

  const doc = frame.contentDocument!
  const index = order.indexOf('styled-components')

  appendStyles(doc, order.slice(0, index))
  await render(
    <StyleSheetManager target={doc.head}>
      <KitchenSink />
    </StyleSheetManager>,
    {container: doc.body.appendChild(doc.createElement('div'))},
  )
  appendStyles(doc, order.slice(index + 1))

  const root = doc.getElementById('kitchen-sink')!
  await settle(root)

  return root
}

const ORDER_STATEMENT = '@layer u-tokens, u-utilities, u-styled;'

/** Meets both of the README's options. */
const REFERENCE: Load[] = ['order statement', 'styles.css', 'styled-components']

/**
 * Waits until the kitchen sink stops changing. Inside an iframe, motion animates the toast with
 * JavaScript rather than the document's animations, since its `instanceof HTMLElement` checks fail
 * across documents.
 */
async function settle(root: Element) {
  let previous = ''

  await expect
    .poll(
      () => {
        for (const animation of root.ownerDocument.getAnimations()) {
          // Stylesheets that load after the kitchen sink start transitions, which a page would
          // finish. `instanceof CSSTransition` is false across documents.
          if ('transitionProperty' in animation) {
            animation.finish()
          } else {
            animation.pause()
            animation.currentTime = 0
          }
        }

        const current = JSON.stringify(computedStyles(root))
        const stable = current === previous
        previous = current

        return stable
      },
      {interval: 100, timeout: 5_000},
    )
    .toBe(true)
}

describe('styled-components cascade layer', () => {
  test('@sanity/ui rules are all in u-styled, extensions stay unlayered', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <WrappingButton id="wrapping-button" text="Button" />
      </ThemeProvider>,
    )

    const rules = [
      ...document.querySelector<HTMLStyleElement>('style[data-styled]')!.sheet!.cssRules,
    ]
    const unlayered = rules.filter((rule) => !(rule instanceof CSSLayerBlockRule))

    expect(
      new Set(rules.flatMap((rule) => (rule instanceof CSSLayerBlockRule ? [rule.name] : []))),
    ).toEqual(new Set(['u-styled']))
    expect(unlayered.map((rule) => rule.cssText)).toEqual([
      expect.stringMatching(/^\.[\w-]+ \{ white-space: normal; \}$/),
    ])
    expect(getComputedStyle(document.getElementById('wrapping-button')!).whiteSpace).toBe('normal')
  })

  test('a layer ordered after u-styled overrides a @sanity/ui rule, one ordered before it does not', async () => {
    addStyleSheet('@layer app-reset;', 'first')
    await render(
      <ThemeProvider theme={theme}>
        <Button id="layered-button" style={NO_TRANSITION} text="Button" tone="primary" />
      </ThemeProvider>,
    )

    const button = document.getElementById('layered-button')!
    const uiBackground = getComputedStyle(button).backgroundColor

    addStyleSheet('@layer app-reset { #layered-button { background-color: rgb(1, 2, 3); } }')
    expect(getComputedStyle(button).backgroundColor).toBe(uiBackground)

    addStyleSheet('@layer app { #layered-button { background-color: rgb(4, 5, 6); } }')
    expect(getComputedStyle(button).backgroundColor).toBe('rgb(4, 5, 6)')
  })

  test('unlayered CSS overrides a @sanity/ui rule regardless of specificity', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <Button id="unlayered-button" style={NO_TRANSITION} text="Button" tone="primary" />
      </ThemeProvider>,
    )

    const button = document.getElementById('unlayered-button')!
    addStyleSheet('button { background-color: rgb(7, 8, 9); }')

    expect(getComputedStyle(button).backgroundColor).toBe('rgb(7, 8, 9)')
  })
  test('an earlier layer overrides a @sanity/ui !important rule, unlayered CSS does not', async () => {
    addStyleSheet('@layer app-reset;', 'first')
    await render(
      <ThemeProvider theme={theme}>
        <Text>
          <SearchIcon />
        </Text>
      </ThemeProvider>,
    )

    const path = document.querySelector('[data-sanity-icon] path')!
    expect(getComputedStyle(path).vectorEffect).toBe('non-scaling-stroke')

    addStyleSheet('[data-sanity-icon] path { vector-effect: none !important; }')
    expect(getComputedStyle(path).vectorEffect).toBe('non-scaling-stroke')

    addStyleSheet(
      '@layer app-reset { [data-sanity-icon] path { vector-effect: none !important; } }',
    )
    expect(getComputedStyle(path).vectorEffect).toBe('none')
  })
})

describe('the layer order a page sets, as the README asks', () => {
  test.each<[string, Load[]]>([
    ['styles.css before <style data-styled>', ['styles.css', 'styled-components']],
    [
      'the order statement first, styles.css after <style data-styled>',
      ['order statement', 'styled-components', 'styles.css'],
    ],
  ])('%s keeps every computed style', async (_, order) => {
    const expected = computedStyles(await loadInFrame(REFERENCE))
    const root = await loadInFrame(order)

    expect(higherLayer('u-tokens', 'u-utilities', root.ownerDocument)).toBe('u-utilities')
    expect(higherLayer('u-utilities', 'u-styled', root.ownerDocument)).toBe('u-styled')
    expect(computedStyles(root)).toEqual(expected)
  })

  test.each<[string, Load[]]>([
    [
      'styles.css after <style data-styled>, no order statement',
      ['styled-components', 'styles.css'],
    ],
    [
      'the order statement after <style data-styled>',
      ['styled-components', 'order statement', 'styles.css'],
    ],
  ])('%s lets static styles win', async (_, order) => {
    const expected = computedStyles(await loadInFrame(REFERENCE))
    const root = await loadInFrame(order)

    expect(higherLayer('u-utilities', 'u-styled', root.ownerDocument)).toBe('u-utilities')
    expect(computedStyles(root)).not.toEqual(expected)
  })
})
