import {defaultThemeConfig} from './defaults/config'
import {RootTheme, RootTheme_v2, Theme, ThemeColorCardToneKey, ThemeColorSchemeKey} from './system'
import {is_v2, v0_v2, v2_v0} from './versioning'

// cache[scheme][tone][rootTheme] = theme
const cache = new Map<
  ThemeColorSchemeKey,
  Map<ThemeColorCardToneKey, WeakMap<RootTheme | RootTheme_v2, Theme>>
>()

/** @internal */
export function getScopedTheme(
  themeProp: RootTheme | RootTheme_v2,
  scheme: ThemeColorSchemeKey,
  tone: ThemeColorCardToneKey,
): Theme {
  const cachedTheme = _getCachedTheme(themeProp, scheme, tone)

  if (cachedTheme) return cachedTheme

  const v0 = is_v2(themeProp) ? v2_v0(themeProp) : themeProp
  const v2 = is_v2(themeProp) ? themeProp : v0_v2(themeProp)

  const colorScheme_v0 = v0.color[scheme] || v0.color.light
  const color_v0 = colorScheme_v0[tone] || colorScheme_v0.default
  const layer_v0 = v0.layer || defaultThemeConfig.layer

  const colorScheme_v2 = v2.color[scheme] || v2.color.light
  const color_v2 = colorScheme_v2[tone] || colorScheme_v2.default
  const layer_v2 = v2.layer || defaultThemeConfig.layer

  const theme: Theme = {
    sanity: {
      ...v0,
      color: color_v0,
      layer: layer_v0,
      v2: {
        ...v2,
        _resolved: true,
        color: color_v2,
        layer: layer_v2,
      },
    },
  }

  _setCachedTheme(themeProp, scheme, tone, theme)

  return theme
}

function _getCachedTheme(
  rootTheme: RootTheme | RootTheme_v2,
  scheme: ThemeColorSchemeKey,
  tone: ThemeColorCardToneKey,
) {
  const schemeCache = cache.get(scheme)

  if (!schemeCache) return undefined

  const toneCache = schemeCache.get(tone)

  if (!toneCache) return undefined

  return toneCache.get(rootTheme)
}

function _setCachedTheme(
  rootTheme: RootTheme | RootTheme_v2,
  scheme: ThemeColorSchemeKey,
  tone: ThemeColorCardToneKey,
  theme: Theme,
) {
  if (!cache.has(scheme)) cache.set(scheme, new Map())

  const schemeCache = cache.get(scheme)!

  if (!schemeCache.has(tone)) schemeCache.set(tone, new WeakMap())

  const toneCache = schemeCache.get(tone)!

  toneCache.set(rootTheme, theme)
}
