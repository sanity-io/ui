import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_cardColorStyle} from '../../styles/card/_cardColorStyle'
import {ThemeProps} from '../../styles/types'
import {SelectableTone} from '../../types/selectable'

/**
 * @internal
 */
export interface SelectableStyleProps {
  $tone: SelectableTone
}

export const selectableBaseStyle = css`
  background-color: var(--card-bg-color);
  color: var(--card-fg-color);
  outline: none;

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

export function selectableColorStyle(
  props: SelectableStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {$tone} = props
  const {color} = getTheme_v2(props.theme)
  const tone = color.selectable[$tone]

  // A selectable is either a button or a link, so their state rules can share selector lists
  return css`
    ${_cardColorStyle(color, tone.enabled)}

    &[data-as='button']:not(:disabled)[aria-pressed='true'],
    &[data-as='a']:not([data-disabled])[data-pressed] {
      ${_cardColorStyle(color, tone.pressed)}
    }

    &[data-as='button']:not(:disabled)[data-selected],
    &[data-as='button']:not(:disabled)[aria-selected='true'] > &[data-as='button']:not(:disabled),
    &[data-as='a']:not([data-disabled])[data-selected] {
      ${_cardColorStyle(color, tone.selected)}
    }

    @media (hover: hover) {
      &[data-as='button']:not(:disabled):not([data-selected]),
      &[data-as='a']:not([data-disabled]):not([data-selected]) {
        &[data-hovered],
        &:hover {
          ${_cardColorStyle(color, tone.hovered)}
        }

        &:active {
          ${_cardColorStyle(color, tone.pressed)}
        }
      }
    }
  `
}

export function selectableDisabledStyle(
  props: SelectableStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {color} = getTheme_v2(props.theme)

  return css`
    &[data-as='button']:disabled,
    &[data-as='a'][data-disabled] {
      ${_cardColorStyle(color, color.selectable[props.$tone].disabled)}
    }
  `
}

export function selectableStyle(props: ThemeProps): ReturnType<typeof css> {
  const {style} = getTheme_v2(props.theme)

  return css`
    ${style?.card?.root}
  `
}
