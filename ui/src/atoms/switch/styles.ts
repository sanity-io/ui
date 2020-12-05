import {css} from 'styled-components'
import {rem, ThemeProps} from '../../styles'

/* Root */
export function switchBaseStyles() {
  return css`
    position: relative;
    &&:not([hidden]) {
      display: inline-block;
    }
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
export function switchRepresentationStyles(props: ThemeProps) {
  const {theme} = props
  const {switch: switchInput} = theme.sanity.input
  const color = theme.sanity.color.button.default

  return css`
    --switch-bg-color: ${color.default.enabled.bg};
    --switch-fg-color: ${color.default.enabled.fg};

    &&:not([hidden]) {
      display: block;
    }
    position: relative;
    width: ${rem(switchInput.width)};
    height: ${rem(switchInput.height)};
    border-radius: ${rem(switchInput.height / 2)};

    /* Make sure it’s not possible to interact with the wrapper element */
    pointer-events: none;

    /* Focus styles */
    input:focus + & {
      /* @todo: Use focus ring color from card theme */
      box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
    }

    input:focus:not(:focus-visible) + & {
      box-shadow: none;
    }

    input:hover + & {
      --switch-bg-color: ${color.default.hovered.bg};
      --switch-fg-color: ${color.default.hovered.fg};
    }

    input:checked + & {
      --switch-bg-color: ${color.positive.enabled.bg};
      --switch-fg-color: ${color.positive.enabled.fg};
    }

    input:checked:hover + & {
      --switch-bg-color: ${color.positive.hovered.bg};
      --switch-fg-color: ${color.positive.hovered.fg};
    }

    input:disabled + & {
      --switch-bg-color: ${color.default.disabled.fg};
      --switch-fg-color: ${color.default.disabled.bg};
    }
  `
}

/* Track */
export function switchTrackStyles(props: ThemeProps) {
  const {theme} = props
  const {switch: switchInput} = theme.sanity.input

  return css`
    &&:not([hidden]) {
      display: block;
    }
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
export function switchThumbStyles(
  props: {checked?: boolean; indeterminate?: boolean} & ThemeProps
) {
  const {indeterminate, theme} = props
  const {switch: switchInput} = theme.sanity.input
  const trackWidth = switchInput.width
  const trackHeight = switchInput.height
  const trackPadding = switchInput.padding
  const size = trackHeight - switchInput.padding * 2
  const checkedOffset = trackWidth - trackPadding * 2 - size
  const indeterminateOffset = trackWidth / 2 - size / 2 - trackPadding
  const checked = indeterminate !== true && props.checked === true

  return css`
    &&:not([hidden]) {
      display: block;
    }
    position: absolute;
    left: ${rem(trackPadding)};
    top: ${rem(trackPadding)};
    height: ${rem(size)};
    width: ${rem(size)};
    border-radius: ${rem(size / 2)};
    transition-property: transform;
    transition-duration: ${switchInput.transitionDurationMs}ms;
    transition-timing-function: ${switchInput.transitionTimingFunction};
    background: var(--switch-fg-color);
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
