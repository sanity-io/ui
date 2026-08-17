/** @vitest-environment node */

import {describe, expect, it} from 'vitest'

import {buildTheme} from '../../theme/build/buildTheme'
import {getScopedTheme} from '../../theme/getScopedTheme'
import {codeBaseStyle} from './code/styles'
import {headingBaseStyle} from './heading/styles'
import {labelBaseStyle} from './label/styles'
import {textBaseStyle} from './text/styles'

const theme = getScopedTheme(buildTheme(), 'light', 'default')

function flattenCss(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(flattenCss).join('')
  return ''
}

describe('typography SVG reset', () => {
  it('unsets max-width wherever SVG display is forced to inline', () => {
    const snippets = [
      flattenCss(textBaseStyle({theme, $muted: false})),
      flattenCss(labelBaseStyle({theme, $muted: false})),
      flattenCss(headingBaseStyle({$accent: false, $muted: false, theme})),
      flattenCss(codeBaseStyle()),
    ]

    for (const css of snippets) {
      expect(css).toContain('display: inline')
      expect(css).toContain('max-width: unset')
    }
  })
})
