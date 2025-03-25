import { ThemeColorBase } from '../../../../system/v0/color/base'
import { ThemeColorButtonModeKey } from '../../../../system/color/_system'
import { ThemeColorButtonTones } from '../../../../system/v0/color/button'
import { ThemeColorMuted } from '../../../../system/v0/color/muted'
import { ThemeColorSolid } from '../../../../system/v0/color/solid'
import {ThemeColorBuilderOpts} from '../factory'

export function createButtonTones(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  solid: ThemeColorSolid,
  muted: ThemeColorMuted,
  mode: ThemeColorButtonModeKey,
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
