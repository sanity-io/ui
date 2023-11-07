import {getContrastRatio} from '../../build'
import {studioTheme} from './studioTheme'

const AA_MIN = 4.5

it('should …', () => {
  expect(
    getContrastRatio(
      studioTheme.color.light.default.base.bg,
      studioTheme.color.light.default.base.fg,
    ),
  ).toBeGreaterThan(AA_MIN)

  expect(
    getContrastRatio(
      studioTheme.color.light.default.card.enabled.bg,
      studioTheme.color.light.default.card.enabled.fg,
    ),
  ).toBeGreaterThan(AA_MIN)

  expect(
    getContrastRatio(
      studioTheme.color.light.default.card.enabled.bg,
      studioTheme.color.light.default.card.enabled.muted.fg,
    ),
  ).toBeGreaterThan(AA_MIN)
})
