import {
  ThemeColorBase,
  ThemeColorButtonModeKey,
  ThemeColorButtonTones,
  ThemeColorMuted,
  ThemeColorSolid,
} from '../../../../system'
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
