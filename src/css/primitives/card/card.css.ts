import {
  AVATAR_COLORS,
  COLOR_VARIANTS,
  THEME_COLOR_CARD_TONES as CARD_TONES,
  THEME_COLOR_SCHEMES as COLOR_SCHEMES,
  THEME_COLOR_STATE_TONES as STATE_TONES,
  type ThemeColorCardToneKey as CardTone,
  type ThemeColorSchemeKey as ColorScheme,
} from '@sanity/ui/theme'
import {type StyleRule} from '@vanilla-extract/css'

import {_assign} from '../../_assign'
import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  backgroundColor: vars.color.bg,
  color: vars.color.fg,

  //
  transition:
    'background-color 100ms ease-in-out, border-color 100ms, box-shadow 100ms ease-in-out, color 100ms ease-in-out',

  vars: {
    [vars.color.bg]: vars.color.tinted.default.bg[0],
    [vars.color.border]: vars.color.tinted.default.border[1],
    [vars.color.fg]: vars.color.tinted.default.fg[0],
    [vars.color.muted.bg]: vars.color.tinted.default.bg[1],
    [vars.color.muted.border]: vars.color.tinted.default.bg[0],
    [vars.color.muted.fg]: vars.color.tinted.default.fg[4],
  },

  selectors: {
    'button.&': {
      WebkitFontSmoothing: 'inherit',
      appearance: 'none',
      outline: 'none',
      font: 'inherit',
      textAlign: 'inherit',
      border: 'none',
      // See https://caniuse.com/?search=width%3A%20stretch
      width: ['-moz-available', '-webkit-fill-available', 'stretch'],
    },

    'a.&': {
      outline: 'none',
      textDecoration: 'none',
    },

    'pre.&': {
      font: 'inherit',
      whiteSpace: 'inherit',
    },

    '&[data-checkered]': {
      backgroundSize: `${vars.space[3]} ${vars.space[3]}` as string,
      backgroundPosition: 'top left',
      backgroundImage:
        `repeating-conic-gradient(${vars.color.bg} 0% 25%, ${vars.color.muted.bg} 0% 50%)` as string,
    },

    'a.&:not([data-disabled]):hover, button.&:not([data-disabled]):hover': {
      vars: {
        [vars.color.bg]: vars.color.tinted.default.bg[1],
        [vars.color.border]: vars.color.tinted.default.border[3],
        [vars.color.fg]: vars.color.tinted.default.fg[1],
        [vars.color.code.bg]: vars.color.tinted.default.bg[2],
        [vars.color.code.fg]: vars.color.tinted.default.fg[4],
        [vars.color.muted.bg]: vars.color.tinted.default.bg[2],
        [vars.color.muted.fg]: vars.color.tinted.default.fg[4],
      },
    },

    'a&:not([data-disabled]):active, button&:not([data-disabled]):active': {
      vars: {
        [vars.color.bg]: vars.color.tinted.default.bg[2],
        [vars.color.border]: vars.color.tinted.default.border[4],
        [vars.color.fg]: vars.color.tinted.default.fg[0],
        [vars.color.code.bg]: vars.color.tinted.default.bg[3],
        [vars.color.code.fg]: vars.color.tinted.default.fg[4],
        [vars.color.muted.bg]: vars.color.tinted.default.bg[3],
        [vars.color.muted.fg]: vars.color.tinted.default.fg[4],
      },
    },

    // toggle button
    'a&:not([data-disabled])[aria-pressed="true"], button&:not([data-disabled])[aria-pressed="true"]':
      {
        vars: {
          [vars.color.bg]: vars.color.tinted.default.bg[2],
          [vars.color.border]: vars.color.tinted.default.border[4],
          [vars.color.fg]: vars.color.tinted.default.fg[0],
          [vars.color.code.bg]: vars.color.tinted.default.bg[3],
          [vars.color.code.fg]: vars.color.tinted.default.fg[4],
          [vars.color.muted.bg]: vars.color.tinted.default.bg[3],
          [vars.color.muted.fg]: vars.color.tinted.default.fg[4],
        },
      },

    'a&:not([data-disabled])[data-pressed], button&:not([data-disabled])[data-pressed]': {
      vars: {
        [vars.color.bg]: vars.color.tinted.default.bg[2],
        [vars.color.border]: vars.color.tinted.default.border[4],
        [vars.color.fg]: vars.color.tinted.default.fg[0],
        [vars.color.code.bg]: vars.color.tinted.default.bg[3],
        [vars.color.code.fg]: vars.color.tinted.default.fg[4],
        [vars.color.muted.bg]: vars.color.tinted.default.bg[3],
        [vars.color.muted.fg]: vars.color.tinted.default.fg[4],
      },
    },

    'a&:not([data-disabled])[data-selected], button&:not([data-disabled])[data-selected]': {
      vars: {
        [vars.color.bg]: vars.color.solid.primary.bg[0],
        [vars.color.border]: vars.color.solid.primary.border[1],
        [vars.color.fg]: vars.color.solid.primary.fg[0],
        [vars.color.code.bg]: vars.color.solid.primary.bg[1],
        [vars.color.code.fg]: vars.color.solid.primary.fg[3],
        [vars.color.muted.bg]: vars.color.solid.primary.bg[1],
        [vars.color.muted.fg]: vars.color.solid.primary.fg[3],
      },
    },

    'a&[data-disabled], button&[data-disabled]': {
      vars: {
        [vars.color.bg]: vars.color.tinted.default.bg[0],
        [vars.color.border]: vars.color.tinted.default.border[1],
        [vars.color.fg]: vars.color.tinted.default.border[3],
        [vars.color.code.bg]: vars.color.tinted.default.bg[0],
        [vars.color.code.fg]: vars.color.tinted.default.border[2],
        [vars.color.muted.bg]: vars.color.tinted.default.bg[1],
        [vars.color.muted.fg]: vars.color.tinted.default.border[2],
      },
    },
  },
})

export const schemes: Record<ColorScheme, string> = _fromEntries(
  COLOR_SCHEMES.map((s) => [
    s,
    _style(layers.primitives, {
      colorScheme: s,
      vars: buildSchemeVars(s),
    }),
  ]),
)

function buildSchemeVars(scheme: ColorScheme) {
  const schemeVars: Record<string, string> = {}

  for (const tone of CARD_TONES) {
    const target = vars.color[tone]
    const source = vars.color[scheme][tone]

    for (const hue of AVATAR_COLORS) {
      schemeVars[target.avatar[hue].bg] = source.avatar[hue].bg
      schemeVars[target.avatar[hue].fg] = source.avatar[hue].fg
    }

    _assign(schemeVars, {
      [target.backdrop]: source.backdrop,
      // [target.bg]: source.tinted.default.bg[0],
      // [target.border]: source.tinted.default.border[0],

      [target.code.fg]: source.code.fg,
      [target.code.bg]: source.code.bg,

      [target.code.token.atrule]: source.code.token.atrule,
      [target.code.token.attrName]: source.code.token.attrName,
      [target.code.token.attrValue]: source.code.token.attrValue,
      [target.code.token.attribute]: source.code.token.attribute,
      [target.code.token.boolean]: source.code.token.boolean,
      [target.code.token.builtin]: source.code.token.builtin,
      [target.code.token.cdata]: source.code.token.cdata,
      [target.code.token.char]: source.code.token.char,
      [target.code.token.class]: source.code.token.class,
      [target.code.token.className]: source.code.token.className,
      [target.code.token.comment]: source.code.token.comment,
      [target.code.token.constant]: source.code.token.constant,
      [target.code.token.deleted]: source.code.token.deleted,
      [target.code.token.doctype]: source.code.token.doctype,
      [target.code.token.entity]: source.code.token.entity,
      [target.code.token.function]: source.code.token.function,
      [target.code.token.hexcode]: source.code.token.hexcode,
      [target.code.token.id]: source.code.token.id,
      [target.code.token.important]: source.code.token.important,
      [target.code.token.inserted]: source.code.token.inserted,
      [target.code.token.keyword]: source.code.token.keyword,
      [target.code.token.number]: source.code.token.number,
      [target.code.token.operator]: source.code.token.operator,
      [target.code.token.prolog]: source.code.token.prolog,
      [target.code.token.property]: source.code.token.property,
      [target.code.token.pseudoClass]: source.code.token.pseudoClass,
      [target.code.token.pseudoElement]: source.code.token.pseudoElement,
      [target.code.token.punctuation]: source.code.token.punctuation,
      [target.code.token.regex]: source.code.token.regex,
      [target.code.token.selector]: source.code.token.selector,
      [target.code.token.string]: source.code.token.string,
      [target.code.token.symbol]: source.code.token.symbol,
      [target.code.token.tag]: source.code.token.tag,
      [target.code.token.unit]: source.code.token.unit,
      [target.code.token.url]: source.code.token.url,
      [target.code.token.variable]: source.code.token.variable,

      // [target.fg]: source.tinted.default.fg[0],

      [target.focusRing]: source.focusRing,
      [target.link.fg]: source.link.fg,

      // [target.muted.bg]: source.tinted.default.bg[4],
      // [target.muted.border]: source.tinted.default.border[4],
      // [target.muted.fg]: source.tinted.default.fg[4],

      [target.shadow.outline]: source.shadow.outline,
      [target.shadow.umbra]: source.shadow.umbra,
      [target.shadow.penumbra]: source.shadow.penumbra,
      [target.shadow.ambient]: source.shadow.ambient,

      [target.skeleton.from]: source.skeleton.from,
      [target.skeleton.to]: source.skeleton.to,
    })

    for (const variant of COLOR_VARIANTS) {
      for (const elementTone of STATE_TONES) {
        const _target = vars.color[tone][variant][elementTone]
        const _source = vars.color[scheme][tone][variant][elementTone]

        _assign(schemeVars, {
          [_target.bg[0]]: _source.bg[0],
          [_target.bg[4]]: _source.bg[4],
          [_target.border[0]]: _source.border[0],
          [_target.border[4]]: _source.border[4],
          [_target.fg[0]]: _source.fg[0],
          [_target.fg[4]]: _source.fg[4],
        })
      }
    }
  }

  return schemeVars
}

export const tones: Record<CardTone, string> = _fromEntries(
  CARD_TONES.map((t) => [t, _style(layers.primitives, buildToneRule(t))]),
)

function buildToneRule(tone: CardTone): StyleRule {
  const target = vars.color
  const source = vars.color[tone]

  const toneVars: Record<string, string> = {}

  for (const hue of AVATAR_COLORS) {
    toneVars[target.avatar[hue].bg] = source.avatar[hue].bg
    toneVars[target.avatar[hue].fg] = source.avatar[hue].fg
  }

  _assign(toneVars, {
    [target.backdrop]: source.backdrop,

    [target.code.fg]: source.code.fg,
    [target.code.bg]: source.code.bg,

    [target.code.token.atrule]: source.code.token.atrule,
    [target.code.token.attrName]: source.code.token.attrName,
    [target.code.token.attrValue]: source.code.token.attrValue,
    [target.code.token.attribute]: source.code.token.attribute,
    [target.code.token.boolean]: source.code.token.boolean,
    [target.code.token.builtin]: source.code.token.builtin,
    [target.code.token.cdata]: source.code.token.cdata,
    [target.code.token.char]: source.code.token.char,
    [target.code.token.class]: source.code.token.class,
    [target.code.token.className]: source.code.token.className,
    [target.code.token.comment]: source.code.token.comment,
    [target.code.token.constant]: source.code.token.constant,
    [target.code.token.deleted]: source.code.token.deleted,
    [target.code.token.doctype]: source.code.token.doctype,
    [target.code.token.entity]: source.code.token.entity,
    [target.code.token.function]: source.code.token.function,
    [target.code.token.hexcode]: source.code.token.hexcode,
    [target.code.token.id]: source.code.token.id,
    [target.code.token.important]: source.code.token.important,
    [target.code.token.inserted]: source.code.token.inserted,
    [target.code.token.keyword]: source.code.token.keyword,
    [target.code.token.number]: source.code.token.number,
    [target.code.token.operator]: source.code.token.operator,
    [target.code.token.prolog]: source.code.token.prolog,
    [target.code.token.property]: source.code.token.property,
    [target.code.token.pseudoClass]: source.code.token.pseudoClass,
    [target.code.token.pseudoElement]: source.code.token.pseudoElement,
    [target.code.token.punctuation]: source.code.token.punctuation,
    [target.code.token.regex]: source.code.token.regex,
    [target.code.token.selector]: source.code.token.selector,
    [target.code.token.string]: source.code.token.string,
    [target.code.token.symbol]: source.code.token.symbol,
    [target.code.token.tag]: source.code.token.tag,
    [target.code.token.unit]: source.code.token.unit,
    [target.code.token.url]: source.code.token.url,
    [target.code.token.variable]: source.code.token.variable,

    [target.focusRing]: source.focusRing,
    [target.link.fg]: source.link.fg,

    [target.shadow.outline]: source.shadow.outline,
    [target.shadow.umbra]: source.shadow.umbra,
    [target.shadow.penumbra]: source.shadow.penumbra,
    [target.shadow.ambient]: source.shadow.ambient,

    [target.skeleton.from]: source.skeleton.from,
    [target.skeleton.to]: source.skeleton.to,

    // legacy vars
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
    '--card-skeleton-from-color': vars.color.skeleton.from,
    '--card-skeleton-to-color': vars.color.skeleton.to,
  })

  for (const variant of COLOR_VARIANTS) {
    for (const elementTone of STATE_TONES) {
      const _target = vars.color[variant][elementTone]
      const _source = vars.color[tone][variant][elementTone]

      _assign(toneVars, {
        [_target.bg[0]]: _source.bg[0],
        [_target.bg[1]]: `color-mix(in oklab, ${_source.bg[0]}, ${_source.bg[4]} 25%)`,
        [_target.bg[2]]: `color-mix(in oklab, ${_source.bg[0]}, ${_source.bg[4]} 50%)`,
        [_target.bg[3]]: `color-mix(in oklab, ${_source.bg[0]}, ${_source.bg[4]} 75%)`,
        [_target.bg[4]]: _source.bg[4],

        [_target.border[0]]: _source.border[0],
        [_target.border[1]]: `color-mix(in oklab, ${_source.border[0]}, ${_source.border[4]} 25%)`,
        [_target.border[2]]: `color-mix(in oklab, ${_source.border[0]}, ${_source.border[4]} 50%)`,
        [_target.border[3]]: `color-mix(in oklab, ${_source.border[0]}, ${_source.border[4]} 75%)`,
        [_target.border[4]]: _source.border[4],

        [_target.fg[0]]: _source.fg[0],
        [_target.fg[1]]: `color-mix(in oklab, ${_source.fg[0]}, ${_source.fg[4]} 25%)`,
        [_target.fg[2]]: `color-mix(in oklab, ${_source.fg[0]}, ${_source.fg[4]} 50%)`,
        [_target.fg[3]]: `color-mix(in oklab, ${_source.fg[0]}, ${_source.fg[4]} 75%)`,
        [_target.fg[4]]: _source.fg[4],
      })
    }
  }

  return {
    vars: toneVars,
  }
}
