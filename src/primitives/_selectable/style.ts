import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {
  _colorVarStyleActive,
  _colorVarStyleHover,
  _colorVarStyleSelected,
  _selectableVarStyle,
  _selectableVarStyleDisabled,
} from '../../styles/colorVars'

import {ThemeColorSchemeKey, ThemeColorToneKey, createCssVars, cssVars} from '../../theme'

/**
 * @internal
 */
export interface SelectableStyleProps {
  $tone: ThemeColorToneKey
  $scheme: ThemeColorSchemeKey
}

export function selectableBaseStyle(): ReturnType<typeof css> {
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
      width: -webkit-fill-available;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      text-decoration: none;
    }
  `
}

export function selectableColorStyle(
  props: SelectableStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {theme, $tone, $scheme} = props

  return css`
    ${$tone !== 'default' && createCssVars($scheme, theme.sanity.color.tones, $tone)}
    ${_selectableVarStyle()}

    background-color: ${cssVars.mutable['bg-color']};
    color: ${cssVars[$tone]['text-secondary']};
    outline: none;

    /* &:is(button) - Looks like a button in default mode */
    &[data-as='button'] {
      &:disabled {
        ${_selectableVarStyleDisabled()}
      }

      &:not(:disabled) {
        &[aria-pressed='true'] {
          ${_colorVarStyleActive()}
        }

        &[data-selected],
        &[aria-selected='true'] > & {
          ${_colorVarStyleSelected()}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${_colorVarStyleHover()}
            }

            &:active {
              ${_colorVarStyleActive()}
            }
          }
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${_selectableVarStyleDisabled()}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${_colorVarStyleActive()}
        }

        &[data-selected] {
          ${_colorVarStyleSelected()}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${_colorVarStyleHover()}
            }

            &:active {
              ${_colorVarStyleActive()}
            }
          }
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
