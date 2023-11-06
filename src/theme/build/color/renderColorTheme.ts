import {ColorThemePalette, ThemeConfig} from '../../config'
import {ColorBlendModeValue} from '../../system'
import {
  ThemeColor,
  ThemeColorBase,
  ThemeColorButton,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
  ThemeColorGenericState,
  ThemeColorInput,
  ThemeColorInputState,
  ThemeColorInputStates,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColorSpot,
  ThemeColorSyntax,
  ThemeColorToneKey,
} from '../../types'
import {defaultColorPalette} from './defaults/colorPalette'
import {RenderColorValueOptions, renderColorValue} from './renderColorValue'

export function renderThemeColorSchemes(
  value: ThemeColorSchemes,
  config?: ThemeConfig,
): ThemeColorSchemes {
  const colorPalette = config?.palette ?? defaultColorPalette

  return {
    light: renderThemeColorScheme(colorPalette, value.light, 'light'),
    dark: renderThemeColorScheme(colorPalette, value.dark, 'dark'),
  }
}

function renderThemeColorScheme(
  colorPalette: ColorThemePalette,
  value: ThemeColorScheme,
  scheme: 'light' | 'dark',
): ThemeColorScheme {
  const toneEntries = Object.entries(value) as [ThemeColorToneKey, ThemeColor][]

  const [, transparentTone] = toneEntries.find(([k]) => k === 'transparent')!
  const [, defaultTone] = toneEntries.find(([k]) => k === 'default')!

  // The `transparent` and `default` tones are special cases, so we render them first
  // (rendered without a `bg` option).
  // But the rest of the tones are rendered on top of the `default` tone's `bg`.
  const renderedTransparentTone = renderThemeColor(transparentTone, {colorPalette, scheme})
  const renderedDefaultTone = renderThemeColor(defaultTone, {colorPalette, scheme})

  // Get the `default` tone's `bg` property
  const bg = renderedDefaultTone.base.bg

  return Object.fromEntries([
    ['transparent', renderedTransparentTone],
    ['default', renderedDefaultTone],
    ...toneEntries
      .filter(([k]) => k !== 'default' && k !== 'transparent')
      .map(([k, v]) => [k, renderThemeColor(v, {bg, colorPalette, scheme})]),
  ]) as ThemeColorScheme
}

function renderThemeColor(
  value: ThemeColor,
  options: {
    bg?: string
    colorPalette: ColorThemePalette
    scheme: 'light' | 'dark'
  },
): ThemeColor {
  const {colorPalette, bg, scheme} = options

  const blendMode = value._blend || 'multiply'

  const baseBg = renderColorValue(value.base.bg, {
    colorPalette,
    baseBg: bg,
    blendMode: blendMode,
    scheme,
  })

  const colorOptions: RenderColorValueOptions = {
    colorPalette,
    baseBg,
    blendMode,
    scheme,
  }

  const base: ThemeColorBase = {
    bg: baseBg,
    fg: renderColorValue(value.base.fg, colorOptions),
    border: renderColorValue(value.base.border, colorOptions),
    focusRing: renderColorValue(value.base.focusRing, colorOptions),
    shadow: {
      outline: renderColorValue(value.base.shadow.outline, colorOptions),
      umbra: renderColorValue(value.base.shadow.umbra, {
        ...colorOptions,
        colorPalette: {...colorPalette, black: '#000000'},
      }),
      penumbra: renderColorValue(value.base.shadow.penumbra, {
        ...colorOptions,
        colorPalette: {...colorPalette, black: '#000000'},
      }),
      ambient: renderColorValue(value.base.shadow.ambient, {
        ...colorOptions,
        colorPalette: {...colorPalette, black: '#000000'},
      }),
    },
    skeleton: value.base.skeleton && {
      from: renderColorValue(value.base.skeleton?.from, colorOptions),
      to: renderColorValue(value.base.skeleton?.to, colorOptions),
    },
  }

  const button = renderThemeColorButton(value.button, {colorPalette, base, blendMode, scheme})

  return {
    ...value,
    _blend: blendMode,
    base,
    button,
    card: renderThemeColorButtonStates(value.card, {base, colorPalette, blendMode, scheme}),
    input: renderThemeColorInput(value.input, {base, colorPalette, blendMode, scheme}),
    spot: renderSpotColorTheme(value.spot, {base, colorPalette, blendMode, scheme}),
    syntax: renderSyntaxColorTheme(value.syntax, {base, colorPalette, blendMode, scheme}),
    solid: {
      ...button.default,
      transparent: button.default.default,
    },
    muted: {
      ...button.bleed,
      transparent: button.bleed.default,
    },
  }
}

function renderThemeColorButton(
  value: ThemeColorButton,
  options: {
    colorPalette: ColorThemePalette
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    scheme: 'light' | 'dark'
  },
): ThemeColorButton {
  return {
    default: renderThemeColorButtonTones(value.default, options),
    ghost: renderThemeColorButtonTones(value.ghost, options),
    bleed: renderThemeColorButtonTones(value.bleed, options),
  }
}

function renderThemeColorButtonTones(
  value: ThemeColorButtonTones,
  options: {
    colorPalette: ColorThemePalette
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    scheme: 'light' | 'dark'
  },
): ThemeColorButtonTones {
  return {
    default: renderThemeColorButtonStates(value.default, options),
    primary: renderThemeColorButtonStates(value.primary, options),
    positive: renderThemeColorButtonStates(value.positive, options),
    caution: renderThemeColorButtonStates(value.caution, options),
    critical: renderThemeColorButtonStates(value.critical, options),
  }
}

function renderThemeColorButtonStates(
  value: ThemeColorButtonStates,
  options: {
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    colorPalette: ColorThemePalette
    scheme: 'light' | 'dark'
  },
): ThemeColorButtonStates {
  return {
    enabled: renderThemeColorGenericState(value.enabled, options),
    hovered: renderThemeColorGenericState(value.hovered, options),
    pressed: renderThemeColorGenericState(value.pressed, options),
    selected: renderThemeColorGenericState(value.selected, options),
    disabled: renderThemeColorGenericState(value.disabled, options),
  }
}

function renderThemeColorGenericState(
  value: ThemeColorGenericState,
  options: {
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    colorPalette: ColorThemePalette
    scheme: 'light' | 'dark'
  },
): ThemeColorGenericState {
  const {base, blendMode: rootBlendMode, colorPalette, scheme} = options
  const blendMode = value._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    colorPalette,
    baseBg: base.bg,
    blendMode: rootBlendMode,
    scheme,
  }

  const bg = renderColorValue(value.bg, rootOptions)

  const colorOptions: RenderColorValueOptions = {
    colorPalette,
    baseBg: bg,
    blendMode,
    scheme,
  }

  return {
    _blend: blendMode,
    bg,
    bg2: renderColorValue(value.bg2 || value.bg, colorOptions),
    fg: renderColorValue(value.fg, colorOptions),
    border: renderColorValue(value.border, colorOptions),
    icon: renderColorValue(value.icon, colorOptions),
    muted: {
      fg: renderColorValue(value.muted.fg, colorOptions),
    },
    accent: {
      fg: renderColorValue(value.accent.fg, colorOptions),
    },
    link: {
      fg: renderColorValue(value.link.fg, colorOptions),
    },
    code: {
      bg: renderColorValue(value.code.bg, colorOptions),
      fg: renderColorValue(value.code.fg, colorOptions),
    },
    skeleton: value.skeleton && {
      from: renderColorValue(value.skeleton?.from, colorOptions),
      to: renderColorValue(value.skeleton?.to, colorOptions),
    },
  }
}

function renderThemeColorInput(
  value: ThemeColorInput,
  options: {
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    colorPalette: ColorThemePalette
    scheme: 'light' | 'dark'
  },
): ThemeColorInput {
  return {
    default: renderInputStatesColorTheme(value.default, options),
    invalid: renderInputStatesColorTheme(value.invalid, options),
  }
}

function renderInputStatesColorTheme(
  value: ThemeColorInputStates,
  options: {
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    colorPalette: ColorThemePalette
    scheme: 'light' | 'dark'
  },
): ThemeColorInputStates {
  return {
    enabled: renderInputStateColorTheme(value.enabled, options),
    hovered: renderInputStateColorTheme(value.hovered, options),
    readOnly: renderInputStateColorTheme(value.readOnly, options),
    disabled: renderInputStateColorTheme(value.disabled, options),
  }
}

function renderInputStateColorTheme(
  value: ThemeColorInputState,
  options: {
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    colorPalette: ColorThemePalette
    scheme: 'light' | 'dark'
  },
): ThemeColorInputState {
  const {colorPalette, base, blendMode: rootBlendMode, scheme} = options

  const blendMode = value._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    colorPalette,
    baseBg: base.bg,
    blendMode: rootBlendMode,
    scheme,
  }

  const bg = renderColorValue(value.bg, rootOptions)

  const colorOptions: RenderColorValueOptions = {
    colorPalette,
    baseBg: bg,
    blendMode,
    scheme,
  }

  return {
    _blend: blendMode,
    bg,
    bg2: renderColorValue(value.bg2, colorOptions),
    fg: renderColorValue(value.fg, colorOptions),
    border: renderColorValue(value.border, colorOptions),
    placeholder: renderColorValue(value.placeholder, colorOptions),
  }
}

function renderSpotColorTheme(
  value: ThemeColorSpot,
  options: {
    colorPalette: ColorThemePalette
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    scheme: 'light' | 'dark'
  },
): ThemeColorSpot {
  const {colorPalette, base, blendMode, scheme} = options

  const colorOptions: RenderColorValueOptions = {colorPalette, baseBg: base.bg, blendMode, scheme}

  return {
    gray: renderColorValue(value.gray, colorOptions),
    cyan: renderColorValue(value.cyan, colorOptions),
    blue: renderColorValue(value.blue, colorOptions),
    purple: renderColorValue(value.purple, colorOptions),
    magenta: renderColorValue(value.magenta, colorOptions),
    red: renderColorValue(value.red, colorOptions),
    orange: renderColorValue(value.orange, colorOptions),
    yellow: renderColorValue(value.yellow, colorOptions),
    green: renderColorValue(value.green, colorOptions),
  }
}

function renderSyntaxColorTheme(
  value: ThemeColorSyntax,
  options: {
    colorPalette: ColorThemePalette
    base: ThemeColorBase
    blendMode: ColorBlendModeValue
    scheme: 'light' | 'dark'
  },
): ThemeColorSyntax {
  const {colorPalette, base, blendMode, scheme} = options

  const colorOptions: RenderColorValueOptions = {colorPalette, baseBg: base.bg, blendMode, scheme}

  return {
    atrule: renderColorValue(value.atrule, colorOptions),
    attrName: renderColorValue(value.attrName, colorOptions),
    attrValue: renderColorValue(value.attrValue, colorOptions),
    attribute: renderColorValue(value.attribute, colorOptions),
    boolean: renderColorValue(value.boolean, colorOptions),
    builtin: renderColorValue(value.builtin, colorOptions),
    cdata: renderColorValue(value.cdata, colorOptions),
    char: renderColorValue(value.char, colorOptions),
    class: renderColorValue(value.class, colorOptions),
    className: renderColorValue(value.className, colorOptions),
    comment: renderColorValue(value.comment, colorOptions),
    constant: renderColorValue(value.constant, colorOptions),
    deleted: renderColorValue(value.deleted, colorOptions),
    doctype: renderColorValue(value.doctype, colorOptions),
    entity: renderColorValue(value.entity, colorOptions),
    function: renderColorValue(value.function, colorOptions),
    hexcode: renderColorValue(value.hexcode, colorOptions),
    id: renderColorValue(value.id, colorOptions),
    important: renderColorValue(value.important, colorOptions),
    inserted: renderColorValue(value.inserted, colorOptions),
    keyword: renderColorValue(value.keyword, colorOptions),
    number: renderColorValue(value.number, colorOptions),
    operator: renderColorValue(value.operator, colorOptions),
    prolog: renderColorValue(value.prolog, colorOptions),
    property: renderColorValue(value.property, colorOptions),
    pseudoClass: renderColorValue(value.pseudoClass, colorOptions),
    pseudoElement: renderColorValue(value.pseudoElement, colorOptions),
    punctuation: renderColorValue(value.punctuation, colorOptions),
    regex: renderColorValue(value.regex, colorOptions),
    selector: renderColorValue(value.selector, colorOptions),
    string: renderColorValue(value.string, colorOptions),
    symbol: renderColorValue(value.symbol, colorOptions),
    tag: renderColorValue(value.tag, colorOptions),
    unit: renderColorValue(value.unit, colorOptions),
    url: renderColorValue(value.url, colorOptions),
    variable: renderColorValue(value.variable, colorOptions),
  }
}
