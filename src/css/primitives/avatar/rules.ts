import {THEME_COLOR_AVATAR_COLORS} from '@sanity/ui/theme'
import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const avatarRules: Rules = {
  'avatar': {
    'backgroundColor': 'var(--avatar-bg-color)',
    'position': 'relative',
    'boxSizing': 'border-box',
    'userSelect': 'none',
    'boxShadow': '0 0 0 1px var(--card-bg-color)',

    '@nest': {
      '&[data-status="inactive"]': {
        opacity: 0.5,
      },

      '& > svg:not([hidden])': {
        display: 'block',
      },

      /* &:is(button) */
      '&[data-as="button"]': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        margin: 0,
        padding: 0,
        border: 0,
        font: 'inherit',
        color: 'inherit',
        outline: 'none',
      },

      '&[data-as="button"]:focus': {
        // boxShadow: focusRingStyle({focusRing: avatar.focusRing}),
      },

      '&[data-as="button"]:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },
  },

  ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
    return {
      ...acc,
      [`avatar-${color}`]: {
        '--avatar-bg-color': `var(--card-avatar-${color}-bg-color)`,
        '--avatar-fg-color': `var(--card-avatar-${color}-fg-color)`,
      },
    }
  }, {} as Rules),

  'avatar-arrow': {
    'position': 'absolute',
    'boxSizing': 'border-box',
    'zIndex': 0,
    'opacity': 0,
    'transition': 'all 0.2s linear',
    'transform': 'rotate(-90deg) translate3d(0, 6px, 0)',
    'left': 0,
    'right': 0,
    'top': 0,
    'bottom': 0,

    '@nest': {
      '& > svg': {
        width: '11px',
        height: '7px',
        position: 'absolute',
        top: '-5px',
        left: '50%',
        transform: 'translateX(-6px)',
      },

      '& > svg:not([hidden])': {
        display: 'block',
      },

      '.arrow-position-inside > &': {
        transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
        opacity: 0,
      },

      '.arrow-position-top > &': {
        opacity: 1,
        transform: 'rotate(0deg)',
      },

      '.arrow-position-bottom > &': {
        opacity: 1,
        transform: 'rotate(-180deg)',
      },
    },
  },

  ...responsiveRules('avatar-0', {
    'width': `var(--avatar-0-size)`,
    'height': `var(--avatar-0-size)`,
    'borderRadius': `var(--avatar-0-size)`,

    '@nest': {
      '& > svg': {
        width: `var(--avatar-0-size)`,
        height: `var(--avatar-0-size)`,
        borderRadius: `var(--avatar-0-size)`,
      },
    },
  }),

  ...responsiveRules('avatar-1', {
    'width': `var(--avatar-1-size)`,
    'height': `var(--avatar-1-size)`,
    'borderRadius': `var(--avatar-1-size)`,

    '@nest': {
      '& > svg': {
        width: `var(--avatar-1-size)`,
        height: `var(--avatar-1-size)`,
        borderRadius: `var(--avatar-1-size)`,
      },
    },
  }),

  ...responsiveRules('avatar-2', {
    'width': `var(--avatar-2-size)`,
    'height': `var(--avatar-2-size)`,
    'borderRadius': `var(--avatar-2-size)`,

    '@nest': {
      '& > svg': {
        width: `var(--avatar-2-size)`,
        height: `var(--avatar-2-size)`,
        borderRadius: `var(--avatar-2-size)`,
      },
    },
  }),

  ...responsiveRules('avatar-3', {
    'width': `var(--avatar-3-size)`,
    'height': `var(--avatar-3-size)`,
    'borderRadius': `var(--avatar-3-size)`,

    '@nest': {
      '& > svg': {
        width: `var(--avatar-3-size)`,
        height: `var(--avatar-3-size)`,
        borderRadius: `var(--avatar-3-size)`,
      },
    },
  }),

  'avatar-initials': {
    'width': '100%',
    'height': '100%',
    'color': 'var(--avatar-fg-color)',
    'alignItems': 'center',
    'justifyContent': 'center',
    'textTransform': 'uppercase',
    'textAlign': 'center',
    'borderRadius': '50%',

    '@nest': {
      '&:not([hidden])': {
        display: 'flex',
      },
    },
  },

  'avatar-bg-stroke': {
    strokeWidth: '4px',
    stroke: 'var(--card-bg-color)',
  },

  'avatar-stroke': {
    'strokeWidth': '2px',
    'stroke': 'var(--avatar-bg-color)',

    '@nest': {
      '[data-status="editing"] &': {
        strokeDasharray: '2 4',
        strokeLinecap: 'round',
      },
    },
  },

  'avatar-image': {
    position: 'relative',
  },
}
