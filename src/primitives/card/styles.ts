import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {
  _colorVarStyleActive,
  _colorVarStyleDisabled,
  _colorVarStyleHover,
  _colorVarStyleSelected,
} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/focusRing'
import {createCssVars, cssVars} from '../../theme/lib/theme/color/cssVariables'
import {CardStyleProps} from './types'

export function cardStyle(
  props: CardStyleProps & ThemeProps,
): Array<ReturnType<typeof css> | (() => ReturnType<typeof css>)> {
  return [cardBaseStyle(props), cardColorStyle(props)]
}

export function cardBaseStyle(props: CardStyleProps & ThemeProps): ReturnType<typeof css> {
  const {$checkered, theme} = props
  const space = theme.sanity.space

  return css`
    ${$checkered &&
    css`
      background-size: ${space[3]}px ${space[3]}px;
      background-position: 50% 50%;
      background-image: ${cssVars.mutable['bg-image']};
    `}

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
  const {$checkered, $focusRing, theme, $tone, $scheme, $updateCssVars} = props
  const {focusRing} = theme.sanity.card

  const border = {width: 0, color: cssVars.positive['border-accent']}

  return css`
    /* A new css vars context is created, allowing for override of the default tone and changing the scheme */
    ${$updateCssVars && createCssVars($scheme, theme.sanity.color.tones, $tone)}
    color-scheme: ${$scheme === 'dark' ? 'dark' : 'light'};
    ${$checkered &&
    `--card-bg-image: repeating-conic-gradient(${cssVars.default['base-bg-card']} 0% 25%, ${cssVars.default['bg-tint']} 0% 50%)`}

    background-color: ${cssVars.mutable['bg-color']};
    color: ${cssVars.default['text-primary']};

    /* &:is(button) */
    &[data-as='button'] {
      --card-focus-ring-box-shadow: none;

      cursor: default;
      box-shadow: var(--card-focus-ring-box-shadow);

      &:disabled {
        ${_colorVarStyleDisabled($checkered)}
      }

      &:not(:disabled) {
        &[data-pressed] {
          ${_colorVarStyleActive()}
        }

        &[data-selected] {
          ${_colorVarStyleSelected()}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${_colorVarStyleHover()}
            }

            &:active {
              ${_colorVarStyleActive()}
            }
          }
        }

        &:focus {
          --card-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({border, focusRing})
            : undefined};
        }

        &:focus:not(:focus-visible) {
          --card-focus-ring-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      cursor: pointer;
      box-shadow: var(--card-focus-ring-box-shadow);

      &[data-disabled] {
        ${_colorVarStyleDisabled($checkered)}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${_colorVarStyleActive()}
        }

        &[data-selected] {
          ${_colorVarStyleSelected()}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${_colorVarStyleHover()}
            }

            &:active {
              ${_colorVarStyleActive()}
            }
          }
        }

        &:focus {
          --card-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({border, focusRing})
            : undefined};
        }

        &:focus:not(:focus-visible) {
          --card-focus-ring-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
