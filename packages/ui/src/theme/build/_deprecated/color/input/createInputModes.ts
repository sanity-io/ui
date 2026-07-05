import {ThemeColorBase, ThemeColorInput, ThemeColorMuted, ThemeColorSolid} from '../../../../system'
import {ThemeColorBuilderOpts} from '../factory'

export function createInputModes(
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
): ThemeColorInput {
  return {
    default: {
      enabled: opts.input({
        base,
        dark,
        mode: 'default',
        state: 'enabled',
        solid: solid.default,
        muted: muted.default,
      }),
      disabled: opts.input({
        base,
        dark,
        mode: 'default',
        state: 'disabled',
        solid: solid.default,
        muted: muted.default,
      }),
      hovered: opts.input({
        base,
        dark,
        mode: 'default',
        state: 'hovered',
        solid: solid.default,
        muted: muted.default,
      }),
      readOnly: opts.input({
        base,
        dark,
        mode: 'default',
        state: 'readOnly',
        solid: solid.default,
        muted: muted.default,
      }),
    },
    invalid: {
      enabled: opts.input({
        base,
        dark,
        mode: 'invalid',
        state: 'enabled',
        solid: solid.default,
        muted: muted.default,
      }),
      disabled: opts.input({
        base,
        dark,
        mode: 'invalid',
        state: 'disabled',
        solid: solid.default,
        muted: muted.default,
      }),
      hovered: opts.input({
        base,
        dark,
        mode: 'invalid',
        state: 'hovered',
        solid: solid.default,
        muted: muted.default,
      }),
      readOnly: opts.input({
        base,
        dark,
        mode: 'invalid',
        state: 'readOnly',
        solid: solid.default,
        muted: muted.default,
      }),
    },
  }
}
