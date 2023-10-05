import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'
import {cssVars} from '../../theme/lib/theme/color/cssVars'
import {ButtonMode, ButtonTone} from '../../types'
import {CSSObject} from '../../types/styled'

/**
 * @internal
 */
export function buttonBaseStyles(): ReturnType<typeof css> {
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
const defaultBoxShadow = '0px 2px 0px 0px rgba(112, 128, 155, 0.19);'

function combineBoxShadow(...boxShadows: (string | undefined)[]): string {
  return boxShadows.filter(Boolean).join(',')
}

/**
 * @internal
 */
export function buttonColorStyles(
  props: {$mode: ButtonMode; $tone: ButtonTone} & ThemeProps,
): CSSObject[] {
  const {$mode, theme, $tone} = props
  const {focusRing} = theme.sanity.button
  const shadow = props.$mode !== 'bleed'
  const border = {
    width: buttonTheme.border.width,
    color:
      $mode === 'default'
        ? cssVars[$tone].bg_accent
        : $mode === 'ghost'
        ? cssVars[$tone].border_base
        : cssVars[$tone].bg_base,
  }

  return [
    {
      // This is going to be used by the text elements inside the button
      '--card-fg-color': $mode === 'default' ? cssVars[$tone].bg_base : cssVars[$tone].text_primary,
      '--card-muted-fg-color':
        $mode === 'default' ? cssVars[$tone].bg_base : cssVars[$tone].text_secondary,
      '--card-icon-color':
        $mode === 'default' ? cssVars[$tone].icon_inverted : cssVars[$tone].icon_default,
      '&:disabled, &[data-disabled="true"]': {
        /* Updates the variables for the */
        '--card-fg-color': cssVars.primary.text_tertiary,
        '--card-muted-fg-color': cssVars.primary.text_tertiary,
        '--card-icon-color': cssVars.primary.text_tertiary,
      },
    },
    {
      backgroundColor: $mode === 'default' ? cssVars[$tone].bg_accent : cssVars[$tone].bg_base,
      color: $mode === 'default' ? cssVars[$tone].bg_base : cssVars[$tone].text_primary,
      boxShadow: focusRingBorderStyle(border),
      '&:disabled, &[data-disabled="true"]': {
        backgroundColor: $mode === 'default' ? cssVars.primary.bg_tint : cssVars.default.bg_base,
        color: cssVars.primary.text_tertiary,
        boxShadow: focusRingBorderStyle({
          ...border,
          color: $mode === 'default' ? cssVars.primary.bg_tint : cssVars.primary.border_base,
        }),
      },
      "&:not([data-disabled='true'])": {
        boxShadow: combineBoxShadow(
          focusRingBorderStyle(border),
          shadow ? defaultBoxShadow : undefined,
        ),
        '&:focus': {
          boxShadow: focusRingStyle({
            base: {bg: cssVars.positive.border_accent},
            border: {width: 2, color: cssVars.default.bg_base},
            focusRing,
          }),
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: combineBoxShadow(
            focusRingBorderStyle(border),
            shadow ? defaultBoxShadow : undefined,
          ),
        },
        '@media (hover: hover)': {
          '&:hover': {
            backgroundColor:
              $mode === 'default' ? cssVars[$tone].bg_accent_hover : cssVars[$tone].bg_base_hover,
          },
          '&:active': {
            backgroundColor:
              $mode === 'default' ? cssVars[$tone].bg_accent_active : cssVars[$tone].bg_base_active,
          },
          '&[data-hovered]': {
            backgroundColor:
              $mode === 'default' ? cssVars[$tone].bg_accent_hover : cssVars[$tone].bg_base_hover,
          },
        },
        '&[data-selected]': {
          backgroundColor:
            $mode === 'default' ? cssVars[$tone].bg_accent_active : cssVars[$tone].bg_base_active,
        },
      },
    },
    theme.sanity.styles?.button?.root,
  ].filter(Boolean) as CSSObject[]
}
