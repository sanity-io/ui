import {
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  type ThemeColorCardToneKey,
  type ThemeColorStateToneKey,
} from '../v2'
import type {CardColorTokens} from './color/card'
import type {ElementColorTokens} from './color/element'
import {merge} from './merge'
import type {PartialTokens, Tokens} from './tokens'

const defaultElementTokens: ElementColorTokens = {
  _hue: 'gray',
  bg: {
    0: ['950', '50'],
    4: ['700', '300'],
  },
  border: {
    0: ['700', '300'],
    4: ['400', '600'],
  },
  fg: {
    0: ['100', '900'],
    4: ['400', '600'],
  },
}

/** @internal */
export function resolveTokens(tokens: PartialTokens<Tokens> = {}): Tokens {
  return {
    color: {
      '*': resolveCardColorTokens(tokens.color?.['*']),

      ...THEME_COLOR_CARD_TONES.reduce(
        (acc, tone) => {
          return {
            ...acc,
            [tone]: resolveCardColorTokens(merge(tokens.color?.['*'], tokens.color?.[tone])),
          }
        },
        {} as Record<ThemeColorCardToneKey, CardColorTokens>,
      ),
    },
  }
}

function resolveCardColorTokens(
  tokens: PartialTokens<CardColorTokens> | undefined,
): CardColorTokens {
  return {
    _hue: tokens?._hue ?? 'gray',
    avatar: {
      gray: {
        _hue: tokens?.avatar?.gray?._hue ?? 'gray',
        bg: tokens?.avatar?.gray?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.gray?.fg ?? ['white', '900'],
      },
      blue: {
        _hue: tokens?.avatar?.blue?._hue ?? 'blue',
        bg: tokens?.avatar?.blue?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.blue?.fg ?? ['white', '900'],
      },
      purple: {
        _hue: tokens?.avatar?.purple?._hue ?? 'purple',
        bg: tokens?.avatar?.purple?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.purple?.fg ?? ['white', '900'],
      },
      magenta: {
        _hue: tokens?.avatar?.magenta?._hue ?? 'magenta',
        bg: tokens?.avatar?.magenta?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.magenta?.fg ?? ['white', '900'],
      },
      red: {
        _hue: tokens?.avatar?.red?._hue ?? 'red',
        bg: tokens?.avatar?.red?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.red?.fg ?? ['white', '900'],
      },
      orange: {
        _hue: tokens?.avatar?.orange?._hue ?? 'orange',
        bg: tokens?.avatar?.orange?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.orange?.fg ?? ['white', '900'],
      },
      yellow: {
        _hue: tokens?.avatar?.yellow?._hue ?? 'yellow',
        bg: tokens?.avatar?.yellow?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.yellow?.fg ?? ['white', '900'],
      },
      green: {
        _hue: tokens?.avatar?.green?._hue ?? 'green',
        bg: tokens?.avatar?.green?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.green?.fg ?? ['white', '900'],
      },
      cyan: {
        _hue: tokens?.avatar?.cyan?._hue ?? 'cyan',
        bg: tokens?.avatar?.cyan?.bg ?? ['500', '400'],
        fg: tokens?.avatar?.cyan?.fg ?? ['white', '900'],
      },
    },
    backdrop: tokens?.backdrop ?? ['100', '900'],
    code: {
      bg: tokens?.code?.bg ?? ['50', '950'],
      fg: tokens?.code?.fg ?? ['600', '400'],
      token: {
        atrule: tokens?.code?.token?.atrule ?? ['600', '400'],
        attribute: tokens?.code?.token?.attribute ?? ['600', '400'],
        attrName: tokens?.code?.token?.attrName ?? ['600', '400'],
        attrValue: tokens?.code?.token?.attrValue ?? ['600', '400'],
        boolean: tokens?.code?.token?.boolean ?? ['600', '400'],
        builtin: tokens?.code?.token?.builtin ?? ['600', '400'],
        cdata: tokens?.code?.token?.cdata ?? ['600', '400'],
        char: tokens?.code?.token?.char ?? ['600', '400'],
        class: tokens?.code?.token?.class ?? ['600', '400'],
        className: tokens?.code?.token?.className ?? ['600', '400'],
        comment: tokens?.code?.token?.comment ?? ['400', '600'],
        constant: tokens?.code?.token?.constant ?? ['600', '400'],
        deleted: tokens?.code?.token?.deleted ?? ['600', '400'],
        doctype: tokens?.code?.token?.doctype ?? ['600', '400'],
        entity: tokens?.code?.token?.entity ?? ['600', '400'],
        function: tokens?.code?.token?.function ?? ['600', '400'],
        hexcode: tokens?.code?.token?.hexcode ?? ['600', '400'],
        id: tokens?.code?.token?.id ?? ['600', '400'],
        important: tokens?.code?.token?.important ?? ['600', '400'],
        inserted: tokens?.code?.token?.inserted ?? ['600', '400'],
        keyword: tokens?.code?.token?.keyword ?? ['600', '400'],
        number: tokens?.code?.token?.number ?? ['600', '400'],
        operator: tokens?.code?.token?.operator ?? ['600', '400'],
        prolog: tokens?.code?.token?.prolog ?? ['600', '400'],
        property: tokens?.code?.token?.property ?? ['600', '400'],
        pseudoClass: tokens?.code?.token?.pseudoClass ?? ['600', '400'],
        pseudoElement: tokens?.code?.token?.pseudoElement ?? ['600', '400'],
        punctuation: tokens?.code?.token?.punctuation ?? ['600', '400'],
        regex: tokens?.code?.token?.regex ?? ['600', '400'],
        selector: tokens?.code?.token?.selector ?? ['600', '400'],
        string: tokens?.code?.token?.string ?? ['600', '400'],
        symbol: tokens?.code?.token?.symbol ?? ['600', '400'],
        tag: tokens?.code?.token?.tag ?? ['600', '400'],
        unit: tokens?.code?.token?.unit ?? ['600', '400'],
        url: tokens?.code?.token?.url ?? ['600', '400'],
        variable: tokens?.code?.token?.variable ?? ['600', '400'],
      },
    },
    focusRing: tokens?.focusRing ?? ['500', '500'],
    link: {
      fg: tokens?.link?.fg ?? ['600', '400'],
    },
    shadow: {
      outline: tokens?.shadow?.outline ?? ['500', '500'],
      umbra: tokens?.shadow?.umbra ?? ['500', '500'],
      penumbra: tokens?.shadow?.penumbra ?? ['500', '500'],
      ambient: tokens?.shadow?.ambient ?? ['500', '500'],
    },
    skeleton: {
      from: tokens?.skeleton?.from ?? ['100', '900'],
      to: tokens?.skeleton?.to ?? ['50', '950'],
    },

    variant: {
      solid: {
        '*': resolveElementTokens(tokens?.variant?.solid?.['*']),
        ...THEME_COLOR_STATE_TONES.reduce(
          (acc, tone) => {
            acc[tone] = resolveElementTokens(
              merge(tokens, tokens?.variant?.solid?.['*'], tokens?.variant?.solid?.[tone]),
            )

            return acc
          },
          {} as Record<ThemeColorStateToneKey, ElementColorTokens>,
        ),
      },
      tinted: {
        '*': resolveElementTokens(tokens?.variant?.tinted?.['*']),
        ...THEME_COLOR_STATE_TONES.reduce(
          (acc, tone) => {
            acc[tone] = resolveElementTokens(
              merge(tokens, tokens?.variant?.tinted?.['*'], tokens?.variant?.tinted?.[tone]),
            )

            return acc
          },
          {} as Record<ThemeColorStateToneKey, ElementColorTokens>,
        ),
      },
    },
  }
}

function resolveElementTokens(tokens?: PartialTokens<ElementColorTokens>): ElementColorTokens {
  return {
    _hue: tokens?._hue ?? 'gray',
    bg: {
      0: tokens?.bg?.[0] ?? defaultElementTokens.bg[0],
      4: tokens?.bg?.[4] ?? defaultElementTokens.bg[4],
    },
    border: {
      0: tokens?.border?.[0] ?? defaultElementTokens.border[0],
      4: tokens?.border?.[4] ?? defaultElementTokens.border[4],
    },
    fg: {
      0: tokens?.fg?.[0] ?? defaultElementTokens.fg[0],
      4: tokens?.fg?.[4] ?? defaultElementTokens.fg[4],
    },
  }
}
