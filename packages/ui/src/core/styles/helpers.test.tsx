/** @vitest-environment jsdom */

import {renderToString} from 'react-dom/server'
import {ServerStyleSheet, styled} from 'styled-components'
import {describe, expect, it} from 'vitest'

import {_responsive} from './helpers'

const media = [360, 600]

function renderCSS(element: React.JSX.Element): string {
  const sheet = new ServerStyleSheet()

  try {
    renderToString(sheet.collectStyles(element))

    return sheet.getStyleTags()
  } finally {
    sheet.seal()
  }
}

describe('_responsive', () => {
  it('returns a spreadable rule array', () => {
    const rules = _responsive(media, [1, 2], (flex) => ({flex}))

    // The exact element shapes differ between styled-components majors (v6
    // pre-serializes object rules to strings, v7 keeps the objects), but the
    // result must stay a real array that consumers can spread and compose.
    expect(Array.isArray(rules)).toBe(true)
    expect(() => [...rules]).not.toThrow()

    expect([..._responsive(media, [], () => ({}))]).toEqual([])
  })

  it('emits the base statement plus one media block per following breakpoint', () => {
    const Probe = styled.div<{$flex: number[]}>((props) =>
      _responsive(media, props.$flex, (flex) => ({flex: `${flex}`})),
    )

    const css = renderCSS(<Probe $flex={[1, 2, 3]} />)

    expect(css).toMatch(/flex:\s*1\s*[;}]/)
    expect(css).toMatch(/@media screen and \(min-width:\s*360px\)[^}]*\{[^}]*flex:\s*2/)
    expect(css).toMatch(/@media screen and \(min-width:\s*600px\)[^}]*\{[^}]*flex:\s*3/)
  })
})
