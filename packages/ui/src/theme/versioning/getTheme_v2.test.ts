// oxlint-disable no-deprecated -- this suite verifies conversion from the deprecated v0 theme shape

import {describe, expect, it} from 'vitest'

import {buildTheme} from '../build/buildTheme'
import {defaultThemeConfig} from '../defaults/config'
import {Theme} from '../system/theme'
import {getTheme_v2} from './getTheme_v2'

function createLegacyTheme(): Theme {
  const rootTheme = buildTheme()
  const {color, v2: _v2, ...rootValues} = rootTheme

  return {
    sanity: {
      ...rootValues,
      color: color.light.default,
      layer: undefined,
    },
  }
}

describe('getTheme_v2', () => {
  it('converts a legacy scoped theme and fills current defaults', () => {
    const theme = createLegacyTheme()
    const converted = getTheme_v2(theme)

    expect(converted).toMatchObject({
      _resolved: true,
      _version: 2,
      card: defaultThemeConfig.card,
      container: theme.sanity.container,
      font: theme.sanity.fonts,
      layer: defaultThemeConfig.layer,
      media: theme.sanity.media,
      radius: theme.sanity.radius,
      shadow: theme.sanity.shadows,
      space: theme.sanity.space,
      style: theme.sanity.styles,
    })
    expect(converted.input.checkbox).toEqual({
      ...defaultThemeConfig.input.checkbox,
      ...theme.sanity.input.checkbox,
    })
    expect(converted.input.radio).toEqual({
      ...defaultThemeConfig.input.radio,
      ...theme.sanity.input.radio,
    })
    expect(converted.input.switch).toEqual({
      ...defaultThemeConfig.input.switch,
      ...theme.sanity.input.switch,
    })
  })

  it('caches converted legacy themes by identity', () => {
    const theme = createLegacyTheme()

    expect(getTheme_v2(theme)).toBe(getTheme_v2(theme))
  })

  it('returns an already resolved theme unchanged', () => {
    const legacyTheme = createLegacyTheme()
    const resolved = getTheme_v2(legacyTheme)
    const theme: Theme = {
      sanity: {
        ...legacyTheme.sanity,
        v2: resolved,
      },
    }

    expect(getTheme_v2(theme)).toBe(resolved)
  })
})
