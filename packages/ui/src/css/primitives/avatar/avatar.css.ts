import {AVATAR_COLORS, AVATAR_SIZE, type AvatarColor, type AvatarSize} from '@sanity/ui/theme'
import {globalStyle} from '@vanilla-extract/css'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const stack: string = _style(layers.primitives, {})

globalStyle(`${stack} > * + *`, {
  '@layer': {
    [layers.primitives]: {
      marginLeft: vars.avatar.distance,
    },
  },
})

export const root: string = _style(layers.primitives, {
  backgroundColor: vars.color.avatar.bg,
  position: 'relative',
  boxSizing: 'border-box',
  userSelect: 'none',
  boxShadow: `0 0 0 1px ${vars.color.bg}`,
  lineHeight: 0,
  width: vars.avatar.size,
  height: vars.avatar.size,
  borderRadius: vars.avatar.size,

  vars: {
    [vars.color.fg]: vars.color.avatar.fg,
  },

  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },

    'button.&': {
      WebkitFontSmoothing: 'inherit',
      appearance: 'none',
      margin: 0,
      padding: 0,
      border: 0,
      font: 'inherit',
      color: 'inherit',
      outline: 'none',
    },

    'button.&:focus': {
      outline: `${vars.avatar.focusRing.width} solid ${vars.color.focusRing}`,
      outlineOffset: vars.avatar.focusRing.offset,
    },

    'button.&:focus:not(:focus-visible)': {
      boxShadow: 'none',
    },

    ':disabled &, [data-disabled] &': {
      vars: {
        [vars.color.avatar.bg]: vars.color.border,
        [vars.color.avatar.fg]: vars.color.bg,
      },
    },
  },
})

export const colors: Record<AvatarColor, string> = {
  ..._fromEntries(
    AVATAR_COLORS.map((c) => [
      c,
      _style(layers.primitives, {
        vars: {
          [vars.color.avatar.bg]: vars.color.avatar[c].bg,
          [vars.color.avatar.fg]: vars.color.avatar[c].fg,
        },
      }),
    ]),
  ),
}

export const arrow: string = _style(layers.primitives, {
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: 0,
  opacity: 0,
  transition: 'all 0.2s linear',
  transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  selectors: {
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
})

export const arrowSvg: string = _style(layers.primitives, {
  display: 'block',
  width: '11px',
  height: '7px',
  position: 'absolute',
  top: '-5px',
  left: '50%',
  transform: 'translateX(-6px)',
})

export const image: string = _style(layers.primitives, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: vars.avatar.size,
  height: vars.avatar.size,
  borderRadius: 'inherit',

  selectors: {
    '[data-image-error] &': {
      display: 'none',
    },
  },
})

globalStyle(`${image} img`, {
  '@layer': {
    [layers.primitives]: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'inherit',
    },
  },
})

export const imageOutline: string = _style(layers.primitives, {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: vars.avatar.size,
  height: vars.avatar.size,
  borderRadius: 'inherit',
  boxShadow: [
    `inset 0 0 0 1px ${vars.color.avatar.bg}`,
    `inset 0 0 0 1.75px ${vars.color.bg}`,
  ].join(', '),
})

globalStyle(`${root}[data-hide-inner-stroke] ${imageOutline}`, {
  '@layer': {
    [layers.primitives]: {
      boxShadow: `inset 0 0 0 1px ${vars.color.avatar.bg}`,
    },
  },
})

export const initials: string = _style(layers.primitives, {
  color: vars.color.avatar.fg,
  borderRadius: 'inherit',
})

export const counter: string = _style(layers.primitives, {
  color: vars.color.fg,
  backgroundColor: vars.color.bg,
  boxShadow: [`0 0 0 1px ${vars.color.bg}`, `inset 0 0 0 1px ${vars.color.border}`].join(', '),
  userSelect: 'none',
  borderRadius: vars.avatar.size,
  height: vars.avatar.size,

  selectors: {
    '&&': {
      minWidth: vars.avatar.size,
    },

    '[data-hide-inner-stroke] &': {
      boxShadow: `0 0 0 1px ${vars.color.bg}`,
    },
  },
})

export const scale: ResponsiveRuleOptions<AvatarSize> = {
  ..._fromEntries(
    AVATAR_SIZE.map((s) => [
      s,
      _responsiveStyle(layers.primitives, {
        vars: {
          [vars.avatar.distance]: vars.avatar.scale[s].distance,
          [vars.avatar.size]: vars.avatar.scale[s].size,
        },
      }),
    ]),
  ),
}
