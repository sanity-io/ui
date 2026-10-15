import {SearchIcon} from '@sanity/icons/Search'
import {
  Avatar,
  AvatarCounter,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Heading,
  Hotkeys,
  KBD,
  Label,
  LayerProvider,
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
import {styled} from 'styled-components'
import {describe, expect, onTestFinished, test} from 'vitest'
import {render} from 'vitest-browser-react'

const theme = buildTheme()

const WrappingButton = styled(Button)`
  white-space: normal;
`

function KitchenSink() {
  return (
    <ThemeProvider theme={theme}>
      <LayerProvider>
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
          <Toast
            description="Description"
            duration={10_000}
            onClose={() => {}}
            status="success"
            title="Toast"
          />
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
        </Card>
      </LayerProvider>
    </ThemeProvider>
  )
}

function computedStyles(root: Element): Record<string, string>[] {
  return [root, ...root.querySelectorAll('*')].map((element) => {
    const style = getComputedStyle(element)

    return Object.fromEntries(
      [...style].map((property) => [property, style.getPropertyValue(property)]),
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
 * Which of two layers wins a conflict, given where the page has already declared them. A layer
 * that the page has not declared yet would be declared here, last.
 */
function higherLayer(a: string, b: string): string {
  const probe = document.createElement('div')
  const style = document.createElement('style')
  probe.id = 'layer-probe'
  style.textContent = `
    @layer ${a} { #layer-probe { --layer: ${a}; } }
    @layer ${b} { #layer-probe { --layer: ${b}; } }
  `
  document.body.append(probe)
  document.head.append(style)
  const winner = getComputedStyle(probe).getPropertyValue('--layer')
  probe.remove()
  style.remove()

  return winner
}

/**
 * Turns the page into the one `@layer` statements cannot fix up front: `styles.css` loads after
 * `<style data-styled>`, as in apps that stream styled-components' tag into the document head,
 * and nothing declares the layer order.
 */
function loadStaticStylesLast() {
  const panda = document.querySelector<HTMLStyleElement>('style[data-vite-dev-id$="panda.css"]')!
  const nextSibling = panda.nextSibling

  // Moving the element parses its text again, statement included
  document.head.append(panda)
  const sheet = panda.sheet!
  sheet.deleteRule([...sheet.cssRules].findIndex((rule) => rule instanceof CSSLayerStatementRule))

  onTestFinished(() => {
    document.head.insertBefore(panda, nextSibling)
  })
}

async function settle(root: Element) {
  const toast = root.querySelector('[data-ui="Toast"]')!

  // The toast enters with a JS-driven `motion` animation
  await expect.poll(() => getComputedStyle(toast).transform).toBe('none')

  for (const animation of document.getAnimations()) {
    animation.pause()
    animation.currentTime = 0
  }
}

describe('styled-components cascade layer', () => {
  test('@sanity/ui rules are in u-styled after the layer order statement, extensions stay unlayered', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <WrappingButton id="wrapping-button" text="Button" />
      </ThemeProvider>,
    )

    const sheet = document.querySelector<HTMLStyleElement>('style[data-styled]')!.sheet!
    const [statement, ...rules] = [...sheet.cssRules]
    const unlayered = rules.filter((rule) => !(rule instanceof CSSLayerBlockRule))

    expect(statement instanceof CSSLayerStatementRule && statement.nameList).toEqual([
      'sui',
      'u-tokens',
      'u-utilities',
      'u-styled',
    ])
    expect(
      new Set(rules.flatMap((rule) => (rule instanceof CSSLayerBlockRule ? [rule.name] : []))),
    ).toEqual(new Set(['u-styled']))
    expect(unlayered.map((rule) => rule.cssText)).toEqual([
      expect.stringMatching(/^\.[\w-]+ \{ white-space: normal; \}$/),
    ])
    expect(getComputedStyle(document.getElementById('wrapping-button')!).whiteSpace).toBe('normal')
  })

  test('the layer order holds when styles.css loads last and the page declares no order', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <Button text="Button" />
      </ThemeProvider>,
    )

    loadStaticStylesLast()

    expect(higherLayer('sui', 'u-tokens')).toBe('u-tokens')
    expect(higherLayer('u-tokens', 'u-utilities')).toBe('u-utilities')
    expect(higherLayer('u-utilities', 'u-styled')).toBe('u-styled')
  })

  test('precedence inside @sanity/ui does not depend on where styles.css loads', async () => {
    await render(<KitchenSink />)

    const root = document.getElementById('kitchen-sink')!
    await settle(root)
    const before = computedStyles(root)

    loadStaticStylesLast()

    expect(computedStyles(root)).toEqual(before)
  })

  test('a layer ordered after u-styled overrides a @sanity/ui rule, one ordered before it does not', async () => {
    addStyleSheet('@layer app-reset;', 'first')
    await render(
      <ThemeProvider theme={theme}>
        <Button id="layered-button" text="Button" tone="primary" />
      </ThemeProvider>,
    )

    const button = document.getElementById('layered-button')!
    const uiBackground = getComputedStyle(button).backgroundColor

    addStyleSheet('@layer app-reset { #layered-button { background-color: rgb(1, 2, 3); } }')
    expect(getComputedStyle(button).backgroundColor).toBe(uiBackground)

    addStyleSheet('@layer app { #layered-button { background-color: rgb(4, 5, 6); } }')
    // The new color arrives through the button's `background-color` transition
    await expect.poll(() => getComputedStyle(button).backgroundColor).toBe('rgb(4, 5, 6)')
  })

  test('unlayered CSS overrides a @sanity/ui rule regardless of specificity', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <Button id="unlayered-button" text="Button" tone="primary" />
      </ThemeProvider>,
    )

    addStyleSheet('button { background-color: rgb(7, 8, 9); }')

    expect(getComputedStyle(document.getElementById('unlayered-button')!).backgroundColor).toBe(
      'rgb(7, 8, 9)',
    )
  })
})
