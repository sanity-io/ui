import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/focusRing'
import {ThemeColorBase, ThemeColorMenuItemState} from '../../theme'
import {MenuItemTone} from '../../types/menuItem'

/**
 * @internal
 */
export interface MenuItemStyleProps {
  $focusRing: boolean
  $tone: MenuItemTone
}

export function menuItemBaseStyle(): FlattenSimpleInterpolation {
  return css`
    background-color: inherit;
    color: inherit;

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
  `
}

function _vars(base: ThemeColorBase, color: ThemeColorMenuItemState) {
  return {
    // Base
    // @todo: rename to "--base-"?
    '--card-shadow-outline-color': base.shadow.outline,
    '--card-shadow-umbra-color': base.shadow.umbra,
    '--card-shadow-penumbra-color': base.shadow.penumbra,
    '--card-shadow-ambient-color': base.shadow.ambient,
    '--card-focus-ring-color': base.focusRing,

    // Card
    '--card-bg-color': color.bg,
    '--card-fg-color': color.fg,
    '--card-border-color': color.border,
    '--card-muted-fg-color': color.muted.fg,
    '--card-accent-fg-color': color.accent.fg,
    '--card-link-fg-color': color.link.fg,
    '--card-code-bg-color': color.code.bg,
    '--card-code-fg-color': color.code.fg,
    '--card-skeleton-color-from': color.skeleton?.from,
    '--card-skeleton-color-to': color.skeleton?.to,

    // @todo: deprecate
    '--card-link-color': color.link.fg,
    '--card-hairline-soft-color': color.border,
    '--card-hairline-hard-color': color.border,
  }
}

export function menuItemColorStyle(
  props: MenuItemStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$focusRing, $tone, theme} = props
  const {focusRing} = theme.sanity
  const {base, menuItem} = theme.sanity.color
  const tone = menuItem[$tone] || menuItem.default
  const border = {width: 0, color: 'var(--card-border-color)'}

  return css`
    ${_vars(base, tone.enabled)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${_vars(base, tone.disabled)}
      }

      &:not(:disabled) {
        &[data-selected],
        &[aria-pressed='true'] {
          ${_vars(base, tone.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]):not([aria-pressed='true']):hover {
            ${_vars(base, tone.hovered)}
          }

          &:active {
            ${_vars(base, tone.pressed)}
          }
        }

        &:focus {
          box-shadow: ${$focusRing ? focusRingStyle({base, border, focusRing}) : undefined};
        }

        &:focus:not(:focus-visible) {
          box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${_vars(base, tone.disabled)}
      }

      &:not([data-disabled]) {
        @media (hover: hover) {
          outline: none;

          &:hover {
            ${_vars(base, tone.hovered)}
          }

          &:active {
            ${_vars(base, tone.pressed)}
          }
        }

        &:focus {
          box-shadow: ${$focusRing ? focusRingStyle({base, border, focusRing}) : undefined};
        }

        &:focus:not(:focus-visible) {
          box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }

        &[data-selected] {
          ${_vars(base, tone.selected)}
        }

        [aria-selected='true'] > & {
          ${_vars(base, tone.selected)}
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
