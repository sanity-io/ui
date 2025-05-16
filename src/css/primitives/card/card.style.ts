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
    [varNames.color.code.bg]: vars.color.code.bg,
    [varNames.color.code.fg]: vars.color.code.fg,
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
        // border: 'none',
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

      'a&[data-disabled], button&[data-disabled]': {
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
    '--card-code-bg-color': vars.color.code.bg,
    '--card-code-fg-color': vars.color.code.fg,
    '--card-fg-color': vars.color.fg,
    '--card-focus-ring-color': vars.color.focusRing,
    '--card-hairline-soft-color': vars.color.tinted.default.border[1],
    '--card-hairline-hard-color': vars.color.tinted.default.border[2],
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

    [_varNames.code.fg]: _vars.code.fg,
    [_varNames.code.bg]: _vars.code.bg,

    [_varNames.code.token.atrule]: _vars.code.token.atrule,
    [_varNames.code.token.attrName]: _vars.code.token.attrName,
    [_varNames.code.token.attrValue]: _vars.code.token.attrValue,
    [_varNames.code.token.attribute]: _vars.code.token.attribute,
    [_varNames.code.token.boolean]: _vars.code.token.boolean,
    [_varNames.code.token.builtin]: _vars.code.token.builtin,
    [_varNames.code.token.cdata]: _vars.code.token.cdata,
    [_varNames.code.token.char]: _vars.code.token.char,
    [_varNames.code.token.class]: _vars.code.token.class,
    [_varNames.code.token.className]: _vars.code.token.className,
    [_varNames.code.token.comment]: _vars.code.token.comment,
    [_varNames.code.token.constant]: _vars.code.token.constant,
    [_varNames.code.token.deleted]: _vars.code.token.deleted,
    [_varNames.code.token.doctype]: _vars.code.token.doctype,
    [_varNames.code.token.entity]: _vars.code.token.entity,
    [_varNames.code.token.function]: _vars.code.token.function,
    [_varNames.code.token.hexcode]: _vars.code.token.hexcode,
    [_varNames.code.token.id]: _vars.code.token.id,
    [_varNames.code.token.important]: _vars.code.token.important,
    [_varNames.code.token.inserted]: _vars.code.token.inserted,
    [_varNames.code.token.keyword]: _vars.code.token.keyword,
    [_varNames.code.token.number]: _vars.code.token.number,
    [_varNames.code.token.operator]: _vars.code.token.operator,
    [_varNames.code.token.prolog]: _vars.code.token.prolog,
    [_varNames.code.token.property]: _vars.code.token.property,
    [_varNames.code.token.pseudoClass]: _vars.code.token.pseudoClass,
    [_varNames.code.token.pseudoElement]: _vars.code.token.pseudoElement,
    [_varNames.code.token.punctuation]: _vars.code.token.punctuation,
    [_varNames.code.token.regex]: _vars.code.token.regex,
    [_varNames.code.token.selector]: _vars.code.token.selector,
    [_varNames.code.token.string]: _vars.code.token.string,
    [_varNames.code.token.symbol]: _vars.code.token.symbol,
    [_varNames.code.token.tag]: _vars.code.token.tag,
    [_varNames.code.token.unit]: _vars.code.token.unit,
    [_varNames.code.token.url]: _vars.code.token.url,
    [_varNames.code.token.variable]: _vars.code.token.variable,

    [_varNames.focusRing]: _vars.focusRing,

    [_varNames.link.fg]: _vars.link.fg,

    [_varNames.shadow.outline]: _vars.shadow.outline,
    [_varNames.shadow.umbra]: _vars.shadow.umbra,
    [_varNames.shadow.penumbra]: _vars.shadow.penumbra,
    [_varNames.shadow.ambient]: _vars.shadow.ambient,
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
