import {Rules} from '../../types'
import {vars} from '../../vars'

export const textInputRules: Rules = {
  'text-input': {
    '--font-family': vars.font.text.family,

    '@nest': {
      '& > span': {
        borderRadius: 'inherit',
      },
    },
  },

  'text-input-prefix': {
    'borderTop': '1px solid var(--color-border)',
    'borderLeft': '1px solid var(--color-border)',
    'borderBottom': '1px solid var(--color-border)',
    'borderTopRightRadius': '0 !important',
    'borderBottomRightRadius': '0 !important',

    '@nest': {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },

  'text-input-suffix': {
    'borderTop': '1px solid var(--color-border)',
    'borderRight': '1px solid var(--color-border)',
    'borderBottom': '1px solid var(--color-border)',
    'borderTopLeftRadius': '0 !important',
    'borderBottomLeftRadius': '0 !important',

    '@nest': {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },

  'text-input-presentation': {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // display: 'block',
    // pointerEvents: 'none',
    // zIndex: 0,
    // backgroundColor: 'var(--input-bg-color)',
    // 'boxShadow': 'var(--input-box-shadow)',
    // '--input-border-color': 'var(--color-input-default-enabled-border)',
    // '--input-border-color': 'var(--color-tinted-default-border-1)',
    // '--input-box-shadow': 'inset 0 0 0 1px var(--input-border-color)',
    // border-top-left-radius: ${$hasPrefix ? 0 : undefined};
    // border-bottom-left-radius: ${$hasPrefix ? 0 : undefined};
    // border-top-right-radius: ${$hasSuffix ? 0 : undefined};
    // border-bottom-right-radius: ${$hasSuffix ? 0 : undefined};
    // '@nest': {
    //   'input:hover + &': {
    //     '--input-border-color': 'var(--color-tinted-default-border-2)',
    //   },
    //   'input:focus + &': {
    //     '--input-border-color': 'var(--color-tinted-default-border-2)',
    //   },
    // },
    // &[data-scheme='${$scheme}'][data-tone='${$tone}'] {
    //   --card-bg-color: ${color.input.default.enabled.bg};
    //   --card-fg-color: ${color.input.default.enabled.fg};
    //   /* enabled */
    //   *:not(:disabled) + &[data-border] {
    //     --input-box-shadow: ${focusRingBorderStyle({
    //       color: color.input.default.enabled.border,
    //       width: input.border.width,
    //     })};
    //   }
    //   /* invalid */
    //   *:not(:disabled):invalid + & {
    //     --card-bg-color: ${color.input.invalid.enabled.bg};
    //     --card-fg-color: ${color.input.invalid.enabled.fg};
    //     &[data-border] {
    //       --input-box-shadow: ${focusRingBorderStyle({
    //         color: color.input.invalid.enabled.border,
    //         width: input.border.width,
    //       })};
    //     }
    //   }
    //   /* focused */
    //   *:not(:disabled):focus + & {
    //     &[data-border] {
    //       --input-box-shadow: ${$unstableDisableFocusRing
    //         ? undefined
    //         : focusRingStyle({
    //             border: {color: color.input.default.enabled.border, width: input.border.width},
    //             focusRing: input.text.focusRing,
    //           })};
    //     }
    //     &:not([data-border]) {
    //       --input-box-shadow: ${$unstableDisableFocusRing
    //         ? undefined
    //         : focusRingStyle({focusRing: input.text.focusRing})};
    //     }
    //   }
    //   /* disabled */
    //   *:not(:invalid):disabled + & {
    //     --card-bg-color: ${color.input.default.disabled.bg} !important;
    //     --card-fg-color: ${color.input.default.disabled.fg} !important;
    //     --card-icon-color: ${color.input.default.disabled.fg} !important;
    //     &[data-border] {
    //       --input-box-shadow: ${focusRingBorderStyle({
    //         color: color.input.default.disabled.border,
    //         width: input.border.width,
    //       })};
    //     }
    //   }
    //   *:invalid:disabled + & {
    //     --card-bg-color: ${color.input.invalid.disabled.bg} !important;
    //     --card-fg-color: ${color.input.invalid.disabled.fg} !important;
    //     --card-icon-color: ${color.input.invalid.disabled.fg} !important;
    //     &[data-border] {
    //       --input-box-shadow: ${focusRingBorderStyle({
    //         color: color.input.invalid.disabled.border,
    //         width: input.border.width,
    //       })};
    //     }
    //   }
    //   /* readOnly */
    //   *:not(:invalid):read-only + & {
    //     --card-bg-color: ${color.input.default.readOnly.bg} !important;
    //     --card-fg-color: ${color.input.default.readOnly.fg} !important;
    //   }
    //   *:invalid:read-only + & {
    //     --card-bg-color: ${color.input.invalid.readOnly.bg} !important;
    //     --card-fg-color: ${color.input.invalid.readOnly.fg} !important;
    //   }
    //   /* hovered */
    //   @media (hover: hover) {
    //     *:not(:disabled):not(:read-only):not(:invalid):hover + & {
    //       --card-bg-color: ${color.input.default.hovered.bg};
    //       --card-fg-color: ${color.input.default.hovered.fg};
    //     }
    //     *:invalid:not(:disabled):not(:read-only):hover + & {
    //       --card-bg-color: ${color.input.invalid.hovered.bg};
    //       --card-fg-color: ${color.input.invalid.hovered.fg};
    //     }
    //     *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + &[data-border] {
    //       --input-box-shadow: ${focusRingBorderStyle({
    //         color: color.input.default.hovered.border,
    //         width: input.border.width,
    //       })};
    //     }
    //     *:invalid:not(:disabled):not(:read-only):not(:focus):hover + &[data-border] {
    //       --input-box-shadow: ${focusRingBorderStyle({
    //         color: color.input.invalid.hovered.border,
    //         width: input.border.width,
    //       })};
    //     }
    //   }
    // }
  },
}

// const Root = styled(Card).attrs({forwardedAs: 'span'})(textInputRootStyle)

// const InputRoot = styled.span`
//   flex: 1;
//   min-width: 0;
//   display: block;
//   position: relative;
// `

// const Prefix = styled(Card).attrs({forwardedAs: 'span'})`
//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;

//   & > span {
//     display: block;
//     margin: -1px;
//   }
// `

// const Suffix = styled(Card).attrs({forwardedAs: 'span'})`
//   border-top-left-radius: 0;
//   border-bottom-left-radius: 0;

//   & > span {
//     display: block;
//     margin: -1px;
//   }
// `

// const Input = styled.input<TextInputResponsivePaddingStyleProps & TextInputInputStyleProps>(
//   responsiveInputPaddingStyle,
//   textInputBaseStyle,
//   textInputFontSizeStyle,
// )

// const Presentation = styled.span<ResponsiveRadiusStyleProps & TextInputRepresentationStyleProps>(
//   responsiveRadiusStyle,
//   textInputRepresentationStyle,
// )

// const LeftBox = styled(Box)`
//   position: absolute;
//   top: 0;
//   left: 0;
// `

// const RightBox = styled(Box)`
//   position: absolute;
//   top: 0;
//   right: 0;
// `

// const RightCard = styled(Card)`
//   background-color: transparent;
//   position: absolute;
//   top: 0;
//   right: 0;
// `
