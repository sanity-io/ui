import {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_SCHEMES,
  THEME_COLOR_STATE_TONES,
} from '@sanity/ui/theme'

import {ColorCardVarNames, ColorCardVars, Properties, Style, StyleRules} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'
import {toneMap} from './_constants'

const primitive: StyleRules = {
  '.card': {
    'backgroundColor': vars.color.bg,
    'color': vars.color.fg,

    [varNames.color.bg]: vars.color.tinted.default.bg[0],
    [varNames.color.border]: vars.color.tinted.default.border[1],
    [varNames.color.fg]: vars.color.tinted.default.fg[0],
    [varNames.color.muted.bg]: vars.color.tinted.default.bg[1],
    [varNames.color.muted.fg]: vars.color.tinted.default.fg[4],

    '@nest': {
      'button&': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        outline: 'none',
        font: 'inherit',
        textAlign: 'inherit',
        border: 'none',
        // @ts-expect-error - TODO: fix
        width: ['-moz-available', '-webkit-fill-available', 'fill-available'],
      },

      'a&': {
        outline: 'none',
        textDecoration: 'none',
      },

      'pre&': {
        font: 'inherit',
        whiteSpace: 'inherit',
      },

      'a&:not([data-disabled]):hover, button&:not([data-disabled]):hover': {
        [varNames.color.bg]: vars.color.tinted.default.bg[1],
        [varNames.color.border]: vars.color.tinted.default.border[3],
        [varNames.color.fg]: vars.color.tinted.default.fg[1],
        [varNames.color.muted.bg]: vars.color.tinted.default.bg[2],
        [varNames.color.muted.fg]: vars.color.tinted.default.fg[4],
      },

      'a&:not([data-disabled]):active, button&:not([data-disabled]):active': {
        [varNames.color.bg]: vars.color.tinted.default.bg[2],
        [varNames.color.border]: vars.color.tinted.default.border[4],
        [varNames.color.fg]: vars.color.tinted.default.fg[0],
        [varNames.color.muted.bg]: vars.color.tinted.default.bg[3],
        [varNames.color.muted.fg]: vars.color.tinted.default.fg[4],
      },

      // toggle button
      'a&:not([data-disabled])[aria-pressed="true"], button&:not([data-disabled])[aria-pressed="true"]':
        {
          [varNames.color.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.border]: vars.color.tinted.default.border[4],
          [varNames.color.fg]: vars.color.tinted.default.fg[0],
          [varNames.color.muted.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.muted.fg]: vars.color.tinted.default.fg[4],
        },

      'a&:not([data-disabled])[data-pressed], button&:not([data-disabled])[data-pressed]': {
        [varNames.color.bg]: vars.color.tinted.default.bg[2],
        [varNames.color.border]: vars.color.tinted.default.border[4],
        [varNames.color.fg]: vars.color.tinted.default.fg[0],
        [varNames.color.muted.bg]: vars.color.tinted.default.bg[3],
        [varNames.color.muted.fg]: vars.color.tinted.default.fg[4],
      },

      'a&:not([data-disabled])[data-selected], button&:not([data-disabled])[data-selected]': {
        [varNames.color.bg]: vars.color.solid.primary.bg[0],
        [varNames.color.border]: vars.color.solid.primary.border[1],
        [varNames.color.fg]: vars.color.solid.primary.fg[0],
        [varNames.color.muted.bg]: vars.color.solid.primary.bg[1],
        [varNames.color.muted.fg]: vars.color.solid.primary.fg[3],
      },

      // '&:not([data-disabled]):focus': {
      //   '--color-bg': vars.color.solid.bg[0],
      //   '--color-border': vars.color.solid.border[1],
      //   '--color-fg': vars.color.solid.fg[1],
      //   '--color-muted-bg': vars.color.solid.bg[1],
      //   '--color-muted-fg': vars.color.solid.fg[3],
      // },

      'a&[data-disabled]), button&[data-disabled]': {
        [varNames.color.bg]: vars.color.tinted.default.bg[2],
        [varNames.color.border]: vars.color.tinted.default.border[4],
        [varNames.color.fg]: vars.color.tinted.default.fg[0],
        [varNames.color.muted.bg]: vars.color.tinted.default.bg[3],
        [varNames.color.muted.fg]: vars.color.tinted.default.fg[4],
      },

      // '&[data-disabled]': {
      //   '--color-bg': vars.color.tinted.bg[0],
      //   '--color-border': vars.color.tinted.border[1],
      //   '--color-fg': vars.color.tinted.border[4],
      //   '--color-muted-bg': vars.color.tinted.bg[1],
      //   '--color-muted-fg': vars.color.tinted.border[4],
      // },
    },
  },
}

// scope variables to scheme
for (const scheme of THEME_COLOR_SCHEMES) {
  const schemeProps: Properties = {
    colorScheme: scheme,
  }

  for (const tone of THEME_COLOR_CARD_TONES) {
    const _varNames = varNames.color[tone]
    const _vars = vars.color[scheme][tone]

    _assignToneProps(schemeProps, _varNames, _vars)
  }

  primitive[`.card.${scheme}`] = schemeProps
}

// scope variables to tone
for (const tone of THEME_COLOR_CARD_TONES) {
  const _varNames = varNames.color
  const _vars = vars.color[tone]

  const toneProps: Properties = {}

  _assignToneProps(toneProps, _varNames, _vars)

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // Legacy `--card` variables
  ////////////////////////////////////////////////////////////////////////////////////////////////
  Object.assign(toneProps, {
    '--card-bg-color': vars.color.bg,
    '--card-bg2-color': vars.color.muted.bg,
    '--card-border-color': vars.color.border,
    '--card-code-bg-color': vars.color.muted.bg,
    '--card-code-fg-color': vars.color.tinted.default.fg[4],
    '--card-fg-color': vars.color.fg,
    '--card-focus-ring-color': vars.color.focusRing,
    '--card-icon-color': vars.color.fg,
    '--card-kbd-bg-color': vars.color.muted.bg,
    '--card-kbd-border-color': vars.color.tinted.default.border[1],
    '--card-kbd-fg-color': vars.color.muted.fg,
    '--card-link-color': vars.color.link.fg,
    '--card-link-fg-color': vars.color.link.fg,
    '--card-muted-bg-color': vars.color.muted.bg,
    '--card-muted-fg-color': vars.color.muted.fg,
    '--card-shadow-outline-color': vars.color.shadow.outline,
    '--card-shadow-umbra-color': vars.color.shadow.umbra,
    '--card-shadow-penumbra-color': vars.color.shadow.penumbra,
    '--card-shadow-ambient-color': vars.color.shadow.ambient,
    // '--card-skeleton-from-color': 'var(--color-skeleton-from)',
    // '--card-skeleton-to-color': 'var(--color-skeleton-to)',
    '--card-hairline-soft-color': vars.color.tinted.default.border[1],
    '--card-hairline-hard-color': vars.color.tinted.default.border[2],
  })

  primitive[`.card.${toneMap[tone]}`] = toneProps
}

export const cardStyle: Style = {layers: {primitive}}

function _assignToneProps(
  toneProps: Properties,
  _varNames: ColorCardVarNames,
  _vars: ColorCardVars,
) {
  Object.assign(toneProps, {
    [_varNames.accent.fg]: _vars.accent.fg,
  })

  for (const hue of THEME_COLOR_AVATAR_COLORS) {
    toneProps[`${_varNames.avatar[hue].bg}`] = _vars.avatar[hue].bg
    toneProps[`${_varNames.avatar[hue].fg}`] = _vars.avatar[hue].fg
  }

  Object.assign(toneProps, {
    [_varNames.backdrop]: _vars.backdrop,

    [_varNames.focusRing]: _vars.focusRing,

    [_varNames.link.fg]: _vars.link.fg,

    [_varNames.shadow.outline]: _vars.shadow.outline,
    [_varNames.shadow.umbra]: _vars.shadow.umbra,
    [_varNames.shadow.penumbra]: _vars.shadow.penumbra,
    [_varNames.shadow.ambient]: _vars.shadow.ambient,

    [_varNames.token.atrule]: _vars.token.atrule,
    [_varNames.token.attrName]: _vars.token.attrName,
    [_varNames.token.attrValue]: _vars.token.attrValue,
    [_varNames.token.attribute]: _vars.token.attribute,
    [_varNames.token.boolean]: _vars.token.boolean,
    [_varNames.token.builtin]: _vars.token.builtin,
    [_varNames.token.cdata]: _vars.token.cdata,
    [_varNames.token.char]: _vars.token.char,
    [_varNames.token.class]: _vars.token.class,
    [_varNames.token.className]: _vars.token.className,
    [_varNames.token.comment]: _vars.token.comment,
    [_varNames.token.constant]: _vars.token.constant,
    [_varNames.token.deleted]: _vars.token.deleted,
    [_varNames.token.doctype]: _vars.token.doctype,
    [_varNames.token.entity]: _vars.token.entity,
    [_varNames.token.function]: _vars.token.function,
    [_varNames.token.hexcode]: _vars.token.hexcode,
    [_varNames.token.id]: _vars.token.id,
    [_varNames.token.important]: _vars.token.important,
    [_varNames.token.inserted]: _vars.token.inserted,
    [_varNames.token.keyword]: _vars.token.keyword,
    [_varNames.token.number]: _vars.token.number,
    [_varNames.token.operator]: _vars.token.operator,
    [_varNames.token.prolog]: _vars.token.prolog,
    [_varNames.token.property]: _vars.token.property,
    [_varNames.token.pseudoClass]: _vars.token.pseudoClass,
    [_varNames.token.pseudoElement]: _vars.token.pseudoElement,
    [_varNames.token.punctuation]: _vars.token.punctuation,
    [_varNames.token.regex]: _vars.token.regex,
    [_varNames.token.selector]: _vars.token.selector,
    [_varNames.token.string]: _vars.token.string,
    [_varNames.token.symbol]: _vars.token.symbol,
    [_varNames.token.tag]: _vars.token.tag,
    [_varNames.token.unit]: _vars.token.unit,
    [_varNames.token.url]: _vars.token.url,
    [_varNames.token.variable]: _vars.token.variable,
  })

  for (const variant of ['solid', 'tinted'] as const) {
    for (const elementTone of THEME_COLOR_STATE_TONES) {
      const __varNames = _varNames[variant][elementTone]
      const __vars = _vars[variant][elementTone]

      Object.assign(toneProps, {
        [__varNames.bg[0]]: __vars.bg[0],
        [__varNames.bg[1]]: __vars.bg[1],
        [__varNames.bg[2]]: __vars.bg[2],
        [__varNames.bg[3]]: __vars.bg[3],
        [__varNames.bg[4]]: __vars.bg[4],

        [__varNames.border[0]]: __vars.border[0],
        [__varNames.border[1]]: __vars.border[1],
        [__varNames.border[2]]: __vars.border[2],
        [__varNames.border[3]]: __vars.border[3],
        [__varNames.border[4]]: __vars.border[4],

        [__varNames.fg[0]]: __vars.fg[0],
        [__varNames.fg[1]]: __vars.fg[1],
        [__varNames.fg[2]]: __vars.fg[2],
        [__varNames.fg[3]]: __vars.fg[3],
        [__varNames.fg[4]]: __vars.fg[4],
      })
    }
  }
}
