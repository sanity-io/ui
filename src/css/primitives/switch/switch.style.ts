import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.switch': {},

  '.switch-element': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    height: '100%',
    width: '100%',
    outline: 'none',
    padding: 0,
    margin: 0,

    /* Place the input element above the representation element */
    zIndex: 1,
  },

  '.switch-presentation': {
    '--switch-bg-color': 'var(--color-tinted-default-border-2)',
    // '--switch-border-color': 'var(--color-tinted-default-border-1)',
    '--switch-fg-color': 'var(--color-tinted-default-bg-0)',
    // --switch-bg-color: ${color.input.default.enabled.border};
    // --switch-fg-color: ${color.input.default.enabled.bg};
    '--switch-thumb-offset': '0',
    '--switch-thumb-size': 'calc(var(--input-switch-height) - var(--input-switch-padding) * 2)',
    'display': 'block',
    // &:not([hidden]) {
    //   display: block;
    // }
    'position': 'relative',
    'width': 'var(--input-switch-width)',
    'height': 'var(--input-switch-height)',
    'borderRadius': 'calc(var(--input-switch-height) / 2)',
    'outlineOffset': 'var(--input-switch-focus-ring-offset)',

    // Make sure it’s not possible to interact with the presentation element
    'pointerEvents': 'none',

    '@nest': {
      // '&::after': {
      //   content: '""',
      //   display: 'block',
      //   position: 'absolute',
      //   top: 0,
      //   left: 0,
      //   right: 0,
      //   bottom: 0,
      //   zIndex: 1,
      //   // boxShadow: 'var(--switch-box-shadow)',
      //   borderRadius: 'inherit',
      // },
      '.switch-element:focus + &': {
        // --switch-box-shadow: ${focusRingStyle({focusRing: input.switch.focusRing})};
        outline: 'var(--input-switch-focus-ring-width) solid var(--color-focus-ring)',
      },
      'input:focus:not(:focus-visible) + &': {
        outline: 'none',
      },
      'input:checked + &': {
        '--switch-bg-color': 'var(--color-solid-default-bg-0)',
        // '--switch-border-color': 'var(--color-solid-default-bg-0)',
        '--switch-fg-color': 'var(--color-solid-default-fg-0)',
      },
      // input:not([data-read-only]):disabled + && {
      //   --switch-bg-color: ${color.input.default.disabled.border};
      //   --switch-fg-color: ${color.input.default.disabled.bg};
      // }
      // input[data-read-only]:disabled + && {
      //   --switch-bg-color: ${color.input.default.readOnly.border};
      //   --switch-fg-color: ${color.input.default.readOnly.bg};
      // }
      // input:checked[data-read-only]:disabled + && {
      //   --switch-bg-color: ${color.input.default.readOnly.fg};
      //   --switch-fg-color: ${color.input.default.readOnly.bg};
      // }

      '.switch-element:checked + &': {
        '--switch-thumb-offset':
          'calc(var(--input-switch-width) - (var(--input-switch-padding) * 2) - var(--switch-thumb-size))',
      },
    },

    // @media (hover: hover) {
    //   input:not(:disabled):hover + && {
    //     --switch-bg-color: ${color.input.default.hovered.border};
    //     --switch-fg-color: ${color.input.default.hovered.bg};
    //   }
    //   input:not(:disabled):checked:hover + && {
    //     --switch-bg-color: ${color.input.default.enabled.fg};
    //     --switch-fg-color: ${color.input.default.enabled.bg};
    //   }
    // }
  },

  '.switch-track': {
    display: 'block',
    backgroundColor: 'var(--switch-bg-color)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    // boxShadow: 'inset 0 0 0 1px var(--switch-border-color)',

    transition:
      'box-shadow, background-color var(--input-switch-transition-duration-ms) var(--input-switch-transition-timing-function)',
  },

  '.switch-thumb': {
    // '--switch-thumb-offset': '0',

    display: 'block',
    position: 'absolute',
    left: 'var(--input-switch-padding)',
    top: 'var(--input-switch-padding)',
    width: 'var(--switch-thumb-size)',
    height: 'var(--switch-thumb-size)',
    backgroundColor: 'var(--switch-fg-color)',
    borderRadius: '9999px',
    boxShadow: '0 0 0 0.5px var(--color-shadow-umbra), 0 0.5px 2px 0.5px var(--color-shadow-umbra)',
    transform: 'translate3d(var(--switch-thumb-offset), 0, 0)',
    transition:
      'transform var(--input-switch-transition-duration-ms) var(--input-switch-transition-timing-function)',
    //     transition-property: transform;
    // transition-duration: ${input.switch.transitionDurationMs}ms;
    // transition-timing-function: ${input.switch.transitionTimingFunction};

    // const {$indeterminate} = props
    // const {input} = getTheme_v2(props.theme)
    // const trackWidth = input.switch.width
    // const trackHeight = input.switch.height
    // const trackPadding = input.switch.padding
    // const size = trackHeight - input.switch.padding * 2
    // const checkedOffset = trackWidth - trackPadding * 2 - size
    // const indeterminateOffset = trackWidth / 2 - size / 2 - trackPadding
    // const checked = $indeterminate !== true && props.$checked === true
    // return css`

    //   position: absolute;
    //   left: ${rem(trackPadding)};
    //   top: ${rem(trackPadding)};
    //   height: ${rem(size)};
    //   width: ${rem(size)};
    //   border-radius: ${rem(size / 2)};
    //   transition-property: transform;
    //   transition-duration: ${input.switch.transitionDurationMs}ms;
    //   transition-timing-function: ${input.switch.transitionTimingFunction};
    //   background: var(--switch-fg-color);
    //   transform: translate3d(0, 0, 0);
    //   box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);
    //   ${checked &&
    //   css`
    //     transform: translate3d(${checkedOffset}px, 0, 0);
    //   `}
    //   ${$indeterminate &&
    //   css`
    //     transform: translate3d(${indeterminateOffset}px, 0, 0);
    //   `}
    // `
  },
}

export const switchStyle: Style = {layers: {primitive}}
