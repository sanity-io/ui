import {ThemeColorBase} from '../base'
import {ThemeColorBuilderOpts} from '../factory'
import {ThemeColorMuted} from '../muted'
import {ThemeColorSolid} from '../solid'
import {ThemeColorMenuItem, ThemeColorMenuItemStates} from './types'

export function createMenuItemTones(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  solid: ThemeColorSolid,
  muted: ThemeColorMuted
): ThemeColorMenuItem {
  return {
    default: createMenuItemStates(opts, base, dark, solid, muted, 'default'),
    primary: createMenuItemStates(opts, base, dark, solid, muted, 'primary'),
    positive: createMenuItemStates(opts, base, dark, solid, muted, 'positive'),
    caution: createMenuItemStates(opts, base, dark, solid, muted, 'caution'),
    critical: createMenuItemStates(opts, base, dark, solid, muted, 'critical'),
  }
}

function createMenuItemStates(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  solid: ThemeColorSolid,
  muted: ThemeColorMuted,
  tone: 'default' | 'primary' | 'positive' | 'caution' | 'critical'
): ThemeColorMenuItemStates {
  return {
    enabled: opts.menuItem({
      base,
      dark,
      solid,
      muted,
      state: 'enabled',
      tone,
    }),
    hovered: opts.menuItem({
      base,
      dark,
      solid,
      muted,
      state: 'hovered',
      tone,
    }),
    pressed: opts.menuItem({
      base,
      dark,
      solid,
      muted,
      state: 'pressed',
      tone,
    }),
    selected: opts.menuItem({
      base,
      dark,
      solid,
      muted,
      state: 'selected',
      tone,
    }),
    disabled: opts.menuItem({
      base,
      dark,
      solid,
      muted,
      state: 'disabled',
      tone,
    }),
  }
}
