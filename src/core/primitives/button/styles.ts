import {CSSObject} from '@sanity/ui/theme'
import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'
import {ButtonMode, ButtonTone, ButtonWidth} from '../../types'

/**
 * @internal
 */
export function buttonBaseStyles({
  $width,
  theme,
}: {$width?: ButtonWidth} & ThemeProps): ReturnType<typeof css> {
  const {styles} = theme.sanity

  return css`
    ${styles?.button};

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
    vertical-align: top;

    ${$width === 'fill' &&
    css`
      width: -moz-available;
      width: -webkit-fill-available;
      width: stretch;
    `}

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

function combineBoxShadow(...boxShadows: (string | undefined)[]): string {
  return boxShadows.filter(Boolean).join(',')
}

/**
 * @internal
 */
export function buttonColorStyles(
  props: {$mode: ButtonMode; $tone: ButtonTone} & ThemeProps,
): CSSObject[] {
  const {$mode, theme} = props
  const buttonTheme = theme.sanity.button
  const shadow = props.$mode === 'ghost'
  const base = theme.sanity.color.base
  const mode = theme.sanity.color.button[$mode] || theme.sanity.color.button.default
  const color = mode[props.$tone] || mode.default
  const border = {
    width: buttonTheme.border.width,
    color: 'var(--card-border-color)',
  }
  // const defaultBoxShadow = `inset 0px -1.5px 0px ${buttonTheme.border.width}px color-mix(in srgb, var(--card-border-color) 25%, var(--card-bg-color))`
  const defaultBoxShadow = undefined

  return [
    _colorVarsStyle(base, color.enabled),
    {
      backgroundColor: 'var(--card-bg-color)',
      color: 'var(--card-fg-color)',
      boxShadow: focusRingBorderStyle(border),
      '&:disabled, &[data-disabled="true"]': _colorVarsStyle(base, color.disabled),
      "&:not([data-disabled='true'])": {
        boxShadow: combineBoxShadow(
          focusRingBorderStyle(border),
          shadow ? defaultBoxShadow : undefined,
        ),
        '&:focus': {
          boxShadow: focusRingStyle({
            base,
            border: {width: 2, color: base.bg},
            focusRing: buttonTheme.focusRing,
          }),
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: combineBoxShadow(
            focusRingBorderStyle(border),
            shadow ? defaultBoxShadow : undefined,
          ),
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
