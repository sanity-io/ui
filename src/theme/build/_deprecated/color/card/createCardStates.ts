import {
  ThemeColorBase,
  ThemeColorCard,
  ThemeColorMuted,
  ThemeColorName,
  ThemeColorSolid,
} from '../../../../system'
import {ThemeColorBuilderOpts} from '../factory'

export function createCardStates(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  name: ThemeColorName,
  solid: ThemeColorSolid,
  muted: ThemeColorMuted,
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
