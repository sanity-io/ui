import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {mutableCardVariables} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'
import {cssVars} from '../../theme/lib/theme/color/cssVariables/createCssVars'
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
        ? cssVars[$tone]['bg-accent']
        : $mode === 'ghost'
        ? cssVars[$tone]['border-base']
        : cssVars[$tone]['bg-base'],
  }

  return [
    {
      // This is going to be used by the text elements inside the button
      [mutableCardVariables['fg-color']]:
        $mode === 'default' ? cssVars[$tone]['base-text-color'] : cssVars[$tone]['text-primary'],
      [mutableCardVariables['muted-fg-color']]:
        $mode === 'default' ? cssVars[$tone]['base-text-color'] : cssVars[$tone]['text-secondary'],
      [mutableCardVariables['icon-color']]:
        $mode === 'default' ? cssVars[$tone]['icon-inverted'] : cssVars[$tone]['icon-default'],
      [mutableCardVariables['bg-color']]:
        $mode === 'default' ? cssVars[$tone]['bg-accent'] : cssVars[$tone]['bg-base'],

      '&:disabled, &[data-disabled="true"]': {
        /* Updates the variables for the */
        [mutableCardVariables['fg-color']]: cssVars.primary['text-inactive'],
        [mutableCardVariables['muted-fg-color']]: cssVars.primary['text-inactive'],
        [mutableCardVariables['icon-color']]: cssVars.primary['border-base'],
        [mutableCardVariables['bg-color']]:
          $mode === 'default' ? cssVars.primary['bg-tint'] : cssVars.default['bg-base'],
      },
    },
    {
      backgroundColor:
        $mode === 'default' ? cssVars[$tone]['bg-accent'] : cssVars[$tone]['bg-base'],
      color:
        $mode === 'default' ? cssVars[$tone]['base-text-color'] : cssVars[$tone]['text-primary'],
      boxShadow: focusRingBorderStyle(border),
      '&:disabled, &[data-disabled="true"]': {
        backgroundColor:
          $mode === 'default' ? cssVars.primary['bg-tint'] : cssVars.default['bg-base'],
        color: cssVars.primary['text-inactive'],
        boxShadow: focusRingBorderStyle({
          ...border,
          color: $mode === 'default' ? cssVars.primary['bg-tint'] : cssVars.primary['border-base'],
        }),
      },
      "&:not([data-disabled='true'])": {
        boxShadow: combineBoxShadow(
          focusRingBorderStyle(border),
          shadow ? defaultBoxShadow : undefined,
        ),
        '&:focus': {
          boxShadow: focusRingStyle({
            base: {bg: cssVars.positive['border-accent']},
            border: {width: 2, color: cssVars.default['bg-base']},
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
              $mode === 'default'
                ? cssVars[$tone]['bg-accent-hover']
                : cssVars[$tone]['bg-base-hover'],
          },
          '&:active': {
            backgroundColor:
              $mode === 'default'
                ? cssVars[$tone]['bg-accent-active']
                : cssVars[$tone]['bg-base-active'],
          },
          '&[data-hovered]': {
            backgroundColor:
              $mode === 'default'
                ? cssVars[$tone]['bg-accent-hover']
                : cssVars[$tone]['bg-base-hover'],
          },
        },
        '&[data-selected]': {
          backgroundColor:
            $mode === 'default'
              ? cssVars[$tone]['bg-accent-active']
              : cssVars[$tone]['bg-base-active'],
        },
      },
    },
    theme.sanity.styles?.button?.root,
  ].filter(Boolean) as CSSObject[]
}
