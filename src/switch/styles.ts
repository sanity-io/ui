import {css} from 'styled-components'
// import {Theme} from '../theme'
import {color} from '@sanity/color'

/* TODO 
  - Get colors from theme
  - Get transition from global transitions
*/

const inputColor = {
  enabled: {
    bg: color.white.hex,
    fg: color.black.hex,
    border: color.gray[200].hex,
    focused: color.blue[400].hex,
  },
  disabled: {
    bg: color.gray[50].hex,
    fg: color.gray[500].hex,
    border: color.gray[200].hex,
  },
}

const TRACK = {
  on: color.green[500].hex,
  off: inputColor.disabled.fg,
  disabled: inputColor.disabled.border,
  focused: inputColor.enabled.focused,
  width: '2.5em',
  height: '1.3em',
}

const THUMB = {
  size: `calc(${TRACK.height} * 0.45)`, // used for height, width, and border radius of the thumb
  offset: `calc(${TRACK.height} * 0.25)`,
  color: inputColor.enabled.bg,
  disabled: inputColor.disabled.bg,
}

export function switchBaseStyles() {
  return css`
    position: relative;
    display: flex;
  `
}

export function inputElementStyles() {
  // Hide the input element, while still making it respond to focus
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
    z-index: 1;
    padding: 0;
    margin: 0;

    /* Focus styles */
    &:focus + .wrapper {
      border-color: ${TRACK.focused};
    }

    &:checked + .wrapper {
      /* Track styles when input is checked */
      .track {
        background: ${TRACK.on};
      }
      /* Thumb styles when input is checked */
      .thumb {
        transform: translate3d(calc(${TRACK.width} - ${THUMB.size} - (${THUMB.offset} * 2)), 0, 0);
      }
    }

    &:disabled + .wrapper {
      /* Track styles when input is disabled */
      .track {
        background: ${TRACK.disabled};
      }
      /* Thumb styles when input is disabled */
      .thumb {
        background: ${THUMB.disabled};
      }
    }

    &:indeterminate + .wrapper {
      .thumb {
        transform: translate3d(
          calc((${TRACK.width} - ${THUMB.size} - (${THUMB.offset} * 2)) / 2),
          0,
          0
        );
      }
    }
  `
}

export function wrapperStyles() {
  /* Styles for the track and thumb wrapper */
  return css`
    flex-shrink: 0;
    position: relative;
    height: ${TRACK.height};
    width: ${TRACK.width};
    border-radius: ${TRACK.width};
    border: 2px solid transparent;
  `
}

export function trackStyles() {
  /* Base track styles */
  return css`
    background: ${TRACK.off};
    position: absolute;
    left: 0;
    top: 0;
    height: ${TRACK.height};
    width: ${TRACK.width};
    border-radius: ${TRACK.width};
    cursor: default;
    border: 1px solid white;
    box-sizing: border-box;
  `
}

export function thumbStyles() {
  /* Base thumb styles */
  return css`
    background: ${THUMB.color};
    position: absolute;
    left: ${THUMB.offset};
    top: calc((100% - ${THUMB.size}) / 2);
    height: ${THUMB.size};
    width: ${THUMB.size};
    border-radius: ${THUMB.size};
    cursor: default;
    transform-origin: left;
    transition-property: transform;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  `
}
