import type {FontTextSize, Space} from '@sanity/ui-tokens'
import {FONT_TEXT_SIZE, SPACE} from '@sanity/ui-tokens/constants'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import {_style} from '../../lib/css/_style.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'

export const border: string = _style(_layers.primitive, {}, 'border')

export const root: string = _style(
  _layers.primitive,
  {
    vars: {
      [vars.input.boxShadow]: `inset 0 0 0 ${vars.input.border.width} transparent`,
    },

    selectors: {
      [`&.${border}`]: {
        vars: {
          [vars.input.boxShadow]: `inset 0 0 0 ${vars.input.border.width} ${vars.color.border}`,
        },
      },
    },
  },
  '',
)

export const fontWeightOptions = {
  regular: _style(
    _layers.primitive,
    {
      vars: {
        [vars.input.fontWeight]: vars.font.text.weight.regular,
      },
    },
    'w-regular',
  ),
  medium: _style(
    _layers.primitive,
    {
      vars: {
        [vars.input.fontWeight]: vars.font.text.weight.medium,
      },
    },
    'w-medium',
  ),
  semibold: _style(
    _layers.primitive,
    {
      vars: {
        [vars.input.fontWeight]: vars.font.text.weight.semibold,
      },
    },
    'w-semibold',
  ),
  bold: _style(
    _layers.primitive,
    {
      vars: {
        [vars.input.fontWeight]: vars.font.text.weight.bold,
      },
    },
    'w-bold',
  ),
}

export const element: string = _style(
  _layers.primitive,
  {
    WebkitFontSmoothing: 'inherit',
    appearance: 'none',
    border: 0,
    outline: 'none',
    margin: 0,
    fontFamily: vars.font.text.family,
    fontSize: vars.input.fontSize,
    fontWeight: vars.input.fontWeight,
    lineHeight: vars.input.lineHeight,
    letterSpacing: vars.input.letterSpacing,
    backgroundColor: 'transparent',
    color: vars.color.fg,
    padding: [
      `calc(${vars.input.padding} - ${vars.input.ascenderHeight})`,
      vars.input.padding,
      `calc(${vars.input.padding} - ${vars.input.descenderHeight})`,
      vars.input.padding,
    ].join(' '),
    borderRadius: 'inherit',
    // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
    cornerShape: 'inherit',
    position: 'relative',
    zIndex: 1,
    display: 'block',
    boxSizing: 'border-box',
    resize: 'none',
    inlineSize: ['stretch', '100%'],

    selectors: {
      '&::placeholder': {
        color: vars.input.color.placeholder,
        opacity: 1,
      },

      [`${root}[data-icon-left] &`]: {
        paddingLeft: `calc(${vars.input.padding} + calc(${vars.input.lineHeight} - ${vars.input.ascenderHeight} - ${vars.input.descenderHeight}) + ${vars.input.gap})`,
      },

      [`${root}[data-icon-right] &`]: {
        paddingRight: `calc(${vars.input.padding} + calc(${vars.input.lineHeight} - ${vars.input.ascenderHeight} - ${vars.input.descenderHeight}) + ${vars.input.gap})`,
      },
    },

    vars: {
      [vars.input.color.placeholder]: `color-mix(in srgb, transparent, ${vars.color.fg} 50%)`,
    },
  },
  'element',
)

// helper for readability
const has = (sel: string) => `${root}:has(${element}${sel})`

export const selectors = {
  enabled: has(':not(:disabled)'),
  disabled: has(':disabled'),

  readOnly: {
    enabled: has(':not(:disabled)[readonly]'),
    hovered: has(':not(:disabled)[readonly]:hover'),
  },

  valid: {
    enabled: has(':not(:disabled):not([data-invalid])'),
    hovered: has(':not(:disabled):hover:not([data-invalid])'),
    readOnly: {
      enabled: has(':not(:disabled)[readonly]:not([data-invalid])'),
      hovered: has(':not(:disabled)[readonly]:hover:not([data-invalid])'),
    },
  },

  invalid: {
    enabled: has(':not(:disabled)[data-invalid]'),
    hovered: has(':not(:disabled):hover[data-invalid]'),
    readOnly: {
      enabled: has(':not(:disabled)[readonly][data-invalid]'),
      hovered: has(':not(:disabled)[readonly]:hover[data-invalid]'),
    },
    disabled: has(':disabled[data-invalid]'),
  },
} as const

/* ORDER = PRIORITY */

/* 1) enabled baseline */
_globalStyle(_layers.primitive, selectors.enabled, {
  vars: {
    [vars.color.fg]: vars.input.color.valid.enabled.fg,
    [vars.color.border]: vars.input.color.valid.enabled.border,
    [vars.color.bg]: vars.input.color.valid.enabled.bg,
    [vars.color.muted.fg]: vars.input.color.valid.enabled.muted.fg,
  },
})

/* 2) readonly baseline (still enabled) */
_globalStyle(_layers.primitive, selectors.readOnly.enabled, {
  vars: {
    [vars.color.fg]: vars.input.color.valid.enabled.fg,
    [vars.color.border]: vars.input.color.valid.enabled.border,
    [vars.color.bg]: vars.input.color.valid.enabled.muted.bg,
    [vars.color.muted.fg]: vars.input.color.valid.enabled.muted.fg,
  },
})

/* 3) hover (readonly allowed) */
_globalStyle(_layers.primitive, selectors.valid.hovered, {
  vars: {
    [vars.color.fg]: vars.input.color.valid.hovered.fg,
    [vars.color.border]: vars.input.color.valid.hovered.border,
    [vars.color.bg]: vars.input.color.valid.hovered.bg,
    [vars.color.muted.fg]: vars.input.color.valid.hovered.muted.fg,
  },
})
_globalStyle(_layers.primitive, selectors.readOnly.hovered, {
  vars: {
    [vars.color.fg]: vars.input.color.valid.hovered.fg,
    [vars.color.border]: vars.input.color.valid.hovered.border,
    [vars.color.bg]: vars.input.color.valid.hovered.muted.bg,
    [vars.color.muted.fg]: vars.input.color.valid.hovered.muted.fg,
  },
})

/* 4) invalid (overrides normal + hover) */
_globalStyle(_layers.primitive, selectors.invalid.enabled, {
  vars: {
    [vars.color.fg]: vars.input.color.invalid.enabled.fg,
    [vars.color.border]: vars.input.color.invalid.enabled.border,
    [vars.color.bg]: vars.input.color.invalid.enabled.bg,
    [vars.color.muted.fg]: vars.input.color.invalid.enabled.muted.fg,
  },
})
_globalStyle(_layers.primitive, selectors.invalid.hovered, {
  vars: {
    [vars.color.fg]: vars.input.color.invalid.hovered.fg,
    [vars.color.border]: vars.input.color.invalid.hovered.border,
    [vars.color.bg]: vars.input.color.invalid.hovered.bg,
    [vars.color.muted.fg]: vars.input.color.invalid.hovered.muted.fg,
  },
})
_globalStyle(_layers.primitive, selectors.invalid.readOnly.enabled, {
  vars: {
    [vars.color.fg]: vars.input.color.invalid.enabled.fg,
    [vars.color.border]: vars.input.color.invalid.enabled.border,
    [vars.color.bg]: vars.input.color.invalid.enabled.bg,
    [vars.color.muted.fg]: vars.input.color.invalid.enabled.muted.fg,
  },
})
_globalStyle(_layers.primitive, selectors.invalid.readOnly.hovered, {
  vars: {
    [vars.color.fg]: vars.input.color.invalid.hovered.fg,
    [vars.color.border]: vars.input.color.invalid.hovered.border,
    [vars.color.bg]: vars.input.color.invalid.hovered.bg,
    [vars.color.muted.fg]: vars.input.color.invalid.hovered.muted.fg,
  },
})

/* 5) disabled LAST (wins) */
_globalStyle(_layers.primitive, selectors.disabled, {
  vars: {
    [vars.color.fg]: vars.input.color.valid.disabled.fg,
    [vars.color.border]: vars.input.color.valid.disabled.border,
    [vars.color.bg]: vars.input.color.valid.disabled.bg,
    [vars.color.muted.fg]: vars.input.color.valid.disabled.muted.fg,
  },
})
_globalStyle(_layers.primitive, selectors.invalid.disabled, {
  vars: {
    [vars.color.fg]: vars.input.color.invalid.disabled.fg,
    [vars.color.border]: vars.input.color.invalid.disabled.border,
    [vars.color.bg]: vars.input.color.invalid.disabled.bg,
    [vars.color.muted.fg]: vars.input.color.invalid.disabled.muted.fg,
  },
})

export const prefix: string = _style(_layers.primitive, {}, 'prefix')

export const suffix: string = _style(_layers.primitive, {}, 'suffix')

export const presentation: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    borderRadius: 'inherit',
    // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
    cornerShape: 'inherit',
    boxShadow: vars.input.boxShadow,
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 0,

    selectors: {
      [`${root}:has(${prefix}) &`]: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: vars.color.muted.border,
      },

      [`${root}:has(${suffix}) &`]: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightColor: vars.color.muted.border,
      },

      // focus ring
      [`${element}:not([data-no-focus-ring]):focus + &`]: {
        boxShadow: `${vars.input.text.focusRing}, ${vars.input.boxShadow}`,
      },
    },
  },
  'presentation',
)

export const fontSize: ResponsiveRuleOptions<FontTextSize> = {
  ..._fromEntries(
    FONT_TEXT_SIZE.map((s) => {
      const source = vars.font.text.scale[s]

      return [
        s,
        _responsiveStyle(
          _layers.primitive,
          {
            vars: {
              [vars.input.fontSize]: source.fontSize,
              [vars.input.lineHeight]: source.lineHeight,
              [vars.input.letterSpacing]: source.letterSpacing,
              [vars.input.ascenderHeight]: source.ascenderHeight,
              [vars.input.descenderHeight]: source.descenderHeight,
            },
          },
          `s-${s}`,
        ),
      ]
    }),
  ),
}

export const padding: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((s) => [
      s,
      _responsiveStyle(
        _layers.primitive,
        {
          vars: {
            [vars.input.padding]: vars.space[s],
          },
        },
        `p-${s}`,
      ),
    ]),
  ),
}

export const gap: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((s) => [
      s,
      _responsiveStyle(
        _layers.primitive,
        {
          vars: {
            [vars.input.gap]: vars.space[s],
          },
        },
        `g-${s}`,
      ),
    ]),
  ),
}
