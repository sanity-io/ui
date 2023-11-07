import {
  ThemeColorBase,
  ThemeColorButton,
  ThemeColorMuted,
  ThemeColorSolid,
} from '../../../../system'
import {ThemeColorBuilderOpts} from '../factory'
import {createButtonTones} from './createButtonTones'

export function createButtonModes(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  solid: ThemeColorSolid,
  muted: ThemeColorMuted,
): ThemeColorButton {
  return {
    default: createButtonTones(opts, base, dark, solid, muted, 'default'),
    ghost: createButtonTones(opts, base, dark, solid, muted, 'ghost'),
    bleed: createButtonTones(opts, base, dark, solid, muted, 'bleed'),
  }
}
