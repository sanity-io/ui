import type {AvatarColor, AvatarSize} from '@sanity/ui-tokens'
import {AVATAR_COLORS, AVATAR_SIZE} from '@sanity/ui-tokens/constants'
import {createVar} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import {_style} from '../../lib/css/_style.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'

const _vars = {
  color: {
    bg: createVar('color-bg'),
    fg: createVar('color-fg'),
  },
  distance: createVar('distance'),
  size: createVar('size'),
}

export const stack: string = _style(_layers.primitive, {}, 'stack')

_globalStyle(_layers.primitive, `${stack} > * + *`, {
  marginLeft: _vars.distance,
})

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: _vars.color.bg,
    position: 'relative',
    boxSizing: 'border-box',
    userSelect: 'none',
    boxShadow: `0 0 0 1px ${vars.color.bg}`,
    lineHeight: 0,
    width: _vars.size,
    height: _vars.size,
    borderRadius: _vars.size,

    alignItems: 'center',
    justifyContent: 'center',

    vars: {
      [vars.color.fg]: _vars.color.fg,
      [vars.color.muted.fg]: _vars.color.fg,
    },

    selectors: {
      '&:not([hidden])': {
        display: 'flex',
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
        boxShadow: vars.avatar.focusRing,
      },

      'button.&:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },

      ':disabled &, [data-disabled] &': {
        vars: {
          [_vars.color.bg]: vars.color.border,
          [_vars.color.fg]: vars.color.bg,
        },
      },
    },
  },
  '',
)

export const colors: Record<AvatarColor, string> = {
  ..._fromEntries(
    AVATAR_COLORS.map((c) => [
      c,
      _style(
        _layers.primitive,
        {
          vars: {
            [_vars.color.bg]: vars.color.avatar[c].bg,
            [_vars.color.fg]: vars.color.avatar[c].fg,
          },
        },
        c,
      ),
    ]),
  ),
}

export const arrow: string = _style(
  _layers.primitive,
  {
    position: 'absolute',
    boxSizing: 'border-box',
    zIndex: 0,
    opacity: 0,
    transition: 'all 0.2s linear',
    transform: 'rotate(-90deg)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    selectors: {
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
  'arrow',
)

export const arrowSvg: string = _style(
  _layers.primitive,
  {
    display: 'block',
    width: '11px',
    height: '7px',
    position: 'absolute',
    top: '-5px',
    left: '50%',
    transform: 'translateX(-5.5px)',
    fill: _vars.color.bg,
  },
  'arrow-svg',
)

export const image: string = _style(
  _layers.primitive,
  {
    position: 'absolute',
    top: 0,
    left: 0,
    width: _vars.size,
    height: _vars.size,
    borderRadius: 'inherit',
    // @ts-expect-error - TODO: fix this
    cornerShape: 'inherit',

    selectors: {
      '[data-image-error] &': {
        display: 'none',
      },
    },
  },
  'img',
)

_globalStyle(_layers.primitive, `${image} img`, {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
  // @ts-expect-error - TODO: fix this
  cornerShape: 'inherit',
})

export const imageOutline: string = _style(
  _layers.primitive,
  {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: _vars.size,
    height: _vars.size,
    borderRadius: 'inherit',
    // @ts-expect-error - TODO: fix this
    cornerShape: 'inherit',
    boxShadow: [`inset 0 0 0 1px ${_vars.color.bg}`, `inset 0 0 0 1.5px ${vars.color.bg}`].join(
      ', ',
    ),

    selectors: {
      [`.${root}[data-hide-inner-stroke] &`]: {
        boxShadow: `inset 0 0 0 1px ${_vars.color.bg}`,
      },
    },
  },
  'img-outline',
)

export const initials: string = _style(
  _layers.primitive,
  {
    color: vars.color.fg,
    borderRadius: 'inherit',
  },
  'initials',
)

export const counter: string = _style(
  _layers.primitive,
  {
    // color: vars.color.fg,
    backgroundColor: vars.color.bg,
    boxShadow: `inset 0 0 0 1px ${vars.color.border}`,
    userSelect: 'none',
    borderRadius: _vars.size,
    height: _vars.size,

    selectors: {
      '&&': {
        minWidth: _vars.size,
      },

      // '[data-hide-inner-stroke] &': {
      //   boxShadow: `0 0 0 1px ${vars.color.bg}`,
      // },
    },
  },
  'counter',
)

export const scale: ResponsiveRuleOptions<AvatarSize> = {
  ..._fromEntries(
    AVATAR_SIZE.map((s) => [
      s,
      _responsiveStyle(
        _layers.primitive,
        {
          vars: {
            [_vars.distance]: vars.avatar.scale[s].distance,
            [_vars.size]: vars.avatar.scale[s].size,
          },
        },
        String(s),
      ),
    ]),
  ),
}
