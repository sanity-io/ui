import {ThemeColorBase} from '../../../../system/v0/color/base'
import {ThemeColorButton} from '../../../../system/v0/color/button'
import {ThemeColorMuted} from '../../../../system/v0/color/muted'
import {ThemeColorSolid} from '../../../../system/v0/color/solid'
import {ThemeColorBuilderOpts} from '../factory'
import {createButtonTones} from './createButtonTones'

export function createButtonModes(
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
): ThemeColorButton {
  return {
    default: createButtonTones(opts, base, dark, solid, muted, 'default'),
    ghost: createButtonTones(opts, base, dark, solid, muted, 'ghost'),
    bleed: createButtonTones(opts, base, dark, solid, muted, 'bleed'),
  }
}
