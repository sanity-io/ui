import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/focusRing'
import {CardStyleProps} from './types'

export function cardStyle(
  props: CardStyleProps & ThemeProps
): Array<FlattenSimpleInterpolation | (() => FlattenSimpleInterpolation)> {
  return [cardBaseStyle, cardColorStyle(props)]
}

export function cardBaseStyle(): FlattenSimpleInterpolation {
  return css`
    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      text-decoration: none;
    }

    /* &:is(pre) */
    &[data-as='pre'] {
      font: inherit;
    }
  `
}

export function cardColorStyle(props: CardStyleProps & ThemeProps): FlattenSimpleInterpolation {
  const {$focusRing, theme} = props
  const {focusRing} = theme.sanity
  const {base, card} = theme.sanity.color
  const border = {width: 0, color: 'var(--card-border-color)'}

  return css`
    ${_colorVarsStyle(base, card.enabled)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${_colorVarsStyle(base, card.disabled)}
      }

      &[data-selected] {
        ${_colorVarsStyle(base, card.pressed)}
      }

      &:not(:disabled) {
        @media (hover: hover) {
          &:hover {
            ${_colorVarsStyle(base, card.hovered)}
          }

          &:active {
            ${_colorVarsStyle(base, card.pressed)}
          }
        }

        &:focus {
          box-shadow: ${$focusRing ? focusRingStyle({base, border, focusRing}) : undefined};
        }

        &:focus:not(:focus-visible) {
          box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }

        &[data-selected],
        &[aria-pressed='true'],
        [aria-selected='true'] > & {
          ${_colorVarsStyle(base, card.selected)}
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${_colorVarsStyle(base, card.disabled)}
      }

      &[data-selected] {
        ${_colorVarsStyle(base, card.pressed)}
      }

      &:not([data-disabled]) {
        @media (hover: hover) {
          outline: none;

          &:hover {
            ${_colorVarsStyle(base, card.hovered)}
          }

          &:active {
            ${_colorVarsStyle(base, card.pressed)}
          }
        }

        &:focus {
          box-shadow: ${$focusRing ? focusRingStyle({base, border, focusRing}) : undefined};
        }

        &:focus:not(:focus-visible) {
          box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }

        [aria-selected='true'] > & {
          ${_colorVarsStyle(base, card.selected)}
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
