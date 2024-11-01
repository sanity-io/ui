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
    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--card-fg-color)',
  },

  // variants
  ...THEME_COLOR_BUTTON_MODES.reduce((acc, mode) => {
    return {
      ...acc,
      [`button-mode-${mode}`]: {
        '@nest': THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
          return {
            ...acc,
            [`&.button-tone-${tone}`]: {
              '--card-bg-color': `var(--card-button-${mode}-${tone}-enabled-bg-color, rgba(127, 127, 127, 0.1))`,
              '--card-fg-color': `var(--card-button-${mode}-${tone}-enabled-fg-color, currentColor)`,
            },
          }
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
    backgroundColor: 'var(--card-bg-color)',
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
//     color: 'var(--card-border-color)',
//   }
//   // const defaultBoxShadow = `inset 0px -1.5px 0px ${buttonTheme.border.width}px color-mix(in srgb, var(--card-border-color) 25%, var(--card-bg-color))`
//   const defaultBoxShadow = undefined

//   return [
//     _cardColorStyle(baseColor, color.enabled),
//     {
//       'backgroundColor': 'var(--card-bg-color)',
//       'color': 'var(--card-fg-color)',
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
