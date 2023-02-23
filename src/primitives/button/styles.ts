import {css, CSSObject, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'
import {ButtonMode, ButtonTone} from '../../types'

/**
 * @internal
 */
export function buttonBaseStyles(): FlattenSimpleInterpolation {
  return css`
    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-flex;
    align-items: center;
    font: inherit;
    border: 0;
    outline: none;
    user-select: none;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-align: left;
    position: relative;

    & > span {
      display: block;
      flex: 1;
      min-width: 0;
      border-radius: inherit;
    }

    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  `
}

const buttonTheme = {border: {width: 1}}

/**
 * @internal
 */
export function buttonColorStyles(
  props: {$mode: ButtonMode; $tone: ButtonTone} & ThemeProps
): CSSObject[] {
  const {$mode, theme} = props
  const {focusRing} = theme.sanity
  const base = theme.sanity.color.base
  const mode = theme.sanity.color.button[$mode] || theme.sanity.color.button.default
  const color = mode[props.$tone] || mode.default
  const border = {width: buttonTheme.border.width, color: 'var(--card-border-color)'}

  return [
    _colorVarsStyle(base, color.enabled),
    {
      backgroundColor: 'var(--card-bg-color)',
      color: 'var(--card-fg-color)',
      boxShadow: focusRingBorderStyle(border),
      '&:disabled, &[data-disabled="true"]': _colorVarsStyle(base, color.disabled),
      "&:not([data-disabled='true'])": {
        '&:focus': {
          boxShadow: focusRingStyle({base, border, focusRing}),
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: focusRingBorderStyle(border),
        },
        '@media (hover: hover)': {
          '&:hover': _colorVarsStyle(base, color.hovered),
          '&:active': _colorVarsStyle(base, color.pressed),
          '&[data-hovered]': _colorVarsStyle(base, color.hovered),
        },
        '&[data-selected]': _colorVarsStyle(base, color.pressed),
      },
    },
    theme.sanity.styles?.button?.root,
  ].filter(Boolean) as CSSObject[]
}
