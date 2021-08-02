import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../../styles'
import {_colorVarsStyle} from '../../../styles/colorVars'
import {SelectableTone} from '../../../types/selectable'

/**
 * @internal
 */
export interface SelectableStyleProps {
  $tone: SelectableTone
}

export function selectableBaseStyle(): FlattenSimpleInterpolation {
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

export function selectableColorStyle(
  props: SelectableStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$tone, theme} = props
  const {base, selectable} = theme.sanity.color
  const tone = selectable[$tone] || selectable.default

  return css`
    ${_colorVarsStyle(base, tone.enabled)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${_colorVarsStyle(base, tone.disabled)}
      }

      &:not(:disabled) {
        &[data-selected],
        &[aria-pressed='true'] {
          ${_colorVarsStyle(base, tone.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]):not([aria-pressed='true']):hover {
            ${_colorVarsStyle(base, tone.hovered)}
          }

          &:active {
            ${_colorVarsStyle(base, tone.pressed)}
          }
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${_colorVarsStyle(base, tone.disabled)}
      }

      &:not([data-disabled]) {
        @media (hover: hover) {
          outline: none;

          &:hover {
            ${_colorVarsStyle(base, tone.hovered)}
          }

          &:active {
            ${_colorVarsStyle(base, tone.pressed)}
          }
        }

        &[data-selected] {
          ${_colorVarsStyle(base, tone.selected)}
        }

        [aria-selected='true'] > & {
          ${_colorVarsStyle(base, tone.selected)}
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
