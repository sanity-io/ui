import {css} from 'styled-components'
import {rem} from '../../styles'
import {ColorSchemeKey, Theme} from '../../theme'

/* Root */
export function switchBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

/* Input */
export function switchInputStyles() {
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
  `
}

/* Representation */
export function switchRepresentationStyles(props: {scheme: ColorSchemeKey; theme: Theme}) {
  const {scheme, theme} = props
  const {switch: switchInput} = theme.input
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.switch.tones.default

  return css`
    --switch-thumb-color: ${tone.enabled.thumb};
    --switch-bg-color: ${tone.enabled.off.bg};

    display: block;
    position: relative;
    width: ${rem(switchInput.width)};
    height: ${rem(switchInput.height)};
    border-radius: ${rem(switchInput.height / 2)};

    /* Make sure it’s not possible to interact with the wrapper element */
    pointer-events: none;

    /* Focus styles */
    input:focus-visible + & {
      /* @todo: Use focus ring color from card theme */
      box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
    }

    input:checked + & {
      --switch-bg-color: ${tone.enabled.on.bg};
    }

    input:disabled + & {
      --switch-thumb-color: ${tone.disabled.thumb};
      --switch-bg-color: ${tone.disabled.off.bg};
    }
  `
}

/* Track */
export function switchTrackStyles(props: {theme: Theme}) {
  const {switch: switchInput} = props.theme.input

  return css`
    display: block;
    background: var(--switch-bg-color);
    position: absolute;
    left: 0;
    top: 0;
    width: ${rem(switchInput.width)};
    height: ${rem(switchInput.height)};
    border-radius: ${rem(switchInput.height / 2)};
  `
}

/* Thumb */
export function switchThumbStyles(props: {
  checked?: boolean
  indeterminate?: boolean
  theme: Theme
}) {
  const {indeterminate} = props
  const {switch: switchInput} = props.theme.input
  const trackWidth = switchInput.width
  const trackHeight = switchInput.height
  const trackPadding = switchInput.padding
  const size = trackHeight - switchInput.padding * 2
  const checkedOffset = trackWidth - trackPadding * 2 - size
  const indeterminateOffset = trackWidth / 2 - size / 2 - trackPadding
  const checked = indeterminate !== true && props.checked === true

  return css`
    display: block;
    position: absolute;
    left: ${rem(trackPadding)};
    top: ${rem(trackPadding)};
    height: ${rem(size)};
    width: ${rem(size)};
    border-radius: ${rem(size / 2)};
    transition-property: transform;
    transition-duration: ${switchInput.transitionDurationMs}ms;
    transition-timing-function: ${switchInput.transitionTimingFunction};
    background: var(--switch-thumb-color);
    transform: translate3d(0, 0, 0);

    ${checked &&
    css`
      transform: translate3d(${checkedOffset}px, 0, 0);
    `}

    ${indeterminate &&
    css`
      transform: translate3d(${indeterminateOffset}px, 0, 0);
    `}
  `
}
