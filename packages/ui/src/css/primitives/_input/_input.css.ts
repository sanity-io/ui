import {FONT_TEXT_SIZE, type FontTextSize, SPACE, type Space} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  position: 'relative',
})

export const border: string = _style(layers.primitives, {})

export const element: string = _style(layers.primitives, {
  WebkitFontSmoothing: 'inherit',
  appearance: 'none',
  border: 0,
  outline: 'none',
  margin: 0,
  fontFamily: vars.font.text.family,
  fontSize: vars.input.text.fontSize,
  lineHeight: vars.input.text.lineHeight,
  letterSpacing: vars.input.text.letterSpacing,
  backgroundColor: 'transparent',
  color: vars.color.input.text.fg,
  padding: [
    `calc(${vars.input.text.padding} - ${vars.input.text.ascenderHeight})`,
    vars.input.text.padding,
    `calc(${vars.input.text.padding} - ${vars.input.text.descenderHeight})`,
    vars.input.text.padding,
  ].join(' '),
  borderRadius: 'inherit',
  position: 'relative',
  zIndex: 1,
  display: 'block',
  boxSizing: 'border-box',
  resize: 'none',
  inlineSize: 'stretch',

  selectors: {
    '&::placeholder': {
      color: vars.color.input.text.placeholder,
      opacity: 1,
    },

    [`${root}[data-icon-left] &`]: {
      paddingLeft: `calc(${vars.input.text.padding} + calc(${vars.input.text.lineHeight} - ${vars.input.text.ascenderHeight} - ${vars.input.text.descenderHeight}) + ${vars.input.text.gap})`,
    },

    [`${root}[data-icon-right] &`]: {
      paddingRight: `calc(${vars.input.text.padding} + calc(${vars.input.text.lineHeight} - ${vars.input.text.ascenderHeight} - ${vars.input.text.descenderHeight}) + ${vars.input.text.gap})`,
    },

    [`${root}:not([data-invalid]) &`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.default.fg[2],
      },
    },

    [`${root}:not([data-invalid]) &:hover`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.default.fg[0],
      },
    },

    [`${root}:not([data-invalid]) &:focus`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.default.fg[0],
      },
    },

    [`${root}:not([data-invalid]) &:disabled`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.default.border[4],
      },
    },

    [`${root}[data-invalid] &`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.critical.fg[2],
      },
    },

    [`${root}[data-invalid] &:hover`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.critical.fg[1],
      },
    },

    [`${root}[data-invalid] &:focus`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.critical.fg[1],
      },
    },

    [`${root}[data-invalid] &:disabled`]: {
      vars: {
        [vars.color.input.text.fg]: vars.color.tinted.critical.border[4],
      },
    },
  },

  vars: {
    [vars.color.input.text.placeholder]:
      `color-mix(in srgb, transparent, ${vars.color.input.text.fg} 50%)`,
  },
})

export const presentation: string = _style(layers.primitives, {
  backgroundColor: vars.color.input.text.bg,
  borderRadius: 'inherit',
  boxShadow: `inset 0 0 0 ${vars.input.border.width} ${vars.color.input.text.border}`,
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 0,

  selectors: {
    [`${root}[data-prefix] &`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },

    [`${root}[data-suffix] &`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    // focus ring
    [`${element}:not([data-no-focus-ring]):focus + &`]: {
      outlineWidth: vars.input.text.focusRing.width,
      outlineStyle: 'solid',
      outlineColor: vars.color.focusRing,
      outlineOffset: vars.input.text.focusRing.offset,
    },

    // valid

    [`${root}:not([data-invalid]) &`]: {
      vars: {
        [vars.color.input.text.bg]: vars.color.tinted.default.bg[0],
        [vars.color.input.text.border]: vars.color.tinted.default.border[1],
      },
    },

    [`${root}:not([data-invalid])[data-read-only] ${element} + &`]: {
      vars: {
        [vars.color.input.text.bg]: vars.color.tinted.default.bg[1],
      },
    },

    [`${root}.${border}:not([data-invalid]):not([data-read-only]) ${element}:not(:disabled):hover + &`]:
      {
        vars: {
          [vars.color.input.text.border]: vars.color.tinted.default.border[2],
        },
      },

    [`${root}:not([data-invalid]) ${element}:focus + &`]: {
      vars: {
        [vars.color.input.text.border]: vars.color.tinted.default.border[2],
        [vars.color.input.text.fg]: vars.color.tinted.default.fg[1],
      },
    },

    [`${root}:not([data-invalid]) ${element}:disabled + &`]: {
      vars: {
        [vars.color.input.text.bg]: vars.color.tinted.default.bg[1],
        [vars.color.input.text.border]: vars.color.tinted.default.border[0],
        [vars.color.muted.fg]: vars.color.tinted.default.border[4],
      },
    },

    // invalid

    [`${root}[data-invalid] &`]: {
      vars: {
        [vars.color.input.text.bg]: vars.color.tinted.critical.bg[1],
        [vars.color.input.text.border]: vars.color.tinted.critical.border[1],
        [vars.color.muted.fg]: vars.color.tinted.critical.fg[4],
      },
    },

    [`${root}.${border}[data-invalid] ${element}:not(:disabled):hover + &`]: {
      vars: {
        [vars.color.input.text.border]: vars.color.tinted.critical.border[2],
      },
    },

    [`${root}[data-invalid] ${element}:focus + &`]: {
      vars: {
        [vars.color.input.text.border]: vars.color.tinted.critical.border[2],
      },
    },

    [`${root}[data-invalid] ${element}:disabled + &`]: {
      vars: {
        [vars.color.input.text.bg]: vars.color.tinted.critical.bg[1],
        [vars.color.input.text.border]: vars.color.tinted.critical.border[0],
      },
    },

    [`${root}:not(${border}) &`]: {
      vars: {
        [vars.color.input.text.border]: 'transparent',
      },
    },
  },
})

export const fontSize: ResponsiveRuleOptions<FontTextSize> = {
  ..._fromEntries(
    FONT_TEXT_SIZE.map((s) => {
      const source = vars.font.text.scale[s]

      return [
        s,
        _responsiveStyle(layers.primitives, {
          vars: {
            [vars.input.text.fontSize]: source.fontSize,
            [vars.input.text.lineHeight]: source.lineHeight,
            [vars.input.text.letterSpacing]: source.letterSpacing,
            [vars.input.text.ascenderHeight]: source.ascenderHeight,
            [vars.input.text.descenderHeight]: source.descenderHeight,
          },
        }),
      ]
    }),
  ),
}

export const padding: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((s) => [
      s,
      _responsiveStyle(layers.primitives, {
        vars: {
          [vars.input.text.padding]: vars.space[s],
        },
      }),
    ]),
  ),
}

export const gap: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((s) => [
      s,
      _responsiveStyle(layers.primitives, {
        vars: {
          [vars.input.text.gap]: vars.space[s],
        },
      }),
    ]),
  ),
}
