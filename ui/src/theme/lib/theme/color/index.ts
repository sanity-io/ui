import {defaultOpts} from './defaults'
import {ThemeColorSyntax} from './syntax'
import {
  ThemeColorBuilderOpts,
  ThemeColorInput,
  ThemeColorName,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColor,
  ThemeColorSpot,
  ThemeColorCard,
  ThemeColorButton,
  ThemeColorSolid,
  ThemeColorMuted,
} from './types'

export * from './syntax'
export * from './types'

type PartialThemeColorBuilderOpts = Partial<ThemeColorBuilderOpts>

export function createColorTheme(
  partialOpts: PartialThemeColorBuilderOpts = {}
): ThemeColorSchemes {
  const builders: ThemeColorBuilderOpts = {...defaultOpts, ...partialOpts}

  return {
    light: createColorScheme(builders, false),
    dark: createColorScheme(builders, true),
  }
}

function createColorScheme(opts: ThemeColorBuilderOpts, dark: boolean): ThemeColorScheme {
  return {
    default: createColor(opts, dark, 'default'),
    transparent: createColor(opts, dark, 'transparent'),
    primary: createColor(opts, dark, 'primary'),
    positive: createColor(opts, dark, 'positive'),
    caution: createColor(opts, dark, 'caution'),
    critical: createColor(opts, dark, 'critical'),
  }
}

function createColor(opts: ThemeColorBuilderOpts, dark: boolean, name: ThemeColorName): ThemeColor {
  const base = opts.base({dark, name})

  const solid: ThemeColorSolid = {
    default: {
      enabled: opts.solid({base, dark, tone: 'default', name, state: 'enabled'}),
      disabled: opts.solid({base, dark, tone: 'default', name, state: 'disabled'}),
      hovered: opts.solid({base, dark, tone: 'default', name, state: 'hovered'}),
      pressed: opts.solid({base, dark, tone: 'default', name, state: 'pressed'}),
      selected: opts.solid({base, dark, tone: 'default', name, state: 'selected'}),
    },
    transparent: {
      enabled: opts.solid({base, dark, tone: 'transparent', name, state: 'enabled'}),
      disabled: opts.solid({base, dark, tone: 'transparent', name, state: 'disabled'}),
      hovered: opts.solid({base, dark, tone: 'transparent', name, state: 'hovered'}),
      pressed: opts.solid({base, dark, tone: 'transparent', name, state: 'pressed'}),
      selected: opts.solid({base, dark, tone: 'transparent', name, state: 'selected'}),
    },
    primary: {
      enabled: opts.solid({base, dark, tone: 'primary', name, state: 'enabled'}),
      disabled: opts.solid({base, dark, tone: 'primary', name, state: 'disabled'}),
      hovered: opts.solid({base, dark, tone: 'primary', name, state: 'hovered'}),
      pressed: opts.solid({base, dark, tone: 'primary', name, state: 'pressed'}),
      selected: opts.solid({base, dark, tone: 'primary', name, state: 'selected'}),
    },
    positive: {
      enabled: opts.solid({base, dark, tone: 'positive', name, state: 'enabled'}),
      disabled: opts.solid({base, dark, tone: 'positive', name, state: 'disabled'}),
      hovered: opts.solid({base, dark, tone: 'positive', name, state: 'hovered'}),
      pressed: opts.solid({base, dark, tone: 'positive', name, state: 'pressed'}),
      selected: opts.solid({base, dark, tone: 'positive', name, state: 'selected'}),
    },
    caution: {
      enabled: opts.solid({base, dark, tone: 'caution', name, state: 'enabled'}),
      disabled: opts.solid({base, dark, tone: 'caution', name, state: 'disabled'}),
      hovered: opts.solid({base, dark, tone: 'caution', name, state: 'hovered'}),
      pressed: opts.solid({base, dark, tone: 'caution', name, state: 'pressed'}),
      selected: opts.solid({base, dark, tone: 'caution', name, state: 'selected'}),
    },
    critical: {
      enabled: opts.solid({base, dark, tone: 'critical', name, state: 'enabled'}),
      disabled: opts.solid({base, dark, tone: 'critical', name, state: 'disabled'}),
      hovered: opts.solid({base, dark, tone: 'critical', name, state: 'hovered'}),
      pressed: opts.solid({base, dark, tone: 'critical', name, state: 'pressed'}),
      selected: opts.solid({base, dark, tone: 'critical', name, state: 'selected'}),
    },
  }

  const muted: ThemeColorMuted = {
    default: {
      enabled: opts.muted({base, dark, tone: 'default', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'default', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'default', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'default', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'default', name, state: 'selected'}),
    },
    transparent: {
      enabled: opts.muted({base, dark, tone: 'transparent', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'transparent', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'transparent', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'transparent', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'transparent', name, state: 'selected'}),
    },
    primary: {
      enabled: opts.muted({base, dark, tone: 'primary', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'primary', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'primary', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'primary', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'primary', name, state: 'selected'}),
    },
    positive: {
      enabled: opts.muted({base, dark, tone: 'positive', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'positive', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'positive', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'positive', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'positive', name, state: 'selected'}),
    },
    caution: {
      enabled: opts.muted({base, dark, tone: 'caution', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'caution', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'caution', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'caution', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'caution', name, state: 'selected'}),
    },
    critical: {
      enabled: opts.muted({base, dark, tone: 'critical', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'critical', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'critical', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'critical', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'critical', name, state: 'selected'}),
    },
  }

  const card: ThemeColorCard = {
    enabled: opts.card({
      base,
      dark,
      name,
      state: 'enabled',
      solid: solid.default,
      muted: muted.default,
    }),
    disabled: opts.card({
      base,
      dark,
      name,
      state: 'disabled',
      solid: solid.default,
      muted: muted.default,
    }),
    hovered: opts.card({
      base,
      dark,
      name,
      state: 'hovered',
      solid: solid.default,
      muted: muted.default,
    }),
    pressed: opts.card({
      base,
      dark,
      name,
      state: 'pressed',
      solid: solid.default,
      muted: muted.default,
    }),
    selected: opts.card({
      base,
      dark,
      name,
      state: 'selected',
      solid: solid.default,
      muted: muted.default,
    }),
  }

  const button: ThemeColorButton = {
    default: {
      default: opts.button({
        base,
        dark,
        mode: 'default',
        solid: solid.default,
        muted: muted.default,
      }),
      primary: opts.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'default',
      }),
      positive: opts.button({
        base,
        dark,
        solid: solid.positive,
        muted: muted.positive,
        mode: 'default',
      }),
      caution: opts.button({
        base,
        dark,
        solid: solid.caution,
        muted: muted.caution,
        mode: 'default',
      }),
      critical: opts.button({
        base,
        dark,
        solid: solid.critical,
        muted: muted.critical,
        mode: 'default',
      }),
    },
    ghost: {
      default: opts.button({
        base,
        dark,
        solid: solid.default,
        muted: muted.default,
        mode: 'ghost',
      }),
      primary: opts.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'ghost',
      }),
      positive: opts.button({
        base,
        dark,
        solid: solid.positive,
        muted: muted.positive,
        mode: 'ghost',
      }),
      caution: opts.button({
        base,
        dark,
        solid: solid.caution,
        muted: muted.caution,
        mode: 'ghost',
      }),
      critical: opts.button({
        base,
        dark,
        solid: solid.critical,
        muted: muted.critical,
        mode: 'ghost',
      }),
    },
    bleed: {
      default: opts.button({
        base,
        dark,
        solid: solid.default,
        muted: muted.default,
        mode: 'bleed',
      }),
      primary: opts.button({
        base,
        dark,
        solid: solid.primary,
        muted: muted.primary,
        mode: 'bleed',
      }),
      positive: opts.button({
        base,
        dark,
        solid: solid.positive,
        muted: muted.positive,
        mode: 'bleed',
      }),
      caution: opts.button({
        base,
        dark,
        solid: solid.caution,
        muted: muted.caution,
        mode: 'bleed',
      }),
      critical: opts.button({
        base,
        dark,
        solid: solid.critical,
        muted: muted.critical,
        mode: 'bleed',
      }),
    },
  }

  const spot: ThemeColorSpot = {
    gray: opts.spot({base, dark, key: 'gray'}),
    blue: opts.spot({base, dark, key: 'blue'}),
    purple: opts.spot({base, dark, key: 'purple'}),
    magenta: opts.spot({base, dark, key: 'magenta'}),
    red: opts.spot({base, dark, key: 'red'}),
    orange: opts.spot({base, dark, key: 'orange'}),
    yellow: opts.spot({base, dark, key: 'yellow'}),
    green: opts.spot({base, dark, key: 'green'}),
    cyan: opts.spot({base, dark, key: 'cyan'}),
  }

  const input: ThemeColorInput = {
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
    },
  }

  const syntax: ThemeColorSyntax = opts.syntax({base, dark})

  return {base, button, card, dark, input, spot, syntax, solid, muted}
}
