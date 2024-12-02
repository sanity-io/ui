import {Rules} from '../../types'

export const selectRules: Rules = {
  select: {
    // 'position': 'relative',
    // width: -moz-available;
    // width: -webkit-fill-available;
    // width: stretch;
    // 'width': ['-moz-available', '-webkit-fill-available', 'stretch'],

    '@nest': {
      // '&:not([hidden])': {
      //   display: 'inline-block',
      // },

      // '& > select': {
      //   WebkitFontSmoothing: 'inherit',
      //   appearance: 'none',
      //   border: 0,
      //   color: 'inherit',
      //   width: '100%',
      //   outline: 'none',
      //   margin: 0,
      //   // backgroundColor: '#ddd',
      //   backgroundColor: 'transparent',
      //   boxShadow: 'inset 0 0 0 1px var(--color-border)',
      //   padding: '8px',
      //   // -webkit-font-smoothing: antialiased;
      //   // appearance: none;
      //   // border: 0;
      //   // font-family: ${font.text.family};
      //   // color: inherit;
      //   // width: 100%;
      //   // outline: none;
      //   // margin: 0;
      // },

      '& > select:disabled': {
        opacity: 1,
        // &:disabled {
        //   opacity: 1;
        // }
      },

      '& > select + div': {
        //     pointer-events: none;
        //     position: absolute;
        //     top: 0;
        //     right: 0;
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        right: 0,
        //
      },
    },
  },
}

// import {ThemeFontSize, getTheme_v2} from '@sanity/ui/theme'
// import {CSSObject} from '@sanity/ui/theme'
// import {rem, _responsive, ThemeProps} from '../../_compat'
// import {
//   focusRingBorderStyle,
//   focusRingStyle,
//   responsiveInputPaddingIconRightStyle,
//   responsiveRadiusStyle,
//   ResponsiveRadiusStyleProps,
// } from '../../_compat/styles/internal'
// import {css} from '../../lib/styled'

// function rootStyle(): ReturnType<typeof css> {
//   return css`
//     position: relative;
//     width: -moz-available;
//     width: -webkit-fill-available;
//     width: stretch;

//     &:not([hidden]) {
//       display: inline-block;
//     }
//   `
// }

// function inputBaseStyle(props: ThemeProps): ReturnType<typeof css> {
//   const {font} = getTheme_v2(props.theme)

//   return css`
//     -webkit-font-smoothing: antialiased;
//     appearance: none;
//     border: 0;
//     font-family: ${font.text.family};
//     color: inherit;
//     width: 100%;
//     outline: none;
//     margin: 0;

//     &:disabled {
//       opacity: 1;
//     }
//   `
// }

// function inputColorStyle(props: ThemeProps) {
//   const {color, input} = getTheme_v2(props.theme)

//   return css`
//     /* enabled */
//     background-color: ${color.input.default.enabled.bg};
//     color: ${color.input.default.enabled.fg};
//     box-shadow: ${focusRingBorderStyle({
//       color: color.input.default.enabled.border,
//       width: input.border.width,
//     })};

//     /* hovered */
//     @media (hover: hover) {
//       &:not(:disabled):hover {
//         background-color: ${color.input.default.hovered.bg};
//         color: ${color.input.default.hovered.fg};
//         box-shadow: ${focusRingBorderStyle({
//           color: color.input.default.hovered.border,
//           width: input.border.width,
//         })};
//       }
//     }

//     /* focused */
//     &:not(:disabled):focus {
//       box-shadow: ${focusRingStyle({
//         border: {width: input.border.width, color: color.input.default.enabled.border},
//         focusRing: input.select.focusRing,
//       })};
//     }

//     /* read-only */
//     &[data-read-only] {
//       background-color: ${color.input.default.readOnly.bg};
//       color: ${color.input.default.readOnly.fg};
//       box-shadow: ${focusRingBorderStyle({
//         color: color.input.default.readOnly.border,
//         width: input.border.width,
//       })};
//     }

//     /* disabled */
//     &:not([data-read-only]):disabled {
//       background-color: ${color.input.default.disabled.bg};
//       color: ${color.input.default.disabled.fg};
//       box-shadow: ${focusRingBorderStyle({
//         color: color.input.default.disabled.border,
//         width: input.border.width,
//       })};
//     }
//   `
// }

// function textSize(size: ThemeFontSize) {
//   return {fontSize: rem(size.fontSize), lineHeight: rem(size.lineHeight)}
// }

// function inputTextSizeStyle(props: {$fontSize: number[]} & ThemeProps) {
//   const {$fontSize} = props
//   const {font, media} = getTheme_v2(props.theme)

//   return _responsive(media, $fontSize, (sizeIndex) =>
//     textSize(font.text.sizes[sizeIndex] || font.text.sizes[2]),
//   )
// }

// function inputStyle(): Array<
//   | ((
//       props: ResponsiveRadiusStyleProps & {
//         $fontSize: number[]
//         $padding: number[]
//         $space: number[]
//       } & ThemeProps,
//     ) => CSSObject[])
//   | ((props: ThemeProps) => ReturnType<typeof css>)
// > {
//   return [
//     responsiveRadiusStyle,
//     inputBaseStyle,
//     inputColorStyle,
//     inputTextSizeStyle,
//     responsiveInputPaddingIconRightStyle,
//   ]
// }

// function iconBoxStyle(props: ThemeProps): ReturnType<typeof css> {
//   const {color} = getTheme_v2(props.theme)

//   return css`
//     pointer-events: none;
//     position: absolute;
//     top: 0;
//     right: 0;

//     /* enabled */
//     --card-fg-color: ${color.input.default.enabled.fg};

//     /* hover */
//     @media (hover: hover) {
//       select:not(disabled):not(:read-only):hover + && {
//         --card-fg-color: ${color.input.default.hovered.fg};
//       }
//     }

//     /* disabled */
//     select:disabled + && {
//       --card-fg-color: ${color.input.default.disabled.fg};
//     }

//     /* read-only */
//     select[data-read-only] + && {
//       --card-fg-color: ${color.input.default.readOnly.fg};
//     }
//   `
// }

// export const selectStyle = {
//   root: rootStyle,
//   input: inputStyle,
//   iconBox: iconBoxStyle,
// }
