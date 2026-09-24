// oxlint-disable no-deprecated -- the Studio resolves the deprecated v0 `color` and `fonts` off a configured theme, and so does this test
import {buildTheme, getScopedTheme, RootTheme} from '@sanity/ui/theme'
import {describe, expect, it} from 'vitest'

import {createTheme} from '../generator/createTheme'
import {presets} from '../generator/presets'
import {HUE_KEYS} from './hues'

/**
 * How Sanity Studio's `StudioThemeProvider` resolves the `theme` of a
 * `defineConfig`: it spreads its default theme and reads only `color`, `fonts`
 * and `v2` off the configured one.
 * https://github.com/sanity-io/sanity/blob/bae53feb46ab7f5630259a264968b50bdbc728bb/packages/sanity/src/core/studio/StudioThemeProvider.tsx#L13-L17
 */
function resolveStudioTheme(candidate: RootTheme): RootTheme {
  const defaultTheme = buildTheme()

  return {
    ...defaultTheme,
    v2: candidate.v2,
    fonts: candidate.fonts ?? defaultTheme.fonts,
    color: candidate.color ?? defaultTheme.color,
  }
}

describe('the previewed theme', () => {
  it('scopes to the same theme as defineConfig({theme: createTheme(hues)}) does', () => {
    for (const preset of presets) {
      // `ThemerLayout` feeds `createTheme(hues)` straight into `ThemeProvider`,
      // bypassing `StudioThemeProvider`
      const previewed = createTheme(preset.hues)
      const configured = resolveStudioTheme(createTheme(preset.hues))

      for (const scheme of ['light', 'dark'] as const) {
        for (const tone of HUE_KEYS) {
          expect(
            getScopedTheme(previewed, scheme, tone),
            `${preset.slug} ${scheme} ${tone}`,
          ).toEqual(getScopedTheme(configured, scheme, tone))
        }
      }
    }
  })
})
