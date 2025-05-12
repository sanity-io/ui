import {THEME_COLOR_BUTTON_MODES, THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {Rules} from '../../types'
import {toneMap, variantMap} from './_constants'

const buttonVariantRules: Rules = {}

for (const mode of THEME_COLOR_BUTTON_MODES) {
  for (const tone of THEME_COLOR_STATE_TONES) {
    if (mode === 'default') {
      buttonVariantRules[`&.${variantMap[mode]}.${toneMap[tone]}`] = {
        // 'boxShadow': 'none',
        '--color-bg': `var(--color-solid-${tone}-bg-0)`,
        '--color-border': `var(--color-solid-${tone}-border-1)`,
        '--color-fg': `var(--color-solid-${tone}-fg-0)`,
        '--color-muted-fg': `var(--color-solid-${tone}-fg-4)`,
        '--button-box-shadow': 'none',

        '@nest': {
          '&:not([data-disabled]):hover': {
            '--color-bg': `var(--color-solid-${tone}-bg-1)`,
            '--color-border': `var(--color-solid-${tone}-border-2)`,
            '--color-fg': `var(--color-solid-${tone}-fg-0)`,
            '--color-muted-fg': `var(--color-solid-${tone}-fg-4)`,
          },

          '&:not([data-disabled]):active': {
            '--color-bg': `var(--color-solid-${tone}-bg-2)`,
            '--color-border': `var(--color-solid-${tone}-border-3)`,
            '--color-fg': `var(--color-solid-${tone}-fg-0)`,
            '--color-muted-fg': `var(--color-solid-${tone}-fg-4)`,
          },

          '&:not([data-disabled])[data-selected]': {
            '--color-bg': `var(--color-solid-${tone}-bg-2)`,
            '--color-border': `var(--color-solid-${tone}-border-3)`,
            '--color-fg': `var(--color-solid-${tone}-fg-0)`,
            '--color-muted-fg': `var(--color-solid-${tone}-fg-4)`,
          },

          '&[data-disabled]': {
            '--color-bg': `var(--color-tinted-default-bg-1)`,
            '--color-border': `var(--color-tinted-default-border-0)`,
            '--color-fg': `var(--color-tinted-default-border-2)`,
            '--color-muted-fg': `var(--color-tinted-default-border-1)`,
          },
        },
      }
    }

    if (mode === 'bleed') {
      buttonVariantRules[`&.${variantMap[mode]}.${toneMap[tone]}`] = {
        'boxShadow': 'none',
        '--color-bg': `var(--color-tinted-${tone}-bg-0)`,
        '--color-border': `var(--color-tinted-${tone}-border-1)`,
        '--color-fg': `var(--color-tinted-${tone}-fg-2)`,
        '--color-muted-fg': `var(--color-tinted-${tone}-fg-4)`,
        '--button-box-shadow': 'none',

        '@nest': {
          '&:not([data-disabled]):hover': {
            '--color-bg': `var(--color-tinted-${tone}-bg-1)`,
            '--color-border': `var(--color-tinted-${tone}-border-2)`,
            '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
            '--color-muted-fg': `var(--color-tinted-${tone}-fg-3)`,
          },

          '&:not([data-disabled]):active': {
            '--color-bg': `var(--color-tinted-${tone}-bg-2)`,
            '--color-border': `var(--color-tinted-${tone}-border-3)`,
            '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
            '--color-muted-fg': `var(--color-tinted-${tone}-fg-3)`,
          },

          '&:not([data-disabled])[data-selected]': {
            '--color-bg': `var(--color-tinted-${tone}-bg-2)`,
            '--color-border': `var(--color-tinted-${tone}-border-3)`,
            '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
            '--color-muted-fg': `var(--color-tinted-${tone}-fg-3)`,
          },

          '&[data-disabled]': {
            '--color-bg': `var(--color-tinted-default-bg-0)`,
            '--color-border': `var(--color-tinted-default-border-0)`,
            '--color-fg': `var(--color-tinted-default-border-2)`,
            '--color-muted-fg': `var(--color-tinted-default-border-1)`,
          },
        },
      }
    }

    if (mode === 'ghost') {
      buttonVariantRules[`&.${variantMap[mode]}.${toneMap[tone]}`] = {
        '--color-bg': `var(--color-tinted-${tone}-bg-0)`,
        '--color-border': `var(--color-tinted-${tone}-border-1)`,
        '--color-fg': `var(--color-tinted-${tone}-fg-2)`,
        '--button-box-shadow': [
          `inset 0 0 0 var(--button-border-width) var(--color-border)`,
          `inset 0 -1.5px 0 0.5px var(--color-shadow-umbra)`,
        ].join(','),

        '@nest': {
          '&:not([data-disabled]):hover': {
            '--color-bg': `var(--color-tinted-${tone}-bg-1)`,
            '--color-border': `var(--color-tinted-${tone}-border-2)`,
            '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
            // '--button-box-shadow': `inset 0 0 0 var(--button-border-width) var(--color-border)`,
          },

          '&:not([data-disabled]):active': {
            '--color-bg': `var(--color-tinted-${tone}-bg-2)`,
            '--color-border': `var(--color-tinted-${tone}-border-3)`,
            '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
            '--button-box-shadow': `inset 0 0 0 var(--button-border-width) var(--color-border)`,
          },

          '&:not([data-disabled])[data-selected]': {
            '--color-bg': `var(--color-tinted-${tone}-bg-2)`,
            '--color-border': `var(--color-tinted-${tone}-border-3)`,
            '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
            '--button-box-shadow': `inset 0 0 0 var(--button-border-width) var(--color-border)`,
          },

          '&[data-disabled]': {
            '--color-bg': `var(--color-tinted-default-bg-0)`,
            '--color-border': `var(--color-tinted-default-border-0)`,
            '--color-fg': `var(--color-tinted-default-border-2)`,
          },
        },
      }
    }
  }
}

export const buttonRules: Rules = {
  'button': {
    'WebkitFontSmoothing': 'inherit',
    'appearance': 'none',
    'font': 'inherit',
    'outline': 'none',
    'userSelect': 'none',
    'textDecoration': 'none',
    'border': 0,
    'boxSizing': 'border-box',
    'padding': 0,
    'overflow': 'hidden',
    'margin': 0,
    'textAlign': 'left',
    'position': 'relative',
    'verticalAlign': 'top',
    'backgroundColor': 'var(--color-bg)',
    'color': 'var(--color-fg)',
    'boxShadow': 'var(--button-box-shadow)',

    '@nest': {
      '&::-moz-focus-inner': {
        border: 0,
        padding: 0,
      },

      '&:focus': {
        outline: 'var(--button-focus-ring-width) solid var(--color-focus-ring)',
        outlineOffset: 'var(--button-focus-ring-offset)',
      },

      '&:focus:not(:focus-visible)': {
        outline: 'none',
      },

      ...buttonVariantRules,
    },
  },

  'button-loading-box': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'inherit',
    zIndex: 1,
    opacity: 0.8,
  },
}

// import {CSSObject, getTheme_v2} from '@sanity/ui/theme'
// import {ThemeProps} from '../../_compat'
// import {_cardColorStyle} from '../../_compat/styles/card'
// import {focusRingBorderStyle, focusRingStyle} from '../../_compat/styles/internal'
// import {css} from '../../lib/styled'
// import {ButtonMode, ButtonTone, ButtonWidth} from '../../types'

// /**
//  * @internal
//  */
// export function buttonBaseStyles(
//   props: {$width?: ButtonWidth} & ThemeProps,
// ): ReturnType<typeof css> {
//   const {$width} = props
//   const {style} = getTheme_v2(props.theme)

//   return css`
//     ${style?.button};

//     -webkit-font-smoothing: inherit;
//     appearance: none;
//     display: inline-flex;
//     align-items: center;
//     font: inherit;
//     border: 0;
//     outline: none;
//     user-select: none;
//     text-decoration: none;
//     border: 0;
//     box-sizing: border-box;
//     padding: 0;
//     margin: 0;
//     white-space: nowrap;
//     text-align: left;
//     position: relative;
//     vertical-align: top;

//     ${$width === 'fill' &&
//     css`
//       width: -moz-available;
//       width: -webkit-fill-available;
//       width: stretch;
//     `}

//     & > span {
//       display: block;
//       flex: 1;
//       min-width: 0;
//       border-radius: inherit;
//     }

//     &::-moz-focus-inner {
//       border: 0;
//       padding: 0;
//     }
//   `
// }

// function combineBoxShadow(...boxShadows: (string | undefined)[]): string {
//   return boxShadows.filter(Boolean).join(',')
// }

// /**
//  * @internal
//  */
// export function buttonColorStyles(
//   props: {$mode: ButtonMode; $tone: ButtonTone} & ThemeProps,
// ): CSSObject[] {
//   const {$mode} = props
//   const {button, color: baseColor, style} = getTheme_v2(props.theme)
//   const shadow = props.$mode === 'ghost'
//   const mode = baseColor.button[$mode] || baseColor.button.default
//   const color = mode[props.$tone] || mode.default
//   const border = {
//     width: button.border.width,
//     color: 'var(--color-border)',
//   }
//   // const defaultBoxShadow = `inset 0px -1.5px 0px ${buttonTheme.border.width}px color-mix(in srgb, var(--color-border) 25%, var(--color-bg))`
//   const defaultBoxShadow = undefined

//   return [
//     _cardColorStyle(baseColor, color.enabled),
//     {
//       'backgroundColor': 'var(--color-bg)',
//       'color': 'var(--color-fg)',
//       'boxShadow': focusRingBorderStyle(border),
//       '&:disabled, &[data-disabled]': _cardColorStyle(baseColor, color.disabled),
//       "&:not([data-disabled='true'])": {
//         'boxShadow': combineBoxShadow(
//           focusRingBorderStyle(border),
//           shadow ? defaultBoxShadow : undefined,
//         ),
//         '&:focus': {
//           boxShadow: focusRingStyle({
//             base: baseColor,
//             border: {width: 2, color: baseColor.bg},
//             focusRing: button.focusRing,
//           }),
//         },
//         '&:focus:not(:focus-visible)': {
//           boxShadow: combineBoxShadow(
//             focusRingBorderStyle(border),
//             shadow ? defaultBoxShadow : undefined,
//           ),
//         },
//         '@media (hover: hover)': {
//           '&:hover': _cardColorStyle(baseColor, color.hovered),
//           '&:active': _cardColorStyle(baseColor, color.pressed),
//           '&[data-hovered]': _cardColorStyle(baseColor, color.hovered),
//         },
//         '&[data-selected]': _cardColorStyle(baseColor, color.pressed),
//       },
//     },
//     style?.button?.root,
//   ].filter(Boolean) as CSSObject[]
// }
