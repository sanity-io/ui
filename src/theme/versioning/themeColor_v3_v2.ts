import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATE_TONES,
  THEME_COLOR_STATES,
  type ThemeColorBadge_v2,
  type ThemeColorButton_v2,
  type ThemeColorButtonMode_v2,
  type ThemeColorButtonTone_v2,
  type ThemeColorCard_v2,
  type ThemeColorInput_v2,
  type ThemeColorInputMode_v2,
  type ThemeColorInputState_v2,
  type ThemeColorSelectable_v2,
  type ThemeColorSelectableTone_v2,
  type ThemeColorState_v2,
  type ThemeColorStateKey,
  type ThemeColorStateToneKey,
} from '../v2'
import {
  _parseColorToken,
  type ColorToken,
  type ColorValue,
  type Hue,
  type ThemeColorCard_v3,
  type ThemeColorElement,
  type ThemeColorVariantKey,
  type ThemePalette_v3,
} from '../v3'

function renderColor(colorToken: ColorToken, options: {defaultHue: Hue; palette: ThemePalette_v3}) {
  const {defaultHue, palette} = options

  const color = _parseColorToken(colorToken, {defaultHue})

  if (color.type === 'color') {
    return palette[color.name].hex
  }

  if (color.type === 'tint') {
    return palette.hues[color.hue][color.tint].hex
  }

  return '#000'
}

export function themeColor_v3_v2(options: {
  color: ThemeColorCard_v3
  dark: boolean
  palette: ThemePalette_v3
}): ThemeColorCard_v2 {
  const {color, dark, palette} = options

  const i = dark ? 1 : 0

  const defaultHue = color._hue

  const colorOptions = {defaultHue, palette}

  return {
    _blend: 'screen',
    _dark: dark,
    ...buildColorState({
      cardColor: color,
      dark,
      palette,
      state: 'enabled',
      tone: 'default',
      variant: 'tinted',
    }),

    backdrop: renderColor(color.backdrop[i], colorOptions),
    button: THEME_COLOR_BUTTON_MODES.reduce<ThemeColorButton_v2>((modes, mode) => {
      modes[mode] = THEME_COLOR_STATE_TONES.reduce<ThemeColorButtonMode_v2>((tones, tone) => {
        tones[tone] = THEME_COLOR_STATES.reduce<ThemeColorButtonTone_v2>((states, state) => {
          states[state] = buildColorState({
            cardColor: color,
            dark,
            palette,
            state,
            tone,
            variant: mode === 'default' ? 'solid' : 'tinted',
          })

          if (mode === 'bleed') {
            states[state].border = 'transparent'
          }

          return states
        }, {} as ThemeColorButtonTone_v2)

        return tones
      }, {} as ThemeColorButtonMode_v2)

      return modes
    }, {} as ThemeColorButton_v2),

    focusRing: renderColor(color.focusRing[i], colorOptions),
    input: THEME_COLOR_INPUT_MODES.reduce<ThemeColorInput_v2>((modes, mode) => {
      modes[mode] = THEME_COLOR_INPUT_STATES.reduce<ThemeColorInputMode_v2>((states, state) => {
        states[state] = buildInputState(color.variant.tinted.default, {
          dark,
          defaultHue,
          palette,
        })

        return states
      }, {} as ThemeColorInputMode_v2)

      return modes
    }, {} as ThemeColorInput_v2),
    selectable: THEME_COLOR_STATE_TONES.reduce<ThemeColorSelectable_v2>((tones, tone) => {
      tones[tone] = THEME_COLOR_STATES.reduce<ThemeColorSelectableTone_v2>((states, state) => {
        states[state] = buildColorState({
          cardColor: color,
          dark,
          palette,
          state,
          tone,
          variant: 'tinted',
        })

        return states
      }, {} as ThemeColorSelectableTone_v2)

      return tones
    }, {} as ThemeColorSelectable_v2),

    shadow: {
      outline: renderColor(color.shadow.outline[i], colorOptions),
      umbra: renderColor(color.shadow.umbra[i], colorOptions),
      penumbra: renderColor(color.shadow.penumbra[i], colorOptions),
      ambient: renderColor(color.shadow.ambient[i], colorOptions),
    },

    syntax: {
      atrule: renderColor(color.code.token.atrule[i], colorOptions),
      attrName: renderColor(color.code.token.attrName[i], colorOptions),
      attrValue: renderColor(color.code.token.attrValue[i], colorOptions),
      attribute: renderColor(color.code.token.attribute[i], colorOptions),
      boolean: renderColor(color.code.token.boolean[i], colorOptions),
      builtin: renderColor(color.code.token.builtin[i], colorOptions),
      cdata: renderColor(color.code.token.cdata[i], colorOptions),
      char: renderColor(color.code.token.char[i], colorOptions),
      class: renderColor(color.code.token.class[i], colorOptions),
      className: renderColor(color.code.token.className[i], colorOptions),
      comment: renderColor(color.code.token.comment[i], colorOptions),
      constant: renderColor(color.code.token.constant[i], colorOptions),
      deleted: renderColor(color.code.token.deleted[i], colorOptions),
      doctype: renderColor(color.code.token.doctype[i], colorOptions),
      entity: renderColor(color.code.token.entity[i], colorOptions),
      function: renderColor(color.code.token.function[i], colorOptions),
      hexcode: renderColor(color.code.token.hexcode[i], colorOptions),
      id: renderColor(color.code.token.id[i], colorOptions),
      important: renderColor(color.code.token.important[i], colorOptions),
      inserted: renderColor(color.code.token.inserted[i], colorOptions),
      keyword: renderColor(color.code.token.keyword[i], colorOptions),
      number: renderColor(color.code.token.number[i], colorOptions),
      operator: renderColor(color.code.token.operator[i], colorOptions),
      prolog: renderColor(color.code.token.prolog[i], colorOptions),
      property: renderColor(color.code.token.property[i], colorOptions),
      pseudoClass: renderColor(color.code.token.pseudoClass[i], colorOptions),
      pseudoElement: renderColor(color.code.token.pseudoElement[i], colorOptions),
      punctuation: renderColor(color.code.token.punctuation[i], colorOptions),
      regex: renderColor(color.code.token.regex[i], colorOptions),
      selector: renderColor(color.code.token.selector[i], colorOptions),
      string: renderColor(color.code.token.string[i], colorOptions),
      symbol: renderColor(color.code.token.symbol[i], colorOptions),
      tag: renderColor(color.code.token.tag[i], colorOptions),
      unit: renderColor(color.code.token.unit[i], colorOptions),
      url: renderColor(color.code.token.url[i], colorOptions),
      variable: renderColor(color.code.token.variable[i], colorOptions),
    },
  }
}

type ElementTokenIndex = 0 | 1 | 2 | 3 | 4

const stateShades: Record<
  ThemeColorStateKey,
  {
    bg: [ElementTokenIndex, ElementTokenIndex, ElementTokenIndex]
    border: [ElementTokenIndex, ElementTokenIndex, ElementTokenIndex]
    fg: [ElementTokenIndex, ElementTokenIndex, ElementTokenIndex]
  }
> = {
  enabled: {
    bg: [0, 1, 2],
    border: [0, 1, 2],
    fg: [0, 1, 2],
  },
  hovered: {
    bg: [1, 2, 3],
    border: [1, 2, 3],
    fg: [1, 2, 3],
  },
  pressed: {
    bg: [2, 3, 4],
    border: [2, 3, 4],
    fg: [2, 3, 4],
  },
  selected: {
    bg: [3, 4, 4],
    border: [3, 4, 4],
    fg: [3, 4, 4],
  },
  disabled: {
    bg: [4, 4, 4],
    border: [4, 4, 4],
    fg: [4, 4, 4],
  },
}

function mix(
  tokens: {
    0: ColorValue
    4: ColorValue
  },
  index: ElementTokenIndex,
  options: {
    dark: boolean
    defaultHue: Hue
    palette: ThemePalette_v3
  },
) {
  const {dark, defaultHue, palette} = options
  const colorOptions = {defaultHue, palette}
  const i = dark ? 1 : 0

  const from = renderColor(tokens[0][i], colorOptions)
  const to = renderColor(tokens[4][i], colorOptions)

  if (index === 0) {
    return from
  }

  if (index === 4) {
    return to
  }

  return `color-mix(in oklch, ${from}, ${to} ${index * 25}%)`
}

function buildColorState(options: {
  cardColor: ThemeColorCard_v3
  dark: boolean
  palette: ThemePalette_v3
  state: ThemeColorStateKey
  tone: ThemeColorStateToneKey
  variant: ThemeColorVariantKey
}): ThemeColorState_v2 {
  const {cardColor, dark, palette, state, tone, variant} = options
  const color = cardColor.variant[variant][tone]

  const shades = stateShades[state]

  const defaultHue = cardColor._hue
  const colorOptions = {defaultHue, palette}

  const i = dark ? 1 : 0

  // cardColor.avatar.blue.bg

  return {
    accent: {
      fg: renderColor(color.fg[4][i], colorOptions),
    },

    avatar: {
      gray: {
        bg: renderColor(cardColor.avatar.gray.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.gray.fg[i], colorOptions),
      },
      blue: {
        bg: renderColor(cardColor.avatar.blue.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.blue.fg[i], colorOptions),
      },
      purple: {
        bg: renderColor(cardColor.avatar.purple.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.purple.fg[i], colorOptions),
      },
      magenta: {
        bg: renderColor(cardColor.avatar.magenta.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.magenta.fg[i], colorOptions),
      },
      red: {
        bg: renderColor(cardColor.avatar.red.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.red.fg[i], colorOptions),
      },
      orange: {
        bg: renderColor(cardColor.avatar.orange.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.orange.fg[i], colorOptions),
      },
      yellow: {
        bg: renderColor(cardColor.avatar.yellow.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.yellow.fg[i], colorOptions),
      },
      green: {
        bg: renderColor(cardColor.avatar.green.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.green.fg[i], colorOptions),
      },
      cyan: {
        bg: renderColor(cardColor.avatar.cyan.bg[i], colorOptions),
        fg: renderColor(cardColor.avatar.cyan.fg[i], colorOptions),
      },
    },

    // avatar: cardColor.avatar,
    badge: THEME_COLOR_STATE_TONES.reduce<ThemeColorBadge_v2>((tones, tone) => {
      tones[tone] = {
        bg: mix(color.bg, 1, {dark, defaultHue, palette}),

        fg: mix(color.fg, 1, {dark, defaultHue, palette}),

        dot: mix(color.fg, 3, {dark, defaultHue, palette}),

        icon: mix(color.fg, 3, {dark, defaultHue, palette}),
      }

      return tones
    }, {} as ThemeColorBadge_v2),

    bg: mix(color.bg, shades.bg[0], {dark, defaultHue, palette}),

    border: mix(color.border, shades.border[0], {dark, defaultHue, palette}),

    fg: mix(color.fg, shades.fg[0], {dark, defaultHue, palette}),
    code: {
      bg: mix(color.bg, shades.bg[1], {dark, defaultHue, palette}),

      fg: mix(color.fg, shades.fg[2], {dark, defaultHue, palette}),
    },

    icon: mix(color.fg, shades.fg[2], {dark, defaultHue, palette}),
    kbd: {
      bg: mix(color.bg, 0, {dark, defaultHue, palette}),

      fg: mix(color.fg, 0, {dark, defaultHue, palette}),

      border: mix(color.bg, 0, {dark, defaultHue, palette}),
    },
    link: {
      fg: mix(color.fg, shades.fg[2], {dark, defaultHue, palette}),
    },
    muted: {
      bg: mix(color.bg, shades.bg[1], {dark, defaultHue, palette}),

      fg: mix(color.fg, shades.fg[2], {dark, defaultHue, palette}),
    },

    skeleton: {
      from: renderColor(cardColor.skeleton.from[i], colorOptions),
      to: renderColor(cardColor.skeleton.to[i], colorOptions),
    },
  }
}

function buildInputState(
  colorElement: ThemeColorElement,
  options: {
    dark: boolean
    defaultHue: Hue
    palette: ThemePalette_v3
  },
): ThemeColorInputState_v2 {
  const {dark, defaultHue, palette} = options
  const colorOptions = {defaultHue, palette}
  const i = dark ? 1 : 0

  return {
    bg: renderColor(colorElement.bg[0][i], colorOptions),

    border: renderColor(colorElement.bg[0][i], colorOptions),

    fg: renderColor(colorElement.fg[0][i], colorOptions),
    muted: {
      bg: renderColor(colorElement.bg[0][i], colorOptions),
    },

    placeholder: renderColor(colorElement.fg[0][i], colorOptions),
  }
}
