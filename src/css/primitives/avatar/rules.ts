import {AVATAR_SIZE, THEME_COLOR_AVATAR_COLORS} from '@sanity/ui/theme'
import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const avatarRules: Rules = {
  'avatar': {
    'backgroundColor': 'var(--avatar-bg-color)',
    'position': 'relative',
    'boxSizing': 'border-box',
    'userSelect': 'none',
    'boxShadow': '0 0 0 1px var(--color-bg)',

    'width': `var(--avatar-size)`,
    'height': `var(--avatar-size)`,
    'borderRadius': `var(--avatar-size)`,

    '@nest': {
      '&[data-status="inactive"]': {
        opacity: 0.5,
      },

      // &:is(button)
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
        outline: 'var(--avatar-focus-ring-width) solid var(--color-focus-ring)',
        outlineOffset: 'var(--avatar-focus-ring-offset)',
      },

      '&[data-as="button"]:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },

      ':disabled &, [data-disabled] &': {
        '--avatar-bg-color': 'var(--color-border)',
        '--avatar-fg-color': 'var(--color-bg)',
      },
    },
  },

  ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
    return {
      ...acc,
      [`avatar-${color}`]: {
        '--avatar-bg-color': `var(--color-avatar-${color}-bg)`,
        '--avatar-fg-color': `var(--color-avatar-${color}-fg)`,
      },
    }
  }, {} as Rules),

  ...(AVATAR_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`avatar-${size}`, {
        '--avatar-distance': `var(--avatar-${size}-distance)`,
        '--avatar-size': `var(--avatar-${size}-size)`,
      }),
    }
  }, {} as Rules) as Rules),

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
        display: 'block',
        width: '11px',
        height: '7px',
        position: 'absolute',
        top: '-5px',
        left: '50%',
        transform: 'translateX(-6px)',
      },

      '[data-arrow-position="inside"] > &': {
        transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
        opacity: 0,
      },

      '[data-arrow-position="top"] > &': {
        opacity: 1,
        transform: 'rotate(0deg)',
      },

      '[data-arrow-position="bottom"] > &': {
        opacity: 1,
        transform: 'rotate(-180deg)',
      },
    },
  },

  'avatar-image': {
    '@nest': {
      '& > img': {
        display: 'block',
        position: 'absolute',
        width: `var(--avatar-size)`,
        height: `var(--avatar-size)`,
        borderRadius: `var(--avatar-size)`,
      },

      '& > span': {
        display: 'block',
        position: 'absolute',
        width: `var(--avatar-size)`,
        height: `var(--avatar-size)`,
        borderRadius: `var(--avatar-size)`,
        boxShadow: 'inset 0 0 0 1px var(--avatar-bg-color), inset 0 0 0 1.75px var(--color-bg)',
      },

      '[data-image-error] &': {
        display: 'none',
      },
    },
  },

  'avatar-initials': {
    color: 'var(--avatar-fg-color)',
    borderRadius: 'var(--avatar-size)',
  },

  'avatar-counter': {
    'color': 'var(--color-fg)',
    'backgroundColor': 'var(--color-bg)',
    'boxShadow': `0 0 0 1px var(--color-bg), inset 0 0 0 1px var(--color-border)`,
    'userSelect': 'none',
    'borderRadius': 'var(--avatar-size)',
    'height': 'var(--avatar-size)',

    '@nest': {
      '&&': {
        minWidth: 'var(--avatar-size)',
      },

      '[data-hide-inner-stroke] &': {
        boxShadow: `0 0 0 1px var(--color-bg)`,
      },
    },
  },

  'avatar-stack': {
    '@nest': {
      '& > div + div': {
        marginLeft: 'var(--avatar-distance)',
      },
    },
  },
}
