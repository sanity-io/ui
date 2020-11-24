import {css} from 'styled-components'
import {rem} from '../../styles'
import {ThemeColorSchemeKey, Theme} from '../../theme'

export function radioBaseStyles() {
  return css`
    position: relative;
    &&:not([hidden]) {
      display: inline-block;
    }
  `
}

export function inputElementStyles({scheme, theme}: {scheme: ThemeColorSchemeKey; theme: Theme}) {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default
  const {markSize, size} = theme.input.radio
  const dist = (size - markSize) / 2

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
    border-radius: ${rem(size / 2)};

    & + span {
      display: block;
      position: relative;
      height: ${rem(size)};
      width: ${rem(size)};
      border-radius: ${rem(size / 2)};
      background: ${tone.enabled.bg};
      box-shadow: 0 0 0 1px ${tone.enabled.border};

      &::after {
        content: '';
        position: absolute;
        top: ${rem(dist)};
        left: ${rem(dist)};
        height: ${rem(markSize)};
        width: ${rem(markSize)};
        border-radius: ${rem(markSize / 2)};
        background: ${tone.enabled.fg};
        opacity: 0;
      }
    }

    &:focus + span {
      box-shadow: 0 0 0 2px var(--card-focus-ring-color);
    }

    &:checked + span::after {
      opacity: 1;
    }

    &:disabled + span {
      box-shadow: 0 0 0 1px ${tone.disabled.border};
      background: ${tone.disabled.bg};

      &::after {
        background: ${tone.disabled.fg};
      }
    }
  `
}
