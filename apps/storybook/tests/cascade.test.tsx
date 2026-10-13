import {Avatar, AvatarStack, Button, Layer, Skeleton, Switch, ThemeProvider} from '@sanity/ui'
import {MenuDivider} from '@sanity/ui/menu'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {styled} from 'styled-components'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'

import {Arrow} from '../../../packages/ui/src/core/utils/arrow/arrow'

import * as breadcrumbsStories from '../stories/components/Breadcrumbs.stories'
import * as hotkeysStories from '../stories/components/Hotkeys.stories'

const {Default: BreadcrumbsDefault} = composeStories(breadcrumbsStories)
const {Default: HotkeysDefault} = composeStories(hotkeysStories)

const theme = buildTheme()

const FixedLayer = styled(Layer)`
  position: fixed;
`

const TallMenuDivider = styled(MenuDivider)`
  height: 20px;
  width: 1px;
`

const WrappingButton = styled(Button)`
  white-space: normal;
`

describe('static stylesheet cascade', () => {
  test('Breadcrumbs expand button margin beats Button runtime margin', async () => {
    await render(<BreadcrumbsDefault maxLength={4} />)

    const button = document.querySelector('[data-ui="Breadcrumbs"] button')!

    expect(getComputedStyle(button).appearance).toBe('none')
    expect(getComputedStyle(button).marginTop).toBe('-4px')
    expect(getComputedStyle(button).marginRight).toBe('-4px')
    expect(getComputedStyle(button).marginBottom).toBe('-4px')
    expect(getComputedStyle(button).marginLeft).toBe('-4px')
  })

  test('Hotkeys inner KBD display beats KBD runtime display', async () => {
    await render(<HotkeysDefault />)

    const keys = document.querySelectorAll('[data-ui="Hotkeys"] [data-ui="KBD"]')

    expect(keys.length).toBeGreaterThan(0)
    for (const key of keys) {
      expect(getComputedStyle(key).display).toBe('block')
    }
  })

  test('styled(Layer) position wins when styles.css loads first', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <FixedLayer id="styled-layer" />
      </ThemeProvider>,
    )

    expect(getComputedStyle(document.getElementById('styled-layer')!).position).toBe('fixed')
  })

  test('styled(MenuDivider) height wins when styles.css loads first', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <TallMenuDivider id="styled-divider" />
      </ThemeProvider>,
    )

    expect(getComputedStyle(document.getElementById('styled-divider')!).height).toBe('20px')
  })

  test('styled(Button) white-space wins when styles.css loads first', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <WrappingButton id="styled-button" text="Button" />
      </ThemeProvider>,
    )

    expect(getComputedStyle(document.getElementById('styled-button')!).whiteSpace).toBe('normal')
  })

  test('Button width="fill" stretches to the container', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <div style={{width: 640}}>
          <Button id="fill-button" text="Button" width="fill" />
        </div>
      </ThemeProvider>,
    )

    const button = document.getElementById('fill-button')!

    expect(button.getBoundingClientRect().width).toBe(640)
  })

  test('Button label span keeps the descendant rule', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <Button id="label-button" text="Button" />
      </ThemeProvider>,
    )

    const span = document.getElementById('label-button')!.querySelector(':scope > span')!

    expect(getComputedStyle(span).display).toBe('block')
    expect(getComputedStyle(span).flexGrow).toBe('1')
    expect(getComputedStyle(span).minWidth).toBe('0px')
  })

  test('AvatarStack children stay inline', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <AvatarStack>
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarStack>
      </ThemeProvider>,
    )

    const child = document.querySelector('[data-ui="AvatarStack"] > div')!

    expect(getComputedStyle(child).display).toBe('inline-block')
    expect(getComputedStyle(child).verticalAlign).toBe('top')
  })

  test('Arrow placement and size variable match the static rules', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <div data-placement="top">
          <span>label</span>
          <Arrow height={6} width={12} />
        </div>
      </ThemeProvider>,
    )

    const arrow = document.querySelector('[data-ui="Arrow"]')!
    const svg = arrow.querySelector('svg')!

    expect(getComputedStyle(arrow).bottom).toBe('-12px')
    expect(getComputedStyle(arrow).getPropertyValue('--sui-arrow-size').trim()).toBe('12px')
    expect(getComputedStyle(svg).display).toBe('block')
    expect(getComputedStyle(svg).transform).toBe('matrix(1, 0, 0, 1, 0, 0)')
  })

  test('Switch thumb resets the background image', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <Switch />
      </ThemeProvider>,
    )

    const thumb = document.querySelector('[data-ui="Switch__thumb"]')!
    const representation = document.querySelector('[data-ui="Switch__representation"]')!

    expect(getComputedStyle(thumb).backgroundImage).toBe('none')
    expect(getComputedStyle(representation).getPropertyValue('--switch-box-shadow').trim()).toBe(
      'none',
    )
  })

  test('Skeleton shimmer runs unless reduced motion is requested', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <Skeleton animated id="skeleton" />
      </ThemeProvider>,
    )

    const skeleton = document.getElementById('skeleton')!

    expect(getComputedStyle(skeleton, '::after').animationName).not.toBe('none')

    const css = stylesheetText()

    expect(css).toContain('@layer sui')
    expect(css).not.toContain(':not(#\\#)')
    expect(css).not.toMatch(/\.x[a-z0-9]+\.x[a-z0-9]+\b/)
  })
})

function stylesheetText(): string {
  const chunks: string[] = []

  for (const sheet of document.styleSheets) {
    let rules: CSSRuleList

    try {
      rules = sheet.cssRules
    } catch {
      continue
    }

    for (const rule of rules) chunks.push(rule.cssText)
  }

  return chunks.join('\n')
}
