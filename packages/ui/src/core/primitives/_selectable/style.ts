import {getTheme_v2} from '@sanity/ui/theme'
import {css} from 'styled-components'

import {ThemeProps} from '../../styles'
import {_cardColorStyle} from '../../styles/card'
import {SelectableTone} from '../../types'

/**
 * @internal
 */
export interface SelectableStyleProps {
  $tone: SelectableTone
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
      width: -moz-available;
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
  const {$tone} = props
  const {color, style} = getTheme_v2(props.theme)
  const tone = color.selectable[$tone]

  return css`
    ${_cardColorStyle(color, tone.enabled)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);
    outline: none;

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${_cardColorStyle(color, tone.disabled)}
      }

      &:not(:disabled) {
        &[aria-pressed='true'] {
          ${_cardColorStyle(color, tone.pressed)}
        }

        &[data-selected],
        &[aria-selected='true'] > & {
          ${_cardColorStyle(color, tone.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${_cardColorStyle(color, tone.hovered)}
            }

            &:active {
              ${_cardColorStyle(color, tone.pressed)}
            }
          }
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${_cardColorStyle(color, tone.disabled)}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${_cardColorStyle(color, tone.pressed)}
        }

        &[data-selected] {
          ${_cardColorStyle(color, tone.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${_cardColorStyle(color, tone.hovered)}
            }
            &:active {
              ${_cardColorStyle(color, tone.pressed)}
            }
          }
        }
      }
    }

    ${style?.card?.root}
  `
}
