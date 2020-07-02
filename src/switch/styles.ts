import {color} from '@sanity/color'
import {css} from 'styled-components'
// import {Theme} from '../theme'
import {rem} from '../helpers'

// @todo: Move these values to the theme context
const theme = {
  color: {
    switch: {
      tones: {
        default: {
          enabled: {
            thumb: color.white.hex,
            off: {
              bg: color.gray['500'].hex,
            },
            on: {
              bg: color.green['500'].hex,
            },
          },
          disabled: {
            thumb: color.gray['50'].hex,
            off: {
              bg: color.gray['200'].hex,
            },
            on: {
              bg: color.green['200'].hex,
            },
          },
        },
      },
    },
  },

  switch: {
    width: 33,
    height: 17,
    padding: 4,
    transitionDurationMs: 150,
    transitionTimingFunction: 'ease-out',
  },
}

/* Root */
export function switchBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

/* Input */
export function switchInputStyles() {
  const tone = theme.color.switch.tones.default

  // Visually hide the input element while keeping it interactive
  return css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    padding: 0;
    margin: 0;

    /* Place the input element above the representation element */
    z-index: 1;

    & + [data-name='representation'] {
      --switch-thumb-color: ${tone.enabled.thumb};
      --switch-bg-color: ${tone.enabled.off.bg};
    }

    &:checked + [data-name='representation'] {
      --switch-bg-color: ${tone.enabled.on.bg};
    }

    &:disabled + [data-name='representation'] {
      --switch-thumb-color: ${tone.disabled.thumb};
      --switch-bg-color: ${tone.disabled.off.bg};
    }

    /* Focus styles */
    &:focus + [data-name='representation'] {
      /* @todo: Use focus ring color from card theme */
      box-shadow: 0 0 0 1px #fff, 0 0 0 3px #4e91fc;
    }
  `
}

/* Representation */
export function switchRepresentationStyles() {
  return css`
    display: block;
    position: relative;
    width: ${rem(theme.switch.width)};
    height: ${rem(theme.switch.height)};
    border-radius: ${rem(theme.switch.height / 2)};

    /* Make sure it’s not possible to interact with the wrapper element */
    pointer-events: none;
  `
}

/* Track */
export function switchTrackStyles() {
  return css`
    display: block;
    background: var(--switch-bg-color);
    position: absolute;
    left: 0;
    top: 0;
    width: ${rem(theme.switch.width)};
    height: ${rem(theme.switch.height)};
    border-radius: ${rem(theme.switch.height / 2)};
  `
}

/* Thumb */
export function switchThumbStyles(props: {checked?: boolean}) {
  const trackWidth = theme.switch.width
  const trackHeight = theme.switch.height
  const trackPadding = theme.switch.padding
  const size = trackHeight - theme.switch.padding * 2
  const checkedOffset = trackWidth - trackPadding * 2 - size
  const indeterminateOffset = trackWidth / 2 - size / 2 - trackPadding

  return css`
    display: block;
    position: absolute;
    left: ${rem(trackPadding)};
    top: ${rem(trackPadding)};
    height: ${rem(size)};
    width: ${rem(size)};
    border-radius: ${rem(size / 2)};
    transition-property: transform;
    transition-duration: ${theme.switch.transitionDurationMs}ms;
    transition-timing-function: ${theme.switch.transitionTimingFunction};
    background: var(--switch-thumb-color);
    transform: translate3d(0, 0, 0);

    ${props.checked === true &&
    css`
      transform: translate3d(${checkedOffset}px, 0, 0);
    `}

    ${typeof props.checked !== 'boolean' &&
    css`
      transform: translate3d(${indeterminateOffset}px, 0, 0);
    `}
  `
}
