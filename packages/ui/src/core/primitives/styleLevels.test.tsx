/** @vitest-environment jsdom */

import {renderToString} from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'
import {describe, expect, it} from 'vitest'

import {buildTheme} from '../../theme/build/buildTheme'
import {ThemeProvider} from '../theme/themeProvider'
import {Button} from './button/button'
import {Card} from './card/card'
import {Text} from './text/text'
import {TextInput} from './textInput/textInput'

const theme = buildTheme()

function renderCSS(element: React.JSX.Element): string {
  const sheet = new ServerStyleSheet()

  try {
    renderToString(sheet.collectStyles(<ThemeProvider theme={theme}>{element}</ThemeProvider>))

    return sheet.getStyleTags()
  } finally {
    sheet.seal()
  }
}

describe('styles shared by instances with different props', () => {
  it('emits the card color variables once per color context', () => {
    const css = renderCSS(
      <>
        <Card radius={1} />
        <Card radius={2} shadow={1} />
        <Card border muted padding={3} />
        <Card __unstable_focusRing as="button" />
        <Card radius={3} tone="primary" />
      </>,
    )

    expect(css.match(/color-scheme:/g)).toHaveLength(2)
  })

  it('emits the text descendant styles once', () => {
    const css = renderCSS(
      <>
        <Text size={0}>A</Text>
        <Text size={[1, 2]} weight="bold">
          B
        </Text>
        <Text align="center" muted>
          C
        </Text>
      </>,
    )

    expect(css.match(/ a\{text-decoration:none/g)).toHaveLength(1)
  })

  it('emits the button colors once per mode and tone', () => {
    const colors = (css: string) => css.match(/--card-bg-color:/g)?.length
    const single = renderCSS(<Button text="A" />)
    const variants = renderCSS(
      <>
        <Button text="A" />
        <Button fontSize={1} padding={2} text="B" />
        <Button padding={4} radius={2} text="C" />
        <Button fontSize={3} radius="full" text="D" />
      </>,
    )

    expect(colors(variants)).toBe(colors(single))
  })

  it('emits the text input colors once per scheme and tone', () => {
    const colors = (css: string) => css.match(/\[data-scheme=/g)?.length
    const single = renderCSS(<TextInput />)
    const variants = renderCSS(
      <>
        <TextInput />
        <TextInput fontSize={1} padding={2} />
        <TextInput padding={4} radius={2} />
        <TextInput fontSize={3} radius={0} />
      </>,
    )

    expect(colors(variants)).toBe(colors(single))
  })
})
