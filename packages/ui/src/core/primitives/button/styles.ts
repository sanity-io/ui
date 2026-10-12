import {css} from 'styled-components'

import {ThemeColorCard_v2} from '../../../theme/system/color/color'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_cardColorStyle} from '../../styles/card/_cardColorStyle'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/focusRing'
import {ThemeProps} from '../../styles/types'
import {ButtonMode, ButtonTone} from '../../types/button'

function buttonToneColor(
  base: ThemeColorCard_v2,
  {$mode, $tone}: {$mode: ButtonMode; $tone: ButtonTone},
) {
  const mode = base.button[$mode] || base.button.default

  return mode[$tone] || mode.default
}

/**
 * @internal
 */
export function buttonBaseStyles(props: ThemeProps): ReturnType<typeof css> {
  const {button} = getTheme_v2(props.theme)
  const borderBoxShadow = focusRingBorderStyle({
    width: button.border.width,
    color: 'var(--card-border-color)',
  })

  return css`
    /* Stays here: Breadcrumbs' expand button overrides it at equal specificity */
    margin: 0;
    background-color: var(--card-bg-color);
    color: var(--card-fg-color);
    box-shadow: ${borderBoxShadow};

    &:not([data-disabled='true']) {
      &:focus:not(:focus-visible) {
        box-shadow: ${borderBoxShadow};
      }
    }
  `
}

/**
 * @internal
 */
export function buttonColorStyles(
  props: {$mode: ButtonMode; $tone: ButtonTone} & ThemeProps,
): ReturnType<typeof css> {
  const {color: baseColor} = getTheme_v2(props.theme)
  const color = buttonToneColor(baseColor, props)

  return css`
    ${_cardColorStyle(baseColor, color.enabled)}

    &:not([data-disabled='true']) {
      @media (hover: hover) {
        &:hover {
          ${_cardColorStyle(baseColor, color.hovered)}
        }

        &:active {
          ${_cardColorStyle(baseColor, color.pressed)}
        }

        &[data-hovered] {
          ${_cardColorStyle(baseColor, color.hovered)}
        }
      }

      &[data-selected] {
        ${_cardColorStyle(baseColor, color.pressed)}
      }
    }
  `
}

/**
 * @internal
 */
export function buttonDisabledAndFocusStyles(
  props: {$mode: ButtonMode; $tone: ButtonTone} & ThemeProps,
): ReturnType<typeof css> {
  const {button, color: baseColor} = getTheme_v2(props.theme)
  const color = buttonToneColor(baseColor, props)

  return css`
    &:disabled,
    &[data-disabled='true'] {
      ${_cardColorStyle(baseColor, color.disabled)}
    }

    &:not([data-disabled='true']):focus {
      box-shadow: ${focusRingStyle({
        base: baseColor,
        border: {width: 2, color: baseColor.bg},
        focusRing: button.focusRing,
      })};
    }
  `
}

/**
 * @internal
 */
export function buttonStyles(props: ThemeProps): ReturnType<typeof css> {
  const {style} = getTheme_v2(props.theme)

  return css`
    ${style?.button?.root}
  `
}
