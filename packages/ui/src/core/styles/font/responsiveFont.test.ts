/** @vitest-environment node */

import {describe, expect, it} from 'vitest'

import {buildTheme} from '../../../theme/build/buildTheme'
import {getScopedTheme} from '../../../theme/getScopedTheme'
import {CSSObject} from '../../../theme/system/css'
import {ThemeFontKey, ThemeFontSize} from '../../../theme/system/font'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem} from '../helpers'
import {responsiveFont} from './responsiveFont'

const theme = getScopedTheme(buildTheme(), 'light', 'default')
const fonts = getTheme_v2(theme).font

const FONT_KEYS: ThemeFontKey[] = ['code', 'heading', 'label', 'text']

function sizeStyle(fontKey: ThemeFontKey, sizeIndex: number): CSSObject {
  return responsiveFont(fontKey, {$size: [sizeIndex], theme})[1]
}

function iconRules(style: CSSObject): CSSObject[] {
  return Object.entries(style)
    .filter(([key]) => key.includes('[data-sanity-icon]') || key.includes('svg:not'))
    .map(([, value]) => value as CSSObject)
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
      for (const rule of iconRules(style)) {
        expect(rule).not.toHaveProperty('fontSize')
        expect(JSON.stringify(rule)).not.toMatch(/font-size/i)
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
    const customTheme = {
      sanity: {
        ...theme.sanity,
        v2: {
          ...theme.sanity.v2,
          font: {
            ...fonts,
            text: {
              ...fonts.text,
              sizes: fonts.text.sizes.map((size, index) =>
                index === 2 ? {...size, iconSize: 99} : size,
              ),
            },
          },
        },
      },
    }

    const style = responsiveFont('text', {$size: [2], theme: customTheme})[1]

    expect(style['& [data-sanity-icon][width="1em"]']).toEqual({width: rem(99)})
    expect(style['& [data-sanity-icon][height="1em"]']).toEqual({height: rem(99)})
    expect(style['& [data-sanity-icon]']).not.toHaveProperty('width')
    expect(style['& [data-sanity-icon]']).not.toHaveProperty('height')
  })

  it('keeps the rem icon box on responsive breakpoints', () => {
    const styles = responsiveFont('text', {$size: [1, 2], theme})
    const expected = iconBox(fonts.text.sizes[2])
    const mediaStyle = Object.values(styles[2])[0] as CSSObject

    expect(mediaStyle['& [data-sanity-icon][height="1em"]']).toEqual({height: expected.iconSize})
    expect(iconRules(mediaStyle).every((rule) => !('fontSize' in rule))).toBe(true)
  })
})
