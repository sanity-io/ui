import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeFontWeightKey} from '../../theme'
import {focusRingBorderStyle, focusRingStyle} from '../focusRing'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'

export interface TextInputInputStyleProps {
  $fontSize?: number | number[]
  $weight?: ThemeFontWeightKey
}

export interface TextInputRepresentationStyleProps {
  $border?: boolean
  $hasPrefix?: boolean
  $hasSuffix?: boolean
}

/**
 * @deprecated
 */
export const textInputStyle = {
  root: () => [textInputRootStyle],
  input: () => [textInputBaseStyle, textInputFontSizeStyle],
  representation: () => [textInputRepresentationStyle],
}

const ROOT_STYLE = css`
  &:not([hidden]) {
    display: flex;
  }
`

export function textInputRootStyle(): FlattenSimpleInterpolation {
  return ROOT_STYLE
}

export function textInputBaseStyle(
  props: TextInputInputStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {theme, $weight} = props
  const font = theme.sanity.fonts.text
  const color = theme.sanity.color.input

  return css`
    --input-fg-color: ${color.default.enabled.fg};
    --input-placeholder-color: ${color.default.enabled.placeholder};

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
    color: var(--input-fg-color);

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    /* &:is(textarea) */
    &[data-as='textarea'] {
      resize: none;
    }

    /* enabled */
    &:not(:invalid):not(:disabled) {
      --input-fg-color: ${color.default.enabled.fg};
      --input-placeholder-color: ${color.default.enabled.placeholder};
    }

    /* disabled */
    &:not(:invalid):disabled {
      --input-fg-color: ${color.default.disabled.fg};
      --input-placeholder-color: ${color.default.disabled.placeholder};
    }

    /* invalid */
    &:invalid {
      --input-fg-color: ${color.invalid.enabled.fg};
      --input-placeholder-color: ${color.invalid.enabled.placeholder};
    }
  `
}

export function textInputFontSizeStyle(props: TextInputInputStyleProps & ThemeProps) {
  const {theme} = props
  const {fonts, media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$fontSize, [2]), (sizeIndex) => {
    const size = fonts.text.sizes[sizeIndex] || fonts.text.sizes[2]

    return {
      fontSize: rem(size.fontSize),
      lineHeight: size.lineHeight / size.fontSize,
    }
  })
}

export function textInputRepresentationStyle(
  props: TextInputRepresentationStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$border, $hasPrefix, $hasSuffix, theme} = props
  const {focusRing, input} = theme.sanity
  const color = theme.sanity.color.input

  return css`
    --card-bg-color: ${color.default.enabled.bg};
    --card-fg-color: ${color.default.enabled.fg};
    --input-box-shadow: none;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    pointer-events: none;
    z-index: 0;
    background-color: var(--card-bg-color);
    box-shadow: var(--input-box-shadow);

    border-top-left-radius: ${$hasPrefix ? 0 : undefined};
    border-bottom-left-radius: ${$hasPrefix ? 0 : undefined};
    border-top-right-radius: ${$hasSuffix ? 0 : undefined};
    border-bottom-right-radius: ${$hasSuffix ? 0 : undefined};

    /* enabled */
    *:not(:disabled) + && {
      --input-box-shadow: ${$border
        ? focusRingBorderStyle({color: color.default.enabled.border, width: input.border.width})
        : undefined};
    }

    /* invalid */
    *:not(:disabled):invalid + && {
      --card-bg-color: ${color.invalid.enabled.bg};
      --card-fg-color: ${color.invalid.enabled.fg};
      --input-box-shadow: ${$border
        ? focusRingBorderStyle({color: color.invalid.enabled.border, width: input.border.width})
        : 'none'};
    }

    /* focused */
    *:not(:disabled):not(:read-only):focus + && {
      --input-box-shadow: ${focusRingStyle({
        border: $border
          ? {color: color.default.enabled.border, width: input.border.width}
          : undefined,
        focusRing,
      })};
    }

    /* disabled */
    *:disabled + && {
      --card-bg-color: ${color.default.disabled.bg};
      --card-fg-color: ${color.default.disabled.fg};
      --input-box-shadow: ${$border
        ? focusRingBorderStyle({
            color: color.default.disabled.border,
            width: input.border.width,
          })
        : 'none'};
    }

    /* hovered */
    @media (hover: hover) {
      *:not(:disabled):not(:read-only):not(:invalid):hover + && {
        --card-bg-color: ${color.default.hovered.bg};
        --card-fg-color: ${color.default.hovered.fg};
      }

      *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + && {
        --input-box-shadow: ${$border
          ? focusRingBorderStyle({
              color: color.default.hovered.border,
              width: input.border.width,
            })
          : 'none'};
      }
    }
  `
}
