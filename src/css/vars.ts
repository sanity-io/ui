import {
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_TEXT_SIZE,
  FontCodeSize,
  FontHeadingSize,
  FontLabelSize,
  FontTextSize,
  SPACE,
  type Space,
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATE_TONES,
  type ThemeColorCardToneKey,
  type ThemeColorInputModeKey,
  type ThemeColorInputStateKey,
  type ThemeColorSchemeKey,
  ThemeColorStateToneKey,
} from '@sanity/ui/theme'
import {
  ColorBadgeToneVars,
  ColorBadgeVars,
  ColorStateVars,
  FontSizeVars,
  type ColorAvatarVars,
  // type ColorBadgeVars,
  type ColorCardVars,
  type ColorInputModeVars,
  type ColorInputStateVars,
  type ColorInputVars,
  type ColorSchemeVars,
  type CSSVar,
  type Vars,
} from './types'
import {varNames} from './varNames'

export const vars: Vars = {
  color: {
    dark: THEME_COLOR_CARD_TONES.reduce((acc, tone) => {
      return {
        ...acc,
        [tone]: buildColorCardVars({scheme: 'dark', tone}),
      }
    }, {} as ColorSchemeVars),
    light: THEME_COLOR_CARD_TONES.reduce((acc, tone) => {
      return {
        ...acc,
        [tone]: buildColorCardVars({scheme: 'light', tone}),
      }
    }, {} as ColorSchemeVars),

    accent: {
      fg: `var(--color-accent-fg)`,
    },
    avatar: {
      ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
        return {
          ...acc,
          [color]: {
            bg: `var(--color-avatar-${color}-bg)`,
            fg: `var(--color-avatar-${color}-fg)`,
          },
        }
      }, {} as ColorAvatarVars),
    },
    // badge: {
    //   bg: `var(--color-badge-bg)`,
    //   dot: `var(--color-badge-dot)`,
    //   fg: `var(--color-badge-fg)`,
    //   icon: `var(--color-badge-icon)`,
    //   ...THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
    //     return {
    //       ...acc,
    //       [tone]: {
    //         bg: `var(--color-badge-${tone}-bg)`,
    //         dot: `var(--color-badge-${tone}-dot)`,
    //         fg: `var(--color-badge-${tone}-fg)`,
    //         icon: `var(--color-badge-${tone}-icon)`,
    //       },
    //     }
    //   }, {} as ColorBadgeVars),
    // },
    // bg: `var(--color-bg)`,
    bg: {
      1: `var(--color-bg-1)`,
      2: `var(--color-bg-2)`,
      3: `var(--color-bg-3)`,
      4: `var(--color-bg-4)`,
    },
    border: `var(--color-border)`,
    code: {
      bg: `var(--color-code-bg)`,
      fg: `var(--color-code-fg)`,
    },
    fg: `var(--color-fg)`,
    icon: `var(--color-icon)`,
    input: {
      ...THEME_COLOR_INPUT_MODES.reduce((acc, mode) => {
        return {
          ...acc,
          [mode]: {
            ...THEME_COLOR_INPUT_STATES.reduce((acc, state) => {
              return {
                ...acc,
                [state]: {
                  bg: `var(--color-bg)`,
                  border: `var(--color-border)`,
                  fg: `var(--color-fg)`,
                  muted: {
                    fg: `var(--color-muted-fg)`,
                  },
                  placeholder: `var(--color-placeholder)`,
                },
              }
            }, {} as ColorInputModeVars),
          },
        }
      }, {} as ColorInputVars),
    },
    kbd: {
      bg: `var(--color-kbd-bg)`,
      border: `var(--color-kbd-border)`,
      fg: `var(--color-kbd-fg)`,
    },
    link: {
      fg: `var(--color-link-fg)`,
    },
    muted: {
      bg: `var(--color-muted-bg)`,
      fg: `var(--color-muted-fg)`,
    },
    shadow: {
      outline: `var(--color-shadow-outline)`,
      umbra: `var(--color-shadow-umbra)`,
      penumbra: `var(--color-shadow-penumbra)`,
      ambient: `var(--color-shadow-ambient)`,
    },
    skeleton: {
      from: `var(--color-skeleton-from)`,
      to: `var(--color-skeleton-to)`,
    },
    solid: {
      ...THEME_COLOR_STATE_TONES.reduce(
        (acc, tone) => {
          return {
            ...acc,
            [tone]: {
              bg: {
                1: `var(--color-solid-${tone}-bg-1)`,
                2: `var(--color-solid-${tone}-bg-2)`,
                3: `var(--color-solid-${tone}-bg-3)`,
                4: `var(--color-solid-${tone}-bg-4)`,
              },
              // fg: {
              //   1: `var(--color-solid-${tone}-fg-1)`,
              //   2: `var(--color-solid-${tone}-fg-2)`,
              //   3: `var(--color-solid-${tone}-fg-3)`,
              //   4: `var(--color-solid-${tone}-fg-4)`,
              // },
            },
          }
        },
        {} as Record<ThemeColorStateToneKey, ColorStateVars>,
      ),
    },
    syntax: {
      atrule: `var(--color-syntax-atrule)`,
      attrName: `var(--color-syntax-attrName)`,
      attrValue: `var(--color-syntax-attrValue)`,
      attribute: `var(--color-syntax-attribute)`,
      boolean: `var(--color-syntax-boolean)`,
      builtin: `var(--color-syntax-builtin)`,
      cdata: `var(--color-syntax-cdata)`,
      char: `var(--color-syntax-char)`,
      class: `var(--color-syntax-class)`,
      className: `var(--color-syntax-className)`,
      comment: `var(--color-syntax-comment)`,
      constant: `var(--color-syntax-constant)`,
      deleted: `var(--color-syntax-deleted)`,
      doctype: `var(--color-syntax-doctype)`,
      entity: `var(--color-syntax-entity)`,
      function: `var(--color-syntax-function)`,
      hexcode: `var(--color-syntax-hexcode)`,
      id: `var(--color-syntax-id)`,
      important: `var(--color-syntax-important)`,
      inserted: `var(--color-syntax-inserted)`,
      keyword: `var(--color-syntax-keyword)`,
      number: `var(--color-syntax-number)`,
      operator: `var(--color-syntax-operator)`,
      prolog: `var(--color-syntax-prolog)`,
      property: `var(--color-syntax-property)`,
      pseudoClass: `var(--color-syntax-pseudoClass)`,
      pseudoElement: `var(--color-syntax-pseudoElement)`,
      punctuation: `var(--color-syntax-punctuation)`,
      regex: `var(--color-syntax-regex)`,
      selector: `var(--color-syntax-selector)`,
      string: `var(--color-syntax-string)`,
      symbol: `var(--color-syntax-symbol)`,
      tag: `var(--color-syntax-tag)`,
      unit: `var(--color-syntax-unit)`,
      url: `var(--color-syntax-url)`,
      variable: `var(--color-syntax-variable)`,
    },
    tinted: {
      ...THEME_COLOR_STATE_TONES.reduce(
        (acc, tone) => {
          return {
            ...acc,
            [tone]: {
              bg: {
                1: `var(--color-tinted-${tone}-bg-1)`,
                2: `var(--color-tinted-${tone}-bg-2)`,
                3: `var(--color-tinted-${tone}-bg-3)`,
                4: `var(--color-tinted-${tone}-bg-4)`,
              },
              // fg: {
              //   1: `var(--color-tinted-${tone}-fg-1)`,
              //   2: `var(--color-tinted-${tone}-fg-2)`,
              //   3: `var(--color-tinted-${tone}-fg-3)`,
              //   4: `var(--color-tinted-${tone}-fg-4)`,
              // },
            },
          }
        },
        {} as Record<ThemeColorStateToneKey, ColorStateVars>,
      ),
    },
  },
  font: {
    code: {
      family: `var(--font-code-family)`,
      sizes: FONT_CODE_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(--font-code-${size}-size)`,
              ascenderHeight: `var(--font-code-${size}-ascender-height)`,
              descenderHeight: `var(--font-code-${size}-descender-height)`,
              lineHeight: `var(--font-code-${size}-line-height)`,
              letterSpacing: `var(--font-code-${size}-letter-spacing)`,
              iconSize: `var(--font-code-${size}-icon-size)`,
            },
          }
        },
        {} as Record<FontCodeSize, FontSizeVars>,
      ),
    },
    heading: {
      family: `var(--font-heading-family)`,
      sizes: FONT_HEADING_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(--font-code-${size}-size)`,
              ascenderHeight: `var(--font-code-${size}-ascender-height)`,
              descenderHeight: `var(--font-code-${size}-descender-height)`,
              lineHeight: `var(--font-code-${size}-line-height)`,
              letterSpacing: `var(--font-code-${size}-letter-spacing)`,
              iconSize: `var(--font-code-${size}-icon-size)`,
            },
          }
        },
        {} as Record<FontHeadingSize, FontSizeVars>,
      ),
    },
    label: {
      family: `var(--font-label-family)`,
      sizes: FONT_CODE_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(--font-code-${size}-size)`,
              ascenderHeight: `var(--font-code-${size}-ascender-height)`,
              descenderHeight: `var(--font-code-${size}-descender-height)`,
              lineHeight: `var(--font-code-${size}-line-height)`,
              letterSpacing: `var(--font-code-${size}-letter-spacing)`,
              iconSize: `var(--font-code-${size}-icon-size)`,
            },
          }
        },
        {} as Record<FontLabelSize, FontSizeVars>,
      ),
    },
    text: {
      family: `var(--font-text-family)`,
      sizes: FONT_TEXT_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(--font-code-${size}-size)`,
              ascenderHeight: `var(--font-code-${size}-ascender-height)`,
              descenderHeight: `var(--font-code-${size}-descender-height)`,
              lineHeight: `var(--font-code-${size}-line-height)`,
              letterSpacing: `var(--font-code-${size}-letter-spacing)`,
              iconSize: `var(--font-code-${size}-icon-size)`,
            },
          }
        },
        {} as Record<FontTextSize, FontSizeVars>,
      ),
    },
  },
  space: Object.fromEntries(
    SPACE.map((space) => [space, `var(${varNames.space[space]})` satisfies CSSVar]),
  ) as Record<Space, CSSVar>,
} as const

function buildColorCardVars(props: {
  scheme: ThemeColorSchemeKey
  tone: ThemeColorCardToneKey
}): ColorCardVars {
  const {scheme, tone} = props

  const prefix = `--color-${scheme}-${tone}` as const

  return {
    accent: {
      fg: `var(${prefix}-accent-fg)`,
    },
    avatar: {
      ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
        return {
          ...acc,
          [color]: {
            bg: `var(${prefix}-avatar-${color}-bg)`,
            fg: `var(${prefix}-avatar-${color}-fg)`,
          },
        }
      }, {} as ColorAvatarVars),
    },
    backdrop: `var(${prefix}-backdrop)`,
    badge: {
      ...THEME_COLOR_STATE_TONES.reduce(
        (acc, tone) => {
          return {
            ...acc,
            [tone]: {
              bg: `var(${prefix}-badge-${tone}-bg)`,
              dot: `var(${prefix}-badge-${tone}-dot)`,
              fg: `var(${prefix}-badge-${tone}-fg)`,
              icon: `var(${prefix}-badge-${tone}-icon)`,
            },
          }
        },
        {
          bg: `var(${prefix}-badge-bg)`,
          dot: `var(${prefix}-badge-dot)`,
          fg: `var(${prefix}-badge-fg)`,
          icon: `var(${prefix}-badge-icon)`,
        } as {} as ColorBadgeVars & ColorBadgeToneVars,
      ),
    },
    // bg: `var(${prefix}-bg)`,
    bg: {
      1: `var(${prefix}-bg-1)`,
      2: `var(${prefix}-bg-2)`,
      3: `var(${prefix}-bg-3)`,
      4: `var(${prefix}-bg-4)`,
    },
    border: `var(${prefix}-border)`,
    code: {
      bg: `var(${prefix}-code-bg)`,
      fg: `var(${prefix}-code-fg)`,
    },
    fg: `var(${prefix}-fg)`,
    focusRing: `var(${prefix}-focus-ring)`,
    icon: `var(${prefix}-icon)`,
    input: {
      ...THEME_COLOR_INPUT_MODES.reduce((acc, mode) => {
        return {
          ...acc,
          [mode]: {
            ...THEME_COLOR_INPUT_STATES.reduce((acc, state) => {
              return {
                ...acc,
                [state]: buildColorInputStateVars({mode, scheme, state, tone}),
              }
            }, {} as ColorInputModeVars),
          },
        }
      }, {} as ColorInputVars),
    },
    kbd: {
      bg: `var(${prefix}-kbd-bg)`,
      border: `var(${prefix}-kbd-border)`,
      fg: `var(${prefix}-kbd-fg)`,
    },
    link: {
      fg: `var(${prefix}-link-fg)`,
    },
    muted: {
      bg: `var(${prefix}-muted-bg)`,
      fg: `var(${prefix}-muted-fg)`,
    },
    skeleton: {
      from: `var(${prefix}-skeleton-from)`,
      to: `var(${prefix}-skeleton-to)`,
    },
    shadow: {
      outline: `var(${prefix}-shadow-outline)`,
      umbra: `var(${prefix}-shadow-umbra)`,
      penumbra: `var(${prefix}-shadow-penumbra)`,
      ambient: `var(${prefix}-shadow-ambient)`,
    },
    syntax: {
      atrule: `var(${prefix}-syntax-atrule)`,
      attrName: `var(${prefix}-syntax-attrName)`,
      attrValue: `var(${prefix}-syntax-attrValue)`,
      attribute: `var(${prefix}-syntax-attribute)`,
      boolean: `var(${prefix}-syntax-boolean)`,
      builtin: `var(${prefix}-syntax-builtin)`,
      cdata: `var(${prefix}-syntax-cdata)`,
      char: `var(${prefix}-syntax-char)`,
      class: `var(${prefix}-syntax-class)`,
      className: `var(${prefix}-syntax-className)`,
      comment: `var(${prefix}-syntax-comment)`,
      constant: `var(${prefix}-syntax-constant)`,
      deleted: `var(${prefix}-syntax-deleted)`,
      doctype: `var(${prefix}-syntax-doctype)`,
      entity: `var(${prefix}-syntax-entity)`,
      function: `var(${prefix}-syntax-function)`,
      hexcode: `var(${prefix}-syntax-hexcode)`,
      id: `var(${prefix}-syntax-id)`,
      important: `var(${prefix}-syntax-important)`,
      inserted: `var(${prefix}-syntax-inserted)`,
      keyword: `var(${prefix}-syntax-keyword)`,
      number: `var(${prefix}-syntax-number)`,
      operator: `var(${prefix}-syntax-operator)`,
      prolog: `var(${prefix}-syntax-prolog)`,
      property: `var(${prefix}-syntax-property)`,
      pseudoClass: `var(${prefix}-syntax-pseudoClass)`,
      pseudoElement: `var(${prefix}-syntax-pseudoElement)`,
      punctuation: `var(${prefix}-syntax-punctuation)`,
      regex: `var(${prefix}-syntax-regex)`,
      selector: `var(${prefix}-syntax-selector)`,
      string: `var(${prefix}-syntax-string)`,
      symbol: `var(${prefix}-syntax-symbol)`,
      tag: `var(${prefix}-syntax-tag)`,
      unit: `var(${prefix}-syntax-unit)`,
      url: `var(${prefix}-syntax-url)`,
      variable: `var(${prefix}-syntax-variable)`,
    },
  }
}

function buildColorInputStateVars(props: {
  mode: ThemeColorInputModeKey
  scheme: ThemeColorSchemeKey
  state: ThemeColorInputStateKey
  tone: ThemeColorCardToneKey
}): ColorInputStateVars {
  const {mode, scheme, state, tone} = props

  const prefix = `--color-${scheme}-${tone}-input-${mode}-${state}` as const

  return {
    bg: `var(${prefix}-bg)`,
    border: `var(${prefix}-border)`,
    fg: `var(${prefix}-fg)`,
    muted: {
      bg: `var(${prefix}-muted-bg)`,
    },
    placeholder: `var(${prefix}-placeholder)`,
  }
}
