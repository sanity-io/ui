import {
  ThemeColorBase,
  ThemeColorCard,
  ThemeColorMuted,
  ThemeColorName,
  ThemeColorSolid,
} from '../../../../system'
import {ThemeColorBuilderOpts} from '../factory'

export function createCardStates(
  // oxlint-disable-next-line no-deprecated
  opts: ThemeColorBuilderOpts,
  // oxlint-disable-next-line no-deprecated
  base: ThemeColorBase,
  dark: boolean,
  // oxlint-disable-next-line no-deprecated
  name: ThemeColorName,
  // oxlint-disable-next-line no-deprecated
  solid: ThemeColorSolid,
  // oxlint-disable-next-line no-deprecated
  muted: ThemeColorMuted,
  // oxlint-disable-next-line no-deprecated
): ThemeColorCard {
  return {
    enabled: opts.card({
      base,
      dark,
      name,
      state: 'enabled',
      solid,
      muted,
    }),
    disabled: opts.card({
      base,
      dark,
      name,
      state: 'disabled',
      solid,
      muted,
    }),
    hovered: opts.card({
      base,
      dark,
      name,
      state: 'hovered',
      solid,
      muted,
    }),
    pressed: opts.card({
      base,
      dark,
      name,
      state: 'pressed',
      solid,
      muted,
    }),
    selected: opts.card({
      base,
      dark,
      name,
      state: 'selected',
      solid,
      muted,
    }),
  }
}
