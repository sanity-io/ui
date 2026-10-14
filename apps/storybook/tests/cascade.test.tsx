import {Button, Layer, ThemeProvider} from '@sanity/ui'
import {MenuDivider} from '@sanity/ui/menu'
import {buildTheme} from '@sanity/ui/theme'
import {Toast} from '@sanity/ui/toast'
import {composeStories} from '@storybook/react-vite'
import {styled} from 'styled-components'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'

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

describe('vanilla-extract cascade', () => {
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

  test('Toast loading bar progress background beats Card runtime background', async () => {
    await render(
      <ThemeProvider theme={theme}>
        <Toast duration={10_000} onClose={() => {}} title="Toast" />
      </ThemeProvider>,
    )

    const loadingBar = document.querySelector('[data-ui="ToastLoadingBar"]')!
    const mask = loadingBar.firstElementChild!
    const progress = loadingBar.lastElementChild!

    expect(getComputedStyle(progress).backgroundColor).not.toBe(
      getComputedStyle(mask).backgroundColor,
    )
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
})
