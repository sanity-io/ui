import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {rgba} from '../../lib/color-fns'
import {
  ThemeColor,
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
} from '../../types'
import {ColorBlendModeValue, parseTokenValue, ThemeConfig, ColorThemePalette} from '../../config'
import {multiply, screen} from '../helpers'
import {defaultColorPalette} from './defaults/colorPalette'

export function renderColorTheme(
  value: ThemeColorSchemes,
  config?: ThemeConfig,
): ThemeColorSchemes {
  const colorPalette = config?.palette ?? defaultColorPalette

  return {
    light: renderColorScheme(colorPalette, value.light),
    dark: renderColorScheme(colorPalette, value.dark),
  }
}

function renderColorScheme(
  colorPalette: ColorThemePalette,
  value: ThemeColorScheme,
): ThemeColorScheme {
  const toneEntries = Object.entries(value)
  const [, transparentTone] = toneEntries.find(([k]) => k === 'transparent')!
  const [, defaultTone] = toneEntries.find(([k]) => k === 'default')!

  const renderedTransparentTone = renderColorBase(
    colorPalette,
    transparentTone,
    transparentTone._blend === 'multiply' ? '#ffffff' : '#000000',
  )

  const renderedDefaultTone = renderColorBase(
    colorPalette,
    defaultTone,
    defaultTone._blend === 'multiply' ? '#ffffff' : '#000000',
  )

  return Object.fromEntries([
    ['transparent', renderedTransparentTone],
    ['default', renderedDefaultTone],
    ...toneEntries
      .filter(([k]) => k !== 'default' && k !== 'transparent')
      .map(([k, v]) => [k, renderColorBase(colorPalette, v, renderedDefaultTone.base.bg)]),
  ]) as ThemeColorScheme
}

function renderColorBase(
  colorPalette: ColorThemePalette,
  value: ThemeColor,
  bg: string,
): ThemeColor {
  const _blend = value._blend || 'multiply'
  const nestedBg = renderColorValue(colorPalette, bg, _blend, value.base.bg)
  const button = renderButtonColorTheme(colorPalette, nestedBg, _blend, value.button)

  return {
    _blend,
    dark: value.dark,
    base: {
      bg: nestedBg,
      fg: renderColorValue(colorPalette, nestedBg, _blend, value.base.fg),
      border: renderColorValue(colorPalette, nestedBg, _blend, value.base.border),
      focusRing: renderColorValue(colorPalette, nestedBg, _blend, value.base.focusRing),
      shadow: {
        outline: renderColorValue(colorPalette, nestedBg, _blend, value.base.shadow.outline),
        umbra: renderColorValue(colorPalette, nestedBg, _blend, value.base.shadow.umbra),
        penumbra: renderColorValue(colorPalette, nestedBg, _blend, value.base.shadow.penumbra),
        ambient: renderColorValue(colorPalette, nestedBg, _blend, value.base.shadow.ambient),
      },
      skeleton: value.base.skeleton && {
        from: renderColorValue(colorPalette, nestedBg, _blend, value.base.skeleton?.from),
        to: renderColorValue(colorPalette, nestedBg, _blend, value.base.skeleton?.to),
      },
    },
    button,
    card: renderStatesColorTheme(colorPalette, nestedBg, _blend, value.card),
    input: renderInputColorTheme(colorPalette, nestedBg, _blend, value.input),
    spot: renderSpotColorTheme(colorPalette, nestedBg, _blend, value.spot),
    syntax: renderSyntaxColorTheme(colorPalette, nestedBg, _blend, value.syntax),
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

function renderButtonColorTheme(
  colorPalette: ColorThemePalette,
  bg: string,
  baseBlendMode: ColorBlendModeValue,
  value: ThemeColorButton,
): ThemeColorButton {
  return {
    default: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.default),
    ghost: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.ghost),
    bleed: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.bleed),
  }
}

function renderButtonStateColorTheme(
  colorPalette: ColorThemePalette,
  bg: string,
  baseBlendMode: ColorBlendModeValue,
  value: ThemeColorButtonTones,
): ThemeColorButtonTones {
  return {
    default: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.default),
    primary: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.primary),
    positive: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.positive),
    caution: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.caution),
    critical: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.critical),
  }
}

function renderStatesColorTheme(
  colorPalette: ColorThemePalette,
  bg: string,
  baseBlendMode: ColorBlendModeValue,
  value: ThemeColorButtonStates,
): ThemeColorButtonStates {
  return {
    enabled: renderStateColorTheme(colorPalette, bg, baseBlendMode, value.enabled),
    hovered: renderStateColorTheme(colorPalette, bg, baseBlendMode, value.hovered),
    pressed: renderStateColorTheme(colorPalette, bg, baseBlendMode, value.pressed),
    selected: renderStateColorTheme(colorPalette, bg, baseBlendMode, value.selected),
    disabled: renderStateColorTheme(colorPalette, bg, baseBlendMode, value.disabled),
  }
}

function renderStateColorTheme(
  colorPalette: ColorThemePalette,
  baseBg: string,
  rootBlendMode: ColorBlendModeValue,
  value: ThemeColorGenericState,
): ThemeColorGenericState {
  const blendMode = value._blend || 'multiply'

  const bg =
    rootBlendMode === 'multiply' && value.bg === 'white'
      ? '#ffffff'
      : rootBlendMode === 'screen' && value.bg === 'black'
      ? '#000000'
      : renderColorValue(
          colorPalette,
          rootBlendMode === 'multiply' ? '#ffffff' : '#000000',
          rootBlendMode,
          value.bg,
        )

  const blend = rootBlendMode === 'multiply' ? multiply : screen

  const unmixed = {
    bg2: renderColorValue(colorPalette, bg, blendMode, value.bg2 || value.bg),
    fg: renderColorValue(colorPalette, bg, blendMode, value.fg),
    border: renderColorValue(colorPalette, bg, blendMode, value.border),
    muted: {
      fg: renderColorValue(colorPalette, bg, blendMode, value.muted.fg),
    },
    accent: {
      fg: renderColorValue(colorPalette, bg, blendMode, value.accent.fg),
    },
    link: {
      fg: renderColorValue(colorPalette, bg, blendMode, value.link.fg),
    },
    code: {
      bg: renderColorValue(colorPalette, bg, blendMode, value.code.bg),
      fg: renderColorValue(colorPalette, bg, blendMode, value.code.fg),
    },
  }

  return {
    _blend: blendMode,
    bg: blend(baseBg, bg),
    bg2: blend(baseBg, unmixed.bg2),
    fg: blend(baseBg, unmixed.fg),
    border: blend(baseBg, unmixed.border),
    iconColor: blend(baseBg, unmixed.fg),
    muted: {
      fg: blend(baseBg, unmixed.muted.fg),
    },
    accent: {
      fg: blend(baseBg, unmixed.accent.fg),
    },
    link: {
      fg: blend(baseBg, unmixed.link.fg),
    },
    code: {
      bg: blend(baseBg, unmixed.code.bg),
      fg: blend(baseBg, unmixed.code.fg),
    },
  }
}

function renderInputColorTheme(
  colorPalette: ColorThemePalette,
  baseBg: string,
  rootBlendMode: ColorBlendModeValue,
  value: ThemeColorInput,
): ThemeColorInput {
  return {
    default: renderInputStatesColorTheme(colorPalette, baseBg, rootBlendMode, value.default),
    invalid: renderInputStatesColorTheme(colorPalette, baseBg, rootBlendMode, value.invalid),
  }
}

function renderInputStatesColorTheme(
  colorPalette: ColorThemePalette,
  baseBg: string,
  rootBlendMode: ColorBlendModeValue,
  value: ThemeColorInputStates,
): ThemeColorInputStates {
  return {
    enabled: renderInputStateColorTheme(colorPalette, baseBg, rootBlendMode, value.enabled),
    hovered: renderInputStateColorTheme(colorPalette, baseBg, rootBlendMode, value.hovered),
    readOnly: renderInputStateColorTheme(colorPalette, baseBg, rootBlendMode, value.readOnly),
    disabled: renderInputStateColorTheme(colorPalette, baseBg, rootBlendMode, value.disabled),
  }
}

function renderInputStateColorTheme(
  colorPalette: ColorThemePalette,
  baseBg: string,
  _rootBlendMode: ColorBlendModeValue,
  value: ThemeColorInputState,
): ThemeColorInputState {
  const _blend = value._blend || 'multiply'

  return {
    bg: renderColorValue(colorPalette, baseBg, _blend, value.bg),
    bg2: renderColorValue(colorPalette, baseBg, _blend, value.bg2),
    fg: renderColorValue(colorPalette, baseBg, _blend, value.fg),
    border: renderColorValue(colorPalette, baseBg, _blend, value.border),
    placeholder: renderColorValue(colorPalette, baseBg, _blend, value.placeholder),
  }
}

function renderSpotColorTheme(
  colorPalette: ColorThemePalette,
  baseBg: string,
  _rootBlendMode: ColorBlendModeValue,
  value: ThemeColorSpot,
): ThemeColorSpot {
  const _blend = _rootBlendMode // value._blend || 'multiply'

  return {
    gray: renderColorValue(colorPalette, baseBg, _blend, value.gray),
    cyan: renderColorValue(colorPalette, baseBg, _blend, value.cyan),
    blue: renderColorValue(colorPalette, baseBg, _blend, value.blue),
    purple: renderColorValue(colorPalette, baseBg, _blend, value.purple),
    magenta: renderColorValue(colorPalette, baseBg, _blend, value.magenta),
    red: renderColorValue(colorPalette, baseBg, _blend, value.red),
    orange: renderColorValue(colorPalette, baseBg, _blend, value.orange),
    yellow: renderColorValue(colorPalette, baseBg, _blend, value.yellow),
    green: renderColorValue(colorPalette, baseBg, _blend, value.green),
  }
}

function renderSyntaxColorTheme(
  colorPalette: ColorThemePalette,
  baseBg: string,
  _rootBlendMode: ColorBlendModeValue,
  value: ThemeColorSyntax,
): ThemeColorSyntax {
  const _blend = _rootBlendMode // value._blend || 'multiply'

  return {
    atrule: renderColorValue(colorPalette, baseBg, _blend, value.atrule),
    attrName: renderColorValue(colorPalette, baseBg, _blend, value.attrName),
    attrValue: renderColorValue(colorPalette, baseBg, _blend, value.attrValue),
    attribute: renderColorValue(colorPalette, baseBg, _blend, value.attribute),
    boolean: renderColorValue(colorPalette, baseBg, _blend, value.boolean),
    builtin: renderColorValue(colorPalette, baseBg, _blend, value.builtin),
    cdata: renderColorValue(colorPalette, baseBg, _blend, value.cdata),
    char: renderColorValue(colorPalette, baseBg, _blend, value.char),
    class: renderColorValue(colorPalette, baseBg, _blend, value.class),
    className: renderColorValue(colorPalette, baseBg, _blend, value.className),
    comment: renderColorValue(colorPalette, baseBg, _blend, value.comment),
    constant: renderColorValue(colorPalette, baseBg, _blend, value.constant),
    deleted: renderColorValue(colorPalette, baseBg, _blend, value.deleted),
    doctype: renderColorValue(colorPalette, baseBg, _blend, value.doctype),
    entity: renderColorValue(colorPalette, baseBg, _blend, value.entity),
    function: renderColorValue(colorPalette, baseBg, _blend, value.function),
    hexcode: renderColorValue(colorPalette, baseBg, _blend, value.hexcode),
    id: renderColorValue(colorPalette, baseBg, _blend, value.id),
    important: renderColorValue(colorPalette, baseBg, _blend, value.important),
    inserted: renderColorValue(colorPalette, baseBg, _blend, value.inserted),
    keyword: renderColorValue(colorPalette, baseBg, _blend, value.keyword),
    number: renderColorValue(colorPalette, baseBg, _blend, value.number),
    operator: renderColorValue(colorPalette, baseBg, _blend, value.operator),
    prolog: renderColorValue(colorPalette, baseBg, _blend, value.prolog),
    property: renderColorValue(colorPalette, baseBg, _blend, value.property),
    pseudoClass: renderColorValue(colorPalette, baseBg, _blend, value.pseudoClass),
    pseudoElement: renderColorValue(colorPalette, baseBg, _blend, value.pseudoElement),
    punctuation: renderColorValue(colorPalette, baseBg, _blend, value.punctuation),
    regex: renderColorValue(colorPalette, baseBg, _blend, value.regex),
    selector: renderColorValue(colorPalette, baseBg, _blend, value.selector),
    string: renderColorValue(colorPalette, baseBg, _blend, value.string),
    symbol: renderColorValue(colorPalette, baseBg, _blend, value.symbol),
    tag: renderColorValue(colorPalette, baseBg, _blend, value.tag),
    unit: renderColorValue(colorPalette, baseBg, _blend, value.unit),
    url: renderColorValue(colorPalette, baseBg, _blend, value.url),
    variable: renderColorValue(colorPalette, baseBg, _blend, value.variable),
  }
}

function renderColorValue(
  colorPalette: ColorThemePalette,
  bg: string,
  blendMode: ColorBlendModeValue,
  str: string,
): string {
  const node = parseTokenValue(str)

  if (!node || node.type !== 'color') {
    throw new Error(`Invalid color token value: ${str}`)
  }

  let hex = ''

  if (node.key === 'black') {
    hex = renderColorHex(colorPalette.black)
  }

  if (node.key === 'white') {
    hex = renderColorHex(colorPalette.white)
  }

  if (node.hue && node.tint) {
    hex = renderColorHex(colorPalette[node.hue][node.tint])
  }

  if (!hex) {
    throw new Error(`Invalid color token value: ${str}`)
  }

  // apply blend mode
  try {
    hex = blendMode === 'multiply' ? multiply(bg, hex) : screen(bg, hex)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('could not blend', hex)
  }

  if (node.opacity !== undefined) {
    hex = rgba(hex, node.opacity)
  }

  return hex
}

function renderColorHex(color: string | ColorPaletteValue) {
  return typeof color === 'string' ? color : color.hex
}
