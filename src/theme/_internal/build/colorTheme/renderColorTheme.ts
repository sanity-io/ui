import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {rgba} from '../../../lib/color-fns'
import {ColorBlendModeValue, parseTokenValue, TMP_ColorPalette} from '../../config'
import {
  TMP_BaseColorTheme,
  TMP_ButtonColorTheme,
  TMP_ButtonModesColorTheme,
  TMP_ButtonStatesColorTheme,
  TMP_ColorTheme,
  TMP_StateColorTheme,
} from '../../types'
import {multiply, screen} from '../helpers'

export function renderColorTheme(
  colorPalette: TMP_ColorPalette,
  value: {
    light: TMP_ColorTheme
    dark: TMP_ColorTheme
  },
): {
  light: TMP_ColorTheme
  dark: TMP_ColorTheme
} {
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
    base: {
      bg: nestedBg,
      fg: renderColorValue(colorPalette, nestedBg, value._blend, value.base.fg),
      border: renderColorValue(colorPalette, nestedBg, value._blend, value.base.border),
    },
    button: renderButtonColorTheme(colorPalette, nestedBg, value._blend, value.button),
  }
}

function renderButtonColorTheme(
  colorPalette: TMP_ColorPalette,
  bg: string,
  baseBlendMode: ColorBlendModeValue,
  value: TMP_ButtonColorTheme,
): TMP_ButtonColorTheme {
  return {
    default: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.default),
    primary: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.primary),
    positive: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.positive),
    caution: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.caution),
    critical: renderButtonStateColorTheme(colorPalette, bg, baseBlendMode, value.critical),
  }
}

function renderButtonStateColorTheme(
  colorPalette: TMP_ColorPalette,
  bg: string,
  baseBlendMode: ColorBlendModeValue,
  value: TMP_ButtonModesColorTheme,
): TMP_ButtonModesColorTheme {
  return {
    default: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.default),
    ghost: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.ghost),
    bleed: renderStatesColorTheme(colorPalette, bg, baseBlendMode, value.bleed),
  }
}

function renderStatesColorTheme(
  colorPalette: TMP_ColorPalette,
  bg: string,
  baseBlendMode: ColorBlendModeValue,
  value: TMP_ButtonStatesColorTheme,
) {
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
  value: TMP_StateColorTheme,
): TMP_StateColorTheme {
  const blendMode = value._blend

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

  const fg = renderColorValue(colorPalette, bg, blendMode, value.fg)

  const blend = rootBlendMode === 'multiply' ? multiply : screen

  return {
    _blend: blendMode,
    bg: blend(baseBg, bg),
    fg: blend(baseBg, fg),
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
