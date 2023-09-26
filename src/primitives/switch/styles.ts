import {css} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {focusRingStyle} from '../../styles/internal'

/* Root */
export function switchBaseStyles(): ReturnType<typeof css> {
  return css`
    position: relative;
    &:not([hidden]) {
      display: inline-block;
    }
  `
}

/* Input */
export function switchInputStyles(): ReturnType<typeof css> {
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
export function switchRepresentationStyles(props: ThemeProps): ReturnType<typeof css> {
  const {theme} = props
  const {input} = theme.sanity
  const {focusRing} = input.switch
  const color = theme.sanity.color.button.default

  return css`
    --switch-bg-color: ${color.default.enabled.bg};
    --switch-fg-color: ${color.default.enabled.fg};
    --switch-box-shadow: none;

    &:not([hidden]) {
      display: block;
    }
    position: relative;
    width: ${rem(input.switch.width)};
    height: ${rem(input.switch.height)};
    border-radius: ${rem(input.switch.height / 2)};

    /* Make sure it’s not possible to interact with the wrapper element */
    pointer-events: none;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      box-shadow: var(--switch-box-shadow);
      border-radius: inherit;
    }

    /* Focus styles */
    input:focus + && {
      --switch-box-shadow: ${focusRingStyle({focusRing})};
    }

    input:focus:not(:focus-visible) + && {
      --switch-box-shadow: none;
    }

    input:checked + && {
      --switch-bg-color: ${color.positive.enabled.bg};
      --switch-fg-color: ${color.positive.enabled.fg};
    }

    @media (hover: hover) {
      input:not(:disabled):hover + && {
        --switch-bg-color: ${color.default.hovered.bg};
        --switch-fg-color: ${color.default.hovered.fg};
      }

      input:not(:disabled):checked:hover + && {
        --switch-bg-color: ${color.positive.hovered.bg};
        --switch-fg-color: ${color.positive.hovered.fg};
      }
    }

    input:not([data-read-only]):disabled + && {
      --switch-bg-color: ${color.default.disabled.bg};
      --switch-fg-color: ${color.default.disabled.fg};
    }
  `
}

/* Track */
export function switchTrackStyles(props: ThemeProps): ReturnType<typeof css> {
  const {theme} = props
  const {input} = theme.sanity

  return css`
    &:not([hidden]) {
      display: block;
    }
    background-color: var(--switch-bg-color);
    position: absolute;
    left: 0;
    top: 0;
    width: ${rem(input.switch.width)};
    height: ${rem(input.switch.height)};
    border-radius: ${rem(input.switch.height / 2)};
  `
}

/* Thumb */
export function switchThumbStyles(
  props: {$checked?: boolean; $indeterminate?: boolean} & ThemeProps,
): ReturnType<typeof css> {
  const {$indeterminate, theme} = props
  const {input} = theme.sanity
  const trackWidth = input.switch.width
  const trackHeight = input.switch.height
  const trackPadding = input.switch.padding
  const size = trackHeight - input.switch.padding * 2
  const checkedOffset = trackWidth - trackPadding * 2 - size
  const indeterminateOffset = trackWidth / 2 - size / 2 - trackPadding
  const checked = $indeterminate !== true && props.$checked === true

  return css`
    &:not([hidden]) {
      display: block;
    }
    position: absolute;
    left: ${rem(trackPadding)};
    top: ${rem(trackPadding)};
    height: ${rem(size)};
    width: ${rem(size)};
    border-radius: ${rem(size / 2)};
    transition-property: transform;
    transition-duration: ${input.switch.transitionDurationMs}ms;
    transition-timing-function: ${input.switch.transitionTimingFunction};
    background: var(--switch-fg-color);
    transform: translate3d(0, 0, 0);

    ${checked &&
    css`
      transform: translate3d(${checkedOffset}px, 0, 0);
    `}

    ${$indeterminate &&
    css`
      transform: translate3d(${indeterminateOffset}px, 0, 0);
    `}
  `
}
