import {THEME_COLOR_AVATAR_COLORS, THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import {Properties, Rules} from '../../types'

export const cardRules: Rules = {
  card: {
    'backgroundColor': 'var(--card-bg-color)',
    'color': 'var(--card-fg-color)',

    /* deprecated variables (kept for legacy) */
    '--card-accent-fg-color': 'var(--color-accent-fg)',

    ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
      return {
        ...acc,
        [`--card-avatar-${color}-bg-color`]: `var(--color-avatar-${color}-bg)`,
        [`--card-avatar-${color}-fg-color`]: `var(--color-avatar-${color}-fg)`,
      }
    }, {} as Properties),

    '--card-backdrop-color': 'var(--color-backdrop)',

    ...THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
      return {
        ...acc,
        [`--card-badge-${tone}-bg-color`]: `var(--color-badge-${tone}-bg)`,
        [`--card-badge-${tone}-dot-color`]: `var(--color-badge-${tone}-dot)`,
        [`--card-badge-${tone}-fg-color`]: `var(--color-badge-${tone}-fg)`,
        [`--card-badge-${tone}-icon-color`]: `var(--color-badge-${tone}-icon)`,
      }
    }, {} as Properties),

    '--card-bg-color': 'var(--color-bg)',
    '--card-border-color': 'var(--color-border)',
    '--card-code-bg-color': 'var(--color-code-bg)',
    '--card-code-fg-color': 'var(--color-code-fg)',
    '--card-fg-color': 'var(--color-fg)',
    '--card-focus-ring-color': 'var(--color-focus-ring)',

    '--card-icon-color': 'var(--color-icon)',

    '--card-kbd-bg-color': 'var(--color-kbd-bg)',
    '--card-kbd-border-color': 'var(--color-kbd-border)',
    '--card-kbd-fg-color': 'var(--color-kbd-fg)',

    '--card-link-fg-color': 'var(--color-link-fg)',

    '--card-muted-bg-color': 'var(--color-muted-bg)',
    '--card-muted-fg-color': 'var(--color-muted-fg)',

    '--card-shadow-outline-color': 'var(--color-shadow-outline)',
    '--card-shadow-umbra-color': 'var(--color-shadow-umbra)',
    '--card-shadow-penumbra-color': 'var(--color-shadow-penumbra)',
    '--card-shadow-ambient-color': 'var(--color-shadow-ambient)',

    '--card-skeleton-from-color': 'var(--color-skeleton-from)',
    '--card-skeleton-to-color': 'var(--color-skeleton-to)',

    '--card-bg2-color': `var(--color-muted-bg)`,
    '--card-link-color': `var(--color-link-fg)`,
    '--card-hairline-soft-color': `var(--color-border)`,
    '--card-hairline-hard-color': `var(--color-border)`,

    '@nest': {
      '&[data-checkered]': {
        '--card-bg-image': `repeating-conic-gradient(var(--color-bg) 0% 25%, var(--color-muted-bg) 0% 50%)`,
        'backgroundSize': `var(--space-3) var(--space-3)`,
        'backgroundPosition': '50% 50%',
        'backgroundImage': 'var(--card-bg-image)',
      },

      '&[data-as="button"]': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        outline: 'none',
        font: 'inherit',
        textAlign: 'inherit',
        border: 0,
        width: ['-moz-available', '-webkit-fill-available', 'stretch'],
      },

      '&[data-as="a"]': {
        outline: 'none',
        textDecoration: 'none',
      },

      '&[data-as="pre"]': {
        font: 'inherit',
      },
    },
  },
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
