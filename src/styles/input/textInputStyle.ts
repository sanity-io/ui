import {css} from 'styled-components'
import {ThemeColorToneKey, ThemeFontWeightKey} from '../../theme'
import {mutableCardVariables} from '../../theme/lib/theme/color/cssVariables/cardVariables'
import {cssVars} from '../../theme/lib/theme/color/cssVariables/createCssVars'
import {CSSObject} from '../../types/styled'
import {focusRingBorderStyle, focusRingStyle} from '../focusRing'
import {rem, _responsive} from '../helpers'
import {ThemeProps} from '../types'

/**
 * @internal
 */
export interface TextInputInputStyleProps {
  $fontSize: number[]
  $tone: ThemeColorToneKey
  $weight?: ThemeFontWeightKey
}

/**
 * @internal
 */
export interface TextInputRepresentationStyleProps {
  $hasPrefix?: boolean
  $hasSuffix?: boolean
  $tone: ThemeColorToneKey
}

const ROOT_STYLE = css`
  &:not([hidden]) {
    display: flex;
  }

  align-items: center;
`

export function textInputRootStyle(): ReturnType<typeof css> {
  return ROOT_STYLE
}

export function textInputBaseStyle(
  props: TextInputInputStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {theme, $tone, $weight} = props
  const font = theme.sanity.fonts.text

  return css`
    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-family: ${font.family};
    font-weight: ${($weight && font.weights[$weight]) || font.weights.regular};
    margin: 0;
    position: relative;
    z-index: 1;
    display: block;

    /* NOTE: This is a hack to disable Chrome’s autofill styles */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--input-fg-color) !important;
      transition: background-color 5000s;
      transition-delay: 86400s /* 24h */;
    }

    /* &:is(textarea) */
    &[data-as='textarea'] {
      resize: none;
    }

    color: var(--input-fg-color);

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    --input-fg-color: ${cssVars[$tone]['text-primary']};
    --input-placeholder-color: ${cssVars[$tone]['text-inactive']};

    /* enabled */
    &:not(:invalid):not(:disabled):not(:read-only) {
      --input-fg-color: ${cssVars[$tone]['text-primary']};
      --input-placeholder-color: ${cssVars[$tone]['text-inactive']};
    }

    /* disabled */
    &:not(:invalid):disabled {
      --input-fg-color: ${cssVars[$tone]['text-primary']};
      --input-placeholder-color: ${cssVars[$tone]['text-inactive']};
    }

    /* invalid */
    &:invalid {
      --input-fg-color: ${cssVars.critical['text-primary']};
      --input-placeholder-color: ${cssVars.critical['text-inactive']};
    }

    /* readOnly */
    &:read-only {
      --input-fg-color: ${cssVars[$tone]['text-primary']};
      --input-placeholder-color: ${cssVars[$tone]['text-inactive']};
    }
  `
}

export function textInputFontSizeStyle(props: TextInputInputStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {fonts, media} = theme.sanity

  return _responsive(media, props.$fontSize, (sizeIndex) => {
    const size = fonts.text.sizes[sizeIndex] || fonts.text.sizes[2]

    return {
      fontSize: rem(size.fontSize),
      lineHeight: size.lineHeight / size.fontSize,
    }
  })
}

export function textInputRepresentationStyle(
  props: TextInputRepresentationStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {$hasPrefix, $hasSuffix, $tone, theme} = props
  const {input} = theme.sanity
  const {focusRing} = input.text

  return css`
    --input-box-shadow: none;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    pointer-events: none;
    z-index: 0;

    background-color: ${cssVars.mutable['bg-color']};
    box-shadow: var(--input-box-shadow);

    border-top-left-radius: ${$hasPrefix ? 0 : undefined};
    border-bottom-left-radius: ${$hasPrefix ? 0 : undefined};
    border-top-right-radius: ${$hasSuffix ? 0 : undefined};
    border-bottom-right-radius: ${$hasSuffix ? 0 : undefined};

    ${mutableCardVariables['bg-color']}: ${cssVars[$tone]['bg-base']};
    ${mutableCardVariables['fg-color']}: ${cssVars[$tone]['text-primary']};

    /* enabled */
    &[data-border] {
      --input-box-shadow: ${focusRingBorderStyle({
        color: cssVars[$tone]['border-base'],
        width: input.border.width,
      })};
    }

    /* invalid */
    *:not(:disabled):invalid + & {
      ${mutableCardVariables['bg-color']}: ${cssVars.critical['bg-tint']};
      ${mutableCardVariables['fg-color']}: ${cssVars.critical['text-primary']};

      &[data-border] {
        --input-box-shadow: ${focusRingBorderStyle({
          color: cssVars.critical['border-base'],
          width: input.border.width,
        })};
      }
    }

    /* focused */
    *:not(:disabled):focus + & {
      &[data-border] {
        --input-box-shadow: ${focusRingStyle({
          border: {color: cssVars[$tone]['border-base'], width: input.border.width},
          focusRing,
        })};
      }

      &:not([data-border]) {
        --input-box-shadow: ${focusRingStyle({focusRing})};
      }
    }

    /* disabled */
    *:disabled + & {
      ${mutableCardVariables['bg-color']}: ${cssVars.default['bg-tint']} !important;
     ${mutableCardVariables['fg-color']}: ${cssVars.default['text-primary']} !important;
    }

    /* readOnly */
    *:read-only + & {
      ${mutableCardVariables['bg-color']}: ${cssVars.default['bg-tint']} !important;
     ${mutableCardVariables['fg-color']}: ${cssVars.default['text-primary']} !important;
    }

    /* hovered */
    @media (hover: hover) {

      *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + &[data-border] {
        --input-box-shadow: ${focusRingBorderStyle({
          color: cssVars.default['border-base-hover'],
          width: input.border.width,
        })};
      }
    }
    }
  `
}
