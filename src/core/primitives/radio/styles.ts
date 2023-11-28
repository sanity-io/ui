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
  const {theme} = props
  const {input} = theme.sanity
  const {focusRing} = input.radio
  const color = theme.sanity.color.input
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
      background: ${color.default.enabled.bg};
      box-shadow: ${focusRingBorderStyle({
        color: color.default.enabled.border,
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
        background: ${color.default.enabled.fg};
        opacity: 0;
      }
    }

    /* focused */
    &:not(:disabled):focus + span {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.default.enabled.border},
        focusRing,
      })};
    }

    &:not(:disabled):focus:not(:focus-visible) + span {
      box-shadow: ${focusRingBorderStyle({
        color: color.default.enabled.border,
        width: input.border.width,
      })};
    }

    &:checked + span::after {
      opacity: 1;
    }

    /* customValidity */
    &[data-error] + span {
      background-color: ${color.invalid.enabled.border};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.invalid.enabled.bg2,
      })};
      &::after {
        background: ${color.invalid.enabled.bg2};
      }
    }

    /* read only */
    &[data-read-only] + span {
      box-shadow: 0 0 0 1px ${color.default.readOnly.border};
      background: ${color.default.readOnly.bg};

      &::after {
        background: ${color.default.readOnly.border};
      }
    }

    /* disabled */
    &:not([data-read-only]):disabled + span {
      box-shadow: 0 0 0 1px ${color.default.disabled.border};
      background: ${color.default.disabled.bg};

      &::after {
        background: ${color.default.disabled.border};
      }
    }
  `
}
