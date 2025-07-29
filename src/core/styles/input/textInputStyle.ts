import {CSSObject, getTheme_v2, ThemeColorSchemeKey, ThemeFontWeightKey} from '@sanity/ui/theme'
import {css} from 'styled-components'

import {CardTone} from '../../types'
import {focusRingBorderStyle, focusRingStyle} from '../focusRing'
import {_responsive, rem} from '../helpers'
import {ThemeProps} from '../types'

/**
 * @internal
 */
export interface TextInputInputStyleProps {
  $fontSize: number[]
  $scheme: ThemeColorSchemeKey
  $tone: CardTone
  $weight?: ThemeFontWeightKey
}

/**
 * @internal
 */
export interface TextInputRepresentationStyleProps {
  $hasPrefix?: boolean
  $hasSuffix?: boolean
  $scheme: ThemeColorSchemeKey
  $tone: CardTone
  $unstableDisableFocusRing?: boolean
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
  const {$scheme, $tone, $weight} = props
  const {color, font} = getTheme_v2(props.theme)

  return css`
    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-family: ${font.text.family};
    font-weight: ${($weight && font.text.weights[$weight]) || font.text.weights.regular};
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

    &[data-scheme='${$scheme}'][data-tone='${$tone}'] {
      --input-fg-color: ${color.input.default.enabled.fg};
      --input-placeholder-color: ${color.input.default.enabled.placeholder};

      /* enabled */
      &:not(:invalid):not(:disabled):not(:read-only) {
        --input-fg-color: ${color.input.default.enabled.fg};
        --input-placeholder-color: ${color.input.default.enabled.placeholder};
      }

      /* disabled */
      &:not(:invalid):disabled {
        --input-fg-color: ${color.input.default.disabled.fg};
        --input-placeholder-color: ${color.input.default.disabled.placeholder};
      }

      /* invalid */
      &:invalid {
        --input-fg-color: ${color.input.invalid.enabled.fg};
        --input-placeholder-color: ${color.input.invalid.enabled.placeholder};
      }

      /* readOnly */
      &:read-only {
        --input-fg-color: ${color.input.default.readOnly.fg};
        --input-placeholder-color: ${color.input.default.readOnly.placeholder};
      }
    }
  `
}

export function textInputFontSizeStyle(props: TextInputInputStyleProps & ThemeProps): CSSObject[] {
  const {font, media} = getTheme_v2(props.theme)

  return _responsive(media, props.$fontSize, (sizeIndex) => {
    const size = font.text.sizes[sizeIndex] || font.text.sizes[2]

    return {
      fontSize: rem(size.fontSize),
      lineHeight: `${size.lineHeight / size.fontSize}`,
    }
  })
}

export function textInputRepresentationStyle(
  props: TextInputRepresentationStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {$hasPrefix, $hasSuffix, $scheme, $tone, $unstableDisableFocusRing} = props
  const {color, input} = getTheme_v2(props.theme)

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

    background-color: var(--card-bg-color);
    box-shadow: var(--input-box-shadow);

    border-top-left-radius: ${$hasPrefix ? 0 : undefined};
    border-bottom-left-radius: ${$hasPrefix ? 0 : undefined};
    border-top-right-radius: ${$hasSuffix ? 0 : undefined};
    border-bottom-right-radius: ${$hasSuffix ? 0 : undefined};

    &[data-scheme='${$scheme}'][data-tone='${$tone}'] {
      --card-bg-color: ${color.input.default.enabled.bg};
      --card-fg-color: ${color.input.default.enabled.fg};

      /* enabled */
      *:not(:disabled) + &[data-border] {
        --input-box-shadow: ${focusRingBorderStyle({
          color: color.input.default.enabled.border,
          width: input.border.width,
        })};
      }

      /* invalid */
      *:not(:disabled):invalid + & {
        --card-bg-color: ${color.input.invalid.enabled.bg};
        --card-fg-color: ${color.input.invalid.enabled.fg};

        &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.input.invalid.enabled.border,
            width: input.border.width,
          })};
        }
      }

      /* focused */
      *:not(:disabled):focus + & {
        &[data-border] {
          --input-box-shadow: ${$unstableDisableFocusRing
            ? undefined
            : focusRingStyle({
                border: {color: color.input.default.enabled.border, width: input.border.width},
                focusRing: input.text.focusRing,
              })};
        }

        &:not([data-border]) {
          --input-box-shadow: ${$unstableDisableFocusRing
            ? undefined
            : focusRingStyle({focusRing: input.text.focusRing})};
        }
      }

      /* disabled */
      *:not(:invalid):disabled + & {
        --card-bg-color: ${color.input.default.disabled.bg} !important;
        --card-fg-color: ${color.input.default.disabled.fg} !important;
        --card-icon-color: ${color.input.default.disabled.fg} !important;

        &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.input.default.disabled.border,
            width: input.border.width,
          })};
        }
      }

      *:invalid:disabled + & {
        --card-bg-color: ${color.input.invalid.disabled.bg} !important;
        --card-fg-color: ${color.input.invalid.disabled.fg} !important;
        --card-icon-color: ${color.input.invalid.disabled.fg} !important;

        &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.input.invalid.disabled.border,
            width: input.border.width,
          })};
        }
      }

      /* readOnly */
      *:not(:invalid):read-only + & {
        --card-bg-color: ${color.input.default.readOnly.bg} !important;
        --card-fg-color: ${color.input.default.readOnly.fg} !important;
      }

      *:invalid:read-only + & {
        --card-bg-color: ${color.input.invalid.readOnly.bg} !important;
        --card-fg-color: ${color.input.invalid.readOnly.fg} !important;
      }

      /* hovered */
      @media (hover: hover) {
        *:not(:disabled):not(:read-only):not(:invalid):hover + & {
          --card-bg-color: ${color.input.default.hovered.bg};
          --card-fg-color: ${color.input.default.hovered.fg};
        }

        *:invalid:not(:disabled):not(:read-only):hover + & {
          --card-bg-color: ${color.input.invalid.hovered.bg};
          --card-fg-color: ${color.input.invalid.hovered.fg};
        }

        *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.input.default.hovered.border,
            width: input.border.width,
          })};
        }

        *:invalid:not(:disabled):not(:read-only):not(:focus):hover + &[data-border] {
          --input-box-shadow: ${focusRingBorderStyle({
            color: color.input.invalid.hovered.border,
            width: input.border.width,
          })};
        }
      }
    }
  `
}
