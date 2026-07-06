import {buildTheme} from './buildTheme'
import {getContrastRatio} from './lib/color-fns'

const AA_MIN = 4.5

it('should have sufficient contrast', () => {
  const base = buildTheme().v2!.color.light.default
  const selectable = base.selectable.default

  const contrasts = {
    base: {
      fg: getContrastRatio(base.bg, base.fg),
    },
    selectable: {
      enabled: {
        fg: getContrastRatio(selectable.enabled.bg, selectable.enabled.fg),
        muted: {
          fg: getContrastRatio(selectable.enabled.bg, selectable.enabled.muted.fg),
        },
      },
    },
  }

  expect(contrasts.base.fg).toBeGreaterThan(AA_MIN)
  expect(contrasts.selectable.enabled.fg).toBeGreaterThan(AA_MIN)
  expect(contrasts.selectable.enabled.muted.fg).toBeGreaterThan(AA_MIN)
})
