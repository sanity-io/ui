import {
  HUES,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  type ThemeColorCardToneKey,
  type ThemeColorSchemeKey,
} from '@sanity/ui/theme'
import {Properties, type Rules} from '../../types'

export const cardRules: Rules = {
  card: {
    'backgroundColor': 'var(--color-bg)',
    'color': 'var(--color-fg)',

    '--color-bg': 'var(--color-tinted-default-bg-0)',
    '--color-border': 'var(--color-tinted-default-border-1)',
    '--color-fg': 'var(--color-tinted-default-fg-0)',
    // '--color-icon': 'var(--color-tinted-default-fg-4)',
    '--color-muted-bg': 'var(--color-tinted-default-bg-1)',
    '--color-muted-fg': 'var(--color-tinted-default-fg-4)',

    /* deprecated variables (kept for legacy) */

    // '--card-accent-fg-color': 'var(--color-accent-fg)',

    // ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
    //   return {
    //     ...acc,
    //     [`--card-avatar-${color}-bg-color`]: `var(--color-avatar-${color}-bg)`,
    //     [`--card-avatar-${color}-fg-color`]: `var(--color-avatar-${color}-fg)`,
    //   }
    // }, {} as Properties),

    // '--card-backdrop-color': 'var(--color-backdrop)',

    // ...THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
    //   return {
    //     ...acc,
    //     [`--card-badge-${tone}-bg-color`]: `var(--color-badge-${tone}-bg)`,
    //     [`--card-badge-${tone}-dot-color`]: `var(--color-badge-${tone}-dot)`,
    //     [`--card-badge-${tone}-fg-color`]: `var(--color-badge-${tone}-fg)`,
    //     [`--card-badge-${tone}-icon-color`]: `var(--color-badge-${tone}-icon)`,
    //   }
    // }, {} as Properties),

    '--card-bg-color': 'var(--color-bg)',
    '--card-border-color': 'var(--color-border)',
    '--card-code-bg-color': 'var(--color-tinted-default-bg-1)',
    '--card-code-fg-color': 'var(--color-tinted-default-fg-4)',
    '--card-fg-color': 'var(--color-fg)',
    '--card-focus-ring-color': 'var(--color-focus-ring)',
    '--card-icon-color': 'var(--color-fg)',
    '--card-kbd-bg-color': 'var(--color-tinted-default-bg-1)',
    '--card-kbd-border-color': 'var(--color-tinted-default-border-1)',
    '--card-kbd-fg-color': 'var(--color-tinted-default-fg-4)',
    '--card-link-fg-color': 'var(--color-link-fg)',
    '--card-muted-bg-color': 'var(--color-tinted-default-bg-1)',
    '--card-muted-fg-color': 'var(--color-tinted-default-fg-4)',

    '--card-shadow-outline-color': 'var(--color-shadow-outline)',
    '--card-shadow-umbra-color': 'var(--color-shadow-umbra)',
    '--card-shadow-penumbra-color': 'var(--color-shadow-penumbra)',
    '--card-shadow-ambient-color': 'var(--color-shadow-ambient)',

    // // '--card-skeleton-from-color': 'var(--color-skeleton-from)',
    // // '--card-skeleton-to-color': 'var(--color-skeleton-to)',

    '--card-bg2-color': `var(--color-tinted-default-bg-1)`,
    // '--card-link-color': `var(--color-link-fg)`,
    '--card-hairline-soft-color': `var(--color-tinted-default-border-1)`,
    '--card-hairline-hard-color': `var(--color-tinted-default-border-2)`,

    '@nest': {
      ...buildCardTonesRules(),

      '&[data-checkered]': {
        '--card-bg-image': `repeating-conic-gradient(var(--color-tinted-default-bg-0) 0% 25%, var(--color-tinted-default-bg-1) 0% 50%)`,
        'backgroundSize': `var(--space-3) var(--space-3)`,
        'backgroundPosition': '50% 50%',
        'backgroundImage': 'var(--card-bg-image)',
      },

      '&[data-as="a"]': {
        'outline': 'none',
        'textDecoration': 'none',

        '@nest': {
          '&:not(:disabled)': {
            '@nest': {
              '&:hover': {
                '--color-bg': 'var(--color-tinted-default-bg-1)',
                '--color-fg': 'var(--color-tinted-default-fg-0)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-2)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-3)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              '&:active, &[data-pressed]': {
                '--color-bg': 'var(--color-tinted-default-bg-2)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-3)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-4)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              //
              '&[data-selectable]:focus, &[data-selected]': {
                '--color-bg': 'var(--color-solid-default-bg-1)',
                '--color-fg': 'var(--color-solid-default-fg-1)',
                '--color-muted-bg': 'var(--color-solid-default-bg-0)',
                '--color-muted-fg': 'var(--color-solid-default-fg-3)',
                // '--color-icon': 'var(--color-solid-default-fg-1)',
              },
            },
          },
        },
      },

      '&[data-as="button"]': {
        'WebkitFontSmoothing': 'inherit',
        'appearance': 'none',
        'outline': 'none',
        'font': 'inherit',
        'textAlign': 'inherit',
        'border': 0,
        'width': ['-moz-available', '-webkit-fill-available', 'stretch'],

        '@nest': {
          '&:not(:disabled)': {
            '@nest': {
              '&:hover': {
                '--color-bg': 'var(--color-tinted-default-bg-1)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-2)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-3)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              '&:active': {
                '--color-bg': 'var(--color-tinted-default-bg-2)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-3)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-4)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              '&[data-pressed]': {
                '--color-bg': 'var(--color-tinted-default-bg-2)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-3)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-4)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              // &:focus,
              '&[data-selectable]:focus, &[data-selected]': {
                '--color-bg': 'var(--color-solid-default-bg-2)',
                '--color-fg': 'var(--color-solid-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-3)',
                '--color-muted-fg': 'var(--color-solid-default-fg-4)',
                // '--color-icon': 'var(--color-solid-default-fg-1)',
              },
            },
          },

          '&:disabled': {
            '--color-bg': 'var(--color-tinted-default-bg-0)',
            '--color-fg': 'var(--color-tinted-default-border-2)',
            '--color-muted-fg': 'var(--color-tinted-default-border-1)',
          },
        },
      },

      '&[data-as="pre"]': {
        font: 'inherit',
      },
    },
  },
}

function buildCardTonesRules() {
  const rules: Record<string, Properties> = {}

  for (const scheme of ['light', 'dark'] as const) {
    for (const cardTone of THEME_COLOR_CARD_TONES) {
      const sourcePrefix = `--color-${scheme}-${cardTone}`

      rules[`&[data-scheme="${scheme}"][data-tone="${cardTone}"]`] = {
        ...buildCardAvatarColorProperties({
          scheme: 'dark',
          cardTone: 'transparent',
        }),

        '--color-backdrop': `var(${sourcePrefix}-backdrop)`,
        '--color-focus-ring': `var(${sourcePrefix}-focus-ring)`,
        '--color-link-fg': `var(${sourcePrefix}-link-fg)`,

        '--color-shadow-outline': `var(${sourcePrefix}-shadow-outline)`,
        '--color-shadow-umbra': `var(${sourcePrefix}-shadow-umbra)`,
        '--color-shadow-penumbra': `var(${sourcePrefix}-shadow-penumbra)`,
        '--color-shadow-ambient': `var(${sourcePrefix}-shadow-ambient)`,

        ...buildCardColorVariantProperties({
          scheme,
          cardTone,
          variant: 'solid',
        }),

        ...buildCardColorVariantProperties({
          scheme,
          cardTone,
          variant: 'tinted',
        }),
      }
    }
  }

  return rules
}

function buildCardAvatarColorProperties(options: {
  scheme: ThemeColorSchemeKey
  cardTone: ThemeColorCardToneKey
}): Properties {
  const {scheme, cardTone} = options

  const targetPrefix = `--color`
  const sourcePrefix = `--color-${scheme}-${cardTone}`

  const props: Properties = {}

  for (const hue of HUES) {
    Object.assign(props, {
      [`${targetPrefix}-avatar-${hue}-bg`]: `var(${sourcePrefix}-avatar-${hue}-bg)`,
      [`${targetPrefix}-avatar-${hue}-fg`]: `var(${sourcePrefix}-avatar-${hue}-fg)`,
    } satisfies Properties)
  }

  return props
}

function buildCardColorVariantProperties(options: {
  scheme: ThemeColorSchemeKey
  cardTone: ThemeColorCardToneKey
  variant: 'solid' | 'tinted'
}): Properties {
  const {scheme, cardTone, variant} = options

  const targetPrefix = `--color-${variant}`
  const sourcePrefix = `--color-${scheme}-${cardTone}-${variant}`

  const props: Properties = {}

  for (const elementTone of THEME_COLOR_STATE_TONES) {
    Object.assign(props, {
      [`${targetPrefix}-${elementTone}-bg-0`]: `var(${sourcePrefix}-${elementTone}-bg-0)`,
      [`${targetPrefix}-${elementTone}-bg-1`]: `var(${sourcePrefix}-${elementTone}-bg-1)`,
      [`${targetPrefix}-${elementTone}-bg-2`]: `var(${sourcePrefix}-${elementTone}-bg-2)`,
      [`${targetPrefix}-${elementTone}-bg-3`]: `var(${sourcePrefix}-${elementTone}-bg-3)`,
      [`${targetPrefix}-${elementTone}-bg-4`]: `var(${sourcePrefix}-${elementTone}-bg-4)`,
      [`${targetPrefix}-${elementTone}-border-0`]: `var(${sourcePrefix}-${elementTone}-border-0)`,
      [`${targetPrefix}-${elementTone}-border-1`]: `var(${sourcePrefix}-${elementTone}-border-1)`,
      [`${targetPrefix}-${elementTone}-border-2`]: `var(${sourcePrefix}-${elementTone}-border-2)`,
      [`${targetPrefix}-${elementTone}-border-3`]: `var(${sourcePrefix}-${elementTone}-border-3)`,
      [`${targetPrefix}-${elementTone}-border-4`]: `var(${sourcePrefix}-${elementTone}-border-4)`,
      [`${targetPrefix}-${elementTone}-fg-0`]: `var(${sourcePrefix}-${elementTone}-fg-0)`,
      [`${targetPrefix}-${elementTone}-fg-1`]: `var(${sourcePrefix}-${elementTone}-fg-1)`,
      [`${targetPrefix}-${elementTone}-fg-2`]: `var(${sourcePrefix}-${elementTone}-fg-2)`,
      [`${targetPrefix}-${elementTone}-fg-3`]: `var(${sourcePrefix}-${elementTone}-fg-3)`,
      [`${targetPrefix}-${elementTone}-fg-4`]: `var(${sourcePrefix}-${elementTone}-fg-4)`,
    } satisfies Properties)
  }

  return props
}

// import {getTheme_v2} from '@sanity/ui/theme'
// import {css} from '../../lib/styled'
// // import {ThemeProps} from '../../styles'
// // import {_cardColorStyle} from '../../styles/card'
// // import {focusRingStyle} from '../../styles/focusRing'
// import {CardStyleProps} from './types'
// import {ThemeProps} from '../../_compat'
// import {_cardColorStyle} from '../../_compat/styles/card'
// import {focusRingStyle} from '../../_compat/styles/focusRing'

// export function cardStyle(
//   props: CardStyleProps & ThemeProps,
// ): Array<ReturnType<typeof css> | (() => ReturnType<typeof css>)> {
//   return [cardBaseStyle(props), cardColorStyle(props)]
// }

// export function cardBaseStyle(props: CardStyleProps & ThemeProps): ReturnType<typeof css> {
//   const {$checkered} = props
//   const {space} = getTheme_v2(props.theme)

//   return css`
//     ${$checkered &&
//     css`
//       background-size: ${space[3]}px ${space[3]}px;
//       background-position: 50% 50%;
//       background-image: var(--card-bg-image);
//     `}

//     &[data-as='button'] {
//       -webkit-font-smoothing: inherit;
//       appearance: none;
//       outline: none;
//       font: inherit;
//       text-align: inherit;
//       border: 0;
//       width: -moz-available;
//       width: -webkit-fill-available;
//       width: stretch;
//     }

//     /* &:is(a) */
//     &[data-as='a'] {
//       outline: none;
//       text-decoration: none;
//     }

//     /* &:is(pre) */
//     &[data-as='pre'] {
//       font: inherit;
//     }
//   `
// }

// export function cardColorStyle(props: CardStyleProps & ThemeProps): ReturnType<typeof css> {
//   const {$checkered, $focusRing, $muted} = props
//   const {card, color, style} = getTheme_v2(props.theme)
//   const border = {width: card.border.width, color: 'var(--card-border-color)'}

//   return css`
//     color-scheme: ${color._dark ? 'dark' : 'light'};

//     ${_cardColorStyle(color, color, $checkered)}

//     background-color: ${$muted ? 'var(--card-muted-bg-color)' : 'var(--card-bg-color)'};
//     color: var(--card-fg-color);

//     /* &:is(button) */
//     &[data-as='button'] {
//       --card-focus-ring-box-shadow: none;

//       cursor: default;
//       box-shadow: var(--card-focus-ring-box-shadow);

//       &:disabled {
//         ${_cardColorStyle(color, color.selectable.default.disabled, $checkered)}
//       }

//       &:not(:disabled) {
//         &[data-pressed] {
//           ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//         }

//         &[data-selected] {
//           ${_cardColorStyle(color, color.selectable.default.selected, $checkered)}
//         }

//         @media (hover: hover) {
//           &:not([data-pressed]):not([data-selected]) {
//             &[data-hovered],
//             &:hover {
//               ${_cardColorStyle(color, color.selectable.default.hovered, $checkered)}
//             }

//             &:active {
//               ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//             }
//           }
//         }

//         &:focus-visible {
//           --card-focus-ring-box-shadow: ${$focusRing
//             ? focusRingStyle({base: color, border, focusRing: card.focusRing})
//             : undefined};
//         }
//       }
//     }

//     /* &:is(a) */
//     &[data-as='a'] {
//       cursor: pointer;
//       box-shadow: var(--card-focus-ring-box-shadow);

//       &[data-disabled] {
//         ${_cardColorStyle(color, color.selectable.default.disabled, $checkered)}
//       }

//       &:not([data-disabled]) {
//         &[data-pressed] {
//           ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//         }

//         &[data-selected] {
//           ${_cardColorStyle(color, color.selectable.default.selected, $checkered)}
//         }

//         @media (hover: hover) {
//           &:not([data-pressed]):not([data-selected]) {
//             &[data-hovered],
//             &:hover {
//               ${_cardColorStyle(color, color.selectable.default.hovered, $checkered)}
//             }

//             &:active {
//               ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//             }
//           }
//         }

//         &:focus-visible {
//           --card-focus-ring-box-shadow: ${$focusRing
//             ? focusRingStyle({base: color, border, focusRing: card.focusRing})
//             : undefined};
//         }
//       }
//     }

//     ${style?.card?.root}
//   `
// }
