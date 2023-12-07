import {getTheme_v2} from '@sanity/ui/theme'
import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_cardColorStyle} from '../../styles/card'
import {focusRingStyle} from '../../styles/focusRing'
import {CardStyleProps} from './types'

export function cardStyle(
  props: CardStyleProps & ThemeProps,
): Array<ReturnType<typeof css> | (() => ReturnType<typeof css>)> {
  return [cardBaseStyle(props), cardColorStyle(props)]
}

export function cardBaseStyle(props: CardStyleProps & ThemeProps): ReturnType<typeof css> {
  const {$checkered} = props
  const {space} = getTheme_v2(props.theme)

  return css`
    ${$checkered &&
    css`
      background-size: ${space[3]}px ${space[3]}px;
      background-position: 50% 50%;
      background-image: var(--card-bg-image);
    `}

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
}

export function cardColorStyle(props: CardStyleProps & ThemeProps): ReturnType<typeof css> {
  const {$checkered, $focusRing} = props
  const {card, color, style} = getTheme_v2(props.theme)
  const border = {width: card.border.width, color: 'var(--card-border-color)'}

  return css`
    color-scheme: ${color._dark ? 'dark' : 'light'};

    ${_cardColorStyle(color, color, $checkered)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      --card-focus-ring-box-shadow: none;

      cursor: default;
      box-shadow: var(--card-focus-ring-box-shadow);

      &:disabled {
        ${_cardColorStyle(color, color.selectable.default.disabled, $checkered)}
      }

      &:not(:disabled) {
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

        &:focus-visible {
          --card-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({base: color, border, focusRing: card.focusRing})
            : undefined};
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      cursor: pointer;
      box-shadow: var(--card-focus-ring-box-shadow);

      &[data-disabled] {
        ${_cardColorStyle(color, color.selectable.default.disabled, $checkered)}
      }

      &:not([data-disabled]) {
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

        &:focus-visible {
          --card-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({base: color, border, focusRing: card.focusRing})
            : undefined};
        }
      }
    }

    ${style?.card?.root}
  `
}
