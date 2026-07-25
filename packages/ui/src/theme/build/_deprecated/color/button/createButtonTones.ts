import {ThemeColorButtonModeKey} from '../../../../system/color/_system'
import {ThemeColorBase} from '../../../../system/v0/color/base'
import {ThemeColorButtonTones} from '../../../../system/v0/color/button'
import {ThemeColorMuted} from '../../../../system/v0/color/muted'
import {ThemeColorSolid} from '../../../../system/v0/color/solid'
import {ThemeColorBuilderOpts} from '../factory'

export function createButtonTones(
  // oxlint-disable-next-line no-deprecated
  opts: ThemeColorBuilderOpts,
  // oxlint-disable-next-line no-deprecated
  base: ThemeColorBase,
  dark: boolean,
  // oxlint-disable-next-line no-deprecated
  solid: ThemeColorSolid,
  // oxlint-disable-next-line no-deprecated
  muted: ThemeColorMuted,
  mode: ThemeColorButtonModeKey,
  // oxlint-disable-next-line no-deprecated
): ThemeColorButtonTones {
  return {
    default: opts.button({
      base,
      dark,
      solid: solid.default,
      muted: muted.default,
      mode,
    }),
    primary: opts.button({
      base,
      dark,
      solid: solid.primary,
      muted: muted.primary,
      mode,
    }),
    positive: opts.button({
      base,
      dark,
      solid: solid.positive,
      muted: muted.positive,
      mode,
    }),
    caution: opts.button({
      base,
      dark,
      solid: solid.caution,
      muted: muted.caution,
      mode,
    }),
    critical: opts.button({
      base,
      dark,
      solid: solid.critical,
      muted: muted.critical,
      mode,
    }),
  }
}
