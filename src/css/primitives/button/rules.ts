import {THEME_COLOR_BUTTON_MODES, THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import {Rules} from '../../types'

export const buttonRules: Rules = {
  'button': {
    WebkitFontSmoothing: 'inherit',
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    font: 'inherit',
    outline: 'none',
    userSelect: 'none',
    textDecoration: 'none',
    border: 0,
    boxSizing: 'border-box',
    padding: 0,
    overflow: 'hidden',
    margin: 0,
    textAlign: 'left',
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-fg)',
    boxShadow: 'inset 0 0 0 1px var(--color-border)',
  },

  // variants
  ...THEME_COLOR_BUTTON_MODES.reduce((acc, mode) => {
    return {
      ...acc,
      [`button-mode-${mode}`]: {
        '@nest': THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
          if (mode === 'default') {
            acc[`&.button-tone-${tone}`] = {
              'boxShadow': 'none',
              '--color-bg': `var(--color-solid-${tone}-bg-0)`,
              '--color-border': `var(--color-solid-${tone}-border-1)`,
              '--color-fg': `var(--color-solid-${tone}-fg-1)`,
              '--color-icon': `var(--color-solid-${tone}-fg-1)`,

              '@nest': {
                '&:not([data-disabled="true"]):hover': {
                  '--color-bg': `var(--color-solid-${tone}-bg-1)`,
                  '--color-border': `var(--color-solid-${tone}-border-2)`,
                  '--color-fg': `var(--color-solid-${tone}-fg-0)`,
                  '--color-icon': `var(--color-solid-${tone}-fg-0)`,
                },

                '&:not([data-disabled="true"]):active': {
                  '--color-bg': `var(--color-solid-${tone}-bg-2)`,
                  '--color-border': `var(--color-solid-${tone}-border-3)`,
                  '--color-fg': `var(--color-solid-${tone}-fg-0)`,
                  '--color-icon': `var(--color-solid-${tone}-fg-0)`,
                },

                '&:not([data-disabled="true"])[data-selected]': {
                  '--color-bg': `var(--color-solid-${tone}-bg-2)`,
                  '--color-border': `var(--color-solid-${tone}-border-3)`,
                  '--color-fg': `var(--color-solid-${tone}-fg-0)`,
                  '--color-icon': `var(--color-solid-${tone}-fg-0)`,
                },
              },
            }
          }

          if (mode === 'bleed') {
            acc[`&.button-tone-${tone}`] = {
              'boxShadow': 'none',
              '--color-bg': `var(--color-tinted-${tone}-bg-0)`,
              '--color-border': `var(--color-tinted-${tone}-border-1)`,
              '--color-fg': `var(--color-tinted-${tone}-fg-3)`,
              '--color-icon': `var(--color-tinted-${tone}-fg-3)`,

              '@nest': {
                '&:not([data-disabled="true"]):hover': {
                  '--color-bg': `var(--color-tinted-${tone}-bg-1)`,
                  '--color-border': `var(--color-tinted-${tone}-border-2)`,
                  '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
                  '--color-icon': `var(--color-tinted-${tone}-fg-1)`,
                },

                '&:not([data-disabled="true"]):active': {
                  '--color-bg': `var(--color-tinted-${tone}-bg-2)`,
                  '--color-border': `var(--color-tinted-${tone}-border-3)`,
                  '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
                  '--color-icon': `var(--color-tinted-${tone}-fg-1)`,
                },

                '&:not([data-disabled="true"])[data-selected]': {
                  '--color-bg': `var(--color-tinted-${tone}-bg-2)`,
                  '--color-border': `var(--color-tinted-${tone}-border-3)`,
                  '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
                  '--color-icon': `var(--color-tinted-${tone}-fg-1)`,
                },

                '&[data-disabled="true"]': {
                  '--color-bg': `var(--color-tinted-${tone}-bg-0)`,
                  '--color-border': `var(--color-tinted-${tone}-border-1)`,
                  '--color-fg': `var(--color-tinted-${tone}-border-3)`,
                  '--color-icon': `var(--color-tinted-${tone}-border-2)`,
                },
              },
            }
          }

          if (mode === 'ghost') {
            acc[`&.button-tone-${tone}`] = {
              '--color-bg': `var(--color-tinted-${tone}-bg-1)`,
              '--color-border': `var(--color-tinted-${tone}-border-0)`,
              '--color-fg': `var(--color-tinted-${tone}-fg-2)`,
              '--color-icon': `var(--color-tinted-${tone}-fg-3)`,

              '@nest': {
                '&:not([data-disabled="true"]):hover': {
                  '--color-bg': `var(--color-tinted-${tone}-bg-2)`,
                  '--color-border': `var(--color-tinted-${tone}-border-1)`,
                  '--color-fg': `var(--color-tinted-${tone}-fg-3)`,
                  '--color-icon': `var(--color-tinted-${tone}-fg-4)`,
                },

                '&:not([data-disabled="true"]):active': {
                  '--color-bg': `var(--color-tinted-${tone}-bg-3)`,
                  '--color-border': `var(--color-tinted-${tone}-border-2)`,
                  '--color-fg': `var(--color-tinted-${tone}-fg-3)`,
                  '--color-icon': `var(--color-tinted-${tone}-fg-4)`,
                },

                '&:not([data-disabled="true"])[data-selected]': {
                  '--color-bg': `var(--color-tinted-${tone}-bg-3)`,
                  '--color-border': `var(--color-tinted-${tone}-border-2)`,
                  '--color-fg': `var(--color-tinted-${tone}-fg-3)`,
                  '--color-icon': `var(--color-tinted-${tone}-fg-4)`,
                },
              },
            }
          }

          return acc
        }, {} as Rules),
      },
    }
  }, {} as Rules),

  'button-loading-box': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'var(--color-bg-1)',
    borderRadius: 'inherit',
    zIndex: 1,
    // boxShadow: 'inherit',
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
//       '&:disabled, &[data-disabled="true"]': _cardColorStyle(baseColor, color.disabled),
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
