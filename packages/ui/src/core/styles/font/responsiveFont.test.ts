/** @vitest-environment node */

import {describe, expect, it} from 'vitest'

import {buildTheme} from '../../../theme/build/buildTheme'
import {getScopedTheme} from '../../../theme/getScopedTheme'
import {CSSObject} from '../../../theme/system/css'
import {ThemeFontKey, ThemeFontSize} from '../../../theme/system/font'
import {Theme} from '../../../theme/system/theme'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem} from '../helpers'
import {responsiveFont} from './responsiveFont'

const theme = getScopedTheme(buildTheme(), 'light', 'default')
const fonts = getTheme_v2(theme).font

const FONT_KEYS: ThemeFontKey[] = ['code', 'heading', 'label', 'text']

const ICON_SELECTORS = [
  '& svg:not([data-sanity-icon])',
  '& svg:not([data-sanity-icon])[width="1em"]',
  '& svg:not([data-sanity-icon])[height="1em"]',
  '& [data-sanity-icon]',
  '& [data-sanity-icon][width="1em"]',
  '& [data-sanity-icon][height="1em"]',
] as const

function sizeStyle(fontKey: ThemeFontKey, sizeIndex: number): CSSObject {
  return responsiveFont(fontKey, {$size: [sizeIndex], theme})[1]
}

function themeWithTextIconSize(iconSize: number): Theme {
  const v2 = getTheme_v2(theme)
  const sizes = v2.font.text.sizes.slice()
  sizes[2] = Object.assign({}, sizes[2], {iconSize})

  return {
    sanity: {
      ...theme.sanity,
      v2: {
        ...v2,
        font: {
          ...v2.font,
          text: {
            ...v2.font.text,
            sizes,
          },
        },
      },
    },
  }
}

function iconBox(size: ThemeFontSize) {
  const {ascenderHeight, descenderHeight, fontSize, iconSize, lineHeight} = size
  const capHeight = lineHeight - (ascenderHeight + descenderHeight)
  const customIconSize = Math.floor((fontSize * 1.125) / 2) * 2 + 1

  return {
    customIconOffset: rem((capHeight - customIconSize) / 2),
    customIconSize: rem(customIconSize),
    fontSize: rem(fontSize),
    iconOffset: rem((capHeight - iconSize) / 2),
    iconSize: rem(iconSize),
  }
}

describe('responsiveFont icon sizing', () => {
  it('does not set font-size on descendant SVG icon selectors', () => {
    const styles = FONT_KEYS.flatMap((fontKey) =>
      fonts[fontKey].sizes.map((_, sizeIndex) => sizeStyle(fontKey, sizeIndex)),
    )

    for (const style of styles) {
      for (const selector of ICON_SELECTORS) {
        expect(style[selector]).not.toHaveProperty('fontSize')
        expect(JSON.stringify(style[selector])).not.toMatch(/font-size/i)
      }
    }
  })

  it('sizes default 1em axes with rem and leaves the unguarded selectors as margin only', () => {
    const style = sizeStyle('text', 2)
    const expected = iconBox(fonts.text.sizes[2])

    expect(style.fontSize).toBe(expected.fontSize)
    expect(style['& svg:not([data-sanity-icon])']).toEqual({margin: expected.customIconOffset})
    expect(style['& svg:not([data-sanity-icon])[width="1em"]']).toEqual({
      width: expected.customIconSize,
    })
    expect(style['& svg:not([data-sanity-icon])[height="1em"]']).toEqual({
      height: expected.customIconSize,
    })
    expect(style['& [data-sanity-icon]']).toEqual({margin: expected.iconOffset})
    expect(style['& [data-sanity-icon][width="1em"]']).toEqual({width: expected.iconSize})
    expect(style['& [data-sanity-icon][height="1em"]']).toEqual({height: expected.iconSize})
  })

  it('reads iconSize from the theme instead of baking in default tokens', () => {
    const style = responsiveFont('text', {$size: [2], theme: themeWithTextIconSize(99)})[1]

    expect(style['& [data-sanity-icon][width="1em"]']).toEqual({width: rem(99)})
    expect(style['& [data-sanity-icon][height="1em"]']).toEqual({height: rem(99)})
    expect(style['& [data-sanity-icon]']).not.toHaveProperty('width')
    expect(style['& [data-sanity-icon]']).not.toHaveProperty('height')
  })

  it('keeps the rem icon box on responsive breakpoints', () => {
    const styles = responsiveFont('text', {$size: [1, 2], theme})
    const expected = iconBox(fonts.text.sizes[2])
    const mediaKey = Object.keys(styles[2])[0]

    expect(styles[2][mediaKey]).toMatchObject({
      '& [data-sanity-icon][height="1em"]': {height: expected.iconSize},
    })
    expect(JSON.stringify(styles[2][mediaKey])).not.toMatch(/font-size/i)
  })
})
