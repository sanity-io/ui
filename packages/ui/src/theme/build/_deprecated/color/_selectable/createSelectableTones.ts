import {ThemeColorBase} from '../../../../system/v0/color/base'
import {ThemeColorMuted} from '../../../../system/v0/color/muted'
import {
  ThemeColorSelectable,
  ThemeColorSelectableStates,
} from '../../../../system/v0/color/selectable'
import {ThemeColorSolid} from '../../../../system/v0/color/solid'
import {ThemeColorBuilderOpts} from '../factory'

export function createSelectableTones(
  // oxlint-disable-next-line no-deprecated
  opts: ThemeColorBuilderOpts,
  // oxlint-disable-next-line no-deprecated
  base: ThemeColorBase,
  dark: boolean,
  // oxlint-disable-next-line no-deprecated
  solid: ThemeColorSolid,
  // oxlint-disable-next-line no-deprecated
  muted: ThemeColorMuted,
  // oxlint-disable-next-line no-deprecated
): ThemeColorSelectable {
  return {
    default: _createSelectableStates(opts, base, dark, solid, muted, 'default'),
    primary: _createSelectableStates(opts, base, dark, solid, muted, 'primary'),
    positive: _createSelectableStates(opts, base, dark, solid, muted, 'positive'),
    caution: _createSelectableStates(opts, base, dark, solid, muted, 'caution'),
    critical: _createSelectableStates(opts, base, dark, solid, muted, 'critical'),
  }
}

function _createSelectableStates(
  // oxlint-disable-next-line no-deprecated
  opts: ThemeColorBuilderOpts,
  // oxlint-disable-next-line no-deprecated
  base: ThemeColorBase,
  dark: boolean,
  // oxlint-disable-next-line no-deprecated
  solid: ThemeColorSolid,
  // oxlint-disable-next-line no-deprecated
  muted: ThemeColorMuted,
  tone: 'default' | 'primary' | 'positive' | 'caution' | 'critical',
  // oxlint-disable-next-line no-deprecated
): ThemeColorSelectableStates {
  return {
    enabled: opts.selectable({
      base,
      dark,
      solid,
      muted,
      state: 'enabled',
      tone,
    }),
    hovered: opts.selectable({
      base,
      dark,
      solid,
      muted,
      state: 'hovered',
      tone,
    }),
    pressed: opts.selectable({
      base,
      dark,
      solid,
      muted,
      state: 'pressed',
      tone,
    }),
    selected: opts.selectable({
      base,
      dark,
      solid,
      muted,
      state: 'selected',
      tone,
    }),
    disabled: opts.selectable({
      base,
      dark,
      solid,
      muted,
      state: 'disabled',
      tone,
    }),
  }
}
