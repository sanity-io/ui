import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_cardColorStyle} from '../../styles/card/_cardColorStyle'
import {focusRingStyle} from '../../styles/focusRing'
import {ThemeProps} from '../../styles/types'
import {CardStyleProps} from './types'

export function cardCheckeredStyle(
  props: Pick<CardStyleProps, '$checkered'> & ThemeProps,
): ReturnType<typeof css> | false {
  if (!props.$checkered) return false

  const {space} = getTheme_v2(props.theme)

  return css`
    background-size: ${space[3]}px ${space[3]}px;
    background-position: 50% 50%;
    background-image: var(--card-bg-image);
  `
}

export const cardStaticStyle = css`
  color: var(--card-fg-color);

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
    outline: none;
    text-decoration: none;
  }

  /* &:is(pre) */
  &[data-as='pre'] {
    font: inherit;
  }
`

export function cardColorStyle(
  props: Pick<CardStyleProps, '$checkered'> & ThemeProps,
): ReturnType<typeof css> {
  const {$checkered} = props
  const {color} = getTheme_v2(props.theme)

  // A card is either a button or a link, so their state rules can share selector lists
  return css`
    color-scheme: ${color._dark ? 'dark' : 'light'};

    ${_cardColorStyle(color, color, $checkered)}

    /* &:is(button) */
    &[data-as='button'] {
      --card-focus-ring-box-shadow: none;

      cursor: default;
      box-shadow: var(--card-focus-ring-box-shadow);
    }

    /* &:is(a) */
    &[data-as='a'] {
      cursor: pointer;
      box-shadow: var(--card-focus-ring-box-shadow);
    }

    &[data-as='button']:disabled,
    &[data-as='a'][data-disabled] {
      ${_cardColorStyle(color, color.selectable.default.disabled, $checkered)}
    }

    &[data-as='button']:not(:disabled),
    &[data-as='a']:not([data-disabled]) {
      &[data-pressed] {
        ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
      }

      &[data-selected] {
        ${_cardColorStyle(color, color.selectable.default.selected, $checkered)}
      }

      @media (hover: hover) {
        &:not([data-pressed]):not([data-selected]) {
          &[data-hovered],
          &:hover {
            ${_cardColorStyle(color, color.selectable.default.hovered, $checkered)}
          }

          &:active {
            ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
          }
        }
      }
    }
  `
}

export function cardStyle(
  props: Pick<CardStyleProps, '$focusRing' | '$muted'> & ThemeProps,
): ReturnType<typeof css> {
  const {card, color, style} = getTheme_v2(props.theme)
  const border = {width: card.border.width, color: 'var(--card-border-color)'}

  return css`
    background-color: ${props.$muted ? 'var(--card-muted-bg-color)' : 'var(--card-bg-color)'};

    ${
      props.$focusRing &&
      css`
        &[data-as='button']:not(:disabled):focus-visible,
        &[data-as='a']:not([data-disabled]):focus-visible {
          --card-focus-ring-box-shadow: ${focusRingStyle({
            base: color,
            border,
            focusRing: card.focusRing,
          })};
        }
      `
    }

    ${style?.card?.root}
  `
}
