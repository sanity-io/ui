/** @vitest-environment jsdom */

import {renderToString} from 'react-dom/server'
import {ServerStyleSheet, styled} from 'styled-components'
import {describe, expect, it} from 'vitest'

import {buildTheme} from '../../../theme/build/buildTheme'
import {getScopedTheme} from '../../../theme/getScopedTheme'
import {ThemeProps} from '../types'
import {responsivePaddingStyle} from './paddingStyle'
import {ResponsivePaddingStyleProps} from './types'

const theme = getScopedTheme(buildTheme(), 'light', 'default')

const Probe = styled.div<ResponsivePaddingStyleProps & Partial<ThemeProps>>(responsivePaddingStyle)

function renderCSS(element: React.JSX.Element): string {
  const sheet = new ServerStyleSheet()

  try {
    renderToString(sheet.collectStyles(element))

    return sheet.getStyleTags()
  } finally {
    sheet.seal()
  }
}

describe('styles/padding', () => {
  it('should 1', () => {
    const css = renderCSS(<Probe $padding={[0]} theme={theme} />)

    expect(css).toMatch(/padding:\s*0\s*[;}]/)
    expect(css).not.toContain('@media')
  })

  it('should 2', () => {
    const css = renderCSS(<Probe $padding={[0, 1, 2]} theme={theme} />)

    expect(css).toMatch(/padding:\s*0\s*[;}]/)
    expect(css).toMatch(/@media screen and \(min-width:\s*360px\)[^}]*\{[^}]*padding:\s*0\.25rem/)
    expect(css).toMatch(/@media screen and \(min-width:\s*600px\)[^}]*\{[^}]*padding:\s*0\.5rem/)
  })
})
