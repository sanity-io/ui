import {AVATAR_SIZE, THEME_COLOR_AVATAR_COLORS} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Properties, Style, StyleRules} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.avatar': {
    'backgroundColor': vars.color.avatar.bg,
    'position': 'relative',
    'boxSizing': 'border-box',
    'userSelect': 'none',
    'boxShadow': `0 0 0 1px ${vars.color.bg}`,
    'lineHeight': 0,

    'width': vars.avatar.size,
    'height': vars.avatar.size,
    'borderRadius': vars.avatar.size,

    '@nest': {
      '&[data-status="inactive"]': {
        opacity: 0.5,
      },

      // &:is(button)
      '&:is(button)': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        margin: 0,
        padding: 0,
        border: 0,
        font: 'inherit',
        color: 'inherit',
        outline: 'none',
      },

      '&:is(button):focus': {
        outline: 'var(--avatar-focus-ring-width) solid var(--color-focus-ring)',
        outlineOffset: 'var(--avatar-focus-ring-offset)',
      },

      '&:is(button):focus:not(:focus-visible)': {
        boxShadow: 'none',
      },

      ':disabled &, [data-disabled] &': {
        [varNames.color.avatar.bg]: vars.color.border,
        [varNames.color.avatar.fg]: vars.color.bg,
      },

      ...THEME_COLOR_AVATAR_COLORS.reduce(
        (acc, color) => {
          return {
            ...acc,
            [`&.${color}`]: {
              [varNames.color.avatar.bg]: vars.color.avatar[color].bg,
              [varNames.color.avatar.fg]: vars.color.avatar[color].fg,
            },
          }
        },
        {} as Record<string, Properties>,
      ),
    },
  },

  '.avatar-arrow': {
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

  '.avatar-image': {
    '@nest': {
      '& > img': {
        display: 'block',
        position: 'absolute',
        width: vars.avatar.size,
        height: vars.avatar.size,
        borderRadius: vars.avatar.size,
      },

      '& > span': {
        display: 'block',
        position: 'absolute',
        width: vars.avatar.size,
        height: vars.avatar.size,
        borderRadius: vars.avatar.size,
        boxShadow: [
          `inset 0 0 0 1px ${vars.color.avatar.bg}`,
          `inset 0 0 0 1.75px ${vars.color.bg}`,
        ].join(', '),
      },

      '[data-image-error] &': {
        display: 'none',
      },
    },
  },

  '.avatar-initials': {
    color: vars.color.avatar.fg,
    borderRadius: vars.avatar.size,
  },

  '.avatar-counter': {
    'color': vars.color.fg,
    'backgroundColor': vars.color.bg,
    'boxShadow': [`0 0 0 1px ${vars.color.bg}`, `inset 0 0 0 1px ${vars.color.border}`].join(', '),
    'userSelect': 'none',
    'borderRadius': vars.avatar.size,
    'height': vars.avatar.size,

    '@nest': {
      '&&': {
        minWidth: vars.avatar.size,
      },

      '[data-hide-inner-stroke] &': {
        boxShadow: `0 0 0 1px ${vars.color.bg}`,
      },
    },
  },

  '.avatar-stack': {
    '@nest': {
      '& > div + div': {
        marginLeft: vars.avatar.distance,
      },
    },
  },
}

for (const size of AVATAR_SIZE) {
  _responsiveRule(primitive, `avatar-${size}`, {
    [varNames.avatar.distance]: vars.avatar.sizes[size].distance,
    [varNames.avatar.size]: vars.avatar.sizes[size].size,
  })
}

export const avatarStyle: Style = {layers: {primitive}}
