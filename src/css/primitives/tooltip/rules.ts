import {Rules} from '../../types'

export const tooltipRules: Rules = {
  'tooltip': {
    pointerEvents: 'none',
  },

  'tooltip-card': {
    'willChange': 'transform',

    '@nest': {
      '&[data-animate] > *': {
        // opacity: var(${POPOVER_MOTION_CONTENT_OPACITY_PROPERTY}, 1);
        opacity: `var(--motion-content-opacity, 1)`,
        willChange: 'opacity',
      },
    },
  },
}
