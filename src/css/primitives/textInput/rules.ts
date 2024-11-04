import {FONT_TEXT_SIZE, SPACE} from '@sanity/ui/theme'
// import {_resp} from '../../_resp'
import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'
import {vars} from '../../vars'

export const textInputRules: Rules = {
  'text-input': {
    '--font-family': vars.font.text.family,
  },

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`text-input-p-${space}`.replace('.', '_'), {
        '--padding-top': `calc(${vars.space[space]} - var(--font-ascender-height))`,
        '--padding-right': vars.space[space],
        '--padding-bottom': `calc(${vars.space[space]} - var(--font-descender-height))`,
        '--padding-left': vars.space[space],
      }),
    }
  }, {}),

  ...FONT_TEXT_SIZE.reduce<Rules>((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`text-input-${size}`, {
        '--font-size': vars.font.text.sizes[size].fontSize,
        '--font-line-height': vars.font.text.sizes[size].lineHeight,
        '--font-letter-spacing': vars.font.text.sizes[size].letterSpacing,
        '--font-ascender-height': vars.font.text.sizes[size].ascenderHeight,
        '--font-descender-height': vars.font.text.sizes[size].descenderHeight,
      }),
    }
  }, {}),

  'text-input-element': {
    'appearance': 'none',
    'background': 'none',
    'border': 0,
    'borderRadius': 0,
    'outline': 'none',
    'width': '100%',
    'boxSizing': 'border-box',
    'fontFamily': 'var(--font-family)',
    'fontSize': 'var(--font-size)',
    'fontWeight': 'var(--font-weight)',
    'lineHeight': 'var(--font-line-height)',
    'letterSpacing': 'var(--font-letter-spacing)',
    'margin': 0,
    'position': 'relative',
    'zIndex': 1,
    'display': 'block',
    'color': 'var(--input-fg-color)',
    'paddingTop': 'var(--padding-top)',
    'paddingRight': 'var(--padding-right)',
    'paddingBottom': 'var(--padding-bottom)',
    'paddingLeft': 'var(--padding-left)',

    // '--input-fg-color': 'var(--color-input-default-enabled-fg)',
    '--input-fg-color': 'var(--color-fg-1)',

    '@nest': {
      // NOTE: This is a hack to disable Chrome’s autofill styles
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active':
        {
          WebkitTextFillColor: 'var(--input-fg-color) !important',
          transition: 'background-color 5000s',
          transitionDelay: '86400s', // 24h
        },

      /* &:is(textarea) */
      // '&[data-as="textarea"]': {
      //   resize: 'none',
      // },

      '&::placeholder': {
        // color: 'var(--input-placeholder-color)',
        color: 'var(--color-fg-4)',
      },

      // &[data-scheme='${$scheme}'][data-tone='${$tone}'] {
      //   /* --input-fg-color: ${color.input.default.enabled.fg}; */
      //   /* --input-placeholder-color: ${color.input.default.enabled.placeholder}; */
      //   /* enabled */
      //   &:not(:invalid):not(:disabled):not(:read-only) {
      //     /* --input-fg-color: ${color.input.default.enabled.fg}; */
      //     /* --input-placeholder-color: ${color.input.default.enabled.placeholder}; */
      //   }
      //   /* disabled */
      //   &:not(:invalid):disabled {
      //     /* --input-fg-color: ${color.input.default.disabled.fg}; */
      //     /* --input-placeholder-color: ${color.input.default.disabled.placeholder}; */
      //   }
      //   /* invalid */
      //   &:invalid {
      //     /* --input-fg-color: ${color.input.invalid.enabled.fg}; */
      //     /* --input-placeholder-color: ${color.input.invalid.enabled.placeholder}; */
      //   }
      //   /* readOnly */
      //   &:read-only {
      //     /* --input-fg-color: ${color.input.default.readOnly.fg}; */
      //     /* --input-placeholder-color: ${color.input.default.readOnly.placeholder}; */
      //   }
      // }
    },
  },

  'text-input-prefix': {
    'borderTopRightRadius': 0,
    'borderBottomRightRadius': 0,

    '@nest': {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },

  'text-input-suffix': {
    'borderTopLeftRadius': 0,
    'borderBottomLeftRadius': 0,

    '@nest': {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },

  'text-input-presentation': {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'display': 'block',
    'pointerEvents': 'none',
    'zIndex': 0,

    'backgroundColor': 'var(--input-bg-color)',
    'boxShadow': 'var(--input-box-shadow)',

    // '--input-border-color': 'var(--color-input-default-enabled-border)',
    '--input-border-color': 'var(--color-border-1)',
    '--input-box-shadow': 'inset 0 0 0 1px var(--input-border-color)',

    // border-top-left-radius: ${$hasPrefix ? 0 : undefined};
    // border-bottom-left-radius: ${$hasPrefix ? 0 : undefined};
    // border-top-right-radius: ${$hasSuffix ? 0 : undefined};
    // border-bottom-right-radius: ${$hasSuffix ? 0 : undefined};

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
