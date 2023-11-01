import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {rgba} from '../../../lib/color-fns'
import {
  ThemeColorButton,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
  ThemeColorGenericState,
  ThemeColorInput,
  ThemeColorInputState,
  ThemeColorInputStates,
} from '../../../lib/theme'
import {ColorBlendModeValue, parseTokenValue, ThemeConfig, TMP_ColorPalette} from '../../config'
import {TMP_BaseColorTheme, TMP_ColorTheme, TMP_Theme} from '../../types'
import {defaultColorPalette} from '../defaults/colorPalette'
import {multiply, screen} from '../helpers'

export function renderColorTheme(
  value: TMP_Theme['color'],
  config?: ThemeConfig,
): TMP_Theme['color'] {
  const colorPalette = config?.color?.palette ?? defaultColorPalette

  return {
    light: renderColorScheme(colorPalette, value.light),
    dark: renderColorScheme(colorPalette, value.dark),
  }
}

function renderColorScheme(colorPalette: TMP_ColorPalette, value: TMP_ColorTheme): TMP_ColorTheme {
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
  ]) as TMP_ColorTheme
}

function renderColorBase(
  colorPalette: TMP_ColorPalette,
  value: TMP_BaseColorTheme,
  bg: string,
): TMP_BaseColorTheme {
  const nestedBg = renderColorValue(colorPalette, bg, value._blend, value.base.bg)

  return {
    _blend: value._blend,
    dark: value.dark,
    base: {
      bg: nestedBg,
      fg: renderColorValue(colorPalette, nestedBg, value._blend, value.base.fg),
      border: renderColorValue(colorPalette, nestedBg, value._blend, value.base.border),
      focusRing: renderColorValue(colorPalette, nestedBg, value._blend, value.base.focusRing),
      shadow: {
        outline: renderColorValue(colorPalette, nestedBg, value._blend, value.base.shadow.outline),
        umbra: renderColorValue(colorPalette, nestedBg, value._blend, value.base.shadow.umbra),
        penumbra: renderColorValue(
          colorPalette,
          nestedBg,
          value._blend,
          value.base.shadow.penumbra,
        ),
        ambient: renderColorValue(colorPalette, nestedBg, value._blend, value.base.shadow.ambient),
      },
      skeleton: value.base.skeleton && {
        from: renderColorValue(colorPalette, nestedBg, value._blend, value.base.skeleton?.from),
        to: renderColorValue(colorPalette, nestedBg, value._blend, value.base.skeleton?.to),
      },
    },
    button: renderButtonColorTheme(colorPalette, nestedBg, value._blend, value.button),
    card: renderStatesColorTheme(colorPalette, nestedBg, value._blend, value.card),
    input: renderInputColorTheme(colorPalette, nestedBg, value._blend, value.input),
  }
}

function renderButtonColorTheme(
  colorPalette: TMP_ColorPalette,
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
  colorPalette: TMP_ColorPalette,
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
  colorPalette: TMP_ColorPalette,
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
  colorPalette: TMP_ColorPalette,
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
  colorPalette: TMP_ColorPalette,
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
  colorPalette: TMP_ColorPalette,
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
  colorPalette: TMP_ColorPalette,
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

function renderColorValue(
  colorPalette: TMP_ColorPalette,
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
