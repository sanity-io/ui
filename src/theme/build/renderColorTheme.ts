import {ThemeColorPalette, ThemeConfig} from '../config'
import {defaultColorPalette} from '../defaults/colorPalette'
import {
  ThemeColorAvatar_v2,
  ThemeColorBadgeTone_v2,
  ThemeColorBadge_v2,
  ThemeColorBlendModeKey,
  ThemeColorButtonMode_v2,
  ThemeColorButtonTone_v2,
  ThemeColorButton_v2,
  ThemeColorCardToneKey,
  ThemeColorCard_v2,
  ThemeColorInputMode_v2,
  ThemeColorInputState_v2,
  ThemeColorInput_v2,
  ThemeColorKBD,
  ThemeColorScheme_v2,
  ThemeColorSchemes_v2,
  ThemeColorSelectableTone_v2,
  ThemeColorSelectable_v2,
  ThemeColorShadow,
  ThemeColorState_v2,
  ThemeColorSyntax,
} from '../system'
import {RenderColorValueOptions, renderColorValue} from './renderColorValue'

export function renderThemeColorSchemes(
  value: ThemeColorSchemes_v2,
  config?: ThemeConfig,
): ThemeColorSchemes_v2 {
  const colorPalette = config?.palette ?? defaultColorPalette

  return {
    light: renderThemeColorScheme(colorPalette, value.light),
    dark: renderThemeColorScheme(colorPalette, value.dark),
  }
}

function renderThemeColorScheme(
  colorPalette: ThemeColorPalette,
  value: ThemeColorScheme_v2,
): ThemeColorScheme_v2 {
  const toneEntries = Object.entries(value) as [ThemeColorCardToneKey, ThemeColorCard_v2][]

  const [, transparentTone] = toneEntries.find(([k]) => k === 'transparent')!
  const [, defaultTone] = toneEntries.find(([k]) => k === 'default')!

  // The `transparent` and `default` tones are special cases, so we render them first
  // (rendered without a `bg` option).
  // But the rest of the tones are rendered on top of the `default` tone's `bg`.
  const renderedTransparentTone = renderThemeColor(transparentTone, {colorPalette})
  const renderedDefaultTone = renderThemeColor(defaultTone, {colorPalette})

  // Get the `default` tone's `bg` property
  const bg = renderedDefaultTone.bg

  if (bg === 'white') {
    throw new Error('Cannot blend with white background')
  }

  return Object.fromEntries([
    ['transparent', renderedTransparentTone],
    ['default', renderedDefaultTone],
    ...toneEntries
      .filter(([k]) => k !== 'default' && k !== 'transparent')
      .map(([k, v]) => [k, renderThemeColor(v, {bg, colorPalette})]),
  ]) as ThemeColorScheme_v2
}

function renderThemeColor(
  value: ThemeColorCard_v2,
  options: {
    bg?: string
    colorPalette: ThemeColorPalette
  },
): ThemeColorCard_v2 {
  const {colorPalette, bg} = options
  const blendMode = value._blend || 'multiply'
  const baseBg = renderColorValue(value.bg, {colorPalette, bg, blendMode})
  const colorOptions: RenderColorValueOptions = {colorPalette, bg: baseBg, blendMode}

  const button = renderThemeColorButton(value.button, {
    baseBg,
    blendMode,
    colorPalette,
  })

  const selectable = renderThemeColorSelectable(value.selectable, {
    colorPalette,
    baseBg,
    blendMode,
  })

  const shadow: ThemeColorShadow = {
    outline: renderColorValue(value.shadow.outline, colorOptions),
    umbra: renderColorValue(value.shadow.umbra, {
      ...colorOptions,
      bg: undefined,
      colorPalette: {...colorPalette, black: '#000000'},
    }),
    penumbra: renderColorValue(value.shadow.penumbra, {
      ...colorOptions,
      bg: undefined,
      colorPalette: {...colorPalette, black: '#000000'},
    }),
    ambient: renderColorValue(value.shadow.ambient, {
      ...colorOptions,
      bg: undefined,
      colorPalette: {...colorPalette, black: '#000000'},
    }),
  }

  return {
    _blend: blendMode,
    _dark: value._dark,
    accent: {
      fg: renderColorValue(value.accent.fg, colorOptions),
    },
    avatar: renderThemeColorAvatar(value.avatar, {baseBg, colorPalette, blendMode}),
    backdrop: renderColorValue(value.backdrop, colorOptions),
    badge: renderThemeColorBadge(value.badge, {baseBg, colorPalette, blendMode}),
    bg: baseBg,
    border: renderColorValue(value.border, colorOptions),
    button,
    code: {
      bg: renderColorValue(value.code.bg, colorOptions),
      fg: renderColorValue(value.code.fg, colorOptions),
    },
    fg: renderColorValue(value.fg, colorOptions),
    focusRing: renderColorValue(value.focusRing, colorOptions),
    icon: renderColorValue(value.icon, colorOptions),
    input: renderThemeColorInput(value.input, {baseBg, colorPalette, blendMode}),
    kbd: renderThemeColorKBD(value.kbd, {baseBg, colorPalette, blendMode}),
    link: {
      fg: renderColorValue(value.link.fg, colorOptions),
    },
    muted: {
      bg: renderColorValue(value.muted.bg, colorOptions),
      fg: renderColorValue(value.muted.fg, colorOptions),
    },
    shadow,
    skeleton: {
      from: renderColorValue(value.skeleton.from, colorOptions),
      to: renderColorValue(value.skeleton.to, colorOptions),
    },
    syntax: renderSyntaxColorTheme(value.syntax, {baseBg, colorPalette, blendMode}),
    selectable,
  }
}

function renderThemeColorKBD(
  value: ThemeColorKBD,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorKBD {
  const {baseBg, blendMode, colorPalette} = options

  const rootOptions: RenderColorValueOptions = {
    bg: baseBg,
    blendMode,
    colorPalette,
  }

  const bg = renderColorValue(value.bg, rootOptions)

  const colorOptions: RenderColorValueOptions = {
    bg,
    blendMode,
    colorPalette,
  }

  return {
    bg,
    fg: renderColorValue(value.fg, colorOptions),
    border: renderColorValue(value.border, colorOptions),
  }
}

function renderThemeColorAvatar(
  value: ThemeColorAvatar_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorAvatar_v2 {
  return {
    gray: renderThemeColorAvatarColor(value.gray, options),
    blue: renderThemeColorAvatarColor(value.blue, options),
    purple: renderThemeColorAvatarColor(value.purple, options),
    magenta: renderThemeColorAvatarColor(value.magenta, options),
    red: renderThemeColorAvatarColor(value.red, options),
    orange: renderThemeColorAvatarColor(value.orange, options),
    yellow: renderThemeColorAvatarColor(value.yellow, options),
    green: renderThemeColorAvatarColor(value.green, options),
    cyan: renderThemeColorAvatarColor(value.cyan, options),
  }
}

function renderThemeColorAvatarColor(
  value: ThemeColorAvatar_v2['gray'],
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorAvatar_v2['gray'] {
  const {baseBg, blendMode: rootBlendMode, colorPalette} = options
  const blendMode = value._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    bg: baseBg,
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
    fg: renderColorValue(value.fg, colorOptions),
  }
}

function renderThemeColorBadge(
  value: ThemeColorBadge_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorBadge_v2 {
  return {
    default: renderThemeColorBadgeColor(value.default, options),
    primary: renderThemeColorBadgeColor(value.primary, options),
    positive: renderThemeColorBadgeColor(value.positive, options),
    caution: renderThemeColorBadgeColor(value.caution, options),
    critical: renderThemeColorBadgeColor(value.critical, options),
  }
}

function renderThemeColorBadgeColor(
  value: ThemeColorBadgeTone_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorBadgeTone_v2 {
  const {baseBg, blendMode: rootBlendMode, colorPalette} = options

  // const blendMode = value._blend || 'multiply'

  const blendMode = rootBlendMode

  const rootOptions: RenderColorValueOptions = {
    bg: baseBg,
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
    bg,
    dot: renderColorValue(value.dot, colorOptions),
    fg: renderColorValue(value.fg, colorOptions),
    icon: renderColorValue(value.icon, colorOptions),
  }
}

function renderThemeColorButton(
  value: ThemeColorButton_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorButton_v2 {
  return {
    default: renderThemeColorButtonTones(value.default, options),
    ghost: renderThemeColorButtonTones(value.ghost, options),
    bleed: renderThemeColorButtonTones(value.bleed, options),
  }
}

function renderThemeColorButtonTones(
  value: ThemeColorButtonMode_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorButtonMode_v2 {
  return {
    default: renderThemeColorButtonStates(value.default, options),
    primary: renderThemeColorButtonStates(value.primary, options),
    positive: renderThemeColorButtonStates(value.positive, options),
    caution: renderThemeColorButtonStates(value.caution, options),
    critical: renderThemeColorButtonStates(value.critical, options),
  }
}

function renderThemeColorButtonStates(
  value: ThemeColorButtonTone_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorButtonTone_v2 {
  return {
    enabled: renderThemeColorState(value.enabled, options),
    hovered: renderThemeColorState(value.hovered, options),
    pressed: renderThemeColorState(value.pressed, options),
    selected: renderThemeColorState(value.selected, options),
    disabled: renderThemeColorState(value.disabled, options),
  }
}

function renderThemeColorState(
  value: ThemeColorState_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorState_v2 {
  const {baseBg, blendMode: rootBlendMode, colorPalette} = options
  const blendMode = value._blend || 'multiply'

  const rootOptions: RenderColorValueOptions = {
    bg: baseBg,
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
    accent: {
      fg: renderColorValue(value.accent.fg, colorOptions),
    },
    avatar: renderThemeColorAvatar(value.avatar, {baseBg: bg, colorPalette, blendMode}),
    badge: renderThemeColorBadge(value.badge, {baseBg: bg, colorPalette, blendMode}),
    bg,
    border: renderColorValue(value.border, colorOptions),
    code: {
      bg: renderColorValue(value.code.bg, colorOptions),
      fg: renderColorValue(value.code.fg, colorOptions),
    },
    fg: renderColorValue(value.fg, colorOptions),
    icon: renderColorValue(value.icon, colorOptions),
    link: {
      fg: renderColorValue(value.link.fg, colorOptions),
    },
    muted: {
      bg: renderColorValue(value.muted.bg, colorOptions),
      fg: renderColorValue(value.muted.fg, colorOptions),
    },
    kbd: {
      bg: renderColorValue(value.kbd.bg, colorOptions),
      fg: renderColorValue(value.kbd.fg, colorOptions),
      border: renderColorValue(value.kbd.border, colorOptions),
    },
    skeleton: {
      from: renderColorValue(value.skeleton?.from, colorOptions),
      to: renderColorValue(value.skeleton?.to, colorOptions),
    },
  }
}

function renderThemeColorInput(
  value: ThemeColorInput_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorInput_v2 {
  return {
    default: renderInputStatesColorTheme(value.default, options),
    invalid: renderInputStatesColorTheme(value.invalid, options),
  }
}

function renderInputStatesColorTheme(
  value: ThemeColorInputMode_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorInputMode_v2 {
  return {
    enabled: renderInputStateColorTheme(value.enabled, options),
    hovered: renderInputStateColorTheme(value.hovered, options),
    readOnly: renderInputStateColorTheme(value.readOnly, options),
    disabled: renderInputStateColorTheme(value.disabled, options),
  }
}

function renderInputStateColorTheme(
  value: ThemeColorInputState_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorInputState_v2 {
  const {baseBg, blendMode: rootBlendMode, colorPalette} = options
  const blendMode = value._blend || 'multiply'
  const rootOptions: RenderColorValueOptions = {colorPalette, bg: baseBg, blendMode: rootBlendMode}
  const bg = renderColorValue(value.bg, rootOptions)
  const colorOptions: RenderColorValueOptions = {colorPalette, bg, blendMode}

  return {
    _blend: blendMode,
    bg,
    border: renderColorValue(value.border, colorOptions),
    fg: renderColorValue(value.fg, colorOptions),
    muted: {
      bg: renderColorValue(value.muted.bg, colorOptions),
    },
    placeholder: renderColorValue(value.placeholder, colorOptions),
  }
}

function renderThemeColorSelectable(
  value: ThemeColorSelectable_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorSelectable_v2 {
  return {
    default: renderThemeColorSelectableStates(value.default, options),
    primary: renderThemeColorSelectableStates(value.primary, options),
    positive: renderThemeColorSelectableStates(value.positive, options),
    caution: renderThemeColorSelectableStates(value.caution, options),
    critical: renderThemeColorSelectableStates(value.critical, options),
  }
}

function renderThemeColorSelectableStates(
  value: ThemeColorSelectableTone_v2,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorSelectableTone_v2 {
  return {
    enabled: renderThemeColorState(value.enabled, options),
    hovered: renderThemeColorState(value.hovered, options),
    pressed: renderThemeColorState(value.pressed, options),
    selected: renderThemeColorState(value.selected, options),
    disabled: renderThemeColorState(value.disabled, options),
  }
}

function renderSyntaxColorTheme(
  value: ThemeColorSyntax,
  options: {
    baseBg: string
    blendMode: ThemeColorBlendModeKey
    colorPalette: ThemeColorPalette
  },
): ThemeColorSyntax {
  const {colorPalette, baseBg, blendMode} = options
  const colorOptions: RenderColorValueOptions = {colorPalette, bg: baseBg, blendMode}

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
