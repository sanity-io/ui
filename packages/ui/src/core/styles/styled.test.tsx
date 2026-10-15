/** @vitest-environment jsdom */

import {renderToString} from 'react-dom/server'
import {ServerStyleSheet, styled as styledComponents} from 'styled-components'
import {describe, expect, it} from 'vitest'

import {buildTheme} from '../../theme/build/buildTheme'
import {Button} from '../primitives/button/button'
import {Card} from '../primitives/card/card'
import {ThemeProvider} from '../theme/themeProvider'
import {styled} from './styled'

const theme = buildTheme()

function renderRules(element: React.JSX.Element): string[] {
  const sheet = new ServerStyleSheet()

  try {
    renderToString(sheet.collectStyles(element))

    return sheet
      .getStyleTags()
      .replace(/^<style[^>]*>|<\/style>\s*$/g, '')
      .split('/*!sc*/\n')
      .filter((rule) => rule && !rule.startsWith('data-styled.'))
  } finally {
    sheet.seal()
  }
}

describe('styled', () => {
  it('emits every rule in the u-styled layer, after the layer order statement', () => {
    const [statement, ...rules] = renderRules(
      <ThemeProvider theme={theme}>
        <Card padding={2} tone="primary">
          <Button mode="ghost" text="Button" />
        </Card>
      </ThemeProvider>,
    )

    expect(statement).toBe('@layer sui,u-tokens,u-utilities,u-styled;')
    expect(rules.length).toBeGreaterThan(0)
    for (const rule of rules) {
      expect(rule).toMatch(/^@layer u-styled\{.+\}$/)
    }
  })

  it('declares the layer order once, in the root theme provider', () => {
    const rules = renderRules(
      <ThemeProvider theme={theme}>
        <ThemeProvider scheme="dark" tone="critical">
          <Button text="Button" />
        </ThemeProvider>
      </ThemeProvider>,
    )

    expect(rules.filter((rule) => rule.startsWith('@layer sui,'))).toHaveLength(1)
  })

  it('keeps the template function API of styled-components', () => {
    const Base = styled.span.attrs({role: 'note'})<{$tone: string}>`
      color: ${(props) => props.$tone};

      &:hover {
        color: blue;
      }
    `
    const Configured = styled(Base).withConfig({displayName: 'Configured'})({margin: 0})

    const rules = renderRules(<Configured $tone="red" />)

    expect(rules).toEqual([
      expect.stringMatching(
        /^@layer u-styled\{\.[\w-]+\{color:red;\}\.[\w-]+:hover\{color:blue;\}\}$/,
      ),
      expect.stringMatching(/^@layer u-styled\{\.[\w-]+\{margin:0;\}\}$/),
    ])
    expect(renderToString(<Configured $tone="red" />)).toContain('role="note"')
  })

  it('leaves components that consumers extend with styled-components unlayered', () => {
    const Extended = styledComponents(Button)`
      white-space: normal;
    `

    const rules = renderRules(
      <ThemeProvider theme={theme}>
        <Extended text="Button" />
      </ThemeProvider>,
    )

    expect(rules.filter((rule) => !rule.startsWith('@layer'))).toEqual([
      expect.stringMatching(/^\.[\w-]+\{white-space:normal;\}$/),
    ])
  })
})
