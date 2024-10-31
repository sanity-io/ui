import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATE_TONES,
  THEME_COLOR_STATES,
  ThemeColorBadge_v2,
  ThemeColorButton_v2,
  ThemeColorButtonMode_v2,
  ThemeColorButtonTone_v2,
  ThemeColorCard_v2,
  ThemeColorInput_v2,
  ThemeColorInputMode_v2,
  ThemeColorInputState_v2,
  ThemeColorSelectable_v2,
  ThemeColorSelectableTone_v2,
  ThemeColorState_v2,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
} from '../v2'
import {ThemeColorCard_v3, ThemeColorElement, ThemeColorVariantKey} from '../v3'

export function themeColor_v3_v2(options: {
  color: ThemeColorCard_v3
  dark: boolean
}): ThemeColorCard_v2 {
  const {color, dark} = options

  return {
    _blend: 'screen',
    _dark: dark,
    ...buildColorState({
      cardColor: color,
      state: 'enabled',
      tone: 'default',
      variant: 'tinted',
    }),
    backdrop: color.backdrop,
    button: THEME_COLOR_BUTTON_MODES.reduce<ThemeColorButton_v2>((modes, mode) => {
      modes[mode] = THEME_COLOR_STATE_TONES.reduce<ThemeColorButtonMode_v2>((tones, tone) => {
        tones[tone] = THEME_COLOR_STATES.reduce<ThemeColorButtonTone_v2>((states, state) => {
          states[state] = buildColorState({
            cardColor: color,
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
    focusRing: color.focusRing,
    input: THEME_COLOR_INPUT_MODES.reduce<ThemeColorInput_v2>((modes, mode) => {
      modes[mode] = THEME_COLOR_INPUT_STATES.reduce<ThemeColorInputMode_v2>((states, state) => {
        states[state] = buildInputState(color.variant.tinted.default)

        return states
      }, {} as ThemeColorInputMode_v2)

      return modes
    }, {} as ThemeColorInput_v2),
    selectable: THEME_COLOR_STATE_TONES.reduce<ThemeColorSelectable_v2>((tones, tone) => {
      tones[tone] = THEME_COLOR_STATES.reduce<ThemeColorSelectableTone_v2>((states, state) => {
        states[state] = buildColorState({
          cardColor: color,
          // cardVars: vars,
          state,
          tone,
          variant: 'tinted',
        })

        return states
      }, {} as ThemeColorSelectableTone_v2)

      return tones
    }, {} as ThemeColorSelectable_v2),
    shadow: color.shadow,
    syntax: color.token,
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
    0: string
    4: string
  },
  index: ElementTokenIndex,
) {
  if (index === 0) {
    return tokens[0]
  }

  if (index === 4) {
    return tokens[4]
  }

  return `color-mix(in oklch, ${tokens[0]}, ${tokens[4]} ${index * 25}%)`
}

function buildColorState(options: {
  cardColor: ThemeColorCard_v3
  state: ThemeColorStateKey
  tone: ThemeColorStateToneKey
  variant: ThemeColorVariantKey
}): ThemeColorState_v2 {
  const {cardColor, state, tone, variant} = options
  const color = cardColor.variant[variant][tone]

  const shades = stateShades[state]

  return {
    accent: {
      fg: color.fg[4],
    },
    avatar: cardColor.avatar,
    badge: THEME_COLOR_STATE_TONES.reduce<ThemeColorBadge_v2>((tones, tone) => {
      tones[tone] = {
        bg: mix(color.bg, 1),
        fg: mix(color.fg, 1),
        dot: mix(color.fg, 3),
        icon: mix(color.fg, 3),
      }

      return tones
    }, {} as ThemeColorBadge_v2),
    bg: mix(color.bg, shades.bg[0]),
    border: mix(color.border, shades.border[0]),
    fg: mix(color.fg, shades.fg[0]),
    code: {
      bg: mix(color.bg, shades.bg[1]),
      fg: mix(color.fg, shades.fg[2]),
    },
    icon: mix(color.fg, shades.fg[2]),
    kbd: {
      bg: mix(color.bg, 0),
      fg: mix(color.fg, 0),
      border: mix(color.bg, 0),
    },
    link: {
      fg: mix(color.fg, shades.fg[2]),
    },
    muted: {
      bg: mix(color.bg, shades.bg[1]),
      fg: mix(color.fg, shades.fg[2]),
    },
    skeleton: cardColor.skeleton,
  }
}

function buildInputState(colorElement: ThemeColorElement): ThemeColorInputState_v2 {
  return {
    bg: colorElement.bg[0],
    border: colorElement.bg[0],
    fg: colorElement.fg[0],
    muted: {
      bg: colorElement.bg[0],
    },
    placeholder: colorElement.fg[0],
  }
}
