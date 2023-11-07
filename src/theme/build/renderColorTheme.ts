import {ThemeColorPalette, ThemeConfig} from '../config'
import {
  ThemeColorBlendModeKey,
  ThemeColor,
  ThemeColorAvatar,
  ThemeColorBadge,
  ThemeColorBase,
  ThemeColorButton,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
  ThemeColorGenericState,
  ThemeColorInput,
  ThemeColorInputState,
  ThemeColorInputStates,
  ThemeColorKBD,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColorSelectable,
  ThemeColorSelectableStates,
  ThemeColorSpot,
  ThemeColorSyntax,
  ThemeColorToneKey,
} from '../system'
import {defaultColorPalette} from './defaults/colorPalette'
import {RenderColorValueOptions, renderColorValue} from './renderColorValue'

export function renderThemeColorSchemes(
  value: ThemeColorSchemes,
  config?: ThemeConfig,
): ThemeColorSchemes {
  const colorPalette = config?.palette ?? defaultColorPalette

  return {
    light: renderThemeColorScheme(colorPalette, value.light),
    dark: renderThemeColorScheme(colorPalette, value.dark),
  }
}

function renderThemeColorScheme(
  colorPalette: ThemeColorPalette,
  value: ThemeColorScheme,
): ThemeColorScheme {
  const toneEntries = Object.entries(value) as [ThemeColorToneKey, ThemeColor][]

  const [, transparentTone] = toneEntries.find(([k]) => k === 'transparent')!
  const [, defaultTone] = toneEntries.find(([k]) => k === 'default')!

  // The `transparent` and `default` tones are special cases, so we render them first
  // (rendered without a `bg` option).
  // But the rest of the tones are rendered on top of the `default` tone's `bg`.
  const renderedTransparentTone = renderThemeColor(transparentTone, {colorPalette})
  const renderedDefaultTone = renderThemeColor(defaultTone, {colorPalette})

  // Get the `default` tone's `bg` property
  const bg = renderedDefaultTone.base.bg

  return Object.fromEntries([
    ['transparent', renderedTransparentTone],
    ['default', renderedDefaultTone],
    ...toneEntries
      .filter(([k]) => k !== 'default' && k !== 'transparent')
      .map(([k, v]) => [k, renderThemeColor(v, {bg, colorPalette})]),
  ]) as ThemeColorScheme
}

function renderThemeColor(
  value: ThemeColor,
  options: {
    bg?: string
    colorPalette: ThemeColorPalette
  },
): ThemeColor {
  const {colorPalette, bg} = options

  const blendMode = value._blend || 'multiply'

  const baseBg = renderColorValue(value.base.bg, {colorPalette, bg, blendMode})

  const colorOptions: RenderColorValueOptions = {colorPalette, bg: baseBg, blendMode}

  const base: ThemeColorBase = {
    bg: baseBg,
    fg: renderColorValue(value.base.fg, colorOptions),
    border: renderColorValue(value.base.border, colorOptions),
    focusRing: renderColorValue(value.base.focusRing, colorOptions),
    shadow: {
      outline: renderColorValue(value.base.shadow.outline, colorOptions),
      umbra: renderColorValue(value.base.shadow.umbra, {
        ...colorOptions,
        bg: undefined,
        colorPalette: {...colorPalette, black: '#000000'},
      }),
      penumbra: renderColorValue(value.base.shadow.penumbra, {
        ...colorOptions,
        bg: undefined,
        colorPalette: {...colorPalette, black: '#000000'},
      }),
      ambient: renderColorValue(value.base.shadow.ambient, {
        ...colorOptions,
        bg: undefined,
        colorPalette: {...colorPalette, black: '#000000'},
      }),
    },
    skeleton: value.base.skeleton && {
      from: renderColorValue(value.base.skeleton?.from, colorOptions),
      to: renderColorValue(value.base.skeleton?.to, colorOptions),
    },
  }

  const button = renderThemeColorButton(value.button, {colorPalette, base, blendMode})

  const selectable = renderThemeColorSelectable(value.selectable || value.button.ghost, {
    colorPalette,
    base,
    blendMode,
  })

  return {
    ...value,
    _blend: blendMode,
    avatar: renderThemeColorAvatar(value.avatar, {base, colorPalette, blendMode}),
    badge: renderThemeColorBadge(value.badge, {base, colorPalette, blendMode}),
    base,
    button,
    card: renderThemeColorButtonStates(value.card, {base, colorPalette, blendMode}),
    input: renderThemeColorInput(value.input, {base, colorPalette, blendMode}),
    kbd: renderThemeColorKBD(value.kbd, {base, colorPalette, blendMode}),
    spot: renderSpotColorTheme(value.spot, {base, colorPalette, blendMode}),
    syntax: renderSyntaxColorTheme(value.syntax, {base, colorPalette, blendMode}),
    solid: {
      ...button.default,
      transparent: button.default.default,
    },
    muted: {
      ...button.bleed,
      transparent: button.bleed.default,
    },
    selectable,
  }
}

function renderThemeColorKBD(
  value: ThemeColorKBD | undefined,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
) {
  const {base, blendMode: rootBlendMode, colorPalette} = options
  const blendMode = value?._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    bg: base.bg,
    blendMode: rootBlendMode,
    colorPalette,
  }

  const bg = renderColorValue(value?.bg || 'gray/500', rootOptions)

  const colorOptions: RenderColorValueOptions = {
    bg,
    blendMode,
    colorPalette,
  }

  return {
    _blend: blendMode,
    bg,
    fg: renderColorValue(value?.fg || 'gray/500', colorOptions),
    border: renderColorValue(value?.border || 'gray/500', colorOptions),
  }
}

function renderThemeColorAvatar(
  value: ThemeColorAvatar | undefined,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorAvatar {
  return {
    gray: renderThemeColorAvatarColor(value?.gray, options),
    blue: renderThemeColorAvatarColor(value?.blue, options),
    purple: renderThemeColorAvatarColor(value?.purple, options),
    magenta: renderThemeColorAvatarColor(value?.magenta, options),
    red: renderThemeColorAvatarColor(value?.red, options),
    orange: renderThemeColorAvatarColor(value?.orange, options),
    yellow: renderThemeColorAvatarColor(value?.yellow, options),
    green: renderThemeColorAvatarColor(value?.green, options),
    cyan: renderThemeColorAvatarColor(value?.cyan, options),
  }
}

function renderThemeColorAvatarColor(
  value: ThemeColorAvatar['gray'] | undefined,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorAvatar['gray'] {
  const {base, blendMode: rootBlendMode, colorPalette} = options
  const blendMode = value?._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    bg: base.bg,
    blendMode: rootBlendMode,
    colorPalette,
  }

  const bg = renderColorValue(value?.bg || 'gray/500', rootOptions)

  const colorOptions: RenderColorValueOptions = {
    bg,
    blendMode,
    colorPalette,
  }

  return {
    _blend: blendMode,
    bg,
    fg: renderColorValue(value?.fg || 'gray/500', colorOptions),
  }
}

function renderThemeColorBadge(
  value: ThemeColorBadge | undefined,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorBadge {
  return {
    default: renderThemeColorBadgeColor(value?.default, options),
    primary: renderThemeColorBadgeColor(value?.primary, options),
    positive: renderThemeColorBadgeColor(value?.positive, options),
    caution: renderThemeColorBadgeColor(value?.caution, options),
    critical: renderThemeColorBadgeColor(value?.critical, options),
  }
}

function renderThemeColorBadgeColor(
  value: {_blend?: ThemeColorBlendModeKey; bg: string; fg: string} | undefined,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): {bg: string; fg: string} {
  const {base, blendMode: rootBlendMode, colorPalette} = options
  const blendMode = value?._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    bg: base.bg,
    blendMode: rootBlendMode,
    colorPalette,
  }

  const bg = renderColorValue(value?.bg || 'gray/500', rootOptions)

  const colorOptions: RenderColorValueOptions = {
    bg,
    blendMode,
    colorPalette,
  }

  return {
    bg,
    fg: renderColorValue(value?.fg || 'gray/500', colorOptions),
  }
}

function renderThemeColorButton(
  value: ThemeColorButton,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
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
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
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
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
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
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorGenericState {
  const {base, blendMode: rootBlendMode, colorPalette} = options
  const blendMode = value._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    bg: base.bg,
    blendMode: rootBlendMode,
    colorPalette,
  }

  const bg = renderColorValue(value.bg, rootOptions)

  const colorOptions: RenderColorValueOptions = {
    bg,
    blendMode,
    colorPalette,
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
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
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
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
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
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorInputState {
  const {colorPalette, base, blendMode: rootBlendMode} = options

  const blendMode = value._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {colorPalette, bg: base.bg, blendMode: rootBlendMode}

  const bg = renderColorValue(value.bg, rootOptions)

  const colorOptions: RenderColorValueOptions = {colorPalette, bg, blendMode}

  return {
    _blend: blendMode,
    bg,
    bg2: renderColorValue(value.bg2, colorOptions),
    fg: renderColorValue(value.fg, colorOptions),
    border: renderColorValue(value.border, colorOptions),
    placeholder: renderColorValue(value.placeholder, colorOptions),
  }
}

function renderThemeColorSelectable(
  value: ThemeColorSelectable,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorSelectable {
  return {
    default: renderThemeColorSelectableStates(value.default, options),
    primary: renderThemeColorSelectableStates(value.primary, options),
    positive: renderThemeColorSelectableStates(value.positive, options),
    caution: renderThemeColorSelectableStates(value.caution, options),
    critical: renderThemeColorSelectableStates(value.critical, options),
  }
}

function renderThemeColorSelectableStates(
  value: ThemeColorSelectableStates,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorSelectableStates {
  return {
    enabled: renderThemeColorGenericState(value.enabled, options),
    hovered: renderThemeColorGenericState(value.hovered, options),
    pressed: renderThemeColorGenericState(value.pressed, options),
    selected: renderThemeColorGenericState(value.selected, options),
    disabled: renderThemeColorGenericState(value.disabled, options),
  }
}

function renderSpotColorTheme(
  value: ThemeColorSpot,
  options: {
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorSpot {
  const {colorPalette, base, blendMode} = options

  const colorOptions: RenderColorValueOptions = {colorPalette, bg: base.bg, blendMode}

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
    base: ThemeColorBase
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorSyntax {
  const {colorPalette, base, blendMode} = options

  const colorOptions: RenderColorValueOptions = {colorPalette, bg: base.bg, blendMode}

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
