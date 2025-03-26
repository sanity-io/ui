import {getTheme_v2} from '@sanity/ui/theme'
import {css} from 'styled-components'

import {rem, ThemeProps} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'

export function radioBaseStyle(): ReturnType<typeof css> {
  return css`
    position: relative;

    &:not([hidden]) {
      display: inline-block;
    }

    &[data-read-only] {
      outline: 1px solid red;
    }
  `
}

export function inputElementStyle(props: ThemeProps): ReturnType<typeof css> {
  const {color, input} = getTheme_v2(props.theme)
  const dist = (input.radio.size - input.radio.markSize) / 2

  return css`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    z-index: 1;
    padding: 0;
    margin: 0;
    border-radius: ${rem(input.radio.size / 2)};
    border: none;

    /* enabled */
    & + span {
      display: block;
      position: relative;
      height: ${rem(input.radio.size)};
      width: ${rem(input.radio.size)};
      border-radius: ${rem(input.radio.size / 2)};
      background: ${color.input.default.enabled.bg};
      box-shadow: ${focusRingBorderStyle({
        color: color.input.default.enabled.border,
        width: input.border.width,
      })};

      &::after {
        content: '';
        position: absolute;
        top: ${rem(dist)};
        left: ${rem(dist)};
        height: ${rem(input.radio.markSize)};
        width: ${rem(input.radio.markSize)};
        border-radius: ${rem(input.radio.markSize / 2)};
        background: ${color.input.default.enabled.fg};
        opacity: 0;
      }
    }

    /* focused */
    &:not(:disabled):focus + span {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.input.default.enabled.border},
        focusRing: input.radio.focusRing,
      })};
    }

    &:not(:disabled):focus:not(:focus-visible) + span {
      box-shadow: ${focusRingBorderStyle({
        color: color.input.default.enabled.border,
        width: input.border.width,
      })};
    }

    &:checked + span::after {
      opacity: 1;
    }

    /* customValidity */
    &[data-error] + span {
      background-color: ${color.input.invalid.enabled.border};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.input.invalid.enabled.muted.bg,
      })};
      &::after {
        background: ${color.input.invalid.enabled.muted.bg};
      }
    }

    /* read only */
    &[data-read-only] + span {
      box-shadow: 0 0 0 1px ${color.input.default.readOnly.border};
      background: ${color.input.default.readOnly.bg};

      &::after {
        background: ${color.input.default.readOnly.border};
      }
    }

    /* disabled */
    &:not([data-read-only]):disabled + span {
      box-shadow: 0 0 0 1px ${color.input.default.disabled.border};
      background: ${color.input.default.disabled.bg};

      &::after {
        background: ${color.input.default.disabled.border};
      }
    }
  `
}
