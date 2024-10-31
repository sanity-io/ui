import {ThemeColorBase, ThemeColorInput, ThemeColorMuted, ThemeColorSolid} from '../../../../v0'
import {ThemeColorBuilderOpts} from '../factory'

export function createInputModes(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  solid: ThemeColorSolid,
  muted: ThemeColorMuted,
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
